var ArrayType = require("ref-array");
var StructType = require("ref-struct");
var UnionType = require("ref-union");


/**
 * ARM64 register IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
 *
 * console.log(capstone.arm64.REG_LR); //> 225
 * console.log(cs.reg_name(capstone.arm64.REG_LR)); //> "x30"
 *
 * cs.close();
 * ```
 *
 * @name REG
 * @enum
 * @memberOf arm64
 */
var regs = [
    "INVALID",

    "NZCV", "WSP", "WZR", "SP", "XZR",
    "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7",
    "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15",
    "B16", "B17", "B18", "B19", "B20", "B21", "B22", "B23",
    "B24", "B25", "B26", "B27", "B28", "B29", "B30", "B31",
    "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7",
    "D8", "D9", "D10", "D11", "D12", "D13", "D14", "D15",
    "D16", "D17", "D18", "D19", "D20", "D21", "D22", "D23",
    "D24", "D25", "D26", "D27", "D28", "D29", "D30", "D31",
    "H0", "H1", "H2", "H3", "H4", "H5", "H6", "H7",
    "H8", "H9", "H10", "H11", "H12", "H13", "H14", "H15",
    "H16", "H17", "H18", "H19", "H20", "H21", "H22", "H23",
    "H24", "H25", "H26", "H27", "H28", "H29", "H30", "H31",
    "Q0", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7",
    "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15",
    "Q16", "Q17", "Q18", "Q19", "Q20", "Q21", "Q22", "Q23",
    "Q24", "Q25", "Q26", "Q27", "Q28", "Q29", "Q30", "Q31",
    "S0", "S1", "S2", "S3", "S4", "S5", "S6", "S7",
    "S8", "S9", "S10", "S11", "S12", "S13", "S14", "S15",
    "S16", "S17", "S18", "S19", "S20", "S21", "S22", "S23",
    "S24", "S25", "S26", "S27", "S28", "S29", "S30", "S31",
    "W0", "W1", "W2", "W3", "W4", "W5", "W6", "W7",
    "W8", "W9", "W10", "W11", "W12", "W13", "W14", "W15",
    "W16", "W17", "W18", "W19", "W20", "W21", "W22", "W23",
    "W24", "W25", "W26", "W27", "W28", "W29", "W30",
    "X0", "X1", "X2", "X3", "X4", "X5", "X6", "X7",
    "X8", "X9", "X10", "X11", "X12", "X13", "X14", "X15",
    "X16", "X17", "X18", "X19", "X20", "X21", "X22", "X23",
    "X24", "X25", "X26", "X27", "X28", "X29", "X30",
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});

exports.REG_MAX = regs.length; // <-- mark the end of the list of registers

//> alias registers
exports.REG_IP1 = exports.REG_X16;
exports.REG_IP0 = exports.REG_X17;
exports.REG_FP  = exports.REG_X29;
exports.REG_LR  = exports.REG_X30;


/**
 * ARM64 instruction IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);
 *
 * console.log(capstone.arm64.INS_AND); //> 15
 * console.log(cs.insn_name(capstone.arm64.INS_AND)); //> "and"
 *
 * cs.close();
 * ```
 *
 * @name INS
 * @enum
 * @memberOf arm64
 */
