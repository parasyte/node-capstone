describe("SystemZ", function () {
    var capstone = require("..");

    var CODE_SYSZ = new Buffer([
        0xed, 0x00, 0x00, 0x00, 0x00, 0x1a, 0x5a, 0x0f,
        0x1f, 0xff, 0xc2, 0x09, 0x80, 0x00, 0x00, 0x00,
        0x07, 0xf7, 0xeb, 0x2a, 0xff, 0xff, 0x7f, 0x57,
        0xe3, 0x01, 0xff, 0xff, 0x7f, 0x57, 0xeb, 0x00,
        0xf0, 0x00, 0x00, 0x24, 0xb2, 0x4f, 0x00, 0x78,
        0xec, 0x18, 0x00, 0x00, 0xc1, 0x7f
    ]);

    var EXPECT_SYSZ = [
        {
            "arch": 6,
            "id": 2,
            "address": 4096,
            "bytes": [ 237, 0, 0, 0, 0, 26 ],
            "mnemonic": "adb",
            "op_str": "%f0, 0"
        },
        {
            "arch": 6,
            "id": 1,
            "address": 4102,
            "bytes": [ 90, 15, 31, 255 ],
            "mnemonic": "a",
            "op_str": "%r0, 0xfff(%r15, %r1)"
        },
        {
            "arch": 6,
            "id": 6,
            "address": 4106,
            "bytes": [ 194, 9, 128, 0, 0, 0 ],
            "mnemonic": "afi",
            "op_str": "%r0, -0x80000000"
        },
        {
            "arch": 6,
            "id": 283,
            "address": 4112,
            "bytes": [ 7, 247 ],
            "mnemonic": "br",
            "op_str": "%r7"
        },
        {
            "arch": 6,
            "id": 675,
            "address": 4114,
            "bytes": [ 235, 42, 255, 255, 127, 87 ],
            "mnemonic": "xiy",
            "op_str": "0x7ffff(%r15), 0x2a"
        },
        {
            "arch": 6,
            "id": 678,
            "address": 4120,
            "bytes": [ 227, 1, 255, 255, 127, 87 ],
            "mnemonic": "xy",
            "op_str": "%r0, 0x7ffff(%r1, %r15)"
        },
        {
            "arch": 6,
            "id": 654,
            "address": 4126,
            "bytes": [ 235, 0, 240, 0, 0, 36 ],
            "mnemonic": "stmg",
            "op_str": "%r0, %r0, 0(%r15)"
        },
        {
            "arch": 6,
            "id": 383,
            "address": 4132,
            "bytes": [ 178, 79, 0, 120 ],
            "mnemonic": "ear",
            "op_str": "%r7, %a8"
        },
        {
            "arch": 6,
            "id": 94,
            "address": 4136,
            "bytes": [ 236, 24, 0, 0, 193, 127 ],
            "mnemonic": "clije",
            "op_str": "%r1, 0xc1, 0x1028"
        }
    ];

    var EXPECT_SYSZ_LITE = [
        [ 4096, 6, "adb", "%f0, 0" ],
        [ 4102, 4, "a", "%r0, 0xfff(%r15, %r1)" ],
        [ 4106, 6, "afi", "%r0, -0x80000000" ],
        [ 4112, 2, "br", "%r7" ],
        [ 4114, 6, "xiy", "0x7ffff(%r15), 0x2a" ],
        [ 4120, 6, "xy", "%r0, 0x7ffff(%r1, %r15)" ],
        [ 4126, 6, "stmg", "%r0, %r0, 0(%r15)" ],
        [ 4132, 4, "ear", "%r7, %a8" ],
        [ 4136, 6, "clije", "%r1, 0xc1, 0x1028" ]
    ];

    var EXPECT_SYSZ_DETAIL = [
        {
            "arch" : 6,
            "id" : 2,
            "address" : 4096,
            "bytes" : [ 237, 0, 0, 0, 0, 26 ],
            "mnemonic" : "adb",
            "op_str" : "%f0, 0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ 17 ],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 18 },
                        { "type" : 3, "imm" : 0 }
                    ]
                }
            }
        },
        {
            "arch" : 6,
            "id" : 1,
            "address" : 4102,
            "bytes" : [ 90, 15, 31, 255 ],
            "mnemonic" : "a",
            "op_str" : "%r0, 0xfff(%r15, %r1)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ 17 ],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 1 },
                        {
                            "type" : 4,
                            "mem" : {
                                "base" : 2,
                                "index" : 16,
                                "length" : 0,
                                "disp" : 4095
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : 6,
            "id" : 6,
            "address" : 4106,
            "bytes" : [ 194, 9, 128, 0, 0, 0 ],
            "mnemonic" : "afi",
            "op_str" : "%r0, -0x80000000",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ 17 ],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 1 },
                        { "type" : 3, "imm" : -2147483648 }
                    ]
                }
            }
        },
        {
            "arch" : 6,
            "id" : 283,
            "address" : 4112,
            "bytes" : [ 7, 247 ],
            "mnemonic" : "br",
            "op_str" : "%r7",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 6 ],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 8 }
                    ]
                }
            }
        },
        {
            "arch" : 6,
            "id" : 675,
            "address" : 4114,
            "bytes" : [ 235, 42, 255, 255, 127, 87 ],
            "mnemonic" : "xiy",
            "op_str" : "0x7ffff(%r15), 0x2a",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [
                    17
                ],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        {
                            "type" : 4,
                            "mem" : {
                                "base" : 16,
                                "index" : 0,
                                "length" : 0,
                                "disp" : 524287
                            }
                        },
                        { "type" : 3, "imm" : 42 }
                    ]
                }
            }
        },
        {
            "arch" : 6,
            "id" : 678,
            "address" : 4120,
            "bytes" : [ 227, 1, 255, 255, 127, 87 ],
            "mnemonic" : "xy",
            "op_str" : "%r0, 0x7ffff(%r1, %r15)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ 17 ],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 1 },
                        {
                            "type" : 4,
                            "mem" : {
                                "base" : 16,
                                "index" : 2,
                                "length" : 0,
                                "disp" : 524287
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : 6,
            "id" : 654,
            "address" : 4126,
            "bytes" : [ 235, 0, 240, 0, 0, 36 ],
            "mnemonic" : "stmg",
            "op_str" : "%r0, %r0, 0(%r15)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 1 },
                        { "type" : 1, "reg" : 1 },
                        {
                            "type" : 4,
                            "mem" : {
                                "base" : 16,
                                "index" : 0,
                                "length" : 0,
                                "disp" : 0
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : 6,
            "id" : 383,
            "address" : 4132,
            "bytes" : [ 178, 79, 0, 120 ],
            "mnemonic" : "ear",
            "op_str" : "%r7, %a8",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 8 },
                        { "type" : 2, "reg" : 8 }
                    ]
                }
            }
        },
        {
            "arch" : 6,
            "id" : 94,
            "address" : 4136,
            "bytes" : [ 236, 24, 0, 0, 193, 127 ],
            "mnemonic" : "clije",
            "op_str" : "%r1, 0xc1, 0x1028",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 2 },
                        { "type" : 3, "imm" : 193 },
                        { "type" : 3, "imm" : 4136 }
                    ]
                }
            }
        }
    ];


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_SYSZ, capstone.MODE_BIG_ENDIAN);
        var output = cs.reg_name(capstone.sysz.REG_R0L);
        cs.close();
        expect(output).toEqual("r0l");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_SYSZ, capstone.MODE_BIG_ENDIAN);
        var output = cs.insn_name(capstone.sysz.INS_XY);
        cs.close();
        expect(output).toEqual("xy");
    });

    it("can be disassembled", function () {
        var cs = new capstone.Cs(capstone.ARCH_SYSZ, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm(CODE_SYSZ, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_SYSZ);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_SYSZ, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm_lite(CODE_SYSZ, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_SYSZ_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_SYSZ, capstone.MODE_BIG_ENDIAN);
        cs.detail = true;
        var output = cs.disasm(CODE_SYSZ, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_SYSZ_DETAIL);
    });
});
