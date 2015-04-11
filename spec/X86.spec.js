describe("X86", function () {
    var capstone = require("..");

    var CODE_X86 = new Buffer([
        0x55, 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00
    ]);

    var EXPECT_X86 = [
        {
            "arch" : capstone.ARCH_X86,
            "id" : capstone.x86.INS_PUSH,
            "address" : 0x1000,
            "bytes" : [ 0x55 ],
            "mnemonic" : "push",
            "op_str" : "rbp"
        },
        {
            "arch" : capstone.ARCH_X86,
            "id" : capstone.x86.INS_MOV,
            "address" : 0x1001,
            "bytes" : [ 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00 ],
            "mnemonic" : "mov",
            "op_str" : "rax, qword ptr [rip + 0x13b8]"
        }
    ];

    var EXPECT_X86_ATT = [
        {
            "arch" : capstone.ARCH_X86,
            "id" : capstone.x86.INS_PUSH,
            "address" : 0x1000,
            "bytes" : [ 85 ],
            "mnemonic" : "pushq",
            "op_str" : "%rbp"
        },
        {
            "arch" : capstone.ARCH_X86,
            "id" : capstone.x86.INS_MOV,
            "address" : 0x1001,
            "bytes" : [ 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00 ],
            "mnemonic" : "movq",
            "op_str" : "0x13b8(%rip), %rax"
        }
    ];

    var EXPECT_X86_LITE = [
        [ 0x1000, 1, "push", "rbp" ],
        [ 0x1001, 7, "mov", "rax, qword ptr [rip + 0x13b8]" ]
    ];

    var EXPECT_X86_DETAIL = [
        {
            "arch" : capstone.ARCH_X86,
            "id" : capstone.x86.INS_PUSH,
            "address" : 0x1000,
            "bytes" : [ 0x55 ],
            "mnemonic" : "push",
            "op_str" : "rbp",
            "detail" : {
                "regs_read" : [ capstone.x86.REG_RSP ],
                "regs_write" : [ capstone.x86.REG_RSP ],
                "groups" : [ capstone.x86.GRP_MODE64 ],
                "x86" : {
                    "prefix" : [ 0, 0, 0, 0 ],
                    "opcode" : [ 0x55, 0x00, 0x00, 0x00 ],
                    "addr_size" : 8,
                    "rex" : 0,
                    "modrm" : 0,
                    "sib" : 0,
                    "disp" : 0,
                    "sib_index" : 0,
                    "sib_scale" : 0,
                    "sib_base" : 0,
                    "sse_cc" : 0,
                    "avx_cc" : 0,
                    "avx_sae" : false,
                    "avx_rm" : 0,
                    "operands" : [
                        {
                            "type" : capstone.x86.OP_REG,
                            "size" : 8,
                            "avx_bcast" : 0,
                            "avx_zero_opmask" : false,
                            "reg" : capstone.x86.REG_RBP,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_X86,
            "id" : capstone.x86.INS_MOV,
            "address" : 0x1001,
            "bytes" : [ 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00 ],
            "mnemonic" : "mov",
            "op_str" : "rax, qword ptr [rip + 0x13b8]",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "x86" : {
                    "prefix" : [ 0, 0, 0, 0 ],
                    "opcode" : [ 0x8b, 0x00, 0x00, 0x00 ],
                    "addr_size" : 8,
                    "rex" : 72,
                    "modrm" : 5,
                    "sib" : 0,
                    "disp" : 0x13b8,
                    "sib_index" : 0,
                    "sib_scale" : 0,
                    "sib_base" : 0,
                    "sse_cc" : 0,
                    "avx_cc" : 0,
                    "avx_sae" : false,
                    "avx_rm" : 0,
                    "operands" : [
                        {
                            "type" : capstone.x86.OP_REG,
                            "size" : 8,
                            "avx_bcast" : 0,
                            "avx_zero_opmask" : false,
                            "reg" : capstone.x86.REG_RAX,
                        },
                        {
                            "type" : capstone.x86.OP_MEM,
                            "size" : 8,
                            "avx_bcast" : 0,
                            "avx_zero_opmask" : false,
                            "mem" : {
                                "segment" : 0,
                                "base" : capstone.x86.REG_RIP,
                                "index" : 0,
                                "scale" : 1,
                                "disp" : 0x13b8
                            }
                        }
                    ]
                }
            }
        }
    ];


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
        var output = cs.reg_name(capstone.x86.REG_R15W);
        cs.close();
        expect(output).toEqual("r15w");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
        var output = cs.insn_name(capstone.x86.INS_XTEST);
        cs.close();
        expect(output).toEqual("xtest");
    });

    it("can be disassembled", function () {
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
        var output = cs.disasm(CODE_X86, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_X86);
    });

    it("can be disassembled with ATT syntax", function () {
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
        cs.syntax = capstone.SYNTAX_ATT;
        var output = cs.disasm(CODE_X86, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_X86_ATT);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
        var output = cs.disasm_lite(CODE_X86, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_X86_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
        cs.detail = true;
        var output = cs.disasm(CODE_X86, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_X86_DETAIL);
    });
});
