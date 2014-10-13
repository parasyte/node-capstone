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
            "id" : 195,
            "address" : 44,
            "bytes" : [ 33, 124, 2, 155 ],
            "mnemonic" : "mul",
            "op_str" : "x1, x1, x2"
        },
        {
            "arch" : 1,
            "id" : 184,
            "address" : 48,
            "bytes" : [ 33, 124, 0, 83 ],
            "mnemonic" : "lsr",
            "op_str" : "w1, w1, #0"
        },
        {
            "arch" : 1,
            "id" : 340,
            "address" : 52,
            "bytes" : [ 0, 64, 33, 75 ],
            "mnemonic" : "sub",
            "op_str" : "w0, w0, w1, uxtw"
        },
        {
            "arch" : 1,
            "id" : 162,
            "address" : 56,
            "bytes" : [ 225, 11, 64, 185 ],
            "mnemonic" : "ldr",
            "op_str" : "w1, [sp, #8]"
        },
        {
            "arch" : 1,
            "id" : 440,
            "address" : 60,
            "bytes" : [ 32, 4, 129, 218 ],
            "mnemonic" : "cneg",
            "op_str" : "x0, x1, ne"
        },
        {
            "arch" : 1,
            "id" : 6,
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
        [ 60, 4, "cneg", "x0, x1, ne" ],
        [ 64, 4, "add", "x0, x1, x2, lsl #2" ]
    ];

    var EXPECT_ARM64_DETAIL = [
        {
            "arch" : 1,
            "id" : 195,
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
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 200
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 200
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 201
                        }
                    ]
                }
            }
        },
        {
            "arch" : 1,
            "id" : 184,
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
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 169
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 169
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
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
            "id" : 340,
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
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 168
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 168
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 3,
                            "type" : 1,
                            "reg" : 169
                        }
                    ]
                }
            }
        },
        {
            "arch" : 1,
            "id" : 162,
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
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 169
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
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
            "id" : 440,
            "address" : 60,
            "bytes" : [ 32, 4, 129, 218 ],
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
                            "type" : 1,
                            "reg" : 199
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 200
                        }
                    ]
                }
            }
        },
        {
            "arch" : 1,
            "id" : 6,
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
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 199
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 0, "value" : 0 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 200
                        },
                        {
                            "vector_index" : -1,
                            "vas" : 0,
                            "vess" : 0,
                            "shift" : { "type" : 1, "value" : 2 },
                            "ext" : 0,
                            "type" : 1,
                            "reg" : 201
                        }
                    ]
                }
            }
        }
    ];


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.reg_name(capstone.arm64.REG_V31);
        cs.close();
        expect(output).toEqual("v31");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.insn_name(capstone.arm64.INS_TLBI);
        cs.close();
        expect(output).toEqual("tlbi");
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
