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
            "arch" : 4,
            "id" : 347,
            "address" : 4096,
            "bytes" : [ 128, 32, 0, 0 ],
            "mnemonic" : "lwz",
            "op_str" : "r1, (0)"
        },
        {
            "arch" : 4,
            "id" : 347,
            "address" : 4100,
            "bytes" : [ 128, 63, 0, 0 ],
            "mnemonic" : "lwz",
            "op_str" : "r1, (r31)"
        },
        {
            "arch" : 4,
            "id" : 570,
            "address" : 4104,
            "bytes" : [ 16, 67, 35, 14 ],
            "mnemonic" : "vpkpx",
            "op_str" : "v2, v3, v4"
        },
        {
            "arch" : 4,
            "id" : 443,
            "address" : 4108,
            "bytes" : [ 208, 68, 0, 128 ],
            "mnemonic" : "stfs",
            "op_str" : "f2, 0x80(r4)"
        },
        {
            "arch" : 4,
            "id" : 52,
            "address" : 4112,
            "bytes" : [ 76, 67, 34, 2 ],
            "mnemonic" : "crand",
            "op_str" : "2, 3, 4"
        },
        {
            "arch" : 4,
            "id" : 47,
            "address" : 4116,
            "bytes" : [ 45, 3, 0, 128 ],
            "mnemonic" : "cmpwi",
            "op_str" : "cr2, r3, 0x80"
        },
        {
            "arch" : 4,
            "id" : 2,
            "address" : 4120,
            "bytes" : [ 124, 67, 32, 20 ],
            "mnemonic" : "addc",
            "op_str" : "r2, r3, r4"
        },
        {
            "arch" : 4,
            "id" : 384,
            "address" : 4124,
            "bytes" : [ 124, 67, 32, 147 ],
            "mnemonic" : "mulhd.",
            "op_str" : "r2, r3, r4"
        },
        {
            "arch" : 4,
            "id" : 28,
            "address" : 4128,
            "bytes" : [ 79, 32, 0, 33 ],
            "mnemonic" : "bdnzlrl+",
            "op_str" : ""
        },
        {
            "arch" : 4,
            "id" : 38,
            "address" : 4132,
            "bytes" : [ 76, 200, 0, 33 ],
            "mnemonic" : "bgelrl-",
            "op_str" : "cr2"
        }
    ];

    var EXPECT_PPC_LITE = [
        [ 4096, 4, "lwz", "r1, (0)" ],
        [ 4100, 4, "lwz", "r1, (r31)" ],
        [ 4104, 4, "vpkpx", "v2, v3, v4" ],
        [ 4108, 4, "stfs", "f2, 0x80(r4)" ],
        [ 4112, 4, "crand", "2, 3, 4" ],
        [ 4116, 4, "cmpwi", "cr2, r3, 0x80" ],
        [ 4120, 4, "addc", "r2, r3, r4" ],
        [ 4124, 4, "mulhd.", "r2, r3, r4" ],
        [ 4128, 4, "bdnzlrl+", "" ],
        [ 4132, 4, "bgelrl-", "cr2" ]
    ];

    var EXPECT_PPC_DETAIL = [
        {
            "arch" : 4,
            "id" : 347,
            "address" : 4096,
            "bytes" : [ 128, 32, 0, 0 ],
            "mnemonic" : "lwz",
            "op_str" : "r1, (0)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        { "type" : 1, "reg" : 46 },
                        { "type" : 3, "mem" : { "base" : 45, "disp" : 0 } }
                    ]
                }
            }
        },
        {
            "arch" : 4,
            "id" : 347,
            "address" : 4100,
            "bytes" : [ 128, 63, 0, 0 ],
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
                        { "type" : 1, "reg" : 46 },
                        { "type" : 3, "mem" : { "base" : 76, "disp" : 0 } }
                    ]
                }
            }
        },
        {
            "arch" : 4,
            "id" : 570,
            "address" : 4104,
            "bytes" : [ 16, 67, 35, 14 ],
            "mnemonic" : "vpkpx",
            "op_str" : "v2, v3, v4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 1 ],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        { "type" : 1, "reg" : 79 },
                        { "type" : 1, "reg" : 80 },
                        { "type" : 1, "reg" : 81 }
                    ]
                }
            }
        },
        {
            "arch" : 4,
            "id" : 443,
            "address" : 4108,
            "bytes" : [ 208, 68, 0, 128 ],
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
                        { "type" : 1, "reg" : 14 },
                        { "type" : 3, "mem" : { "base" : 49, "disp" : 128 } }
                    ]
                }
            }
        },
        {
            "arch" : 4,
            "id" : 52,
            "address" : 4112,
            "bytes" : [ 76, 67, 34, 2 ],
            "mnemonic" : "crand",
            "op_str" : "2, 3, 4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        { "type" : 1, "reg" : 47 },
                        { "type" : 1, "reg" : 48 },
                        { "type" : 1, "reg" : 49 }
                    ]
                }
            }
        },
        {
            "arch" : 4,
            "id" : 47,
            "address" : 4116,
            "bytes" : [ 45, 3, 0, 128 ],
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
                        { "type" : 1, "reg" : 5 },
                        { "type" : 1, "reg" : 48 },
                        { "type" : 2, "imm" : 128 }
                    ]
                }
            }
        },
        {
            "arch" : 4,
            "id" : 2,
            "address" : 4120,
            "bytes" : [ 124, 67, 32, 20 ],
            "mnemonic" : "addc",
            "op_str" : "r2, r3, r4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ 1 ],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : false,
                    "operands" : [
                        { "type" : 1, "reg" : 47 },
                        { "type" : 1, "reg" : 48 },
                        { "type" : 1, "reg" : 49 }
                    ]
                }
            }
        },
        {
            "arch" : 4,
            "id" : 384,
            "address" : 4124,
            "bytes" : [ 124, 67, 32, 147 ],
            "mnemonic" : "mulhd.",
            "op_str" : "r2, r3, r4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ 3 ],
                "groups" : [],
                "ppc" : {
                    "bc" : 0,
                    "bh" : 0,
                    "update_cr0" : true,
                    "operands" : [
                        { "type" : 1, "reg" : 47 },
                        { "type" : 1, "reg" : 48 },
                        { "type" : 1, "reg" : 49 }
                    ]
                }
            }
        },
        {
            "arch" : 4,
            "id" : 28,
            "address" : 4128,
            "bytes" : [ 79, 32, 0, 33 ],
            "mnemonic" : "bdnzlrl+",
            "op_str" : "",
            "detail" : {
                "regs_read" : [ 11, 44, 174 ],
                "regs_write" : [ 11 ],
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
            "arch" : 4,
            "id" : 38,
            "address" : 4132,
            "bytes" : [ 76, 200, 0, 33 ],
            "mnemonic" : "bgelrl-",
            "op_str" : "cr2",
            "detail" : {
                "regs_read" : [ 11, 44, 174 ],
                "regs_write" : [ 44, 11 ],
                "groups" : [],
                "ppc" : {
                    "bc" : 4,
                    "bh" : 2,
                    "update_cr0" : false,
                    "operands" : [
                        { "type" : 1, "reg" : 5 }
                    ]
                }
            }
        }
    ];


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        var output = cs.reg_name(capstone.ppc.REG_CR1EQ);
        cs.close();
        expect(output).toEqual("cr1eq");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        var output = cs.insn_name(capstone.ppc.INS_BDZFLRL);
        cs.close();
        expect(output).toEqual("bdzflrl");
    });

    it("can be disassembled", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm(CODE_PPC, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_PPC);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm_lite(CODE_PPC, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_PPC_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        cs.detail = true;
        var output = cs.disasm(CODE_PPC, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_PPC_DETAIL);
    });
});
