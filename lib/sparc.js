var ArrayType = require("ref-array");
var StructType = require("ref-struct");
var UnionType = require("ref-union");


/**
 * Sparc register IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_SPARC, capstone.MODE_BIG_ENDIAN);
 *
 * console.log(capstone.sparc.Y); //> 86
 * console.log(cs.name(capstone.sparc.Y)); //> "y"
 *
 * cs.close();
 * ```
 *
 * @name REG
 * @enum
 * @memberOf sparc
 */
var regs = [
    "INVALID",

    "F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7",
    "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15",
    "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23",
    "F24", "F25", "F26", "F27", "F28", "F29", "F30", "F31",
    "F32", "F34", "F36", "F38", "F40", "F42", "F44", "F46",
    "F48", "F50", "F52", "F54", "F56", "F58", "F60", "F62",

    // Floating condition codes
    "FCC0", "FCC1", "FCC2", "FCC3",

    "FP",
    "G0", "G1", "G2", "G3", "G4", "G5", "G6", "G7",
    "I0", "I1", "I2", "I3", "I4", "I5", "I7",

    // Integer condition codes
    "ICC",

    "L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7",
    "O0", "O1", "O2", "O3", "O4", "O5", "O7",

    "SP",
    "Y",
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});

exports.REG_MAX = regs.length; // <-- mark the end of the list of registers

// alias registers
exports.REG_O6 = exports.REG_SP;
exports.REG_I6 = exports.REG_FP;


/**
 * Sparc instruction IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_SPARC, capstone.MODE_BIG_ENDIAN);
 *
 * console.log(capstone.sparc.INS_ADD); //> 6
 * console.log(cs.insn_name(capstone.sparc.INS_ADD)); //> "add"
 *
 * cs.close();
 * ```
 *
 * @name INS
 * @enum
 * @memberOf sparc
 */
var ins = [
    "INVALID",

    "ADDCC", "ADDX", "ADDXCC", "ADDXC", "ADDXCCC", "ADD", "ALIGNADDR",
    "ALIGNADDRL", "ANDCC", "ANDNCC", "ANDN", "AND", "ARRAY16", "ARRAY32",
    "ARRAY8", "BA", "B", "JMP", "BMASK", "FB", "BRGEZ", "BRGZ", "BRLEZ", "BRLZ",
    "BRNZ", "BRZ", "BSHUFFLE", "CALL", "CASX", "CAS", "CMASK16", "CMASK32",
    "CMASK8", "CMP", "EDGE16", "EDGE16L", "EDGE16LN", "EDGE16N", "EDGE32",
    "EDGE32L", "EDGE32LN", "EDGE32N", "EDGE8", "EDGE8L", "EDGE8LN", "EDGE8N",
    "FABSD", "FABSQ", "FABSS", "FADDD", "FADDQ", "FADDS", "FALIGNDATA", "FAND",
    "FANDNOT1", "FANDNOT1S", "FANDNOT2", "FANDNOT2S", "FANDS", "FCHKSM16",
    "FCMPD", "FCMPEQ16", "FCMPEQ32", "FCMPGT16", "FCMPGT32", "FCMPLE16",
    "FCMPLE32", "FCMPNE16", "FCMPNE32", "FCMPQ", "FCMPS", "FDIVD", "FDIVQ",
    "FDIVS", "FDMULQ", "FDTOI", "FDTOQ", "FDTOS", "FDTOX", "FEXPAND", "FHADDD",
    "FHADDS", "FHSUBD", "FHSUBS", "FITOD", "FITOQ", "FITOS", "FLCMPD", "FLCMPS",
    "FLUSHW", "FMEAN16", "FMOVD", "FMOVQ", "FMOVRDGEZ", "FMOVRQGEZ",
    "FMOVRSGEZ", "FMOVRDGZ", "FMOVRQGZ", "FMOVRSGZ", "FMOVRDLEZ", "FMOVRQLEZ",
    "FMOVRSLEZ", "FMOVRDLZ", "FMOVRQLZ", "FMOVRSLZ", "FMOVRDNZ", "FMOVRQNZ",
    "FMOVRSNZ", "FMOVRDZ", "FMOVRQZ", "FMOVRSZ", "FMOVS", "FMUL8SUX16",
    "FMUL8ULX16", "FMUL8X16", "FMUL8X16AL", "FMUL8X16AU", "FMULD",
    "FMULD8SUX16", "FMULD8ULX16", "FMULQ", "FMULS", "FNADDD", "FNADDS", "FNAND",
    "FNANDS", "FNEGD", "FNEGQ", "FNEGS", "FNHADDD", "FNHADDS", "FNOR", "FNORS",
    "FNOT1", "FNOT1S", "FNOT2", "FNOT2S", "FONE", "FONES", "FOR", "FORNOT1",
    "FORNOT1S", "FORNOT2", "FORNOT2S", "FORS", "FPACK16", "FPACK32", "FPACKFIX",
    "FPADD16", "FPADD16S", "FPADD32", "FPADD32S", "FPADD64", "FPMERGE",
    "FPSUB16", "FPSUB16S", "FPSUB32", "FPSUB32S", "FQTOD", "FQTOI", "FQTOS",
    "FQTOX", "FSLAS16", "FSLAS32", "FSLL16", "FSLL32", "FSMULD", "FSQRTD",
    "FSQRTQ", "FSQRTS", "FSRA16", "FSRA32", "FSRC1", "FSRC1S", "FSRC2",
    "FSRC2S", "FSRL16", "FSRL32", "FSTOD", "FSTOI", "FSTOQ", "FSTOX", "FSUBD",
    "FSUBQ", "FSUBS", "FXNOR", "FXNORS", "FXOR", "FXORS", "FXTOD", "FXTOQ",
    "FXTOS", "FZERO", "FZEROS", "JMPL", "LDD", "LD", "LDQ", "LDSB", "LDSH",
    "LDSW", "LDUB", "LDUH", "LDX", "LZCNT", "MEMBAR", "MOVDTOX", "MOV",
    "MOVRGEZ", "MOVRGZ", "MOVRLEZ", "MOVRLZ", "MOVRNZ", "MOVRZ", "MOVSTOSW",
    "MOVSTOUW", "MULX", "NOP", "ORCC", "ORNCC", "ORN", "OR", "PDIST", "PDISTN",
    "POPC", "RD", "RESTORE", "RETT", "SAVE", "SDIVCC", "SDIVX", "SDIV", "SETHI",
    "SHUTDOWN", "SIAM", "SLLX", "SLL", "SMULCC", "SMUL", "SRAX", "SRA", "SRLX",
    "SRL", "STBAR", "STB", "STD", "ST", "STH", "STQ", "STX", "SUBCC", "SUBX",
    "SUBXCC", "SUB", "SWAP", "TA", "TADDCCTV", "TADDCC", "T", "TSUBCCTV",
    "TSUBCC", "UDIVCC", "UDIVX", "UDIV", "UMULCC", "UMULXHI", "UMUL", "UNIMP",
    "FCMPED", "FCMPEQ", "FCMPES", "WR", "XMULX", "XMULXHI", "XNORCC", "XNOR",
    "XORCC", "XOR",
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});

