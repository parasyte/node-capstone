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

    "X29", "X30", "NZCV", "SP", "WSP", "WZR", "XZR",
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
    "X24", "X25", "X26", "X27", "X28",
    "V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7",
    "V8", "V9", "V10", "V11", "V12", "V13", "V14", "V15",
    "V16", "V17", "V18", "V19", "V20", "V21", "V22", "V23",
    "V24", "V25", "V26", "V27", "V28", "V29", "V30", "V31",

    "ENDING", // <-- mark the end of the list of registers
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});

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

    "ABS", "ADC", "ADDHN", "ADDHN2", "ADDP", "ADD", "ADDV", "ADR", "ADRP",
    "AESD", "AESE", "AESIMC", "AESMC", "AND", "ASR", "B", "BFM",
    "BIC", "BIF", "BIT", "BL", "BLR", "BR", "BRK", "BSL", "CBNZ",
    "CBZ", "CCMN", "CCMP", "CLREX", "CLS", "CLZ", "CMEQ", "CMGE", "CMGT",
    "CMHI", "CMHS", "CMLE", "CMLT", "CMTST", "CNT", "MOV", "CRC32B", "CRC32CB",
    "CRC32CH", "CRC32CW", "CRC32CX", "CRC32H", "CRC32W", "CRC32X", "CSEL",
    "CSINC", "CSINV", "CSNEG", "DCPS1", "DCPS2", "DCPS3", "DMB", "DRPS",
    "DSB", "DUP", "EON", "EOR", "ERET", "EXTR", "EXT", "FABD", "FABS", "FACGE",
    "FACGT", "FADD", "FADDP", "FCCMP", "FCCMPE", "FCMEQ", "FCMGE", "FCMGT",
    "FCMLE", "FCMLT", "FCMP", "FCMPE", "FCSEL", "FCVTAS", "FCVTAU", "FCVT",
    "FCVTL", "FCVTL2", "FCVTMS", "FCVTMU", "FCVTNS", "FCVTNU", "FCVTN",
    "FCVTN2", "FCVTPS", "FCVTPU", "FCVTXN", "FCVTXN2", "FCVTZS", "FCVTZU",
    "FDIV", "FMADD", "FMAX", "FMAXNM", "FMAXNMP", "FMAXNMV", "FMAXP", "FMAXV",
    "FMIN", "FMINNM", "FMINNMP", "FMINNMV", "FMINP", "FMINV", "FMLA", "FMLS",
    "FMOV", "FMSUB", "FMUL", "FMULX", "FNEG", "FNMADD", "FNMSUB", "FNMUL",
    "FRECPE", "FRECPS", "FRECPX", "FRINTA", "FRINTI", "FRINTM", "FRINTN",
    "FRINTP", "FRINTX", "FRINTZ", "FRSQRTE", "FRSQRTS", "FSQRT", "FSUB", "HINT",
    "HLT", "HVC", "INS", "ISB", "LD1", "LD1R", "LD2R", "LD2", "LD3R", "LD3",
    "LD4", "LD4R", "LDARB", "LDARH", "LDAR", "LDAXP", "LDAXRB", "LDAXRH",
    "LDAXR", "LDNP", "LDP", "LDPSW", "LDRB", "LDR", "LDRH", "LDRSB",
    "LDRSH", "LDRSW", "LDTRB", "LDTRH", "LDTRSB", "LDTRSH", "LDTRSW", "LDTR",
    "LDURB", "LDUR", "LDURH", "LDURSB", "LDURSH", "LDURSW", "LDXP", "LDXRB",
    "LDXRH", "LDXR", "LSL", "LSR", "MADD", "MLA", "MLS", "MOVI", "MOVK",
    "MOVN", "MOVZ", "MRS", "MSR", "MSUB", "MUL", "MVNI", "NEG", "NOT",
    "ORN", "ORR", "PMULL2", "PMULL", "PMUL", "PRFM", "PRFUM", "RADDHN",
    "RADDHN2", "RBIT", "RET", "REV16", "REV32", "REV64", "REV", "ROR",
    "RSHRN2", "RSHRN", "RSUBHN", "RSUBHN2", "SABAL2", "SABAL", "SABA", "SABDL2",
    "SABDL", "SABD", "SADALP", "SADDLP", "SADDLV", "SADDL2", "SADDL", "SADDW2",
    "SADDW", "SBC", "SBFM", "SCVTF", "SDIV", "SHA1C", "SHA1H", "SHA1M", "SHA1P",
    "SHA1SU0", "SHA1SU1", "SHA256H2", "SHA256H", "SHA256SU0", "SHA256SU1",
    "SHADD", "SHLL2", "SHLL", "SHL", "SHRN2", "SHRN", "SHSUB", "SLI", "SMADDL",
    "SMAXP", "SMAXV", "SMAX", "SMC", "SMINP", "SMINV", "SMIN", "SMLAL2",
    "SMLAL", "SMLSL2", "SMLSL", "SMOV", "SMSUBL", "SMULH", "SMULL2", "SMULL",
    "SQABS", "SQADD", "SQDMLAL", "SQDMLAL2", "SQDMLSL", "SQDMLSL2", "SQDMULH",
    "SQDMULL", "SQDMULL2", "SQNEG", "SQRDMULH", "SQRSHL", "SQRSHRN", "SQRSHRN2",
    "SQRSHRUN", "SQRSHRUN2", "SQSHLU", "SQSHL", "SQSHRN", "SQSHRN2", "SQSHRUN",
    "SQSHRUN2", "SQSUB", "SQXTN2", "SQXTN", "SQXTUN2", "SQXTUN", "SRHADD",
    "SRI", "SRSHL", "SRSHR", "SRSRA", "SSHLL2", "SSHLL", "SSHL", "SSHR", "SSRA",
    "SSUBL2", "SSUBL", "SSUBW2", "SSUBW", "ST1", "ST2", "ST3", "ST4", "STLRB",
    "STLRH", "STLR", "STLXP", "STLXRB", "STLXRH", "STLXR", "STNP", "STP",
    "STRB", "STR", "STRH", "STTRB", "STTRBH", "STTR", "STURB", "STUR", "STURH",
    "STXP", "STXRB", "STXRH", "STXR", "SUBHN", "SUBHN2", "SUB", "SUQADD", "SVC",
    "SYSL", "SYS", "TBL", "TBNZ", "TBX", "TBZ", "TRN1", "TRN2", "UABAL2",
    "UABAL", "UABA", "UABDL2", "UABDL", "UABD", "UADALP", "UADDLP", "UADDLV",
    "UADDL2", "UADDL", "UADDW2", "UADDW", "UBFM", "UCVTF", "UDIV",
    "UHADD", "UHSUB", "UMADDL", "UMAXP", "UMAXV", "UMAX", "UMINP", "UMINV",
    "UMIN", "UMLAL2", "UMLAL", "UMLSL2", "UMLSL", "UMOV", "UMSUBL", "UMULH",
    "UMULL2", "UMULL", "UQADD", "UQRSHL", "UQRSHRN", "UQRSHRN2", "UQSHL",
    "UQSHRN", "UQSHRN2", "UQSUB", "UQXTN2", "UQXTN", "URECPE", "URHADD",
    "URSHL", "URSHR", "URSQRTE", "URSRA", "USHLL2", "USHLL", "USHL", "USHR",
    "USQADD", "USRA", "USUBL2", "USUBL", "USUBW2", "USUBW",
    "UZP1", "UZP2", "XTN2", "XTN", "ZIP1", "ZIP2",

    //> some alias instructions
    "MNEG", "UMNEGL", "SMNEGL", "NOP", "YIELD", "WFE", "WFI", "SEV", "SEVL",
    "NGC", "SBFIZ", "UBFIZ", "SBFX", "UBFX", "BFI", "BFXIL", "CMN", "MVN",
	"TST", "CSET", "CINC", "CSETM", "CINV", "CNEG", "SXTB", "SXTH", "SXTW",
	"CMP", "UXTB", "UXTH", "UXTW", "IC", "DC", "AT", "TLBI",

    "ENDING", // <-- mark the end of the list of instructions
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});


