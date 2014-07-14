describe("MIPS", function () {
    var capstone = require("..");

    var CODE_MIPS = new Buffer([
        0x0C, 0x10, 0x00, 0x97, 0x00, 0x00, 0x00, 0x00,
        0x24, 0x02, 0x00, 0x0c, 0x8f, 0xa2, 0x00, 0x00,
        0x34, 0x21, 0x34, 0x56
    ]);

    var EXPECT_MIPS = [
        {
            "arch" : 2,
            "id" : 244,
            "address" : 4096,
            "bytes" : [ 12, 16, 0, 151 ],
            "mnemonic" : "jal",
            "op_str" : "0x40025c"
        },
        {
            "arch" : 2,
            "id" : 454,
            "address" : 4100,
            "bytes" : [ 0, 0, 0, 0 ],
            "mnemonic" : "nop",
            "op_str" : ""
        },
        {
            "arch" : 2,
            "id" : 20,
            "address" : 4104,
            "bytes" : [ 36, 2, 0, 12 ],
            "mnemonic" : "addiu",
            "op_str" : "$v0, $zero, 0xc"
        },
        {
            "arch" : 2,
            "id" : 267,
            "address" : 4108,
            "bytes" : [ 143, 162, 0, 0 ],
            "mnemonic" : "lw",
            "op_str" : "$v0, ($sp)"
        },
        {
            "arch" : 2,
            "id" : 339,
            "address" : 4112,
            "bytes" : [ 52, 33, 52, 86 ],
            "mnemonic" : "ori",
            "op_str" : "$at, $at, 0x3456"
        }
    ];

    var EXPECT_MIPS_LITE = [
        [ 4096, 4, "jal", "0x40025c" ],
        [ 4100, 4, "nop", "" ],
        [ 4104, 4, "addiu", "$v0, $zero, 0xc" ],
        [ 4108, 4, "lw", "$v0, ($sp)" ],
        [ 4112, 4, "ori", "$at, $at, 0x3456" ]
    ];

    var EXPECT_MIPS_DETAIL = [
        {
            "arch" : 2,
            "id" : 244,
            "address" : 4096,
            "bytes" : [ 12, 16, 0, 151 ],
            "mnemonic" : "jal",
            "op_str" : "0x40025c",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ 32 ],
                "groups" : [ 10 ],
                "mips" : {
                    "operands" : [
                        { "type" : 2, "imm" : 4194908 }
                    ]
                }
            }
        },
        {
            "arch" : 2,
            "id" : 454,
            "address" : 4100,
            "bytes" : [ 0, 0, 0, 0 ],
            "mnemonic" : "nop",
            "op_str" : "",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 10 ],
                "mips" : {
                    "operands" : []
                }
            }
        },
        {
            "arch" : 2,
            "id" : 20,
            "address" : 4104,
            "bytes" : [ 36, 2, 0, 12 ],
            "mnemonic" : "addiu",
            "op_str" : "$v0, $zero, 0xc",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 10 ],
                "mips" : {
                    "operands" : [
                        { "type" : 1, "reg" : 3 },
                        { "type" : 1, "reg" : 1 },
                        { "type" : 2, "imm" : 12 }
                    ]
                }
            }
        },
        {
            "arch" : 2,
            "id" : 267,
            "address" : 4108,
            "bytes" : [ 143, 162, 0, 0 ],
            "mnemonic" : "lw",
            "op_str" : "$v0, ($sp)",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 10 ],
                "mips" : {
                    "operands" : [
                        { "type" : 1, "reg" : 3 },
                        { "type" : 3, "mem" : { "base" : 30, "disp" : 0 } }
                    ]
                }
            }
        },
        {
            "arch" : 2,
            "id" : 339,
            "address" : 4112,
            "bytes" : [ 52, 33, 52, 86 ],
            "mnemonic" : "ori",
            "op_str" : "$at, $at, 0x3456",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ 10 ],
                "mips" : {
                    "operands" : [
                        { "type" : 1, "reg" : 2 },
                        { "type" : 1, "reg" : 2 },
                        { "type" : 2, "imm" : 13398 }
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
            "arch" : 2,
            "id" : 339,
            "address" : 4096,
            "bytes" : [ 86, 52, 33, 52 ],
            "mnemonic" : "ori",
            "op_str" : "$at, $at, 0x3456"
        },
        {
            "arch" : 2,
            "id" : 406,
            "address" : 4100,
            "bytes" : [ 194, 23, 1, 0 ],
            "mnemonic" : "srl",
            "op_str" : "$v0, $at, 0x1f"
        }
    ];


    var CODE_MIPS_SKIPDATA = new Buffer([
        0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF
    ]);

    var EXPECT_MIPS_SKIPDATA = [
        [ 4096, 4, "nop", "" ],
        [ 4100, 4, ".db", "0xff, 0xff, 0xff, 0xff" ]
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
        var output = cs.reg_name(capstone.mips.REG_PC);
        cs.close();
        expect(output).toEqual("pc");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        var output = cs.insn_name(capstone.mips.INS_NEGU);
        cs.close();
        expect(output).toEqual("negu");
    });

    it("can disassemble big endian", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        var output = cs.disasm(CODE_MIPS, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_MIPS);
    });

    it("can disassemble big endian quickly", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        var output = cs.disasm_lite(CODE_MIPS, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_MIPS_LITE);
    });

    it("can disassemble big endian with detail", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        cs.detail = true;
        var output = cs.disasm(CODE_MIPS, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_MIPS_DETAIL);
    });

    it("can disassemble little endian", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_64 | capstone.MODE_LITTLE_ENDIAN
        );
        var output = cs.disasm(CODE_MIPS_LE, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_MIPS_LE);
    });

    it("can disassemble with skipdata", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        cs.skipdata = new capstone.CsSkipdata(".db");
        var output = cs.disasm_lite(CODE_MIPS_SKIPDATA, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_MIPS_SKIPDATA);
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
                /*
                 * FIXME: Use ref module for now because the shorthand method
                 * does not pass the `offset` parameter
                 * See: https://github.com/TooTallNate/ref/issues/17
                 */
                //cb_output.code = code.reinterpret(4, offset).toJSON();
                var ref = require("ref");
                cb_output.code = ref.reinterpret(code, 4, offset).toJSON();
                cb_output.user = user;
                return 4;
            },
            { "foo" : "bar" }
        );

        var output = cs.disasm_lite(CODE_MIPS_SKIPDATA, 0x1000);
        cs.close();
        expect(output).toEqual(EXPECT_MIPS_SKIPDATA);
        expect(cb_output).toEqual(EXPECT_MIPS_SKIPDATA_CB);
    });
});
