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
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_CMP,
            "address" : 0x1000,
            "bytes" : [ 0x80, 0xa0, 0x40, 0x02 ],
            "mnemonic" : "cmp",
            "op_str" : "%g1, %g2"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_JMPL,
            "address" : 0x1004,
            "bytes" : [ 0x85, 0xc2, 0x60, 0x08 ],
            "mnemonic" : "jmpl",
            "op_str" : "%o1+8, %g2"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_RESTORE,
            "address" : 0x1008,
            "bytes" : [ 0x85, 0xe8, 0x20, 0x01 ],
            "mnemonic" : "restore",
            "op_str" : "%g0, 1, %g2"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_RESTORE,
            "address" : 0x100c,
            "bytes" : [ 0x81, 0xe8, 0x00, 0x00 ],
            "mnemonic" : "restore",
            "op_str" : ""
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_MOV,
            "address" : 0x1010,
            "bytes" : [ 0x90, 0x10, 0x20, 0x01 ],
            "mnemonic" : "mov",
            "op_str" : "1, %o0"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_CASX,
            "address" : 0x1014,
            "bytes" : [ 0xd5, 0xf6, 0x10, 0x16 ],
            "mnemonic" : "casx",
            "op_str" : "[%i0], %l6, %o2"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_SETHI,
            "address" : 0x1018,
            "bytes" : [ 0x21, 0x00, 0x00, 0x0a ],
            "mnemonic" : "sethi",
            "op_str" : "0xa, %l0"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_ADD,
            "address" : 0x101c,
            "bytes" : [ 0x86, 0x00, 0x40, 0x02 ],
            "mnemonic" : "add",
            "op_str" : "%g1, %g2, %g3"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_NOP,
            "address" : 0x1020,
            "bytes" : [ 0x01, 0x00, 0x00, 0x00 ],
            "mnemonic" : "nop",
            "op_str" : ""
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_B,
            "address" : 0x1024,
            "bytes" : [ 0x12, 0xbf, 0xff, 0xff ],
            "mnemonic" : "bne",
            "op_str" : "0x1001020"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_B,
            "address" : 0x1028,
            "bytes" : [ 0x10, 0xbf, 0xff, 0xff ],
            "mnemonic" : "ba",
            "op_str" : "0x1001024"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_ADD,
            "address" : 0x102c,
            "bytes" : [ 0xa0, 0x02, 0x00, 0x09 ],
            "mnemonic" : "add",
            "op_str" : "%o0, %o1, %l0"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_FB,
            "address" : 0x1030,
            "bytes" : [ 0x0d, 0xbf, 0xff, 0xff ],
            "mnemonic" : "fbg",
            "op_str" : "0x3fffff"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_ST,
            "address" : 0x1034,
            "bytes" : [ 0xd4, 0x20, 0x60, 0x00 ],
            "mnemonic" : "st",
            "op_str" : "%o2, [%g1]"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_LDSB,
            "address" : 0x1038,
            "bytes" : [ 0xd4, 0x4e, 0x00, 0x16 ],
            "mnemonic" : "ldsb",
            "op_str" : "[%i0+%l6], %o2"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_BRNZ,
            "address" : 0x103c,
            "bytes" : [ 0x2a, 0xc2, 0x80, 0x03 ],
            "mnemonic" : "brnz,a,pn",
            "op_str" : "%o2, 3"
        }
    ];

    var EXPECT_SPARC_LITE = [
        [ 0x1000, 4, "cmp", "%g1, %g2" ],
        [ 0x1004, 4, "jmpl", "%o1+8, %g2" ],
        [ 0x1008, 4, "restore", "%g0, 1, %g2" ],
        [ 0x100c, 4, "restore", "" ],
        [ 0x1010, 4, "mov", "1, %o0" ],
        [ 0x1014, 4, "casx", "[%i0], %l6, %o2" ],
        [ 0x1018, 4, "sethi", "0xa, %l0" ],
        [ 0x101c, 4, "add", "%g1, %g2, %g3" ],
        [ 0x1020, 4, "nop", "" ],
        [ 0x1024, 4, "bne", "0x1001020" ],
        [ 0x1028, 4, "ba", "0x1001024" ],
        [ 0x102c, 4, "add", "%o0, %o1, %l0" ],
        [ 0x1030, 4, "fbg", "0x3fffff" ],
        [ 0x1034, 4, "st", "%o2, [%g1]" ],
        [ 0x1038, 4, "ldsb", "[%i0+%l6], %o2" ],
        [ 0x103c, 4, "brnz,a,pn", "%o2, 3" ]
    ];

    var EXPECT_SPARC_DETAIL = [
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_CMP,
            "address" : 0x1000,
            "bytes" : [ 0x80, 0xa0, 0x40, 0x02 ],
            "mnemonic" : "cmp",
            "op_str" : "%g1, %g2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ capstone.sparc.REG_ICC ],
                "groups" : [],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_G1,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_G2,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_JMPL,
            "address" : 0x1004,
            "bytes" : [ 0x85, 0xc2, 0x60, 0x08 ],
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
                            "type" : capstone.sparc.OP_MEM,
                            "mem" : {
                                "base" : capstone.sparc.REG_O1,
                                "index" : 0,
                                "disp" : 8
                            }
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_G2,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_RESTORE,
            "address" : 0x1008,
            "bytes" : [ 0x85, 0xe8, 0x20, 0x01 ],
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
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_G0,
                        },
                        {
                            "type" : capstone.sparc.OP_IMM,
                            "imm" : 1,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_G2,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_RESTORE,
            "address" : 0x100c,
            "bytes" : [ 0x81, 0xe8, 0x00, 0x00 ],
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
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_MOV,
            "address" : 0x1010,
            "bytes" : [ 0x90, 0x10, 0x20, 0x01 ],
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
                        {
                            "type" : capstone.sparc.OP_IMM,
                            "imm" : 1,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_O0,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_CASX,
            "address" : 0x1014,
            "bytes" : [ 0xd5, 0xf6, 0x10, 0x16 ],
            "mnemonic" : "casx",
            "op_str" : "[%i0], %l6, %o2",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.sparc.GRP_64BIT ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sparc.OP_MEM,
                            "mem" : {
                                "base" : capstone.sparc.REG_I0,
                                "index" : 0,
                                "disp" : 0,
                            }
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_L6,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_O2,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_SETHI,
            "address" : 0x1018,
            "bytes" : [ 0x21, 0x00, 0x00, 0x0a ],
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
                        {
                            "type" : capstone.sparc.OP_IMM,
                            "imm" : 10,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_L0,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_ADD,
            "address" : 0x101c,
            "bytes" : [ 0x86, 0x00, 0x40, 0x02 ],
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
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_G1,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_G2,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_G3,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_NOP,
            "address" : 0x1020,
            "bytes" : [ 0x01, 0x00, 0x00, 0x00 ],
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
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_B,
            "address" : 0x1024,
            "bytes" : [ 0x12, 0xbf, 0xff, 0xff ],
            "mnemonic" : "bne",
            "op_str" : "0x1001020",
            "detail" : {
                "regs_read" : [ 69 ],
                "regs_write" : [],
                "groups" : [ capstone.sparc.GRP_JUMP ],
                "sparc" : {
                    "cc" : 265,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sparc.OP_IMM,
                            "imm" : 0x1001020,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_B,
            "address" : 0x1028,
            "bytes" : [ 0x10, 0xbf, 0xff, 0xff ],
            "mnemonic" : "ba",
            "op_str" : "0x1001024",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.sparc.GRP_JUMP ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sparc.OP_IMM,
                            "imm" : 0x1001024,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_ADD,
            "address" : 0x102c,
            "bytes" : [ 0xa0, 0x02, 0x00, 0x09 ],
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
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_O0,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_O1,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_L0,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_FB,
            "address" : 0x1030,
            "bytes" : [ 0x0d, 0xbf, 0xff, 0xff ],
            "mnemonic" : "fbg",
            "op_str" : "0x3fffff",
            "detail" : {
                "regs_read" : [ capstone.sparc.REG_FCC0 ],
                "regs_write" : [],
                "groups" : [ capstone.sparc.GRP_JUMP ],
                "sparc" : {
                    "cc" : 278,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sparc.OP_IMM,
                            "imm" : 0x3fffff,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_ST,
            "address" : 0x1034,
            "bytes" : [ 0xd4, 0x20, 0x60, 0x00 ],
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
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_O2,
                        },
                        {
                            "type" : capstone.sparc.OP_MEM,
                            "mem" : {
                                "base" : capstone.sparc.REG_G1,
                                "index" : 0,
                                "disp" : 0,
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_LDSB,
            "address" : 0x1038,
            "bytes" : [ 0xd4, 0x4e, 0x00, 0x16 ],
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
                            "type" : capstone.sparc.OP_MEM,
                            "mem" : {
                                "base" : capstone.sparc.REG_I0,
                                "index" : capstone.sparc.REG_L6,
                                "disp" : 0,
                            }
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_O2,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_BRNZ,
            "address" : 0x103c,
            "bytes" : [ 0x2a, 0xc2, 0x80, 0x03 ],
            "mnemonic" : "brnz,a,pn",
            "op_str" : "%o2, 3",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [
                    capstone.sparc.GRP_64BIT,
                    capstone.sparc.GRP_JUMP,
                ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 5,
                    "operands" : [
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_O2,
                        },
                        {
                            "type" : capstone.sparc.OP_IMM,
                            "imm" : 3,
                        }
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
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_FCMPS,
            "address" : 0x1000,
            "bytes" : [ 0x81, 0xa8, 0x0a, 0x24 ],
            "mnemonic" : "fcmps",
            "op_str" : "%f0, %f4"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_FSTOX,
            "address" : 0x1004,
            "bytes" : [ 0x89, 0xa0, 0x10, 0x20 ],
            "mnemonic" : "fstox",
            "op_str" : "%f0, %f4"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_FQTOI,
            "address" : 0x1008,
            "bytes" : [ 0x89, 0xa0, 0x1a, 0x60 ],
            "mnemonic" : "fqtoi",
            "op_str" : "%f0, %f4"
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_FNEGQ,
            "address" : 0x100c,
            "bytes" : [ 0x89, 0xa0, 0x00, 0xe0 ],
            "mnemonic" : "fnegq",
            "op_str" : "%f0, %f4"
        }
    ];

    var EXPECT_SPARCV9_LITE = [
        [ 0x1000, 4, "fcmps", "%f0, %f4" ],
        [ 0x1004, 4, "fstox", "%f0, %f4" ],
        [ 0x1008, 4, "fqtoi", "%f0, %f4" ],
        [ 0x100c, 4, "fnegq", "%f0, %f4" ]
    ];

    var EXPECT_SPARCV9_DETAIL = [
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_FCMPS,
            "address" : 0x1000,
            "bytes" : [ 0x81, 0xa8, 0x0a, 0x24 ],
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
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_F0,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_F4,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_FSTOX,
            "address" : 0x1004,
            "bytes" : [ 0x89, 0xa0, 0x10, 0x20 ],
            "mnemonic" : "fstox",
            "op_str" : "%f0, %f4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.sparc.GRP_64BIT ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_F0,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_F4,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_FQTOI,
            "address" : 0x1008,
            "bytes" : [ 0x89, 0xa0, 0x1a, 0x60 ],
            "mnemonic" : "fqtoi",
            "op_str" : "%f0, %f4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.sparc.GRP_HARDQUAD ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_F0,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_F4,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_SPARC,
            "id" : capstone.sparc.INS_FNEGQ,
            "address" : 0x100c,
            "bytes" : [ 0x89, 0xa0, 0x00, 0xe0 ],
            "mnemonic" : "fnegq",
            "op_str" : "%f0, %f4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.sparc.GRP_V9 ],
                "sparc" : {
                    "cc" : 0,
                    "hint" : 0,
                    "operands" : [
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_F0,
                        },
                        {
                            "type" : capstone.sparc.OP_REG,
                            "reg" : capstone.sparc.REG_F4,
                        }
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
