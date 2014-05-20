describe("X86", function () {
    var capstone = require("..");

    var CODE_X86 = new Buffer([
        0x55, 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00
    ]);
    var EXPECT_X86 = "0x1000:\tpush\trbp\n" +
        "0x1001:\tmov\trax, qword ptr [rip + 0x13b8]\n";


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
        var output = cs.reg_name(capstone.x86.REG_R15W);
        cs.close();
        expect(output).toEqual("r15w");
    });

    it("can be disassembled", function () {
        var output = "";
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);

        cs.disasm(CODE_X86, 0x1000).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\n";
        });

        cs.close();

        expect(output).toEqual(EXPECT_X86);
    });

    it("can be disassembled quickly", function () {
        var output = "";
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);

        cs.disasm_lite(CODE_X86, 0x1000).forEach(function (insn) {
            (function (address, size, mnemonic, op_str) {
                output += "0x" + address.toString(16) + ":\t" +
                    mnemonic + "\t" + op_str + "\n";
            }).apply(this, insn);
        });

        cs.close();

        expect(output).toEqual(EXPECT_X86);
    });

    it("can be disassembled with detail", function () {
        var output = "";
        var expected = "0x1000:\tpush\trbp\t" +
            "{\"regs_read\":[44],\"regs_write\":[44],\"groups\":[17]," +
            "\"x86\":{\"prefix\":[0,0,0,0,0],\"opcode\":[85,0,0]," +
            "\"segment\":0,\"op_size\":8,\"addr_size\":8,\"disp_size\":4," +
            "\"imm_size\":4,\"modrm\":0,\"sib\":0,\"disp\":0," +
            "\"sib_index\":0,\"sib_scale\":0,\"sib_base\":0," +
            "\"operands\":[{\"type\":1,\"reg\":36}]}}\n" +
            "0x1001:\tmov\trax, qword ptr [rip + 0x13b8]\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[]," +
            "\"x86\":{\"prefix\":[0,0,0,0,0],\"opcode\":[139,0,0]," +
            "\"segment\":0,\"op_size\":8,\"addr_size\":8,\"disp_size\":4," +
            "\"imm_size\":4,\"modrm\":5,\"sib\":0,\"disp\":5048," +
            "\"sib_index\":0,\"sib_scale\":0,\"sib_base\":0,\"operands\":" +
            "[{\"type\":1,\"reg\":35},{\"type\":4,\"mem\":{\"base\":41," +
            "\"index\":0,\"scale\":1,\"disp\":5048}}]}}\n";
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);

        cs.detail = true;

        cs.disasm(CODE_X86, 0x1000).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\t" +
                JSON.stringify(insn.detail) + "\n";
        });

        cs.close();

        expect(output).toEqual(expected);
    });

    it("can be disassembled with ATT syntax", function () {
        var output = "";
        var expected = "0x1000:\tpushq\t%rbp\n" +
            "0x1001:\tmovq\tqword ptr 0x13b8(%rip), %rax\n";
        var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);

        cs.syntax = capstone.SYNTAX_ATT;

        cs.disasm(CODE_X86, 0x1000).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\n";
        });

        cs.close();

        expect(output).toEqual(expected);
    });
});
