describe("ARM64", function () {
    var capstone = require("..");

    var CODE_ARM64 = new Buffer([
        0x21, 0x7c, 0x02, 0x9b, 0x21, 0x7c, 0x00, 0x53,
        0x00, 0x40, 0x21, 0x4b, 0xe1, 0x0b, 0x40, 0xb9,
        0x20, 0x04, 0x81, 0xda, 0x20, 0x08, 0x02, 0x8b
    ]);
    var EXPECT_ARM64 = "0x2c:\tmul\tx1, x1, x2\n" +
        "0x30:\tlsr\tw1, w1, #0\n" +
        "0x34:\tsub\tw0, w0, w1, uxtw\n" +
        "0x38:\tldr\tw1, [sp, #8]\n" +
        "0x3c:\tcsneg\tx0, x1, x1, eq\n" +
        "0x40:\tadd\tx0, x1, x2, lsl #2\n";


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.reg_name(capstone.arm64.REG_X28);
        cs.close();
        expect(output).toEqual("x28");
    });

    /**
     * Disabled due to a bug in Capstone 2.1.2
     * Fixed by: https://github.com/aquynh/capstone/commit/96934501f
     * @ignore
     */
    xit("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
        var output = cs.reg_name(capstone.arm64.REG_X30);
        cs.close();
        expect(output).toEqual("x30");
    });

    it("can be disassembled", function () {
        var output = "";
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);

        cs.disasm(CODE_ARM64, 0x2c).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\n";
        });

        cs.close();

        expect(output).toEqual(EXPECT_ARM64);
    });

    it("can be disassembled quickly", function () {
        var output = "";
        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);

        cs.disasm_lite(CODE_ARM64, 0x2c).forEach(function (insn) {
            (function (address, size, mnemonic, op_str) {
                output += "0x" + address.toString(16) + ":\t" +
                    mnemonic + "\t" + op_str + "\n";
            }).apply(this, insn);
        });

        cs.close();

        expect(output).toEqual(EXPECT_ARM64);
    });

    it("can be disassembled with detail", function () {
        var output = "";
        var expected = "0x2c:\tmul\tx1, x1, x2\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[],\"arm64\":" +
            "{\"cc\":0,\"update_flags\":false,\"writeback\":false," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"ext\":0," +
            "\"type\":1,\"reg\":198},{\"shift\":{\"type\":0,\"value\":0}," +
            "\"ext\":0,\"type\":1,\"reg\":198},{\"shift\":{\"type\":0," +
            "\"value\":0},\"ext\":0,\"type\":1,\"reg\":199}]}}\n" +
            "0x30:\tlsr\tw1, w1, #0\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[],\"arm64\":" +
            "{\"cc\":0,\"update_flags\":false,\"writeback\":false," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"ext\":0," +
            "\"type\":1,\"reg\":167},{\"shift\":{\"type\":0,\"value\":0}," +
            "\"ext\":0,\"type\":1,\"reg\":167},{\"shift\":{\"type\":0," +
            "\"value\":0},\"ext\":0,\"type\":3,\"imm\":0}]}}\n" +
            "0x34:\tsub\tw0, w0, w1, uxtw\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[],\"arm64\":" +
            "{\"cc\":0,\"update_flags\":false,\"writeback\":false," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"ext\":0," +
            "\"type\":1,\"reg\":166},{\"shift\":{\"type\":0,\"value\":0}," +
            "\"ext\":0,\"type\":1,\"reg\":166},{\"shift\":{\"type\":0," +
            "\"value\":0},\"ext\":3,\"type\":1,\"reg\":167}]}}\n" +
            "0x38:\tldr\tw1, [sp, #8]\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[],\"arm64\":" +
            "{\"cc\":0,\"update_flags\":false,\"writeback\":false," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"ext\":0," +
            "\"type\":1,\"reg\":167},{\"shift\":{\"type\":0,\"value\":0}," +
            "\"ext\":0,\"type\":5,\"mem\":{\"base\":4,\"index\":0," +
            "\"disp\":8}}]}}\n" +
            "0x3c:\tcsneg\tx0, x1, x1, eq\t" +
            "{\"regs_read\":[1],\"regs_write\":[],\"groups\":[],\"arm64\"" +
            ":{\"cc\":1,\"update_flags\":false,\"writeback\":false," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"ext\":0," +
            "\"type\":1,\"reg\":197},{\"shift\":{\"type\":0,\"value\":0}," +
            "\"ext\":0,\"type\":1,\"reg\":198},{\"shift\":{\"type\":0," +
            "\"value\":0},\"ext\":0,\"type\":1,\"reg\":198}]}}\n" +
            "0x40:\tadd\tx0, x1, x2, lsl #2\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[],\"arm64\":" +
            "{\"cc\":0,\"update_flags\":false,\"writeback\":false," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"ext\":0," +
            "\"type\":1,\"reg\":197},{\"shift\":{\"type\":0,\"value\":0}," +
            "\"ext\":0,\"type\":1,\"reg\":198},{\"shift\":{\"type\":1," +
            "\"value\":2},\"ext\":0,\"type\":1,\"reg\":199}]}}\n";

        var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);

        cs.detail = true;

        cs.disasm(CODE_ARM64, 0x2c).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\t" +
                JSON.stringify(insn.detail) + "\n";
        });

        cs.close();

        expect(output).toEqual(expected);
    });
});
