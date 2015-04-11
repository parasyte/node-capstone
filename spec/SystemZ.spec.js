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
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_ADB,
            "address" : 0x1000,
            "bytes" : [ 0xed, 0x00, 0x00, 0x00, 0x00, 0x1a ],
            "mnemonic" : "adb",
            "op_str" : "%f0, 0"
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_A,
            "address" : 0x1006,
            "bytes" : [ 0x5a, 0x0f, 0x1f, 0xff ],
            "mnemonic" : "a",
            "op_str" : "%r0, 0xfff(%r15, %r1)"
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_AFI,
            "address" : 0x100a,
            "bytes" : [ 0xc2, 0x09, 0x80, 0x00, 0x00, 0x00 ],
            "mnemonic" : "afi",
            "op_str" : "%r0, -0x80000000"
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_BR,
            "address" : 0x1010,
            "bytes" : [ 0x07, 0xf7 ],
            "mnemonic" : "br",
            "op_str" : "%r7"
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_XIY,
            "address" : 0x1012,
            "bytes" : [ 0xeb, 0x2a, 0xff, 0xff, 0x7f, 0x57 ],
            "mnemonic" : "xiy",
            "op_str" : "0x7ffff(%r15), 0x2a"
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_XY,
            "address" : 0x1018,
            "bytes" : [ 0xe3, 0x01, 0xff, 0xff, 0x7f, 0x57 ],
            "mnemonic" : "xy",
            "op_str" : "%r0, 0x7ffff(%r1, %r15)"
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_STMG,
            "address" : 0x101e,
            "bytes" : [ 0xeb, 0x00, 0xf0, 0x00, 0x00, 0x24 ],
            "mnemonic" : "stmg",
            "op_str" : "%r0, %r0, 0(%r15)"
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_EAR,
            "address" : 0x1024,
            "bytes" : [ 0xb2, 0x4f, 0x00, 0x78 ],
            "mnemonic" : "ear",
            "op_str" : "%r7, %a8"
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_CLIJE,
            "address" : 0x1028,
            "bytes" : [ 0xec, 0x18, 0x00, 0x00, 0xc1, 0x7f ],
            "mnemonic" : "clije",
            "op_str" : "%r1, 0xc1, 0x1028"
        }
    ];

    var EXPECT_SYSZ_LITE = [
        [ 0x1000, 6, "adb", "%f0, 0" ],
        [ 0x1006, 4, "a", "%r0, 0xfff(%r15, %r1)" ],
        [ 0x100a, 6, "afi", "%r0, -0x80000000" ],
        [ 0x1010, 2, "br", "%r7" ],
        [ 0x1012, 6, "xiy", "0x7ffff(%r15), 0x2a" ],
        [ 0x1018, 6, "xy", "%r0, 0x7ffff(%r1, %r15)" ],
        [ 0x101e, 6, "stmg", "%r0, %r0, 0(%r15)" ],
        [ 0x1024, 4, "ear", "%r7, %a8" ],
        [ 0x1028, 6, "clije", "%r1, 0xc1, 0x1028" ]
    ];

    var EXPECT_SYSZ_DETAIL = [
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_ADB,
            "address" : 0x1000,
            "bytes" : [ 0xed, 0x00, 0x00, 0x00, 0x00, 0x1a ],
            "mnemonic" : "adb",
            "op_str" : "%f0, 0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ capstone.sysz.REG_CC ],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sysz.OP_REG,
                            "reg" : capstone.sysz.REG_F0,
                        },
                        {
                            "type" : capstone.sysz.OP_IMM,
                            "imm" : 0,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_A,
            "address" : 0x1006,
            "bytes" : [ 0x5a, 0x0f, 0x1f, 0xff ],
            "mnemonic" : "a",
            "op_str" : "%r0, 0xfff(%r15, %r1)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ capstone.sysz.REG_CC ],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sysz.OP_REG,
                            "reg" : capstone.sysz.REG_0,
                        },
                        {
                            "type" : capstone.sysz.OP_MEM,
                            "mem" : {
                                "base" : capstone.sysz.REG_1,
                                "index" : capstone.sysz.REG_15,
                                "length" : 0,
                                "disp" : 0xfff,
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_AFI,
            "address" : 0x100a,
            "bytes" : [ 0xc2, 0x09, 0x80, 0x00, 0x00, 0x00 ],
            "mnemonic" : "afi",
            "op_str" : "%r0, -0x80000000",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ capstone.sysz.REG_CC ],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sysz.OP_REG,
                            "reg" : capstone.sysz.REG_0,
                        },
                        {
                            "type" : capstone.sysz.OP_IMM,
                            "imm" : -0x80000000,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_BR,
            "address" : 0x1010,
            "bytes" : [ 0x07, 0xf7 ],
            "mnemonic" : "br",
            "op_str" : "%r7",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.sysz.GRP_JUMP ],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sysz.OP_REG,
                            "reg" : capstone.sysz.REG_7,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_XIY,
            "address" : 0x1012,
            "bytes" : [ 0xeb, 0x2a, 0xff, 0xff, 0x7f, 0x57 ],
            "mnemonic" : "xiy",
            "op_str" : "0x7ffff(%r15), 0x2a",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ capstone.sysz.REG_CC ],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sysz.OP_MEM,
                            "mem" : {
                                "base" : capstone.sysz.REG_15,
                                "index" : 0,
                                "length" : 0,
                                "disp" : 0x7ffff,
                            }
                        },
                        {
                            "type" : capstone.sysz.OP_IMM,
                            "imm" : 0x2a,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_XY,
            "address" : 0x1018,
            "bytes" : [ 0xe3, 0x01, 0xff, 0xff, 0x7f, 0x57 ],
            "mnemonic" : "xy",
            "op_str" : "%r0, 0x7ffff(%r1, %r15)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ capstone.sysz.REG_CC ],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sysz.OP_REG,
                            "reg" : capstone.sysz.REG_0,
                        },
                        {
                            "type" : capstone.sysz.OP_MEM,
                            "mem" : {
                                "base" : capstone.sysz.REG_15,
                                "index" : capstone.sysz.REG_1,
                                "length" : 0,
                                "disp" : 0x7ffff,
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_STMG,
            "address" : 0x101e,
            "bytes" : [ 0xeb, 0x00, 0xf0, 0x00, 0x00, 0x24 ],
            "mnemonic" : "stmg",
            "op_str" : "%r0, %r0, 0(%r15)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sysz.OP_REG,
                            "reg" : capstone.sysz.REG_0,
                        },
                        {
                            "type" : capstone.sysz.OP_REG,
                            "reg" : capstone.sysz.REG_0,
                        },
                        {
                            "type" : capstone.sysz.OP_MEM,
                            "mem" : {
                                "base" : capstone.sysz.REG_15,
                                "index" : 0,
                                "length" : 0,
                                "disp" : 0,
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_EAR,
            "address" : 0x1024,
            "bytes" : [ 0xb2, 0x4f, 0x00, 0x78 ],
            "mnemonic" : "ear",
            "op_str" : "%r7, %a8",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sysz.OP_REG,
                            "reg" : capstone.sysz.REG_7,
                        },
                        {
                            "type" : capstone.sysz.OP_ACREG,
                            "reg" : 8,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SYSZ,
            "id" : capstone.sysz.INS_CLIJE,
            "address" : 0x1028,
            "bytes" : [ 0xec, 0x18, 0x00, 0x00, 0xc1, 0x7f ],
            "mnemonic" : "clije",
            "op_str" : "%r1, 0xc1, 0x1028",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sysz" : {
                    "cc" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sysz.OP_REG,
                            "reg" : capstone.sysz.REG_1,
                        },
                        {
                            "type" : capstone.sysz.OP_IMM,
                            "imm" : 193,
                        },
                        {
                            "type" : capstone.sysz.OP_IMM,
                            "imm" : 0x1028,
                        }
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
        expect(output).not.toBeDiff(EXPECT_SYSZ);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_SYSZ, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm_lite(CODE_SYSZ, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_SYSZ_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_SYSZ, capstone.MODE_BIG_ENDIAN);
        cs.detail = true;
        var output = cs.disasm(CODE_SYSZ, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_SYSZ_DETAIL);
    });
});
