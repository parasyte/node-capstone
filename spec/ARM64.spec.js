describe("ARM64", function () {
    var capstone = require("..");

    var CODE_ARM64 = new Buffer([
        0x21, 0x7c, 0x02, 0x9b, 0x21, 0x7c, 0x00, 0x53,
        0x00, 0x40, 0x21, 0x4b, 0xe1, 0x0b, 0x40, 0xb9,
        0x20, 0x04, 0x81, 0xda, 0x20, 0x08, 0x02, 0x8b
    ]);

    var EXPECT_ARM64 = [
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_MUL,
            "address" : 0x2c,
            "bytes" : [ 0x21, 0x7c, 0x02, 0x9b ],
            "mnemonic" : "mul",
            "op_str" : "x1, x1, x2"
        },
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_LSR,
            "address" : 0x30,
            "bytes" : [ 0x21, 0x7c, 0x00, 0x53 ],
            "mnemonic" : "lsr",
            "op_str" : "w1, w1, #0"
        },
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_SUB,
            "address" : 0x34,
            "bytes" : [ 0x00, 0x40, 0x21, 0x4b ],
            "mnemonic" : "sub",
            "op_str" : "w0, w0, w1, uxtw"
        },
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_LDR,
            "address" : 0x38,
            "bytes" : [ 0xe1, 0x0b, 0x40, 0xb9 ],
            "mnemonic" : "ldr",
            "op_str" : "w1, [sp, #8]"
        },
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_CNEG,
            "address" : 0x3c,
            "bytes" : [ 0x20, 0x04, 0x81, 0xda ],
            "mnemonic" : "cneg",
            "op_str" : "x0, x1, ne"
        },
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_ADD,
            "address" : 0x40,
            "bytes" : [ 0x20, 0x08, 0x02, 0x8b ],
            "mnemonic" : "add",
            "op_str" : "x0, x1, x2, lsl #2"
        },
    ];

    var EXPECT_ARM64_LITE = [
        [ 0x2c, 4, "mul", "x1, x1, x2" ],
        [ 0x30, 4, "lsr", "w1, w1, #0" ],
        [ 0x34, 4, "sub", "w0, w0, w1, uxtw" ],
        [ 0x38, 4, "ldr", "w1, [sp, #8]" ],
        [ 0x3c, 4, "cneg", "x0, x1, ne" ],
        [ 0x40, 4, "add", "x0, x1, x2, lsl #2" ]
    ];

    var EXPECT_ARM64_DETAIL = [
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_MUL,
            "address" : 0x2c,
            "bytes" : [ 0x21, 0x7c, 0x02, 0x9b ],
            "mnemonic" : "mul",
            "op_str" : "x1, x1, x2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : capstone.arm64.CC_INVALID,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_X1,
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_X1,
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_X2,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_LSR,
            "address" : 0x30,
            "bytes" : [ 0x21, 0x7c, 0x00, 0x53 ],
            "mnemonic" : "lsr",
            "op_str" : "w1, w1, #0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : capstone.arm64.CC_INVALID,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_W1,
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_W1,
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_IMM,
                            "imm" : 0
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_SUB,
            "address" : 0x34,
            "bytes" : [ 0x00, 0x40, 0x21, 0x4b ],
            "mnemonic" : "sub",
            "op_str" : "w0, w0, w1, uxtw",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : capstone.arm64.CC_INVALID,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : 168
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : 168
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 3,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_W1,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_LDR,
            "address" : 0x38,
            "bytes" : [ 0xe1, 0x0b, 0x40, 0xb9 ],
            "mnemonic" : "ldr",
            "op_str" : "w1, [sp, #8]",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : capstone.arm64.CC_INVALID,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_W1,
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_MEM,
                            "mem" : { "base" : 4, "index" : 0, "disp" : 8 }
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_CNEG,
            "address" : 0x3c,
            "bytes" : [ 0x20, 0x04, 0x81, 0xda ],
            "mnemonic" : "cneg",
            "op_str" : "x0, x1, ne",
            "detail" : {
                "regs_read" : [ 3 ],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : 2,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_X0,
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_X1,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM64,
            "id" : capstone.arm64.INS_ADD,
            "address" : 0x40,
            "bytes" : [ 0x20, 0x08, 0x02, 0x8b ],
            "mnemonic" : "add",
            "op_str" : "x0, x1, x2, lsl #2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : capstone.arm64.CC_INVALID,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_X0,
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_X1,
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : capstone.arm64.OP_REG, "value" : 2 },
                            "ext" : 0,
                            "type" : capstone.arm64.OP_REG,
                            "reg" : capstone.arm64.REG_X2,
                        }
                    ]
                }
            }
        }
    ];


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.reg_name(capstone.arm64.REG_V31);
        expect(output).toEqual("v31");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.insn_name(capstone.arm64.INS_TLBI);
        expect(output).toEqual("tlbi");
    });

    it("can be disassembled", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.disasm(CODE_ARM64, 0x2c);
        expect(output).not.toBeDiff(EXPECT_ARM64);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.disasm_lite(CODE_ARM64, 0x2c);
        expect(output).not.toBeDiff(EXPECT_ARM64_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        cs.detail = true;
        var output = cs.disasm(CODE_ARM64, 0x2c);
        expect(output).not.toBeDiff(EXPECT_ARM64_DETAIL);
    });
});