/**
 * ARM64 instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf arm64
 */
var groups = [
    "INVALID",
    "JUMP", // all jump instructions (conditional+direct+indirect jumps)
];

var arch_groups = [
    "CRYPTO", "FPARMV8", "NEON", "CRC",

    "ENDING", // <-- mark the end of the list of groups
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});
arch_groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i + 128;
});


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
 * ARM64 System registers.
 *
 * @name SYSREG
 * @enum
 * @memberOf arm64
 */
//> System registers for MRS
exports.SYSREG_INVALID           = 0;
exports.SYSREG_MDCCSR_EL0        = 0x9808; // 10  011  0000  0001  000
exports.SYSREG_DBGDTRRX_EL0      = 0x9828; // 10  011  0000  0101  000
exports.SYSREG_MDRAR_EL1         = 0x8080; // 10  000  0001  0000  000
exports.SYSREG_OSLSR_EL1         = 0x808c; // 10  000  0001  0001  100
exports.SYSREG_DBGAUTHSTATUS_EL1 = 0x83f6; // 10  000  0111  1110  110
exports.SYSREG_PMCEID0_EL0       = 0xdce6; // 11  011  1001  1100  110
exports.SYSREG_PMCEID1_EL0       = 0xdce7; // 11  011  1001  1100  111
exports.SYSREG_MIDR_EL1          = 0xc000; // 11  000  0000  0000  000
exports.SYSREG_CCSIDR_EL1        = 0xc800; // 11  001  0000  0000  000
exports.SYSREG_CLIDR_EL1         = 0xc801; // 11  001  0000  0000  001
exports.SYSREG_CTR_EL0           = 0xd801; // 11  011  0000  0000  001
exports.SYSREG_MPIDR_EL1         = 0xc005; // 11  000  0000  0000  101
exports.SYSREG_REVIDR_EL1        = 0xc006; // 11  000  0000  0000  110
exports.SYSREG_AIDR_EL1          = 0xc807; // 11  001  0000  0000  111
exports.SYSREG_DCZID_EL0         = 0xd807; // 11  011  0000  0000  111
exports.SYSREG_ID_PFR0_EL1       = 0xc008; // 11  000  0000  0001  000
exports.SYSREG_ID_PFR1_EL1       = 0xc009; // 11  000  0000  0001  001
exports.SYSREG_ID_DFR0_EL1       = 0xc00a; // 11  000  0000  0001  010
exports.SYSREG_ID_AFR0_EL1       = 0xc00b; // 11  000  0000  0001  011
exports.SYSREG_ID_MMFR0_EL1      = 0xc00c; // 11  000  0000  0001  100
exports.SYSREG_ID_MMFR1_EL1      = 0xc00d; // 11  000  0000  0001  101
exports.SYSREG_ID_MMFR2_EL1      = 0xc00e; // 11  000  0000  0001  110
exports.SYSREG_ID_MMFR3_EL1      = 0xc00f; // 11  000  0000  0001  111
exports.SYSREG_ID_ISAR0_EL1      = 0xc010; // 11  000  0000  0010  000
exports.SYSREG_ID_ISAR1_EL1      = 0xc011; // 11  000  0000  0010  001
exports.SYSREG_ID_ISAR2_EL1      = 0xc012; // 11  000  0000  0010  010
exports.SYSREG_ID_ISAR3_EL1      = 0xc013; // 11  000  0000  0010  011
exports.SYSREG_ID_ISAR4_EL1      = 0xc014; // 11  000  0000  0010  100
exports.SYSREG_ID_ISAR5_EL1      = 0xc015; // 11  000  0000  0010  101
exports.SYSREG_ID_A64PFR0_EL1    = 0xc020; // 11  000  0000  0100  000
exports.SYSREG_ID_A64PFR1_EL1    = 0xc021; // 11  000  0000  0100  001
exports.SYSREG_ID_A64DFR0_EL1    = 0xc028; // 11  000  0000  0101  000
exports.SYSREG_ID_A64DFR1_EL1    = 0xc029; // 11  000  0000  0101  001
exports.SYSREG_ID_A64AFR0_EL1    = 0xc02c; // 11  000  0000  0101  100
exports.SYSREG_ID_A64AFR1_EL1    = 0xc02d; // 11  000  0000  0101  101
exports.SYSREG_ID_A64ISAR0_EL1   = 0xc030; // 11  000  0000  0110  000
exports.SYSREG_ID_A64ISAR1_EL1   = 0xc031; // 11  000  0000  0110  001
exports.SYSREG_ID_A64MMFR0_EL1   = 0xc038; // 11  000  0000  0111  000
exports.SYSREG_ID_A64MMFR1_EL1   = 0xc039; // 11  000  0000  0111  001
exports.SYSREG_MVFR0_EL1         = 0xc018; // 11  000  0000  0011  000
exports.SYSREG_MVFR1_EL1         = 0xc019; // 11  000  0000  0011  001
exports.SYSREG_MVFR2_EL1         = 0xc01a; // 11  000  0000  0011  010
exports.SYSREG_RVBAR_EL1         = 0xc601; // 11  000  1100  0000  001
exports.SYSREG_RVBAR_EL2         = 0xe601; // 11  100  1100  0000  001
exports.SYSREG_RVBAR_EL3         = 0xf601; // 11  110  1100  0000  001
exports.SYSREG_ISR_EL1           = 0xc608; // 11  000  1100  0001  000
exports.SYSREG_CNTPCT_EL0        = 0xdf01; // 11  011  1110  0000  001
exports.SYSREG_CNTVCT_EL0        = 0xdf02;  // 11  011  1110  0000  010

