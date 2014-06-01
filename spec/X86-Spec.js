describe("X86", function () {
    var capstone = require("..");

    var CODE_X86 = new Buffer([
        0x55, 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00
    ]);

    var EXPECT_X86 = [
        {
            "arch" : 3,
            "id" : 562,
            "address" : 4096,
            "bytes" : [ 85 ],
            "mnemonic" : "push",
            "op_str" : "rbp"
        },
        {
            "arch" : 3,
            "id" : 424,
            "address" : 4097,
            "bytes" : [ 72, 139, 5, 184, 19, 0, 0 ],
            "mnemonic" : "mov",
            "op_str" : "rax, qword ptr [rip + 0x13b8]"
        }
    ];

    var EXPECT_X86_ATT = [
        {
            "arch" : 3,
            "id" : 562,
            "address" : 4096,
            "bytes" : [ 85 ],
            "mnemonic" : "pushq",
            "op_str" : "%rbp"
        },
        {
            "arch" : 3,
            "id" : 424,
            "address" : 4097,
            "bytes" : [ 72, 139, 5, 184, 19, 0, 0 ],
            "mnemonic" : "movq",
            "op_str" : "qword ptr 0x13b8(%rip), %rax"
        }
    ];

    var EXPECT_X86_LITE = [
        [ 4096, 1, "push", "rbp" ],
        [ 4097, 7, "mov", "rax, qword ptr [rip + 0x13b8]" ]
    ];

    var EXPECT_X86_DETAIL = [
        {
            "arch" : 3,
            "id" : 562,
            "address" : 4096,
            "bytes" : [ 85 ],
            "mnemonic" : "push",
            "op_str" : "rbp",
            "detail" : {
                "regs_read" : [ 44 ],
                "regs_write" : [ 44 ],
                "groups" : [ 17 ],
                "x86" : {
                    "prefix" : [ 0, 0, 0, 0, 0 ],
                    "segment" : 0,
                    "opcode" : [ 85, 0, 0 ],
                    "op_size" : 8,
                    "addr_size" : 8,
                    "disp_size" : 4,
                    "imm_size" : 4,
                    "modrm" : 0,
                    "sib" : 0,
                    "disp" : 0,
                    "sib_index" : 0,
                    "sib_scale" : 0,
                    "sib_base" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 36 }
                    ]
                }
            }
        },
        {
            "arch" : 3,
            "id" : 424,
            "address" : 4097,
            "bytes" : [ 72, 139, 5, 184, 19, 0, 0 ],
            "mnemonic" : "mov",
            "op_str" : "rax, qword ptr [rip + 0x13b8]",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "x86" : {
                    "prefix" : [ 0, 0, 0, 0, 0 ],
                    "segment" : 0,
                    "opcode" : [ 139, 0, 0 ],
                    "op_size" : 8,
                    "addr_size" : 8,
                    "disp_size" : 4,
                    "imm_size" : 4,
                    "modrm" : 5,
                    "sib" : 0,
                    "disp" : 5048,
                    "sib_index" : 0,
                    "sib_scale" : 0,
                    "sib_base" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 35 },
                        {
                            "type" : 4,
                            "mem" : {
                                "base" : 41,
                                "index" : 0,
                                "scale" : 1,
                                "disp" : 5048
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
        expect(output).toEqual(EXPECT_X86);
    });

    it("can be disassembled with ATT syntax", function () {
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
        cs.syntax = capstone.SYNTAX_ATT;
        var output = cs.disasm(CODE_X86, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_X86_ATT);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
        var output = cs.disasm_lite(CODE_X86, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_X86_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
        cs.detail = true;
        var output = cs.disasm(CODE_X86, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_X86_DETAIL);
    });
});
