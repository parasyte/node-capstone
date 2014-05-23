describe("ARM", function () {
    var capstone = require("..");

    var CODE_ARM = new Buffer([
        0xED, 0xFF, 0xFF, 0xEB, 0x04, 0xe0, 0x2d, 0xe5,
        0x00, 0x00, 0x00, 0x00, 0xe0, 0x83, 0x22, 0xe5,
        0xf1, 0x02, 0x03, 0x0e, 0x00, 0x00, 0xa0, 0xe3,
        0x02, 0x30, 0xc1, 0xe7, 0x00, 0x00, 0x53, 0xe3
    ]);

    var EXPECT_ARM = [
        {
            "arch" : 0,
            "id" : 13,
            "address" : 4096,
            "bytes" : [ 237, 255, 255, 235 ],
            "mnemonic" : "bl",
            "op_str" : "#0xfbc"
        },
        {
            "arch" : 0,
            "id" : 212,
            "address" : 4100,
            "bytes" : [ 4, 224, 45, 229 ],
            "mnemonic" : "str",
            "op_str" : "lr, [sp, #-4]!"
        },
        {
            "arch" : 0,
            "id" : 8,
            "address" : 4104,
            "bytes" : [ 0, 0, 0, 0 ],
            "mnemonic" : "andeq",
            "op_str" : "r0, r0, r0"
        },
        {
            "arch" : 0,
            "id" : 212,
            "address" : 4108,
            "bytes" : [ 224, 131, 34, 229 ],
            "mnemonic" : "str",
            "op_str" : "r8, [r2, #-0x3e0]!"
        },
        {
            "arch" : 0,
            "id" : 74,
            "address" : 4112,
            "bytes" : [ 241, 2, 3, 14 ],
            "mnemonic" : "mcreq",
            "op_str" : "p2, #0, r0, c3, c1, #7"
        },
        {
            "arch" : 0,
            "id" : 80,
            "address" : 4116,
            "bytes" : [ 0, 0, 160, 227 ],
            "mnemonic" : "mov",
            "op_str" : "r0, #0"
        },
        {
            "arch" : 0,
            "id" : 203,
            "address" : 4120,
            "bytes" : [ 2, 48, 193, 231 ],
            "mnemonic" : "strb",
            "op_str" : "r3, [r1, r2]"
        },
        {
            "arch" : 0,
            "id" : 23,
            "address" : 4124,
            "bytes" : [ 0, 0, 83, 227 ],
            "mnemonic" : "cmp",
            "op_str" : "r3, #0"
        }
    ];

    var EXPECT_ARM_LITE = [
        [ 4096, 4, "bl", "#0xfbc" ],
        [ 4100, 4, "str", "lr, [sp, #-4]!" ],
        [ 4104, 4, "andeq", "r0, r0, r0" ],
        [ 4108, 4, "str", "r8, [r2, #-0x3e0]!" ],
        [ 4112, 4, "mcreq", "p2, #0, r0, c3, c1, #7" ],
        [ 4116, 4, "mov", "r0, #0"],
        [ 4120, 4, "strb", "r3, [r1, r2]" ],
        [ 4124, 4, "cmp", "r3, #0" ]
    ];

    var EXPECT_ARM_DETAIL = [
        {
            "arch" : 0,
            "id" : 13,
            "address" : 4096,
            "bytes" : [ 237, 255, 255, 235 ],
            "mnemonic" : "bl",
            "op_str" : "#0xfbc",
            "detail" : {
                "regs_read" : [ 12 ],
                "regs_write" : [ 10 ],
                "groups" : [ 20 ],
                "arm" : {
                    "cc" : 0,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 4,
                            "imm" : 4028
                        }
                    ]
                }
            }
        },
        {
            "arch" : 0,
            "id" : 212,
            "address" : 4100,
            "bytes" : [ 4, 224, 45, 229 ],
            "mnemonic" : "str",
            "op_str" : "lr, [sp, #-4]!",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 20 ],
                "arm" : {
                    "cc" : 15,
                    "update_flags" : false,
                    "writeback" : true,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 1,
                            "reg" : 10
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 6,
                            "mem" : {
                                "base" : 12,
                                "index" : 0,
                                "scale" : 1,
                                "disp" : -4
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : 0,
            "id" : 8,
            "address" : 4104,
            "bytes" : [ 0, 0, 0, 0 ],
            "mnemonic" : "andeq",
            "op_str" : "r0, r0, r0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 20 ],
                "arm" : {
                    "cc" : 1,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 1,
                            "reg" : 66
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 1,
                            "reg" : 66
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 1,
                            "reg" : 66
                        }
                    ]
                }
            }
        },
        {
            "arch" : 0,
            "id" : 212,
            "address" : 4108,
            "bytes" : [ 224, 131, 34, 229 ],
            "mnemonic" : "str",
            "op_str" : "r8, [r2, #-0x3e0]!",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 20 ],
                "arm" : {
                    "cc" : 15,
                    "update_flags" : false,
                    "writeback" : true,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 1,
                            "reg" : 74
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 6,
                            "mem" : {
                                "base" : 68,
                                "index" : 0,
                                "scale" : 1,
                                "disp" : -992
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : 0,
            "id" : 74,
            "address" : 4112,
            "bytes" : [ 241, 2, 3, 14 ],
            "mnemonic" : "mcreq",
            "op_str" : "p2, #0, r0, c3, c1, #7",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 20 ],
                "arm" : {
                    "cc" : 1,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 3,
                            "imm" : 2
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 4,
                            "imm" : 0
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 1,
                            "reg" : 66
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 2,
                            "imm" : 3
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 2,
                            "imm" : 1
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 4,
                            "imm" : 7
                        }
                    ]
                }
            }
        },
        {
            "arch" : 0,
            "id" : 80,
            "address" : 4116,
            "bytes" : [ 0, 0, 160, 227 ],
            "mnemonic" : "mov",
            "op_str" : "r0, #0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 20 ],
                "arm" : {
                    "cc" : 15,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 1,
                            "reg" : 66
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 4,
                            "imm" : 0
                        }
                    ]
                }
            }
        },
        {
            "arch" : 0,
            "id" : 203,
            "address" : 4120,
            "bytes" : [ 2, 48, 193, 231 ],
            "mnemonic" : "strb",
            "op_str" : "r3, [r1, r2]",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 20 ],
                "arm" : {
                    "cc" : 15,
                    "update_flags" : false,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 1,
                            "reg" : 69
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 6,
                            "mem" : {
                                "base" : 67,
                                "index" : 68,
                                "scale" : 1,
                                "disp" : 0
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : 0,
            "id" : 23,
            "address" : 4124,
            "bytes" : [ 0, 0, 83, 227 ],
            "mnemonic" : "cmp",
            "op_str" : "r3, #0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ 3 ],
                "groups" : [ 20 ],
                "arm" : {
                    "cc" : 15,
                    "update_flags" : true,
                    "writeback" : false,
                    "operands" : [
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 1,
                            "reg" : 69
                        },
                        {
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : 4,
                            "imm" : 0
                        }
                    ]
                }
            }
        }
    ];

    /*
    var CODE_ARMTHUMB = new Buffer([
        0xd1, 0xe8, 0x00, 0xf0, 0xf0, 0x24, 0x04, 0x07,
        0x1f, 0x3c, 0xf2, 0xc0, 0x00, 0x00, 0x4f, 0xf0,
        0x00, 0x01, 0x46, 0x6c
    ]);
    var CODE_THUMB = new Buffer([
        0x70, 0x47, 0xeb, 0x46, 0x83, 0xb0, 0xc9, 0x68,
        0x1f, 0xb1
    ]);
    var CODE_THUMB2 = new Buffer([
        0x4f, 0xf0, 0x00, 0x01, 0xbd, 0xe8, 0x00, 0x88,
        0xd1, 0xe8, 0x00, 0xf0
    ]);
    */


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        var output = cs.reg_name(capstone.arm.REG_S31);
        cs.close();
        expect(output).toEqual("s31");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        var output = cs.insn_name(capstone.arm.INS_PUSH);
        cs.close();
        expect(output).toEqual("push");

    });

    it("can be disassembled", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        var output = cs.disasm(CODE_ARM, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_ARM);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        var output = cs.disasm_lite(CODE_ARM, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_ARM_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        cs.detail = true;
        var output = cs.disasm(CODE_ARM, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_ARM_DETAIL);
    });
});