// Trace registers
exports.SYSREG_TRCSTATR          = 0x8818; // 10  001  0000  0011  000
exports.SYSREG_TRCIDR8           = 0x8806; // 10  001  0000  0000  110
exports.SYSREG_TRCIDR9           = 0x880e; // 10  001  0000  0001  110
exports.SYSREG_TRCIDR10          = 0x8816; // 10  001  0000  0010  110
exports.SYSREG_TRCIDR11          = 0x881e; // 10  001  0000  0011  110
exports.SYSREG_TRCIDR12          = 0x8826; // 10  001  0000  0100  110
exports.SYSREG_TRCIDR13          = 0x882e; // 10  001  0000  0101  110
exports.SYSREG_TRCIDR0           = 0x8847; // 10  001  0000  1000  111
exports.SYSREG_TRCIDR1           = 0x884f; // 10  001  0000  1001  111
exports.SYSREG_TRCIDR2           = 0x8857; // 10  001  0000  1010  111
exports.SYSREG_TRCIDR3           = 0x885f; // 10  001  0000  1011  111
exports.SYSREG_TRCIDR4           = 0x8867; // 10  001  0000  1100  111
exports.SYSREG_TRCIDR5           = 0x886f; // 10  001  0000  1101  111
exports.SYSREG_TRCIDR6           = 0x8877; // 10  001  0000  1110  111
exports.SYSREG_TRCIDR7           = 0x887f; // 10  001  0000  1111  111
exports.SYSREG_TRCOSLSR          = 0x888c; // 10  001  0001  0001  100
exports.SYSREG_TRCPDSR           = 0x88ac; // 10  001  0001  0101  100
exports.SYSREG_TRCDEVAFF0        = 0x8bd6; // 10  001  0111  1010  110
exports.SYSREG_TRCDEVAFF1        = 0x8bde; // 10  001  0111  1011  110
exports.SYSREG_TRCLSR            = 0x8bee; // 10  001  0111  1101  110
exports.SYSREG_TRCAUTHSTATUS     = 0x8bf6; // 10  001  0111  1110  110
exports.SYSREG_TRCDEVARCH        = 0x8bfe; // 10  001  0111  1111  110
exports.SYSREG_TRCDEVID          = 0x8b97; // 10  001  0111  0010  111
exports.SYSREG_TRCDEVTYPE        = 0x8b9f; // 10  001  0111  0011  111
exports.SYSREG_TRCPIDR4          = 0x8ba7; // 10  001  0111  0100  111
exports.SYSREG_TRCPIDR5          = 0x8baf; // 10  001  0111  0101  111
exports.SYSREG_TRCPIDR6          = 0x8bb7; // 10  001  0111  0110  111
exports.SYSREG_TRCPIDR7          = 0x8bbf; // 10  001  0111  0111  111
exports.SYSREG_TRCPIDR0          = 0x8bc7; // 10  001  0111  1000  111
exports.SYSREG_TRCPIDR1          = 0x8bcf; // 10  001  0111  1001  111
exports.SYSREG_TRCPIDR2          = 0x8bd7; // 10  001  0111  1010  111
exports.SYSREG_TRCPIDR3          = 0x8bdf; // 10  001  0111  1011  111
exports.SYSREG_TRCCIDR0          = 0x8be7; // 10  001  0111  1100  111
exports.SYSREG_TRCCIDR1          = 0x8bef; // 10  001  0111  1101  111
exports.SYSREG_TRCCIDR2          = 0x8bf7; // 10  001  0111  1110  111
exports.SYSREG_TRCCIDR3          = 0x8bff; // 10  001  0111  1111  111

