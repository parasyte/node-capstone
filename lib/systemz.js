var ArrayType = require("ref-array");
var StructType = require("ref-struct");
var UnionType = require("ref-union");


/**
 * SystemZ register IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_SYSZ, capstone.MODE_BIG_ENDIAN);
 *
 * console.log(capstone.sysz.R0L); //> 34
 * console.log(cs.name(capstone.sysz.R0L)); //> "r0l"
 *
 * cs.close();
 * ```
 *
 * @name REG
 * @enum
 * @memberOf sysz
 */
var regs = [
    "INVALID",

    "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", "10", "11", "12", "13", "14", "15",

    "CC",

    "F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7",
    "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15",

    "R0L",

    "ENDING", // <-- mark the end of the list of registers
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});


/**
 * SystemZ instruction IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_SYSZ, capstone.MODE_BIG_ENDIAN);
 *
 * console.log(capstone.sysz.INS_JL); //> 196
 * console.log(cs.insn_name(capstone.sysz.INS_JL)); //> "jl"
 *
 * cs.close();
 * ```
 *
 * @name INS
 * @enum
 * @memberOf sysz
 */
var ins = [
    "INVALID",

    "A", "ADB", "ADBR", "AEB", "AEBR", "AFI", "AG", "AGF", "AGFI", "AGFR",
    "AGHI", "AGHIK", "AGR", "AGRK", "AGSI", "AH", "AHI", "AHIK", "AHY", "AIH",
    "AL", "ALC", "ALCG", "ALCGR", "ALCR", "ALFI", "ALG", "ALGF", "ALGFI",
    "ALGFR", "ALGHSIK", "ALGR", "ALGRK", "ALHSIK", "ALR", "ALRK", "ALY", "AR",
    "ARK", "ASI", "AXBR", "AY", "BCR", "BRC", "BRCL", "CGIJ", "CGRJ", "CIJ",
    "CLGIJ", "CLGRJ", "CLIJ", "CLRJ", "CRJ", "BER", "JE", "JGE", "LOCE",
    "LOCGE", "LOCGRE", "LOCRE", "STOCE", "STOCGE", "BHR", "BHER", "JHE", "JGHE",
    "LOCHE", "LOCGHE", "LOCGRHE", "LOCRHE", "STOCHE", "STOCGHE", "JH", "JGH",
    "LOCH", "LOCGH", "LOCGRH", "LOCRH", "STOCH", "STOCGH", "CGIJNLH", "CGRJNLH",
    "CIJNLH", "CLGIJNLH", "CLGRJNLH", "CLIJNLH", "CLRJNLH", "CRJNLH", "CGIJE",
    "CGRJE", "CIJE", "CLGIJE", "CLGRJE", "CLIJE", "CLRJE", "CRJE", "CGIJNLE",
    "CGRJNLE", "CIJNLE", "CLGIJNLE", "CLGRJNLE", "CLIJNLE", "CLRJNLE", "CRJNLE",
    "CGIJH", "CGRJH", "CIJH", "CLGIJH", "CLGRJH", "CLIJH", "CLRJH", "CRJH",
    "CGIJNL", "CGRJNL", "CIJNL", "CLGIJNL", "CLGRJNL", "CLIJNL", "CLRJNL",
    "CRJNL", "CGIJHE", "CGRJHE", "CIJHE", "CLGIJHE", "CLGRJHE", "CLIJHE",
    "CLRJHE", "CRJHE", "CGIJNHE", "CGRJNHE", "CIJNHE", "CLGIJNHE", "CLGRJNHE",
    "CLIJNHE", "CLRJNHE", "CRJNHE", "CGIJL", "CGRJL", "CIJL", "CLGIJL",
    "CLGRJL", "CLIJL", "CLRJL", "CRJL", "CGIJNH", "CGRJNH", "CIJNH", "CLGIJNH",
    "CLGRJNH", "CLIJNH", "CLRJNH", "CRJNH", "CGIJLE", "CGRJLE", "CIJLE",
    "CLGIJLE", "CLGRJLE", "CLIJLE", "CLRJLE", "CRJLE", "CGIJNE", "CGRJNE",
    "CIJNE", "CLGIJNE", "CLGRJNE", "CLIJNE", "CLRJNE", "CRJNE", "CGIJLH",
    "CGRJLH", "CIJLH", "CLGIJLH", "CLGRJLH", "CLIJLH", "CLRJLH", "CRJLH", "BLR",
    "BLER", "JLE", "JGLE", "LOCLE", "LOCGLE", "LOCGRLE", "LOCRLE", "STOCLE",
    "STOCGLE", "BLHR", "JLH", "JGLH", "LOCLH", "LOCGLH", "LOCGRLH", "LOCRLH",
    "STOCLH", "STOCGLH", "JL", "JGL", "LOCL", "LOCGL", "LOCGRL", "LOCRL", "LOC",
    "LOCG", "LOCGR", "LOCR", "STOCL", "STOCGL", "BNER", "JNE", "JGNE", "LOCNE",
    "LOCGNE", "LOCGRNE", "LOCRNE", "STOCNE", "STOCGNE", "BNHR", "BNHER", "JNHE",
    "JGNHE", "LOCNHE", "LOCGNHE", "LOCGRNHE", "LOCRNHE", "STOCNHE", "STOCGNHE",
    "JNH", "JGNH", "LOCNH", "LOCGNH", "LOCGRNH", "LOCRNH", "STOCNH", "STOCGNH",
    "BNLR", "BNLER", "JNLE", "JGNLE", "LOCNLE", "LOCGNLE", "LOCGRNLE",
    "LOCRNLE", "STOCNLE", "STOCGNLE", "BNLHR", "JNLH", "JGNLH", "LOCNLH",
    "LOCGNLH", "LOCGRNLH", "LOCRNLH", "STOCNLH", "STOCGNLH", "JNL", "JGNL",
    "LOCNL", "LOCGNL", "LOCGRNL", "LOCRNL", "STOCNL", "STOCGNL", "BNOR", "JNO",
    "JGNO", "LOCNO", "LOCGNO", "LOCGRNO", "LOCRNO", "STOCNO", "STOCGNO", "BOR",
    "JO", "JGO", "LOCO", "LOCGO", "LOCGRO", "LOCRO", "STOCO", "STOCGO", "STOC",
    "STOCG", "BASR", "BR", "BRAS", "BRASL", "J", "JG", "BRCT", "BRCTG", "C",
    "CDB", "CDBR", "CDFBR", "CDGBR", "CDLFBR", "CDLGBR", "CEB", "CEBR", "CEFBR",
    "CEGBR", "CELFBR", "CELGBR", "CFDBR", "CFEBR", "CFI", "CFXBR", "CG",
    "CGDBR", "CGEBR", "CGF", "CGFI", "CGFR", "CGFRL", "CGH", "CGHI", "CGHRL",
    "CGHSI", "CGR", "CGRL", "CGXBR", "CH", "CHF", "CHHSI", "CHI", "CHRL",
    "CHSI", "CHY", "CIH", "CL", "CLC", "CLFDBR", "CLFEBR", "CLFHSI", "CLFI",
    "CLFXBR", "CLG", "CLGDBR", "CLGEBR", "CLGF", "CLGFI", "CLGFR", "CLGFRL",
    "CLGHRL", "CLGHSI", "CLGR", "CLGRL", "CLGXBR", "CLHF", "CLHHSI", "CLHRL",
    "CLI", "CLIH", "CLIY", "CLR", "CLRL", "CLST", "CLY", "CPSDR", "CR", "CRL",
    "CS", "CSG", "CSY", "CXBR", "CXFBR", "CXGBR", "CXLFBR", "CXLGBR", "CY",
    "DDB", "DDBR", "DEB", "DEBR", "DL", "DLG", "DLGR", "DLR", "DSG", "DSGF",
    "DSGFR", "DSGR", "DXBR", "EAR", "FIDBR", "FIDBRA", "FIEBR", "FIEBRA",
    "FIXBR", "FIXBRA", "FLOGR", "IC", "ICY", "IIHF", "IIHH", "IIHL", "IILF",
    "IILH", "IILL", "IPM", "L", "LA", "LAA", "LAAG", "LAAL", "LAALG", "LAN",
    "LANG", "LAO", "LAOG", "LARL", "LAX", "LAXG", "LAY", "LB", "LBH", "LBR",
    "LCDBR", "LCEBR", "LCGFR", "LCGR", "LCR", "LCXBR", "LD", "LDEB", "LDEBR",
    "LDGR", "LDR", "LDXBR", "LDXBRA", "LDY", "LE", "LEDBR", "LEDBRA", "LER",
    "LEXBR", "LEXBRA", "LEY", "LFH", "LG", "LGB", "LGBR", "LGDR", "LGF", "LGFI",
    "LGFR", "LGFRL", "LGH", "LGHI", "LGHR", "LGHRL", "LGR", "LGRL", "LH", "LHH",
    "LHI", "LHR", "LHRL", "LHY", "LLC", "LLCH", "LLCR", "LLGC", "LLGCR", "LLGF",
    "LLGFR", "LLGFRL", "LLGH", "LLGHR", "LLGHRL", "LLH", "LLHH", "LLHR",
    "LLHRL", "LLIHF", "LLIHH", "LLIHL", "LLILF", "LLILH", "LLILL", "LMG",
    "LNDBR", "LNEBR", "LNGFR", "LNGR", "LNR", "LNXBR", "LPDBR", "LPEBR",
    "LPGFR", "LPGR", "LPR", "LPXBR", "LR", "LRL", "LRV", "LRVG", "LRVGR",
    "LRVR", "LT", "LTDBR", "LTEBR", "LTG", "LTGF", "LTGFR", "LTGR", "LTR",
    "LTXBR", "LXDB", "LXDBR", "LXEB", "LXEBR", "LXR", "LY", "LZDR", "LZER",
    "LZXR", "MADB", "MADBR", "MAEB", "MAEBR", "MDB", "MDBR", "MDEB", "MDEBR",
    "MEEB", "MEEBR", "MGHI", "MH", "MHI", "MHY", "MLG", "MLGR", "MS", "MSDB",
    "MSDBR", "MSEB", "MSEBR", "MSFI", "MSG", "MSGF", "MSGFI", "MSGFR", "MSGR",
    "MSR", "MSY", "MVC", "MVGHI", "MVHHI", "MVHI", "MVI", "MVIY", "MVST",
    "MXBR", "MXDB", "MXDBR", "N", "NC", "NG", "NGR", "NGRK", "NI", "NIHF",
    "NIHH", "NIHL", "NILF", "NILH", "NILL", "NIY", "NR", "NRK", "NY", "O", "OC",
    "OG", "OGR", "OGRK", "OI", "OIHF", "OIHH", "OIHL", "OILF", "OILH", "OILL",
    "OIY", "OR", "ORK", "OY", "PFD", "PFDRL", "RISBG", "RISBHG", "RISBLG",
    "RLL", "RLLG", "RNSBG", "ROSBG", "RXSBG", "S", "SDB", "SDBR", "SEB", "SEBR",
    "SG", "SGF", "SGFR", "SGR", "SGRK", "SH", "SHY", "SL", "SLB", "SLBG",
    "SLBR", "SLFI", "SLG", "SLBGR", "SLGF", "SLGFI", "SLGFR", "SLGR", "SLGRK",
    "SLL", "SLLG", "SLLK", "SLR", "SLRK", "SLY", "SQDB", "SQDBR", "SQEB",
    "SQEBR", "SQXBR", "SR", "SRA", "SRAG", "SRAK", "SRK", "SRL", "SRLG", "SRLK",
    "SRST", "ST", "STC", "STCH", "STCY", "STD", "STDY", "STE", "STEY", "STFH",
    "STG", "STGRL", "STH", "STHH", "STHRL", "STHY", "STMG", "STRL", "STRV",
    "STRVG", "STY", "SXBR", "SY", "TM", "TMHH", "TMHL", "TMLH", "TMLL", "TMY",
    "X", "XC", "XG", "XGR", "XGRK", "XI", "XIHF", "XILF", "XIY", "XR", "XRK",
    "XY",

    "ENDING", // <-- mark the end of the list of instructions
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});