var ins = [
    "INVALID",

    "ABS", "ADC", "ADDHN2", "ADDHN", "ADDP", "ADDV", "ADD", "CMN", "ADRP",
    "ADR", "AESD", "AESE", "AESIMC", "AESMC", "AND", "ASR", "AT", "BFI", "BFM",
    "BFXIL", "BIC", "BIF", "BIT", "BLR", "BL", "BRK", "BR", "BSL", "B", "CBNZ",
    "CBZ", "CCMN", "CCMP", "CLREX", "CLS", "CLZ", "CMEQ", "CMGE", "CMGT",
    "CMHI", "CMHS", "CMLE", "CMLT", "CMP", "CMTST", "CNT", "CRC32B", "CRC32CB",
    "CRC32CH", "CRC32CW", "CRC32CX", "CRC32H", "CRC32W", "CRC32X", "CSEL",
    "CSINC", "CSINV", "CSNEG", "DCPS1", "DCPS2", "DCPS3", "DC", "DMB", "DRPS",
    "DSB", "DUP", "EON", "EOR", "ERET", "EXTR", "EXT", "FABD", "FABS", "FACGE",
    "FACGT", "FADDP", "FADD", "FCCMPE", "FCCMP", "FCMEQ", "FCMGE", "FCMGT",
    "FCMLE", "FCMLT", "FCMP", "FCMPE", "FCSEL", "FCVTAS", "FCVTAU", "FCVTL",
    "FCVTL2", "FCVTMS", "FCVTMU", "FCVTN", "FCVTN2", "FCVTNS", "FCVTNU",
    "FCVTPS", "FCVTPU", "FCVTXN", "FCVTXN2", "FCVTZS", "FCVTZU", "FCVT", "FDIV",
    "FMADD", "FMAXNMP", "FMAXNMV", "FMAXNM", "FMAXP", "FMAXV", "FMAX",
    "FMINNMP", "FMINNMV", "FMINNM", "FMINP", "FMINV", "FMIN", "FMLA", "FMLS",
    "FMOV", "FMSUB", "FMULX", "FMUL", "FNEG", "FNMADD", "FNMSUB", "FNMUL",
    "FRECPE", "FRECPS", "FRECPX", "FRINTA", "FRINTI", "FRINTM", "FRINTN",
    "FRINTP", "FRINTX", "FRINTZ", "FRSQRTE", "FRSQRTS", "FSQRT", "FSUB", "HINT",
    "HLT", "HVC", "IC", "INS", "ISB", "LD1", "LD1R", "LD2", "LD2R", "LD3",
    "LD3R", "LD4", "LD4R", "LDARB", "LDAR", "LDARH", "LDAXP", "LDAXRB", "LDAXR",
    "LDAXRH", "LDPSW", "LDRSB", "LDURSB", "LDRSH", "LDURSH", "LDRSW", "LDR",
    "LDTRSB", "LDTRSH", "LDTRSW", "LDURSW", "LDXP", "LDXRB", "LDXR", "LDXRH",
    "LDRH", "LDURH", "STRH", "STURH", "LDTRH", "STTRH", "LDUR", "STR", "STUR",
    "LDTR", "STTR", "LDRB", "LDURB", "STRB", "STURB", "LDTRB", "STTRB", "LDP",
    "LDNP", "STNP", "STP", "LSL", "LSR", "MADD", "MLA", "MLS", "MOVI", "MOVK",
    "MOVN", "MOVZ", "MRS", "MSR", "MSUB", "MUL", "MVNI", "MVN", "NEG", "NOT",
    "ORN", "ORR", "PMULL2", "PMULL", "PMUL", "PRFM", "PRFUM", "SQRSHRUN2",
    "SQRSHRUN", "SQSHRUN2", "SQSHRUN", "RADDHN2", "RADDHN", "RBIT", "RET",
    "REV16", "REV32", "REV64", "REV", "ROR", "RSHRN2", "RSHRN", "RSUBHN2",
    "RSUBHN", "SABAL2", "SABAL", "SABA", "SABDL2", "SABDL", "SABD", "SADALP",
    "SADDL2", "SADDLP", "SADDLV", "SADDL", "SADDW2", "SADDW", "SBC", "SBFIZ",
    "SBFM", "SBFX", "SCVTF", "SDIV", "SHA1C", "SHA1H", "SHA1M", "SHA1P",
    "SHA1SU0", "SHA1SU1", "SHA256H", "SHA256H2", "SHA256SU0", "SHA256SU1",
    "SHADD", "SHLL2", "SHLL", "SHL", "SHRN2", "SHRN", "SHSUB", "SLI", "SMADDL",
    "SMAXP", "SMAXV", "SMAX", "SMC", "SMINP", "SMINV", "SMIN", "SMLAL2",
    "SMLAL", "SMLSL2", "SMLSL", "SMOV", "SMSUBL", "SMULH", "SMULL2", "SMULL",
    "SQABS", "SQADD", "SQDMLAL2", "SQDMLAL", "SQDMLSL2", "SQDMLSL", "SQDMULH",
    "SQDMULL2", "SQDMULL", "SQNEG", "SQRDMULH", "SQRSHL", "SQRSHRN", "SQRSHRN2",
    "SQSHLU", "SQSHL", "SQSHRN", "SQSHRN2", "SQSUB", "SQXTN", "SQXTN2",
    "SQXTUN", "SQXTUN2", "SRHADD", "SRI", "SRSHL", "SRSHR", "SRSRA", "SSHLL2",
    "SSHLL", "SSHL", "SSHR", "SSRA", "SSUBL2", "SSUBL", "SSUBW2", "SSUBW",
    "ST1", "ST2", "ST3", "ST4", "STLRB", "STLR", "STLRH", "STLXP", "STLXRB",
    "STLXR", "STLXRH", "STXP", "STXRB", "STXR", "STXRH", "SUBHN2", "SUBHN",
    "SUB", "SUQADD", "SVC", "SXTB", "SXTH", "SXTW", "SYSL", "SYS", "TBL",
    "TBNZ", "TBX", "TBZ", "TLBI", "TRN1", "TRN2", "TST", "UABAL2", "UABAL",
    "UABA", "UABDL2", "UABDL", "UABD", "UADALP", "UADDL2", "UADDLP", "UADDLV",
    "UADDL", "UADDW2", "UADDW", "UBFIZ", "UBFM", "UBFX", "UCVTF", "UDIV",
    "UHADD", "UHSUB", "UMADDL", "UMAXP", "UMAXV", "UMAX", "UMINP", "UMINV",
    "UMIN", "UMLAL2", "UMLAL", "UMLSL2", "UMLSL", "UMOV", "UMSUBL", "UMULH",
    "UMULL2", "UMULL", "UQADD", "UQRSHL", "UQRSHRN", "UQRSHRN2", "UQSHL",
    "UQSHRN", "UQSHRN2", "UQSUB", "UQXTN", "UQXTN2", "URECPE", "URHADD",
    "URSHL", "URSHR", "URSQRTE", "URSRA", "USHLL2", "USHLL", "USHL", "USHR",
    "USQADD", "USRA", "USUBL2", "USUBL", "USUBW2", "USUBW", "UXTB", "UXTH",
    "UZP1", "UZP2", "XTN", "XTN2", "ZIP1", "ZIP2",

    //> some alias instructions
    "MNEG", "UMNEGL", "SMNEGL", "MOV", "NOP", "YIELD", "WFE", "WFI", "SEV",
    "SEVL", "NGC",
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});

