describe("MIPS", function () {
    var capstone = require("..");

    var CODE_MIPS = new Buffer([
        0x0c, 0x10, 0x00, 0x97, 0x00, 0x00, 0x00, 0x00,
        0x24, 0x02, 0x00, 0x0c, 0x8f, 0xa2, 0x00, 0x00,
        0x34, 0x21, 0x34, 0x56
    ]);

    var EXPECT_MIPS = [
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_JAL,
            "address" : 0x1000,
            "bytes" : [ 0x0c, 0x10, 0x00, 0x97 ],
            "mnemonic" : "jal",
            "op_str" : "0x40025c"
        },
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_NOP,
            "address" : 0x1004,
            "bytes" : [ 0x00, 0x00, 0x00, 0x00 ],
            "mnemonic" : "nop",
            "op_str" : ""
        },
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_ADDIU,
            "address" : 0x1008,
            "bytes" : [ 0x24, 0x02, 0x00, 0x0c ],
            "mnemonic" : "addiu",
            "op_str" : "$v0, $zero, 0xc"
        },
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_LW,
            "address" : 0x100c,
            "bytes" : [ 0x8f, 0xa2, 0x00, 0x00 ],
            "mnemonic" : "lw",
            "op_str" : "$v0, ($sp)"
        },
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_ORI,
            "address" : 0x1010,
            "bytes" : [ 0x34, 0x21, 0x34, 0x56 ],
            "mnemonic" : "ori",
            "op_str" : "$at, $at, 0x3456"
        }
    ];

    var EXPECT_MIPS_LITE = [
        [ 0x1000, 4, "jal", "0x40025c" ],
        [ 0x1004, 4, "nop", "" ],
        [ 0x1008, 4, "addiu", "$v0, $zero, 0xc" ],
        [ 0x100c, 4, "lw", "$v0, ($sp)" ],
        [ 0x1010, 4, "ori", "$at, $at, 0x3456" ]
    ];

    var EXPECT_MIPS_DETAIL = [
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_JAL,
            "address" : 0x1000,
            "bytes" : [ 0x0c, 0x10, 0x00, 0x97 ],
            "mnemonic" : "jal",
            "op_str" : "0x40025c",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ capstone.mips.REG_RA ],
                "groups" : [ capstone.mips.GRP_STDENC ],
                "mips" : {
                    "operands" : [
                        { "type" : capstone.mips.OP_IMM, "imm" : 0x40025c }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_NOP,
            "address" : 0x1004,
            "bytes" : [ 0x00, 0x00, 0x00, 0x00 ],
            "mnemonic" : "nop",
            "op_str" : "",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.mips.GRP_STDENC ],
                "mips" : {
                    "operands" : []
                }
            }
        },
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_ADDIU,
            "address" : 0x1008,
            "bytes" : [ 0x24, 0x02, 0x00, 0x0c ],
            "mnemonic" : "addiu",
            "op_str" : "$v0, $zero, 0xc",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.mips.GRP_STDENC ],
                "mips" : {
                    "operands" : [
                        {
                            "type" : capstone.mips.OP_REG,
                            "reg" : capstone.mips.REG_V0,
                        },
                        {
                            "type" : capstone.mips.OP_REG,
                            "reg" : capstone.mips.REG_ZERO,
                        },
                        { "type" : capstone.mips.OP_IMM, "imm" : 12 }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_LW,
            "address" : 0x100c,
            "bytes" : [ 0x8f, 0xa2, 0x00, 0x00 ],
            "mnemonic" : "lw",
            "op_str" : "$v0, ($sp)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.mips.GRP_STDENC ],
                "mips" : {
                    "operands" : [
                        {
                            "type" : capstone.mips.OP_REG,
                            "reg" : capstone.mips.REG_V0,
                        },
                        {
                            "type" : capstone.mips.OP_MEM,
                            "mem" : {
                                "base" : capstone.mips.REG_SP,
                                "disp" : 0,
                            }
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_ORI,
            "address" : 0x1010,
            "bytes" : [ 0x34, 0x21, 0x34, 0x56 ],
            "mnemonic" : "ori",
            "op_str" : "$at, $at, 0x3456",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.mips.GRP_STDENC ],
                "mips" : {
                    "operands" : [
                        {
                            "type" : capstone.mips.OP_REG,
                            "reg" : capstone.mips.REG_AT,
                        },
                        {
                            "type" : capstone.mips.OP_REG,
                            "reg" : capstone.mips.REG_AT,
                        },
                        { "type" : capstone.mips.OP_IMM, "imm" : 0x3456 }
                    ]
                }
            }
        }
    ];


    var CODE_MIPS_LE = new Buffer([
        0x56, 0x34, 0x21, 0x34, 0xc2, 0x17, 0x01, 0x00
    ]);

    var EXPECT_MIPS_LE = [
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_ORI,
            "address" : 0x1000,
            "bytes" : [ 0x56, 0x34, 0x21, 0x34 ],
            "mnemonic" : "ori",
            "op_str" : "$at, $at, 0x3456"
        },
        {
            "arch" : capstone.ARCH_MIPS,
            "id" : capstone.mips.INS_SRL,
            "address" : 0x1004,
            "bytes" : [ 0xc2, 0x17, 0x01, 0x00 ],
            "mnemonic" : "srl",
            "op_str" : "$v0, $at, 0x1f"
        }
    ];


    var CODE_MIPS_SKIPDATA = new Buffer([
        0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF
    ]);

    var EXPECT_MIPS_SKIPDATA = [
        [ 0x1000, 4, "nop", "" ],
        [ 0x1004, 4, ".db", "0xff, 0xff, 0xff, 0xff" ]
    ];

    var EXPECT_MIPS_SKIPDATA_CB = {
        "code" : [ 0xFF, 0xFF, 0xFF, 0xFF ],
        "user" : {
            "foo" : "bar"
        }
    };


    it("can print the correct register", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        var output = cs.reg_name(capstone.mips.REG_MPL2);
        expect(output).toEqual("mpl2");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        var output = cs.insn_name(capstone.mips.INS_JR_HB);
        expect(output).toEqual("jr.hb");
    });

    it("can disassemble big endian", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        var output = cs.disasm(CODE_MIPS, 0x1000);
        expect(output).not.toBeDiff(EXPECT_MIPS);
    });

    it("can disassemble big endian quickly", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        var output = cs.disasm_lite(CODE_MIPS, 0x1000);
        expect(output).not.toBeDiff(EXPECT_MIPS_LITE);
    });

    it("can disassemble big endian with detail", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        cs.detail = true;
        var output = cs.disasm(CODE_MIPS, 0x1000);
        expect(output).not.toBeDiff(EXPECT_MIPS_DETAIL);
    });

    it("can disassemble little endian", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_64 | capstone.MODE_LITTLE_ENDIAN
        );
        var output = cs.disasm(CODE_MIPS_LE, 0x1000);
        expect(output).not.toBeDiff(EXPECT_MIPS_LE);
    });

    it("can disassemble with skipdata", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        cs.skipdata = new capstone.CsSkipdata(".db");
        var output = cs.disasm_lite(CODE_MIPS_SKIPDATA, 0x1000);
        expect(output).not.toBeDiff(EXPECT_MIPS_SKIPDATA);
    });

    it("can disassemble with skipdata callback", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );

        var cb_output = {};
        cs.skipdata = new capstone.CsSkipdata(
            ".db",
            function (code, code_size, offset, user) {
                if (code_size - offset !== 4) {
                    throw new Error("Unexpected code_size: " + code_size);
                }
                cb_output.code = code.reinterpret(4, offset).toJSON().data;
                cb_output.user = user;
                return 4;
            },
            { "foo" : "bar" }
        );

        var output = cs.disasm_lite(CODE_MIPS_SKIPDATA, 0x1000);
        expect(output).not.toBeDiff(EXPECT_MIPS_SKIPDATA);
        expect(cb_output).not.toBeDiff(EXPECT_MIPS_SKIPDATA_CB);
    });
});