exports.INS_MAX = ins.length; // mark the end of the list of insn


/**
 * Sparc instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf sparc
 */
var groups = [
    "INVALID",

    "HARDQUAD", "V9", "VIS", "VIS2", "VIS3", "32BIT", "64BIT",

    "JUMP", // all jump instructions (conditional+direct+indirect jumps)
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});

exports.GRP_MAX = groups.length; // <-- mark the end of the list of groups


/**
 * Sparc condition codes.
 *
 * Name | Description
 * -----|------------
 * CC_ICC_A | Integer Always
 * CC_ICC_N | Integer Never
 * CC_ICC_NE | Integer Not Equal
 * CC_ICC_E | Integer Equal
 * CC_ICC_G | Integer Greater
 * CC_ICC_LE | Integer Integer Less or Equal
 * CC_ICC_GE | Integer Greater or Equal
 * CC_ICC_L | Integer Less
 * CC_ICC_GU | Integer Greater Unsigned
 * CC_ICC_LEU | Integer Less or Equal Unsigned
 * CC_ICC_CC | Integer Carry Clear/Great or Equal Unsigned
 * CC_ICC_CS | Integer Carry Set/Less Unsigned
 * CC_ICC_POS | Integer Positive
 * CC_ICC_NEG | Integer Negative
 * CC_ICC_VC | Integer Overflow Clear
 * CC_ICC_VS | Integer Overflow Set
 * CC_FCC_A | Floating Always
 * CC_FCC_N | Floating Never
 * CC_FCC_U | Floating Unordered
 * CC_FCC_G | Floating Greater
 * CC_FCC_UG | Floating Unordered or Greater
 * CC_FCC_L | Floating Less
 * CC_FCC_UL | Floating Unordered or Less
 * CC_FCC_LG | Floating Less or Greater
 * CC_FCC_NE | Floating Not Equal
 * CC_FCC_E | Floating Equal
 * CC_FCC_UE | Floating Unordered or Equal
 * CC_FCC_GE | Floating Greater or Equal
 * CC_FCC_UGE | Floating Unordered or Greater or Equal
 * CC_FCC_LE | Floating Less or Equal
 * CC_FCC_ULE | Floating Unordered or Less or Equal
 * CC_FCC_O | Floating Ordered
 *
 * @name CC
 * @enum
 * @memberOf sparc
 */
