describe("MIPS", function () {
    var capstone = require("..");

    var CODE_MIPS = new Buffer([
        0x0C, 0x10, 0x00, 0x97, 0x00, 0x00, 0x00, 0x00,
        0x24, 0x02, 0x00, 0x0c, 0x8f, 0xa2, 0x00, 0x00,
        0x34, 0x21, 0x34, 0x56
    ]);
    var EXPECT_MIPS = "0x1000:\tjal\t0x40025c\n" +
        "0x1004:\tnop\t\n" +
        "0x1008:\taddiu\t$v0, $zero, 0xc\n" +
        "0x100c:\tlw\t$v0, ($sp)\n" +
        "0x1010:\tori\t$at, $at, 0x3456\n";

    var CODE_MIPS_LE = new Buffer([
        0x56, 0x34, 0x21, 0x34, 0xc2, 0x17, 0x01, 0x00
    ]);
    var EXPECT_MIPS_LE = "0x1000:\tori\t$at, $at, 0x3456\n" +
        "0x1004:\tsrl\t$v0, $at, 0x1f\n";


    it("can print the correct register", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        var output = cs.reg_name(capstone.mips.REG_W31);
        cs.close();
        expect(output).toEqual("w31");
    });

    /**
     * Disabled due to a bug in Capstone 2.1.2
     * Fixed by: https://github.com/aquynh/capstone/pull/122
     * @ignore
     */
    xit("can print the correct register", function () {
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );
        var output = cs.reg_name(capstone.mips.REG_PC);
        cs.close();
        expect(output).toEqual("pc");
    });

    it("can disassemble big endian", function () {
        var output = "";
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );

        cs.disasm(CODE_MIPS, 0x1000).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\n";
        });

        cs.close();

        expect(output).toEqual(EXPECT_MIPS);
    });

    it("can disassemble big endian quickly", function () {
        var output = "";
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );

        cs.disasm_lite(CODE_MIPS, 0x1000).forEach(function (insn) {
            (function (address, size, mnemonic, op_str) {
                output += "0x" + address.toString(16) + ":\t" +
                    mnemonic + "\t" + op_str + "\n";
            }).apply(this, insn);
        });

        cs.close();

        expect(output).toEqual(EXPECT_MIPS);
    });

    it("can disassemble big endian with detail", function () {
        var output = "";
        var expected = "0x1000:\tjal\t0x40025c\t{\"regs_read\":[]," +
            "\"regs_write\":[32],\"groups\":[10],\"mips\":{\"operands\":" +
            "[{\"type\":2,\"imm\":4194908}]}}\n" +
            "0x1004:\tnop\t\t{\"regs_read\":[],\"regs_write\":[]," +
            "\"groups\":[10],\"mips\":{\"operands\":[]}}\n" +
            "0x1008:\taddiu\t$v0, $zero, 0xc\t{\"regs_read\":[]," +
            "\"regs_write\":[],\"groups\":[10],\"mips\":{\"operands\":" +
            "[{\"type\":1,\"reg\":3},{\"type\":1,\"reg\":1},{\"type\":2," +
            "\"imm\":12}]}}\n" +
            "0x100c:\tlw\t$v0, ($sp)\t{\"regs_read\":[]," +
            "\"regs_write\":[],\"groups\":[10],\"mips\":{\"operands\":" +
            "[{\"type\":1,\"reg\":3},{\"type\":3,\"mem\":{\"base\":30," +
            "\"disp\":0}}]}}\n" +
            "0x1010:\tori\t$at, $at, 0x3456\t{\"regs_read\":[]," +
            "\"regs_write\":[],\"groups\":[10],\"mips\":{\"operands\":" +
            "[{\"type\":1,\"reg\":2},{\"type\":1,\"reg\":2},{\"type\":" +
            "2,\"imm\":13398}]}}\n";
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
        );

        cs.detail = true;

        cs.disasm(CODE_MIPS, 0x1000).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\t" +
                JSON.stringify(insn.detail) + "\n";
        });

        cs.close();

        expect(output).toEqual(expected);
    });

    it("can disassemble little endian", function () {
        var output = "";
        var cs = new capstone.Cs(
            capstone.ARCH_MIPS,
            capstone.MODE_64 | capstone.MODE_LITTLE_ENDIAN
        );

        cs.disasm(CODE_MIPS_LE, 0x1000).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\n";
        });

        cs.close();

        expect(output).toEqual(EXPECT_MIPS_LE);
    });
});
