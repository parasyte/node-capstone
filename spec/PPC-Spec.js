describe("PPC", function () {
    var capstone = require("..");

    var CODE_PPC = new Buffer([
        0x80, 0x20, 0x00, 0x00, 0x80, 0x3f, 0x00, 0x00,
        0x10, 0x43, 0x23, 0x0e, 0xd0, 0x44, 0x00, 0x80,
        0x4c, 0x43, 0x22, 0x02, 0x2d, 0x03, 0x00, 0x80,
        0x7c, 0x43, 0x20, 0x14, 0x7c, 0x43, 0x20, 0x93,
        0x4f, 0x20, 0x00, 0x21, 0x4c, 0xc8, 0x00, 0x21
    ]);
    var EXPECT_PPC = "0x1000:\tlwz\tr1, (0)\n" +
        "0x1004:\tlwz\tr1, (r31)\n" +
        "0x1008:\tvpkpx\tv2, v3, v4\n" +
        "0x100c:\tstfs\tf2, 0x80(r4)\n" +
        "0x1010:\tcrand\t2, 3, 4\n" +
        "0x1014:\tcmpwi\tcr2, r3, 0x80\n" +
        "0x1018:\taddc\tr2, r3, r4\n" +
        "0x101c:\tmulhd.\tr2, r3, r4\n" +
        "0x1020:\tbdnzlrl+\t\n" +
        "0x1024:\tbclrl\t6, 8, 0\n";


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
        var output = cs.reg_name(capstone.ppc.REG_CR1EQ);
        cs.close();
        expect(output).toEqual("cr1eq");
    });

    it("can be disassembled", function () {
        var output = "";
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);

        cs.disasm(CODE_PPC, 0x1000).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\n";
        });

        cs.close();

        expect(output).toEqual(EXPECT_PPC);
    });

    it("can be disassembled quickly", function () {
        var output = "";
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);

        cs.disasm_lite(CODE_PPC, 0x1000).forEach(function (insn) {
            (function (address, size, mnemonic, op_str) {
                output += "0x" + address.toString(16) + ":\t" +
                    mnemonic + "\t" + op_str + "\n";
            }).apply(this, insn);
        });

        cs.close();

        expect(output).toEqual(EXPECT_PPC);
    });

    it("can be disassembled with detail", function () {
        var output = "";
        var expected = "0x1000:\tlwz\tr1, (0)\t{\"regs_read\":[]," +
            "\"regs_write\":[],\"groups\":[],\"ppc\":{\"bc\":0,\"bh\":0," +
            "\"update_cr0\":false,\"operands\":[{\"type\":1,\"reg\":69}," +
            "{\"type\":3,\"mem\":{\"base\":2,\"disp\":0}}]}}\n" +
            "0x1004:\tlwz\tr1, (r31)\t{\"regs_read\":[],\"regs_write\":[]," +
            "\"groups\":[],\"ppc\":{\"bc\":0,\"bh\":0,\"update_cr0\":false," +
            "\"operands\":[{\"type\":1,\"reg\":69},{\"type\":3,\"mem\":" +
            "{\"base\":99,\"disp\":0}}]}}\n" +
            "0x1008:\tvpkpx\tv2, v3, v4\t{\"regs_read\":[],\"regs_write\":[]," +
            "\"groups\":[1],\"ppc\":{\"bc\":0,\"bh\":0,\"update_cr0\":false," +
            "\"operands\":[{\"type\":1,\"reg\":102},{\"type\":1,\"reg\":103}," +
            "{\"type\":1,\"reg\":104}]}}\n" +
            "0x100c:\tstfs\tf2, 0x80(r4)\t{\"regs_read\":[],\"regs_write\":[]" +
            ",\"groups\":[],\"ppc\":{\"bc\":0,\"bh\":0,\"update_cr0\":false," +
            "\"operands\":[{\"type\":1,\"reg\":37},{\"type\":3,\"mem\":" +
            "{\"base\":72,\"disp\":128}}]}}\n" +
            "0x1010:\tcrand\t2, 3, 4\t{\"regs_read\":[],\"regs_write\":[]," +
            "\"groups\":[],\"ppc\":{\"bc\":0,\"bh\":0,\"update_cr0\":false," +
            "\"operands\":[{\"type\":1,\"reg\":4},{\"type\":1,\"reg\":5}," +
            "{\"type\":1,\"reg\":6}]}}\n" +
            "0x1014:\tcmpwi\tcr2, r3, 0x80\t{\"regs_read\":[],\"regs_write\":" +
            "[],\"groups\":[],\"ppc\":{\"bc\":0,\"bh\":0,\"update_cr0\":" +
            "false,\"operands\":[{\"type\":1,\"reg\":4},{\"type\":1,\"reg\":" +
            "71},{\"type\":2,\"imm\":128}]}}\n" +
            "0x1018:\taddc\tr2, r3, r4\t{\"regs_read\":[],\"regs_write\":[1]," +
            "\"groups\":[],\"ppc\":{\"bc\":0,\"bh\":0,\"update_cr0\":false," +
            "\"operands\":[{\"type\":1,\"reg\":70},{\"type\":1,\"reg\":71}," +
            "{\"type\":1,\"reg\":72}]}}\n" +
            "0x101c:\tmulhd.\tr2, r3, r4\t{\"regs_read\":[],\"regs_write\":" +
            "[2],\"groups\":[],\"ppc\":{\"bc\":0,\"bh\":0,\"update_cr0\":" +
            "true,\"operands\":[{\"type\":1,\"reg\":70},{\"type\":1,\"reg\":" +
            "71},{\"type\":1,\"reg\":72}]}}\n" +
            "0x1020:\tbdnzlrl+\t\t{\"regs_read\":[34,67,133],\"regs_write\":" +
            "[34],\"groups\":[],\"ppc\":{\"bc\":0,\"bh\":1,\"update_cr0\":" +
            "false,\"operands\":[]}}\n" +
            "0x1024:\tbclrl\t6, 8, 0\t{\"regs_read\":[34,67,133]," +
            "\"regs_write\":[67,34],\"groups\":[],\"ppc\":{\"bc\":0,\"bh\":0," +
            "\"update_cr0\":false,\"operands\":[{\"type\":2,\"imm\":6}," +
            "{\"type\":1,\"reg\":10},{\"type\":2,\"imm\":0}]}}\n";
        var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);

        cs.detail = true;

        cs.disasm(CODE_PPC, 0x1000).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\t" +
                JSON.stringify(insn.detail) + "\n";
        });

        cs.close();

        expect(output).toEqual(expected);
    });
});
