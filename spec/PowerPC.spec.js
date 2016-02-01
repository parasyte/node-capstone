describe("PPC", function () {
    var capstone = require("..");

    var CODE_PPC = new Buffer([
        0x80, 0x20, 0x00, 0x00, 0x80, 0x3f, 0x00, 0x00,
        0x10, 0x43, 0x23, 0x0e, 0xd0, 0x44, 0x00, 0x80,
        0x4c, 0x43, 0x22, 0x02, 0x2d, 0x03, 0x00, 0x80,
        0x7c, 0x43, 0x20, 0x14, 0x7c, 0x43, 0x20, 0x93,
        0x4f, 0x20, 0x00, 0x21, 0x4c, 0xc8, 0x00, 0x21
    ]);

    var EXPECT_PPC = [
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_LWZ,
            "address" : 0x1000,
            "bytes" : [ 0x80, 0x20, 0x00, 0x00 ],
            "mnemonic" : "lwz",
            "op_str" : "r1, (0)"
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_LWZ,
            "address" : 0x1004,
            "bytes" : [ 0x80, 0x3f, 0x00, 0x00 ],
            "mnemonic" : "lwz",
            "op_str" : "r1, (r31)"
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_VPKPX,
            "address" : 0x1008,
            "bytes" : [ 0x10, 0x43, 0x23, 0x0e ],
            "mnemonic" : "vpkpx",
            "op_str" : "v2, v3, v4"
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_STFS,
            "address" : 0x100c,
            "bytes" : [ 0xd0, 0x44, 0x00, 0x80 ],
            "mnemonic" : "stfs",
            "op_str" : "f2, 0x80(r4)"
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_CRAND,
            "address" : 0x1010,
            "bytes" : [ 0x4c, 0x43, 0x22, 0x02 ],
            "mnemonic" : "crand",
            "op_str" : "2, 3, 4"
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_CMPWI,
            "address" : 0x1014,
            "bytes" : [ 0x2d, 0x03, 0x00, 0x80 ],
            "mnemonic" : "cmpwi",
            "op_str" : "cr2, r3, 0x80"
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_ADDC,
            "address" : 0x1018,
            "bytes" : [ 0x7c, 0x43, 0x20, 0x14 ],
            "mnemonic" : "addc",
            "op_str" : "r2, r3, r4"
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_MULHD,
            "address" : 0x101c,
            "bytes" : [ 0x7c, 0x43, 0x20, 0x93 ],
            "mnemonic" : "mulhd.",
            "op_str" : "r2, r3, r4"
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_BDNZLRL,
            "address" : 0x1020,
            "bytes" : [ 0x4f, 0x20, 0x00, 0x21 ],
            "mnemonic" : "bdnzlrl+",
            "op_str" : ""
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_BLRL,
            "address" : 0x1024,
            "bytes" : [ 0x4c, 0xc8, 0x00, 0x21 ],
            "mnemonic" : "bgelrl-",
            "op_str" : "cr2"
        }
    ];

    var EXPECT_PPC_LITE = [
        [ 0x1000, 4, "lwz", "r1, (0)" ],
        [ 0x1004, 4, "lwz", "r1, (r31)" ],
        [ 0x1008, 4, "vpkpx", "v2, v3, v4" ],
        [ 0x100c, 4, "stfs", "f2, 0x80(r4)" ],
        [ 0x1010, 4, "crand", "2, 3, 4" ],
        [ 0x1014, 4, "cmpwi", "cr2, r3, 0x80" ],
        [ 0x1018, 4, "addc", "r2, r3, r4" ],
        [ 0x101c, 4, "mulhd.", "r2, r3, r4" ],
        [ 0x1020, 4, "bdnzlrl+", "" ],
        [ 0x1024, 4, "bgelrl-", "cr2" ]
    ];

    var EXPECT_PPC_DETAIL = [
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_LWZ,
            "address" : 0x1000,
            "bytes" : [ 0x80, 0x20, 0x00, 0x00 ],
            "mnemonic" : "lwz",
            "op_str" : "r1, (0)", // FIXME: registers should be prefixed with `r`
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R1,
                        },
                        {
                            "type" : capstone.ppc.OP_MEM,
                            "mem" : {
                                "base" : capstone.ppc.REG_R0,
                                "disp" : 0,
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_LWZ,
            "address" : 0x1004,
            "bytes" : [ 0x80, 0x3f, 0x00, 0x00 ],
            "mnemonic" : "lwz",
            "op_str" : "r1, (r31)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R1,
                        },
                        {
                            "type" : capstone.ppc.OP_MEM,
                            "mem" : {
                                "base" : capstone.ppc.REG_R31,
                                "disp" : 0,
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_VPKPX,
            "address" : 0x1008,
            "bytes" : [ 0x10, 0x43, 0x23, 0x0e ],
            "mnemonic" : "vpkpx",
            "op_str" : "v2, v3, v4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.ppc.GRP_ALTIVEC ],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_V2,
                        },
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_V3,
                        },
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_V4,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_STFS,
            "address" : 0x100c,
            "bytes" : [ 0xd0, 0x44, 0x00, 0x80 ],
            "mnemonic" : "stfs",
            "op_str" : "f2, 0x80(r4)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_F2,
                        },
                        {
                            "type" : capstone.ppc.OP_MEM,
                            "mem" : {
                                "base" : capstone.ppc.REG_R4,
                                "disp" : 0x80,
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_CRAND,
            "address" : 0x1010,
            "bytes" : [ 0x4c, 0x43, 0x22, 0x02 ],
            "mnemonic" : "crand",
            "op_str" : "2, 3, 4", // FIXME: registers should be prefixed with `r`
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R2,
                        },
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R3,
                        },
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R4,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_CMPWI,
            "address" : 0x1014,
            "bytes" : [ 0x2d, 0x03, 0x00, 0x80 ],
            "mnemonic" : "cmpwi",
            "op_str" : "cr2, r3, 0x80",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_CR2,
                        },
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R3,
                        },
                        {
                            "type" : capstone.ppc.OP_IMM,
                            "imm" : 0x80
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_ADDC,
            "address" : 0x1018,
            "bytes" : [ 0x7c, 0x43, 0x20, 0x14 ],
            "mnemonic" : "addc",
            "op_str" : "r2, r3, r4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ capstone.ppc.REG_CARRY ],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R2,
                        },
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R3,
                        },
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R4,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_MULHD,
            "address" : 0x101c,
            "bytes" : [ 0x7c, 0x43, 0x20, 0x93 ],
            "mnemonic" : "mulhd.",
            "op_str" : "r2, r3, r4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ capstone.ppc.REG_CR0 ],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : true,
                    "operands" : [
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R2,
                        },
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R3,
                        },
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_R4,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_BDNZLRL,
            "address" : 0x1020,
            "bytes" : [ 0x4f, 0x20, 0x00, 0x21 ],
            "mnemonic" : "bdnzlrl+",
            "op_str" : "",
            "detail" : {
                "regs_read" : [
                    capstone.ppc.REG_CTR,
                    capstone.ppc.REG_LR,
                    capstone.ppc.REG_RM,
                ],
                "regs_write" : [ capstone.ppc.REG_CTR ],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 1,
                    "update_cr0" : false,
                    "operands" : []
                }
            }
        },
        {
            "arch" : capstone.ARCH_PPC,
            "id" : capstone.ppc.INS_BLRL,
            "address" : 0x1024,
            "bytes" : [ 0x4c, 0xc8, 0x00, 0x21 ],
            "mnemonic" : "bgelrl-",
            "op_str" : "cr2",
            "detail" : {
                "regs_read" : [
                    capstone.ppc.REG_CTR,
                    capstone.ppc.REG_LR,
                    capstone.ppc.REG_RM,
                ],
                "regs_write" : [
                    capstone.ppc.REG_LR,
                    capstone.ppc.REG_CTR,
                ],
                "groups" : [],
                "ppc" : {
                    "bc" : 4,
                    "bh" : 2,
                    "update_cr0" : false,
                    "operands" : [
                        {
                            "type" : capstone.ppc.OP_REG,
                            "reg" : capstone.ppc.REG_CR2,
                        }
                    ]
                }
            }
        }
    ];


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        var output = cs.reg_name(capstone.ppc.REG_CR1EQ);
        expect(output).toEqual("cr1eq");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        var output = cs.insn_name(capstone.ppc.INS_BDZFLRL);
        expect(output).toEqual("bdzflrl");
    });

    it("can be disassembled", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm(CODE_PPC, 0x1000);
        expect(output).not.toBeDiff(EXPECT_PPC);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm_lite(CODE_PPC, 0x1000);
        expect(output).not.toBeDiff(EXPECT_PPC_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        cs.detail = true;
        var output = cs.disasm(CODE_PPC, 0x1000);
        expect(output).not.toBeDiff(EXPECT_PPC_DETAIL);
    });
});