var cc = [
    //> Integer condition codes
    "ICC_N", "ICC_E", "ICC_LE", "ICC_L",
    "ICC_LEU", "ICC_CS", "ICC_NEG", "ICC_VS",
    "ICC_A", "ICC_NE", "ICC_G", "ICC_GE",
    "ICC_GU", "ICC_CC", "ICC_POS", "ICC_VC",

    //> Floating condition codes
    "FCC_N", "FCC_NE", "FCC_LG", "FCC_UL",
    "FCC_L", "FCC_UG", "FCC_G", "FCC_U",
    "FCC_A", "FCC_E", "FCC_UE", "FCC_GE",
    "FCC_UGE", "FCC_LE", "FCC_ULE", "FCC_O",
];
cc.forEach(function (code, i) {
    exports["CC_" + code] = i + 256;
});

exports.CC_INVALID = 0;

/**
 * Sparc branch hints.
 *
 * Name | Description
 * -----|------------
 *
 * HINT_INVALID | No hint
 * HINT_A | Annul delay slot instruction
 * HINT_PT | Branch taken
 * HINT_PN | Branch NOT taken
 *
 * @name HINT
 * @enum
 * @memberOf sparc
 */
exports.HINT_INVALID    = 0;
exports.HINT_A          = 1 << 0;
exports.HINT_PT         = 1 << 1;
exports.HINT_PN         = 1 << 2;


/**
 * Sparc operand types.
 *
 * Name | Description
 * -----|------------
 * OP_INVALID | Uninitialized operand
 * OP_REG | Register operand
 * OP_IMM | Immediate operand
 * OP_MEM | Memory operand
 *
 * @name OP
 * @enum
 * @memberOf sparc
 */
exports.OP_INVALID  = 0;
exports.OP_REG      = 1;
exports.OP_IMM      = 2;
exports.OP_MEM      = 3;


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
        "imm"   : "int32",  // immediate value for IMM operand
        "mem"   : new StructType({
            "base"  : "uint8",  // base register
            "index" : "uint8",  // index register
            "disp"  : "int32",  // displacement/offset value
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

    // branch hint: encoding as bitwise OR of sparc.HINT_*
    "hint"      : "int",

    // Number of operands of this instruction,
    // or 0 when instruction has no operand.
    "op_count"  : "uint8",

    // operands for this instruction.
    "operands"  : new ArrayType(OperandType, 4),
});


/**
 * Native instruction detail struct.
 * @name _load
 * @function
 * @memberOf sparc._DetailType
 * @ignore
 * @param {sparc._Detail} source JavaScript detail structure.
 */
Object.defineProperty(exports._DetailType, "_load", {
    "value" : function (source) {
        this.cc         = source.cc;
        this.hint       = source.hint;
        this.operands   = [];

        for (var i = 0; i < 4; i++) {
            var mem = this.operands[i].data.mem;

            mem.base    = 0;
            mem.index   = 0;
            mem.disp    = 0;
        }

        for (var j = 0; j < source.operands.length; j++) {
            var operand = source.operands[j];
            var type = this.operands[j].type = operand.type;
            var data = this.operands[j].data;

            switch (type) {
            case exports.OP_REG:
                data.reg = operand.reg;
                break;

            case exports.OP_IMM:
                data.imm = operand.imm;
                break;

            case exports.OP_MEM:
                data.mem.base   = operand.mem.base;
                data.mem.index  = operand.mem.index;
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
 * @param {sparc._DetailType} source Native detail structure.
 */
exports._Detail = function (source) {
    this.cc         = source.cc;
    this.hint       = source.hint;
    this.operands   = [];

    for (var i = 0; i < source.op_count; i++) {
        var type = source.operands[i].type;
        var data = source.operands[i].data;

        var operand = {
            "type"  : type,
        };

        switch (type) {
        case exports.OP_REG:
            operand.reg = data.reg;
            break;

        case exports.OP_IMM:
            operand.imm = data.imm;
            break;

        case exports.OP_MEM:
            operand.mem = {
                "base"  : data.mem.base,
                "index" : data.mem.index,
                "disp"  : data.mem.disp,
            };
            break;
        }

        this.operands.push(operand);
    }
};