// GICv3 registers
exports.SYSREG_ICC_IAR1_EL1      = 0xc660; // 11  000  1100  1100  000
exports.SYSREG_ICC_IAR0_EL1      = 0xc640; // 11  000  1100  1000  000
exports.SYSREG_ICC_HPPIR1_EL1    = 0xc662; // 11  000  1100  1100  010
exports.SYSREG_ICC_HPPIR0_EL1    = 0xc642; // 11  000  1100  1000  010
exports.SYSREG_ICC_RPR_EL1       = 0xc65b; // 11  000  1100  1011  011
exports.SYSREG_ICH_VTR_EL2       = 0xe659; // 11  100  1100  1011  001
exports.SYSREG_ICH_EISR_EL2      = 0xe65b; // 11  100  1100  1011  011
exports.SYSREG_ICH_ELSR_EL2      = 0xe65d; // 11  100  1100  1011  101


/**
 * ARM64 System registers for MSR.
 *
 * @name MSR
 * @enum
 * @memberOf arm64
 */
//> System registers for MSR
exports.SYSREG_DBGDTRTX_EL0      = 0x9828; // 10  011  0000  0101  000
exports.SYSREG_OSLAR_EL1         = 0x8084; // 10  000  0001  0000  100
exports.SYSREG_PMSWINC_EL0       = 0xdce4; // 11  011  1001  1100  100

