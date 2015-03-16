describe("Sparc", function () {
    var capstone = require("..");

    var CODE_SPARC = new Buffer([
        0x80, 0xa0, 0x40, 0x02, 0x85, 0xc2, 0x60, 0x08,
        0x85, 0xe8, 0x20, 0x01, 0x81, 0xe8, 0x00, 0x00,
        0x90, 0x10, 0x20, 0x01, 0xd5, 0xf6, 0x10, 0x16,
        0x21, 0x00, 0x00, 0x0a, 0x86, 0x00, 0x40, 0x02,
        0x01, 0x00, 0x00, 0x00, 0x12, 0xbf, 0xff, 0xff,
        0x10, 0xbf, 0xff, 0xff, 0xa0, 0x02, 0x00, 0x09,
        0x0d, 0xbf, 0xff, 0xff, 0xd4, 0x20, 0x60, 0x00,
        0xd4, 0x4e, 0x00, 0x16, 0x2a, 0xc2, 0x80, 0x03
    ]);

    var EXPECT_SPARC = [
        {
            "arch" : 5,
            "id" : 33,
            "address" : 4096,
            "bytes" : [ 128, 160, 64, 2 ],
            "mnemonic" : "cmp",
            "op_str" : "%g1, %g2"
        },
        {
            "arch" : 5,
            "id" : 194,
            "address" : 4100,
            "bytes" : [ 133, 194, 96, 8 ],
            "mnemonic" : "jmpl",
            "op_str" : "%o1+8, %g2"
        },
        {
            "arch" : 5,
            "id" : 226,
            "address" : 4104,
            "bytes" : [ 133, 232, 32, 1 ],
            "mnemonic" : "restore",
            "op_str" : "%g0, 1, %g2"
        },
        {
            "arch" : 5,
            "id" : 226,
            "address" : 4108,
            "bytes" : [ 129, 232, 0, 0 ],
            "mnemonic" : "restore",
            "op_str" : ""
        },
        {
            "arch" : 5,
            "id" : 207,
            "address" : 4112,
            "bytes" : [ 144, 16, 32, 1 ],
            "mnemonic" : "mov",
            "op_str" : "1, %o0"
        },
        {
            "arch" : 5,
            "id" : 28,
            "address" : 4116,
            "bytes" : [ 213, 246, 16, 22 ],
            "mnemonic" : "casx",
            "op_str" : "[%i0], %l6, %o2"
        },
        {
            "arch" : 5,
            "id" : 232,
            "address" : 4120,
            "bytes" : [ 33, 0, 0, 10 ],
            "mnemonic" : "sethi",
            "op_str" : "0xa, %l0"
        },
        {
            "arch" : 5,
            "id" : 6,
            "address" : 4124,
            "bytes" : [ 134, 0, 64, 2 ],
            "mnemonic" : "add",
            "op_str" : "%g1, %g2, %g3"
        },
        {
            "arch" : 5,
            "id" : 217,
            "address" : 4128,
            "bytes" : [ 1, 0, 0, 0 ],
            "mnemonic" : "nop",
            "op_str" : ""
        },
        {
            "arch" : 5,
            "id" : 16,
            "address" : 4132,
            "bytes" : [ 18, 191, 255, 255 ],
            "mnemonic" : "bne",
            "op_str" : "0x3fffff"
        },
        {
            "arch" : 5,
            "id" : 16,
            "address" : 4136,
            "bytes" : [ 16, 191, 255, 255 ],
            "mnemonic" : "ba",
            "op_str" : "0x3fffff"
        },
        {
            "arch" : 5,
            "id" : 6,
            "address" : 4140,
            "bytes" : [ 160, 2, 0, 9 ],
            "mnemonic" : "add",
            "op_str" : "%o0, %o1, %l0"
        },
        {
            "arch" : 5,
            "id" : 19,
            "address" : 4144,
            "bytes" : [ 13, 191, 255, 255 ],
            "mnemonic" : "fbg",
            "op_str" : "0x3fffff"
        },
        {
            "arch" : 5,
            "id" : 246,
            "address" : 4148,
            "bytes" : [ 212, 32, 96, 0 ],
            "mnemonic" : "st",
            "op_str" : "%o2, [%g1]"
        },
        {
            "arch" : 5,
            "id" : 198,
            "address" : 4152,
            "bytes" : [ 212, 78, 0, 22 ],
            "mnemonic" : "ldsb",
            "op_str" : "[%i0+%l6], %o2"
        },
        {
            "arch" : 5,
            "id" : 24,
            "address" : 4156,
            "bytes" : [ 42, 194, 128, 3 ],
            "mnemonic" : "brnz,a,pn",
            "op_str" : "%o2, 3"
        }
    ];

    var EXPECT_SPARC_LITE = [
        [ 4096, 4, "cmp", "%g1, %g2" ],
        [ 4100, 4, "jmpl", "%o1+8, %g2" ],
        [ 4104, 4, "restore", "%g0, 1, %g2" ],
        [ 4108, 4, "restore", "" ],
        [ 4112, 4, "mov", "1, %o0" ],
        [ 4116, 4, "casx", "[%i0], %l6, %o2" ],
        [ 4120, 4, "sethi", "0xa, %l0" ],
        [ 4124, 4, "add", "%g1, %g2, %g3" ],
        [ 4128, 4, "nop", "" ],
        [ 4132, 4, "bne", "0x3fffff" ],
        [ 4136, 4, "ba", "0x3fffff" ],
        [ 4140, 4, "add", "%o0, %o1, %l0" ],
        [ 4144, 4, "fbg", "0x3fffff" ],
        [ 4148, 4, "st", "%o2, [%g1]" ],
        [ 4152, 4, "ldsb", "[%i0+%l6], %o2" ],
        [ 4156, 4, "brnz,a,pn", "%o2, 3" ]
    ];

    var EXPECT_SPARC_DETAIL = [
        {
            "arch" : 5,
            "id" : 33,
            "address" : 4096,
            "bytes" : [ 128, 160, 64, 2 ],
            "mnemonic" : "cmp",
            "op_str" : "%g1, %g2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ 69 ],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 55 },
                        { "type" : 1, "reg" : 56 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 194,
            "address" : 4100,
            "bytes" : [ 133, 194, 96, 8 ],
            "mnemonic" : "jmpl",
            "op_str" : "%o1+8, %g2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : 3,
                            "mem" : { "base" : 79, "index" : 0, "disp" : 8 }
                        },
                        { "type" : 1, "reg" : 56 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 226,
            "address" : 4104,
            "bytes" : [ 133, 232, 32, 1 ],
            "mnemonic" : "restore",
            "op_str" : "%g0, 1, %g2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 54 },
                        { "type" : 2, "imm" : 1 },
                        { "type" : 1, "reg" : 56 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 226,
            "address" : 4108,
            "bytes" : [ 129, 232, 0, 0 ],
            "mnemonic" : "restore",
            "op_str" : "",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : []
                }
            }
        },
        {
            "arch" : 5,
            "id" : 207,
            "address" : 4112,
            "bytes" : [ 144, 16, 32, 1 ],
            "mnemonic" : "mov",
            "op_str" : "1, %o0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 2, "imm" : 1 },
                        { "type" : 1, "reg" : 78 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 28,
            "address" : 4116,
            "bytes" : [ 213, 246, 16, 22 ],
            "mnemonic" : "casx",
            "op_str" : "[%i0], %l6, %o2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 7 ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : 3,
                            "mem" : { "base" : 62, "index" : 0, "disp" : 0 }
                        },
                        { "type" : 1, "reg" : 76 },
                        { "type" : 1, "reg" : 80 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 232,
            "address" : 4120,
            "bytes" : [ 33, 0, 0, 10 ],
            "mnemonic" : "sethi",
            "op_str" : "0xa, %l0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 2, "imm" : 10 },
                        { "type" : 1, "reg" : 70 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 6,
            "address" : 4124,
            "bytes" : [ 134, 0, 64, 2 ],
            "mnemonic" : "add",
            "op_str" : "%g1, %g2, %g3",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 55 },
                        { "type" : 1, "reg" : 56 },
                        { "type" : 1, "reg" : 57 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 217,
            "address" : 4128,
            "bytes" : [ 1, 0, 0, 0 ],
            "mnemonic" : "nop",
            "op_str" : "",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : []
                }
            }
        },
        {
            "arch" : 5,
            "id" : 16,
            "address" : 4132,
            "bytes" : [ 18, 191, 255, 255 ],
            "mnemonic" : "bne",
            "op_str" : "0x3fffff",
            "detail" : {
                "regs_read" : [ 69 ],
                "regs_write" : [],
                "groups" : [ 8 ],
                "sparc" : {
                    "cc" : 265,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 2, "imm" : 4194303 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 16,
            "address" : 4136,
            "bytes" : [ 16, 191, 255, 255 ],
            "mnemonic" : "ba",
            "op_str" : "0x3fffff",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 8 ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 2, "imm" : 4194303 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 6,
            "address" : 4140,
            "bytes" : [ 160, 2, 0, 9 ],
            "mnemonic" : "add",
            "op_str" : "%o0, %o1, %l0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 78 },
                        { "type" : 1, "reg" : 79 },
                        { "type" : 1, "reg" : 70 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 19,
            "address" : 4144,
            "bytes" : [ 13, 191, 255, 255 ],
            "mnemonic" : "fbg",
            "op_str" : "0x3fffff",
            "detail" : {
                "regs_read" : [ 49 ],
                "regs_write" : [],
                "groups" : [ 8 ],
                "sparc" : {
                    "cc" : 278,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 2, "imm" : 4194303 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 246,
            "address" : 4148,
            "bytes" : [ 212, 32, 96, 0 ],
            "mnemonic" : "st",
            "op_str" : "%o2, [%g1]",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 80 },
                        {
                            "type" : 3,
                            "mem" : { "base" : 55, "index" : 0, "disp" : 0 }
                        }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 198,
            "address" : 4152,
            "bytes" : [ 212, 78, 0, 22 ],
            "mnemonic" : "ldsb",
            "op_str" : "[%i0+%l6], %o2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : 3,
                            "mem" : { "base" : 62, "index" : 76, "disp" : 0 }
                        },
                        { "type" : 1, "reg" : 80 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 24,
            "address" : 4156,
            "bytes" : [ 42, 194, 128, 3 ],
            "mnemonic" : "brnz,a,pn",
            "op_str" : "%o2, 3",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 7, 8 ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 5,
                    "operands" : [
                        { "type" : 1, "reg" : 80 },
                        { "type" : 2, "imm" : 3 }
                    ]
                }
            }
        }
    ];

    var CODE_SPARCV9 = new Buffer([
        0x81, 0xa8, 0x0a, 0x24, 0x89, 0xa0, 0x10, 0x20,
        0x89, 0xa0, 0x1a, 0x60, 0x89, 0xa0, 0x00, 0xe0
    ]);

    var EXPECT_SPARCV9 = [
        {
            "arch" : 5,
            "id" : 70,
            "address" : 4096,
            "bytes" : [ 129, 168, 10, 36 ],
            "mnemonic" : "fcmps",
            "op_str" : "%f0, %f4"
        },
        {
            "arch" : 5,
            "id" : 181,
            "address" : 4100,
            "bytes" : [ 137, 160, 16, 32 ],
            "mnemonic" : "fstox",
            "op_str" : "%f0, %f4"
        },
        {
            "arch" : 5,
            "id" : 159,
            "address" : 4104,
            "bytes" : [ 137, 160, 26, 96 ],
            "mnemonic" : "fqtoi",
            "op_str" : "%f0, %f4"
        },
        {
            "arch" : 5,
            "id" : 127,
            "address" : 4108,
            "bytes" : [ 137, 160, 0, 224 ],
            "mnemonic" : "fnegq",
            "op_str" : "%f0, %f4"
        }
    ];

    var EXPECT_SPARCV9_LITE = [
        [ 4096, 4, "fcmps", "%f0, %f4" ],
        [ 4100, 4, "fstox", "%f0, %f4" ],
        [ 4104, 4, "fqtoi", "%f0, %f4" ],
        [ 4108, 4, "fnegq", "%f0, %f4" ]
    ];

    var EXPECT_SPARCV9_DETAIL = [
        {
            "arch" : 5,
            "id" : 70,
            "address" : 4096,
            "bytes" : [ 129, 168, 10, 36 ],
            "mnemonic" : "fcmps",
            "op_str" : "%f0, %f4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 1 },
                        { "type" : 1, "reg" : 5 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 181,
            "address" : 4100,
            "bytes" : [ 137, 160, 16, 32 ],
            "mnemonic" : "fstox",
            "op_str" : "%f0, %f4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [
                    7
                ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 1 },
                        { "type" : 1, "reg" : 5 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 159,
            "address" : 4104,
            "bytes" : [ 137, 160, 26, 96 ],
            "mnemonic" : "fqtoi",
            "op_str" : "%f0, %f4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 1 ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 1 },
                        { "type" : 1, "reg" : 5 }
                    ]
                }
            }
        },
        {
            "arch" : 5,
            "id" : 127,
            "address" : 4108,
            "bytes" : [ 137, 160, 0, 224 ],
            "mnemonic" : "fnegq",
            "op_str" : "%f0, %f4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 2 ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        { "type" : 1, "reg" : 1 },
                        { "type" : 1, "reg" : 5 }
                    ]
                }
            }
        }
    ];


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_SPARC, capstone.MODE_BIG_ENDIAN);
        var output = cs.reg_name(capstone.sparc.REG_XCC);
        cs.close();
        expect(output).toEqual("xcc");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_SPARC, capstone.MODE_BIG_ENDIAN);
        var output = cs.insn_name(capstone.sparc.INS_RETL);
        cs.close();
        expect(output).toEqual("retl");
    });

    it("can be disassembled", function () {
        var cs = new capstone.Cs(capstone.ARCH_SPARC, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm(CODE_SPARC, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_SPARC);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_SPARC, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm_lite(CODE_SPARC, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_SPARC_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_SPARC, capstone.MODE_BIG_ENDIAN);
        cs.detail = true;
        var output = cs.disasm(CODE_SPARC, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_SPARC_DETAIL);
    });

    it("V9 can be disassembled", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_SPARC,
            capstone.MODE_BIG_ENDIAN | capstone.MODE_V9
        );
        var output = cs.disasm(CODE_SPARCV9, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_SPARCV9);
    });

    it("V9 can be disassembled quickly", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_SPARC,
            capstone.MODE_BIG_ENDIAN | capstone.MODE_V9
        );
        var output = cs.disasm_lite(CODE_SPARCV9, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_SPARCV9_LITE);
    });

    it("V9 can be disassembled with detail", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_SPARC,
            capstone.MODE_BIG_ENDIAN | capstone.MODE_V9
        );
        cs.detail = true;
        var output = cs.disasm(CODE_SPARCV9, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_SPARCV9_DETAIL);
    });
});