/**
 * SystemZ instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf sysz
 */
var groups = [
    "INVALID",
    "JUMP", // all jump instructions (conditional+direct+indirect jumps)
];

var arch_groups = [
    "DISTINCTOPS", "FPEXTENSION", "HIGHWORD", "INTERLOCKEDACCESS1",
    "LOADSTOREONCOND",

    "ENDING", // <-- mark the end of the list of groups
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});
arch_groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i + 128;
});


/**
 * SystemZ condition codes.
 *
 * Name | Description
 * -----|------------
 * CC_O | Overflow
 * CC_H | High
 * CC_NLE | Not Low or Equal
 * CC_L | Low
 * CC_NHE | Not High or Equal
 * CC_LH | Low or High
 * CC_NE | Not Equal
 * CC_E | Equal
 * CC_NLH | Not Low or High
 * CC_HE | High or Equal
 * CC_NL | Not Low
 * CC_LE | Low or Equal
 * CC_NH | Not High
 * CC_NO | Not Overflow
 *
 * @name CC
 * @enum
 * @memberOf sysz
 */
var cc = [
    "INVALID",

    "O", "H", "NLE", "L", "NHE", "LH", "NE",
    "E", "NLH", "HE", "NL", "LE", "NH", "NO",
];
cc.forEach(function (code, i) {
    exports["CC_" + code] = i;
});