// Trace Registers
exports.SYSREG_TRCOSLAR          = 0x8884; // 10  001  0001  0000  100
exports.SYSREG_TRCLAR            = 0x8be6; // 10  001  0111  1100  110

// GICv3 registers
exports.SYSREG_ICC_EOIR1_EL1     = 0xc661; // 11  000  1100  1100  001
exports.SYSREG_ICC_EOIR0_EL1     = 0xc641; // 11  000  1100  1000  001
exports.SYSREG_ICC_DIR_EL1       = 0xc659; // 11  000  1100  1011  001
exports.SYSREG_ICC_SGI1R_EL1     = 0xc65d; // 11  000  1100  1011  101
exports.SYSREG_ICC_ASGI1R_EL1    = 0xc65e; // 11  000  1100  1011  110
exports.SYSREG_ICC_SGI0R_EL1     = 0xc65f; // 11  000  1100  1011  111


/**
 * ARM64 System PState Field (MSR instruction)
 *
 * @name PSTATE
 * @enum
 * @memberOf arm64
 */
exports.PSTATE_INVALID  = 0;
exports.PSTATE_SPSEL    = 0x05;
exports.PSTATE_DAIFSET  = 0x1e;
exports.PSTATE_DAIFCLR  = 0x1f;


/**
 * ARM64 Vector arrangement specifier (for FloatingPoint/Advanced SIMD insn)
 *
 * @name VAS
 * @enum
 * @memberOf arm64
 */
var vas = [
    "INVALID",
    "8B", "16B", "4H", "8H", "2S", "4S", "1D", "2D", "1Q",
];
vas.forEach(function (type, i) {
    exports["VAS_" + type] = i;
});


/**
 * ARM64 Vector element size specifier
 *
 * @name VESS
 * @enum
 * @memberOf arm64
 */
var vess = [
    "INVALID",
    "B", "H", "S", "D",
];
vess.forEach(function (type, i) {
    exports["VESS_" + type] = i;
});