exports.INS_MAX = ins.length; // mark the end of the list of insn


/**
 * ARM64 instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf arm64
 */
var groups = [
    "INVALID",

    "CRYPTO", "FPARMV8", "NEON",

    "JUMP", // all jump instructions (conditional+direct+indirect jumps)
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});

exports.GRP_MAX = groups.length; // <-- mark the end of the list of groups


/**
 * ARM64 shift type.
 *
 * Name | Description
 * -----|------------
 * SFT_INVALID | Invalid
 * SFT_LSL | Logical Shift Left
 * SFT_MSL | Masked Shift Left
 * SFT_LSR | Logical Shift Right
 * SFT_ASR | Arithmetic Shift Right
 * SFT_ROR | ROtate Right
 *
 * @name SFT
 * @enum
 * @memberOf arm64
 */
var sft = [
    "INVALID",
    "LSL", "MSL", "LSR", "ASR", "ROR",
];
sft.forEach(function (type, i) {
    exports["SFT_" + type] = i;
});


/**
 * ARM64 extender type.
 *
 * Name | Description
 * -----|------------
 * EXT_INVALID | Invalid
 * EXT_UXTB | Unsigned EXtend Byte
 * EXT_UXTH | Unsigned EXtend Halfword
 * EXT_UXTW | Unsigned EXtend Word
 * EXT_UXTX | Unsigned EXtend doubleword
 * EXT_SXTB | Signed EXtend Byte
 * EXT_SXTH | Signed EXtend Halfword
 * EXT_SXTW | Signed EXtend Word
 * EXT_SXTX | Signed EXtend doubleword
 *
 * @name EXT
 * @enum
 * @memberOf arm64
 */
var ext = [
    "INVALID",
    "UXTB", "UXTH", "UXTW", "UXTX",
    "SXTB", "SXTH", "SXTW", "SXTX",
];
ext.forEach(function (type, i) {
    exports["EXT_" + type] = i;
});


/**
 * ARM64 condition code.
 *
 * Name | Description | Flags Tested
 * -----|-------------|-------------
 * CC_INVALID | Invalid | N/A
 * CC_EQ | EQual | Z==1
 * CC_NE | Not Equal | Z==0
 * CC_HS | unsigned Higher or Same (or carry set) | C==1
 * CC_LO | unsigned LOwer (or carry clear) | C==0
 * CC_MI | negative (MInus) | N==1
 * CC_PL | position (PLus) | N==0
 * CC_VS | signed overflow (V Set) | V==1
 * CC_VC | not signed overflow (V Clear) | V==0
 * CC_HI | signed HIgher | C==1 && Z==0
 * CC_LS | signed Lower or Same | C==0 || Z==1
 * CC_GE | signed Greater than or Equal to | N==V
 * CC_LT | signed Less Than | N!=V
 * CC_GT | signed Greater Than | Z==0 && N==V
 * CC_LE | signed Less than or Equal to | Z==1 || N!=V
 * CC_AL | ALways | N/A
 * CC_NV | always (NV exists purely to disassemble 0b1111.) | N/A
 *
 * @name CC
 * @enum
 * @memberOf arm64
 */
