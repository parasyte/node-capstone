describe("ARM", function () {
    var capstone = require("..");

    var CODE_ARM = new Buffer([
        0xED, 0xFF, 0xFF, 0xEB, 0x04, 0xe0, 0x2d, 0xe5,
        0x00, 0x00, 0x00, 0x00, 0xe0, 0x83, 0x22, 0xe5,
        0xf1, 0x02, 0x03, 0x0e, 0x00, 0x00, 0xa0, 0xe3,
        0x02, 0x30, 0xc1, 0xe7, 0x00, 0x00, 0x53, 0xe3
    ]);
    var EXPECT_ARM = "0x1000:\tbl\t#-0x4c\n" +
        "0x1004:\tstr\tlr, [sp, #-0x4]!\n" +
        "0x1008:\tandeq\tr0, r0, r0\n" +
        "0x100c:\tstr\tr8, [r2, #-0x3e0]!\n" +
        "0x1010:\tmcreq\tp2, #0, r0, c3, c1, #7\n" +
        "0x1014:\tmov\tr0, #0\n" +
        "0x1018:\tstrb\tr3, [r1, r2]\n" +
        "0x101c:\tcmp\tr3, #0\n";
    /*
    var CODE_ARMTHUMB = new Buffer([
        0xd1, 0xe8, 0x00, 0xf0, 0xf0, 0x24, 0x04, 0x07,
        0x1f, 0x3c, 0xf2, 0xc0, 0x00, 0x00, 0x4f, 0xf0,
        0x00, 0x01, 0x46, 0x6c
    ]);
    var CODE_THUMB = new Buffer([
        0x70, 0x47, 0xeb, 0x46, 0x83, 0xb0, 0xc9, 0x68,
        0x1f, 0xb1
    ]);
    var CODE_THUMB2 = new Buffer([
        0x4f, 0xf0, 0x00, 0x01, 0xbd, 0xe8, 0x00, 0x88,
        0xd1, 0xe8, 0x00, 0xf0
    ]);
    */


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        var output = cs.reg_name(capstone.arm.REG_S31);
        cs.close();
        expect(output).toEqual("s31");
    });

    it("can be disassembled", function () {
        var output = "";
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);

        cs.disasm(CODE_ARM, 0x1000).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\n";
        });

        cs.close();

        expect(output).toEqual(EXPECT_ARM);
    });

    it("can be disassembled quickly", function () {
        var output = "";
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);

        cs.disasm_lite(CODE_ARM, 0x1000).forEach(function (insn) {
            (function (address, size, mnemonic, op_str) {
                output += "0x" + address.toString(16) + ":\t" +
                    mnemonic + "\t" + op_str + "\n";
            }).apply(this, insn);
        });

        cs.close();

        expect(output).toEqual(EXPECT_ARM);
    });

    it("can be disassembled with detail", function () {
        var output = "";
        var expected = "0x1000:\tbl\t#-0x4c\t" +
            "{\"regs_read\":[12],\"regs_write\":[10],\"groups\":[20]," +
            "\"arm\":{\"cc\":0,\"update_flags\":false,\"writeback\":" +
            "false,\"operands\":[{\"shift\":{\"type\":0,\"value\":0}," +
            "\"type\":4,\"imm\":4294967220}]}}\n" +
            "0x1004:\tstr\tlr, [sp, #-0x4]!\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[20],\"arm\":" +
            "{\"cc\":15,\"update_flags\":false,\"writeback\":true," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "1,\"reg\":10},{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "6,\"mem\":{\"base\":12,\"index\":0,\"scale\":1,\"disp\":" +
            "-4}}]}}\n" +
            "0x1008:\tandeq\tr0, r0, r0\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[20],\"arm\":" +
            "{\"cc\":1,\"update_flags\":false,\"writeback\":false," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "1,\"reg\":66},{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "1,\"reg\":66},{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "1,\"reg\":66}]}}\n" +
            "0x100c:\tstr\tr8, [r2, #-0x3e0]!\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[20],\"arm\":" +
            "{\"cc\":15,\"update_flags\":false,\"writeback\":true," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "1,\"reg\":74},{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "6,\"mem\":{\"base\":68,\"index\":0,\"scale\":1,\"disp\":" +
            "-992}}]}}\n" +
            "0x1010:\tmcreq\tp2, #0, r0, c3, c1, #7\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[20],\"arm\":" +
            "{\"cc\":1,\"update_flags\":false,\"writeback\":false," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"type\":3," +
            "\"imm\":2},{\"shift\":{\"type\":0,\"value\":0},\"type\":4," +
            "\"imm\":0},{\"shift\":{\"type\":0,\"value\":0},\"type\":1," +
            "\"reg\":66},{\"shift\":{\"type\":0,\"value\":0},\"type\":2," +
            "\"imm\":3},{\"shift\":{\"type\":0,\"value\":0},\"type\":2," +
            "\"imm\":1},{\"shift\":{\"type\":0,\"value\":0},\"type\":4," +
            "\"imm\":7}]}}\n" +
            "0x1014:\tmov\tr0, #0\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[20],\"arm\":" +
            "{\"cc\":15,\"update_flags\":false,\"writeback\":false," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "1,\"reg\":66},{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "4,\"imm\":0}]}}\n" +
            "0x1018:\tstrb\tr3, [r1, r2]\t" +
            "{\"regs_read\":[],\"regs_write\":[],\"groups\":[20],\"arm\":" +
            "{\"cc\":15,\"update_flags\":false,\"writeback\":false," +
            "\"operands\":[{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "1,\"reg\":69},{\"shift\":{\"type\":0,\"value\":0},\"type\":" +
            "6,\"mem\":{\"base\":67,\"index\":68,\"scale\":1,\"disp\":" +
            "0}}]}}\n" +
            "0x101c:\tcmp\tr3, #0\t" +
            "{\"regs_read\":[],\"regs_write\":[3],\"groups\":[20]," +
            "\"arm\":{\"cc\":15,\"update_flags\":true,\"writeback\":" +
            "false,\"operands\":[{\"shift\":{\"type\":0,\"value\":0}," +
            "\"type\":1,\"reg\":69},{\"shift\":{\"type\":0,\"value\":0}," +
            "\"type\":4,\"imm\":0}]}}\n";

        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);

        cs.detail = true;

        cs.disasm(CODE_ARM, 0x1000).forEach(function (insn) {
            output += "0x" + insn.address.toString(16) + ":\t" +
                insn.mnemonic + "\t" + insn.op_str + "\t" +
                JSON.stringify(insn.detail) + "\n";
        });

        cs.close();

        expect(output).toEqual(expected);
    });
});