/**
 * SystemZ operand types.
 *
 * Name | Description
 * -----|------------
 * OP_INVALID | Uninitialized operand
 * OP_REG | Register operand
 * OP_IMM | Immediate operand
 * OP_MEM | Memory operand
 * OP_ACREG | Access register operand
 *
 * @name OP
 * @enum
 * @memberOf sysz
 */
exports.OP_INVALID  = 0;
exports.OP_REG      = 1;
exports.OP_IMM      = 2;
exports.OP_MEM      = 3;
exports.OP_ACREG    = 64;


/**
 * Native instruction operand structure.
 * @name OperandType
 * @class
 * @ignore
 */
var OperandType = new StructType({
    "type"  : "int",        // operand type
    "data"  : new UnionType({
        "reg"   : "uint",   // register value for REG operand
        "imm"   : "int64",  // immediate value for IMM operand
        "mem"   : new StructType({
            "base"  : "uint8",  // base register
            "index" : "uint8",  // index register
            "length": "uint64", // BDLAddr operand
            "disp"  : "int64",  // displacement/offset value
        }),
    }),
});


/**
 * Native instruction detail struct.
 * @name _DetailType
 * @class
 * @ignore
 */
exports._DetailType = new StructType({
    // condition code for this insn
    "cc"        : "int",

    // Number of operands of this instruction,
    // or 0 when instruction has no operand.
    "op_count"  : "uint8",

    // operands for this instruction.
    "operands"  : new ArrayType(OperandType, 6),
});