/**
 * ARM64 Memory barrier operands
 *
 * @name BARRIER
 * @enum
 * @memberOf arm64
 */
exports.INVALID   = 0;
exports.OSHLD     = 0x1;
exports.OSHST     = 0x2;
exports.OSH       = 0x3;
exports.NSHLD     = 0x5;
exports.NSHST     = 0x6;
exports.NSH       = 0x7;
exports.ISHLD     = 0x9;
exports.ISHST     = 0xa;
exports.ISH       = 0xb;
exports.LD        = 0xd;
exports.ST        = 0xe;
exports.SY        = 0xf;


/**
 * ARM64 TLBI operations.
 *
 * @name TLBI
 * @enum
 * @memberOf arm64
 */
var tlbi = [
    "INVALID",
    "VMALLE1IS", "VAE1IS", "ASIDE1IS", "VAAE1IS", "VALE1IS", "VAALE1IS",
    "ALLE2IS", "VAE2IS", "ALLE1IS", "VALE2IS", "VMALLS12E1IS", "ALLE3IS",
    "VAE3IS", "VALE3IS", "IPAS2E1IS", "IPAS2LE1IS", "IPAS2E1", "IPAS2LE1",
    "VMALLE1", "VAE1", "ASIDE1", "VAAE1", "VALE1", "VAALE1", "ALLE2", "VAE2",
    "ALLE1", "VALE2", "VMALLS12E1", "ALLE3", "VAE3", "VALE3",
];
tlbi.forEach(function (type, i) {
    exports["TLBI_" + type] = i;
});


/**
 * ARM64 AT operations.
 *
 * @name AT
 * @enum
 * @memberOf arm64
 */
var at = [
    "S1E1R", "S1E1W", "S1E0R", "S1E0W", "S1E2R", "S1E2W", "S12E1R", "S12E1W",
    "S12E0R", "S12E0W", "S1E3R", "S1E3W",
];
at.forEach(function (type, i) {
    exports["AT_" + type] = i;
});


/**
 * ARM64 DC operations.
 *
 * @name DC
 * @enum
 * @memberOf arm64
 */
var dc = [
    "INVALID",
    "ZVA", "IVAC", "ISW", "CVAC", "CSW", "CVAU", "CIVAC", "CISW",
];
dc.forEach(function (type, i) {
    exports["DC_" + type] = i;
});


/**
 * ARM64 IC operations.
 *
 * @name IC
 * @enum
 * @memberOf arm64
 */
var ic = [
    "INVALID",
    "IALLUIS", "IALLU", "IVAU",
];
ic.forEach(function (type, i) {
    exports["IC_" + type] = i;
});


/**
 * ARM64 Prefetch operations (PRFM).
 *
 * @name PRFM
 * @enum
 * @memberOf arm64
 */
exports.PRFM_INVALID = 0;
exports.PRFM_PLDL1KEEP = 0x00 + 1;
exports.PRFM_PLDL1STRM = 0x01 + 1;
exports.PRFM_PLDL2KEEP = 0x02 + 1;
exports.PRFM_PLDL2STRM = 0x03 + 1;
exports.PRFM_PLDL3KEEP = 0x04 + 1;
exports.PRFM_PLDL3STRM = 0x05 + 1;
exports.PRFM_PLIL1KEEP = 0x08 + 1;
exports.PRFM_PLIL1STRM = 0x09 + 1;
exports.PRFM_PLIL2KEEP = 0x0a + 1;
exports.PRFM_PLIL2STRM = 0x0b + 1;
exports.PRFM_PLIL3KEEP = 0x0c + 1;
exports.PRFM_PLIL3STRM = 0x0d + 1;
exports.PRFM_PSTL1KEEP = 0x10 + 1;
exports.PRFM_PSTL1STRM = 0x11 + 1;
exports.PRFM_PSTL2KEEP = 0x12 + 1;
exports.PRFM_PSTL2STRM = 0x13 + 1;
exports.PRFM_PSTL3KEEP = 0x14 + 1;
exports.PRFM_PSTL3STRM = 0x15 + 1;


