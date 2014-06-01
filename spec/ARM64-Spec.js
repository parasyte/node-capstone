describe("ARM64", function () {
    var capstone = require("..");

    var CODE_ARM64 = new Buffer([
        0x21, 0x7c, 0x02, 0x9b, 0x21, 0x7c, 0x00, 0x53,
        0x00, 0x40, 0x21, 0x4b, 0xe1, 0x0b, 0x40, 0xb9,
        0x20, 0x04, 0x81, 0xda, 0x20, 0x08, 0x02, 0x8b
    ]);

    var EXPECT_ARM64 = [
        {
            "arch" : 1,
            "id" : 212,
            "address" : 44,
            "bytes" : [ 33, 124, 2, 155 ],
            "mnemonic" : "mul",
            "op_str" : "x1, x1, x2"
        },
        {
            "arch" : 1,
            "id" : 201,
            "address" : 48,
            "bytes" : [ 33, 124, 0, 83 ],
            "mnemonic" : "lsr",
            "op_str" : "w1, w1, #0"
        },
        {
            "arch" : 1,
            "id" : 349,
            "address" : 52,
            "bytes" : [ 0, 64, 33, 75 ],
            "mnemonic" : "sub",
            "op_str" : "w0, w0, w1, uxtw"
        },
        {
            "arch" : 1,
            "id" : 170,
            "address" : 56,
            "bytes" : [ 225, 11, 64, 185 ],
            "mnemonic" : "ldr",
            "op_str" : "w1, [sp, #8]"
        },
        {
            "arch" : 1,
            "id" : 58,
            "address" : 60,
            "bytes" : [ 32, 4, 129, 218 ],
            "mnemonic" : "csneg",
            "op_str" : "x0, x1, x1, eq"
        },
        {
            "arch" : 1,
            "id" : 7,
            "address" : 64,
            "bytes" : [ 32, 8, 2, 139 ],
            "mnemonic" : "add",
            "op_str" : "x0, x1, x2, lsl #2"
        },
    ];

    var EXPECT_ARM64_LITE = [
        [ 44, 4, "mul", "x1, x1, x2" ],
        [ 48, 4, "lsr", "w1, w1, #0" ],
        [ 52, 4, "sub", "w0, w0, w1, uxtw" ],
        [ 56, 4, "ldr", "w1, [sp, #8]" ],
        [ 60, 4, "csneg", "x0, x1, x1, eq" ],
        [ 64, 4, "add", "x0, x1, x2, lsl #2" ]
    ];

    var EXPECT_ARM64_DETAIL = [
        {
            "arch" : 1,
            "id" : 212,
            "address" : 44,
            "bytes" : [ 33, 124, 2, 155 ],
            "mnemonic" : "mul",
            "op_str" : "x1, x1, x2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : 0,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 198
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 198
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 199
                        }
                    ]
                }
            }
        },
        {
            "arch" : 1,
            "id" : 201,
            "address" : 48,
            "bytes" : [ 33, 124, 0, 83 ],
            "mnemonic" : "lsr",
            "op_str" : "w1, w1, #0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : 0,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 167
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 167
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 3,
                            "imm" : 0
                        }
                    ]
                }
            }
        },
        {
            "arch" : 1,
            "id" : 349,
            "address" : 52,
            "bytes" : [ 0, 64, 33, 75 ],
            "mnemonic" : "sub",
            "op_str" : "w0, w0, w1, uxtw",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : 0,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 166
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 166
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 3,
                            "type" : 1,
                            "reg" : 167
                        }
                    ]
                }
            }
        },
        {
            "arch" : 1,
            "id" : 170,
            "address" : 56,
            "bytes" : [ 225, 11, 64, 185 ],
            "mnemonic" : "ldr",
            "op_str" : "w1, [sp, #8]",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : 0,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 167
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 5,
                            "mem" : { "base" : 4, "index" : 0, "disp" : 8 }
                        }
                    ]
                }
            }
        },
        {
            "arch" : 1,
            "id" : 58,
            "address" : 60,
            "bytes" : [ 32, 4, 129, 218 ],
            "mnemonic" : "csneg",
            "op_str" : "x0, x1, x1, eq",
            "detail" : {
                "regs_read" : [ 1 ],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : 1,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 197
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 198
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 198
                        }
                    ]
                }
            }
        },
        {
            "arch" : 1,
            "id" : 7,
            "address" : 64,
            "bytes" : [ 32, 8, 2, 139 ],
            "mnemonic" : "add",
            "op_str" : "x0, x1, x2, lsl #2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "arm64" : {
                    "cc" : 0,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 197
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 198
                        },
                        {
                            "shift" : { "type" : 1, "value" : 2 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 199
                        }
                    ]
                }
            }
        }
    ];


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.reg_name(capstone.arm64.REG_X30);
        cs.close();
        expect(output).toEqual("x30");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.insn_name(capstone.arm64.INS_NGC);
        cs.close();
        expect(output).toEqual("ngc");
    });

    it("can be disassembled", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.disasm(CODE_ARM64, 0x2c);
        cs.close();
        expect(output).toEqual(EXPECT_ARM64);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.disasm_lite(CODE_ARM64, 0x2c);
        cs.close();
        expect(output).toEqual(EXPECT_ARM64_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        cs.detail = true;
        var output = cs.disasm(CODE_ARM64, 0x2c);
        cs.close();
        expect(output).toEqual(EXPECT_ARM64_DETAIL);
    });
});