/**
 * Native instruction detail struct.
 * @name _load
 * @function
 * @memberOf sysz._DetailType
 * @ignore
 * @param {sysz._Detail} source JavaScript detail structure.
 */
Object.defineProperty(exports._DetailType, "_load", {
    "value" : function (source) {
        this.cc         = source.cc;
        this.operands   = [];

        for (var i = 0; i < 6; i++) {
            var mem = this.operands[i].data.mem;

            mem.base    = 0;
            mem.index   = 0;
            mem.length  = 0;
            mem.disp    = 0;
        }

        for (var j = 0; j < source.operands.length; j++) {
            var operand = source.operands[j];
            var type = this.operands[j].type = operand.type;
            var data = this.operands[j].data;

            switch (type) {
            case exports.OP_REG:
            case exports.OP_ACREG:
                data.reg = operand.reg;
                break;

            case exports.OP_IMM:
                data.imm = operand.imm;
                break;

            case exports.OP_MEM:
                data.mem.base   = operand.mem.base;
                data.mem.index  = operand.mem.index;
                data.mem.length = operand.mem.length;
                data.mem.disp   = operand.mem.disp;
                break;
            }
        }
    }
});

/**
 * Instruction detail as a JavaScript object.
 * @name _Detail
 * @class
 * @ignore
 * @param {sysz._DetailType} source Native detail structure.
 */
exports._Detail = function (source) {
    this.cc         = source.cc;
    this.operands   = [];

    for (var i = 0; i < source.op_count; i++) {
        var type = source.operands[i].type;
        var data = source.operands[i].data;

        var operand = {
            "type"  : type,
        };

        switch (type) {
        case exports.OP_REG:
        case exports.OP_ACREG:
            operand.reg = data.reg;
            break;

        case exports.OP_IMM:
            operand.imm = data.imm;
            break;

        case exports.OP_MEM:
            operand.mem = {
                "base"  : data.mem.base,
                "index" : data.mem.index,
                "length": data.mem.length,
                "disp"  : data.mem.disp,
            };
            break;
        }

        this.operands.push(operand);
    }
};