var cc = [
    "INVALID",
    "EQ", "NE", "HS", "LO", "MI", "PL", "VS", "VC",
    "HI", "LS", "GE", "LT", "GT", "LE",
    "AL", "NV",
];
cc.forEach(function (type, i) {
    exports["CC_" + type] = i;
});


/**
 * ARM64 operand types.
 *
 * Name | Description
 * -----|------------
 * OP_INVALID | Uninitialized operand
 * OP_REG | Register operand
 * OP_CIMM | C-Immediate
 * OP_IMM | Immediate operand
 * OP_FP | Floating-Point immediate operand
 * OP_MEM | Memory operand
 *
 * @name OP
 * @enum
 * @memberOf arm64
 */
exports.OP_INVALID  = 0;
exports.OP_REG      = 1;
exports.OP_CIMM     = 2;
exports.OP_IMM      = 3;
exports.OP_FP       = 4;
exports.OP_MEM      = 5;


/**
 * Native instruction operand structure.
 * @name OperandType
 * @class
 * @ignore
 */
var OperandType = new StructType({
    "shift" : new StructType({
        "type"  : "int",    // shifter type of this operand
        "value" : "uint",   // shifter value of this operand
    }),
    "ext"   : "int",        // extender type of this operand
    "type"  : "int",        // operand type
    "data"  : new UnionType({
        "reg"   : "uint",   // register value for REG operand
        "imm"   : "int32",  // immediate value, or index for C-IMM/IMM operand
        "fp"    : "double", // floating point value for FP operand
        "mem"   : new StructType({
            "base"  : "uint",   // base register
            "index" : "uint",   // index register
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
    // conditional code for this insn
    "cc"            : "int",

    // does this insn update flags?
    "update_flags"  : "bool",

    // does this insn request writeback? 'True' means 'yes'
    "writeback"     : "bool",

    // Number of operands of this instruction,
    // or 0 when instruction has no operand.
    "op_count"      : "uint8",

    // operands for this instruction.
    "operands"      : new ArrayType(OperandType, 8),
});

/**
 * Native instruction detail struct.
 * @name _load
 * @function
 * @memberOf arm64._DetailType
 * @ignore
 * @param {arm64._Detail} source JavaScript detail structure.
 */
Object.defineProperty(exports._DetailType, "_load", {
    "value" : function (source) {
        this.cc             = source.cc;
        this.update_flags   = source.update_flags;
        this.writeback      = source.writeback;
        this.operands       = [];

        for (var i = 0; i < 8; i++) {
            var mem = this.operands[i].data.mem;

            mem.base    = 0;
            mem.index   = 0;
            mem.disp    = 0;
        }

        for (var j = 0; j < source.operands.length; j++) {
            var operand = source.operands[j];
            var shift = this.operands[j].shift;
            var type = this.operands[j].type = operand.type;
            var data = this.operands[j].data;

            shift.type  = operand.shift.type;
            shift.value = operand.shift.value;
            this.operands[j].ext = operand.ext;

            switch (type) {
            case exports.OP_REG:
                data.reg = operand.reg;
                break;

            case exports.OP_CIMM:
            case exports.OP_IMM:
                data.imm = operand.imm;
                break;

            case exports.OP_FP:
                data.fp = operand.fp;
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
 * @param {arm64._DetailType} source Native detail structure.
 */
exports._Detail = function (source) {
    this.cc             = source.cc;
    this.update_flags   = source.update_flags;
    this.writeback      = source.writeback;
    this.operands       = [];

    for (var i = 0; i < source.op_count; i++) {
        var shift = source.operands[i].shift;
        var type = source.operands[i].type;
        var data = source.operands[i].data;

        var operand = {
            "shift" : {
                "type"  : shift.type,
                "value" : shift.value,
            },
            "ext"   : source.operands[i].ext,
            "type"  : type,
        };

        switch (type) {
        case exports.OP_REG:
            operand.reg = data.reg;
            break;

        case exports.OP_CIMM:
        case exports.OP_IMM:
            operand.imm = data.imm;
            break;

        case exports.OP_FP:
            operand.fp = data.fp;
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
