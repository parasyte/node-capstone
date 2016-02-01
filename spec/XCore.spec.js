describe("XCore", function () {
    var capstone = require("..");

    var CODE_XCORE = new Buffer([
        0xed, 0x00, 0x00, 0x00, 0x00, 0x1a, 0x5a, 0x0f,
        0x1f, 0xff, 0xc2, 0x09, 0x80, 0x00, 0x00, 0x00,
        0x07, 0xf7, 0xeb, 0x2a, 0xff, 0xff, 0x7f, 0x57,
        0xe3, 0x01, 0xff, 0xff, 0x7f, 0x57, 0xeb, 0x00,
        0xf0, 0x00, 0x00, 0x24, 0xb2, 0x4f, 0x00, 0x78,
        0xec, 0x18, 0x00, 0x00, 0xc1, 0x7f
    ]);

    var EXPECT_XCORE = [
        {
            "arch" : 7,
            "id" : 108,
            "address" : 4096,
            "bytes" : [ 237, 0 ],
            "mnemonic" : "stw",
            "op_str" : "r2, r7[1]"
        },
        {
            "arch" : 7,
            "id" : 108,
            "address" : 4098,
            "bytes" : [ 0, 0 ],
            "mnemonic" : "stw",
            "op_str" : "r0, r0[0]"
        },
        {
            "arch" : 7,
            "id" : 109,
            "address" : 4100,
            "bytes" : [ 0, 26 ],
            "mnemonic" : "sub",
            "op_str" : "r8, r8, r0"
        },
        {
            "arch" : 7,
            "id" : 84,
            "address" : 4102,
            "bytes" : [ 90, 15 ],
            "mnemonic" : "outt",
            "op_str" : "res[r2], r10"
        }
    ];

    var EXPECT_XCORE_LITE = [
        [ 4096, 2, "stw", "r2, r7[1]" ],
        [ 4098, 2, "stw", "r0, r0[0]" ],
        [ 4100, 2, "sub", "r8, r8, r0" ],
        [ 4102, 2, "outt", "res[r2], r10" ]
    ];

    var EXPECT_XCORE_DETAIL = [
        {
            "arch": 7,
            "id": 108,
            "address": 4096,
            "bytes": [ 237, 0 ],
            "mnemonic": "stw",
            "op_str": "r2, r7[1]",
            "detail": {
                "regs_read": [],
                "regs_write": [],
                "groups": [],
                "xcore": {
                    "operands": [
                        { "type": 1, "reg": 7 }
                    ]
                }
            }
        },
        {
            "arch": 7,
            "id": 108,
            "address": 4098,
            "bytes": [ 0, 0 ],
            "mnemonic": "stw",
            "op_str": "r0, r0[0]",
            "detail": {
                "regs_read": [],
                "regs_write": [],
                "groups": [],
                "xcore": {
                    "operands": [
                        { "type": 1, "reg": 5 }
                    ]
                }
            }
        },
        {
            "arch": 7,
            "id": 109,
            "address": 4100,
            "bytes": [ 0, 26 ],
            "mnemonic": "sub",
            "op_str": "r8, r8, r0",
            "detail": {
                "regs_read": [],
                "regs_write": [],
                "groups": [],
                "xcore": {
                    "operands": [
                        { "type": 1, "reg": 13 },
                        { "type": 1, "reg": 13 },
                        { "type": 1, "reg": 5 }
                    ]
                }
            }
        },
        {
            "arch": 7,
            "id": 84,
            "address": 4102,
            "bytes": [ 90, 15 ],
            "mnemonic": "outt",
            "op_str": "res[r2], r10",
            "detail": {
                "regs_read": [],
                "regs_write": [],
                "groups": [],
                "xcore": {
                    "operands": [
                        { "type": 1, "reg": 15 }
                    ]
                }
            }
        }
    ];


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_XCORE, capstone.MODE_BIG_ENDIAN);
        var output = cs.reg_name(capstone.xcore.REG_ID);
        expect(output).toEqual("id");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_XCORE, capstone.MODE_BIG_ENDIAN);
        var output = cs.insn_name(capstone.xcore.INS_ZEXT);
        expect(output).toEqual("zext");
    });

    it("can be disassembled", function () {
        var cs = new capstone.Cs(capstone.ARCH_XCORE, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm(CODE_XCORE, 0x1000);
        expect(output).not.toBeDiff(EXPECT_XCORE);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_XCORE, capstone.MODE_BIG_ENDIAN);
        var output = cs.disasm_lite(CODE_XCORE, 0x1000);
        expect(output).not.toBeDiff(EXPECT_XCORE_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_XCORE, capstone.MODE_BIG_ENDIAN);
        cs.detail = true;
        var output = cs.disasm(CODE_XCORE, 0x1000);
        expect(output).not.toBeDiff(EXPECT_XCORE_DETAIL);
    });
});