/**
 * ARM64 operand types.
 *
 * Name | Description
 * -----|------------
 * OP_INVALID | Uninitialized operand
 * OP_REG | Register operand
 * OP_IMM | Immediate operand
 * OP_MEM | Memory operand
 * OP_FP | Floating-Point immediate operand
 * OP_CIMM | C-Immediate
 * OP_REG_MRS | MRS register operand
 * OP_REG_MSR | MSR register operand
 * OP_PSTATE | PState operand
 * OP_SYS | SYS operand for IC/DC/AT/TLBI instructions
 * OP_PREFETCH | Prefetch operand (PRFM)
 * OP_BARRIER | Memory barrier operand (ISB/DMB/DSB instructions)
 *
 * @name OP
 * @enum
 * @memberOf arm64
 */
exports.OP_INVALID  = 0;
exports.OP_REG      = 1;
exports.OP_IMM      = 2;
exports.OP_MEM      = 3;
exports.OP_FP       = 4;
exports.OP_CIMM     = 64;
exports.OP_REG_MRS  = 65;
exports.OP_REG_MSR  = 66;
exports.OP_PSTATE   = 67;
exports.OP_SYS      = 68;
exports.OP_PREFETCH = 69;
exports.OP_BARRIER  = 70;


/**
 * ARM64 TLBI operations.
 *
 * @name TLBI
 * @enum
 * @memberOf arm64
 */
var tlbi = [
    "INVALID",
    "VMALLE1IS", "VAE1IS", "ASIDE1IS", "VAAE1IS", "VALE1IS", "VAALE1IS",
    "ALLE2IS", "VAE2IS", "ALLE1IS", "VALE2IS", "VMALLS12E1IS", "ALLE3IS",
    "VAE3IS", "VALE3IS", "IPAS2E1IS", "IPAS2LE1IS", "IPAS2E1", "IPAS2LE1",
    "VMALLE1", "VAE1", "ASIDE1", "VAAE1", "VALE1", "VAALE1", "ALLE2", "VAE2",
    "ALLE1", "VALE2", "VMALLS12E1", "ALLE3", "VAE3", "VALE3",
];
tlbi.forEach(function (type, i) {
    exports["TLBI_" + type] = i;
});


/**
 * Native instruction operand structure.
 * @name OperandType
 * @class
 * @ignore
 */
var OperandType = new StructType({
    "vector_index"  : "int",    // Vector Index (or -1 if irrelevant)
    "vas"   : "int",        // Vector Arrangement Specifier
    "vess"  : "int",        // Vector Element Size Specifier
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
        "pstate"    : "int",    // PState field of MSR instruction
        "sys"       : "uint",   // IC/DC/AT/TLBI operation
        "prefetch"  : "int",    // PRFM operation
        "barrier"   : "int",    // Memory barrier operation
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
            this.operands[j].vector_index = operand.vector_index;
            this.operands[j].vas = operand.vas;
            this.operands[j].vess = operand.vess;
            this.operands[j].ext = operand.ext;

            switch (type) {
            case exports.OP_REG:
            case exports.OP_REG_MRS:
            case exports.OP_REG_MSR:
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

            case exports.OP_PSTATE:
                data.pstate = operand.pstate;
                break;

            case exports.OP_SYS:
                data.sys = operand.sys;
                break;

            case exports.OP_PREFETCH:
                data.prefetch = operand.prefetch;
                break;

            case exports.OP_BARRIER:
                data.barrier = operand.barrier;
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
            "vector_index"  : source.operands[i].vector_index,
            "vas"   : source.operands[i].vas,
            "vess"  : source.operands[i].vess,
            "shift" : {
                "type"  : shift.type,
                "value" : shift.value,
            },
            "ext"   : source.operands[i].ext,
            "type"  : type,
        };

        switch (type) {
        case exports.OP_REG:
        case exports.OP_REG_MRS:
        case exports.OP_REG_MSR:
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

        case exports.OP_PSTATE:
            operand.pstate = data.pstate;
            break;

        case exports.OP_SYS:
            operand.sys = data.sys;
            break;

        case exports.OP_PREFETCH:
            operand.prefetch = data.prefetch;
            break;

        case exports.OP_BARRIER:
            operand.barrier = data.barrier;
            break;
        }

        this.operands.push(operand);
    }
};
