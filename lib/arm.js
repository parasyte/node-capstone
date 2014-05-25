var ArrayType = require("ref-array");
var StructType = require("ref-struct");
var UnionType = require("ref-union");


/**
 * ARM register IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
 *
 * console.log(capstone.arm.REG_SP); //> 11
 * console.log(cs.reg_name(capstone.arm.REG_SP)); //> "sp"
 *
 * cs.close();
 * ```
 *
 * @name REG
 * @enum
 * @memberOf arm
 */
var regs = [
    "INVALID",

    "APSR", "APSR_NZCV", "CPSR",
    "FPEXC", "FPINST", "FPSCR", "FPSCR_NZCV", "FPSID", "ITSTATE",
    "LR", "PC", "SP", "SPSR",
    "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7",
    "D8", "D9", "D10", "D11", "D12", "D13", "D14", "D15",
    "D16", "D17", "D18", "D19", "D20", "D21", "D22", "D23",
    "D24", "D25", "D26", "D27", "D28", "D29", "D30", "D31",
    "FPINST2", "MVFR0", "MVFR1", "MVFR2",
    "Q0", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7",
    "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15",
    "R0", "R1", "R2", "R3", "R4", "R5", "R6", "R7",
    "R8", "R9", "R10", "R11", "R12",
    "S0", "S1", "S2", "S3", "S4", "S5", "S6", "S7",
    "S8", "S9", "S10", "S11", "S12", "S13", "S14", "S15",
    "S16", "S17", "S18", "S19", "S20", "S21", "S22", "S23",
    "S24", "S25", "S26", "S27", "S28", "S29", "S30", "S31",
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});

exports.REG_MAX = regs.length; // <-- mark the end of the list of registers

// alias registers
exports.REG_R13 = exports.REG_SP;
exports.REG_R14 = exports.REG_LR;
exports.REG_R15 = exports.REG_PC;
exports.REG_SB  = exports.REG_R9;
exports.REG_SL  = exports.REG_R10;
exports.REG_FP  = exports.REG_R11;
exports.REG_IP  = exports.REG_R12;


/**
 * ARM instruction IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
 *
 * console.log(capstone.arm.INS_AND); //> 8
 * console.log(cs.insn_name(capstone.arm.INS_AND)); //> "and"
 *
 * cs.close();
 * ```
 *
 * @name INS
 * @enum
 * @memberOf arm
 */
var ins = [
    "INVALID",

    "ADC", "ADD", "ADR", "AESD", "AESE", "AESIMC", "AESMC", "AND", "BFC",
    "BFI", "BIC", "BKPT", "BL", "BLX", "BX", "BXJ", "B", "CDP", "CDP2",
    "CLREX", "CLZ", "CMN", "CMP", "CPS", "CRC32B", "CRC32CB", "CRC32CH",
    "CRC32CW", "CRC32H", "CRC32W", "DBG", "DMB", "DSB", "EOR", "VMOV",
    "FLDMDBX", "FLDMIAX", "VMRS", "FSTMDBX", "FSTMIAX", "HINT", "HLT",
    "ISB", "LDA", "LDAB", "LDAEX", "LDAEXB", "LDAEXD", "LDAEXH", "LDAH",
    "LDC2L", "LDC2", "LDCL", "LDC", "LDMDA", "LDMDB", "LDM", "LDMIB",
    "LDRBT", "LDRB", "LDRD", "LDREX", "LDREXB", "LDREXD", "LDREXH",
    "LDRH", "LDRHT", "LDRSB", "LDRSBT", "LDRSH", "LDRSHT", "LDRT", "LDR",
    "MCR", "MCR2", "MCRR", "MCRR2", "MLA", "MLS", "MOV", "MOVT", "MOVW",
    "MRC", "MRC2", "MRRC", "MRRC2", "MRS", "MSR", "MUL", "MVN", "ORR",
    "PKHBT", "PKHTB", "PLDW", "PLD", "PLI", "QADD", "QADD16", "QADD8",
    "QASX", "QDADD", "QDSUB", "QSAX", "QSUB", "QSUB16", "QSUB8", "RBIT",
    "REV", "REV16", "REVSH", "RFEDA", "RFEDB", "RFEIA", "RFEIB", "RSB",
    "RSC", "SADD16", "SADD8", "SASX", "SBC", "SBFX", "SDIV", "SEL",
    "SETEND", "SHA1C", "SHA1H", "SHA1M", "SHA1P", "SHA1SU0", "SHA1SU1",
    "SHA256H", "SHA256H2", "SHA256SU0", "SHA256SU1", "SHADD16", "SHADD8",
    "SHASX", "SHSAX", "SHSUB16", "SHSUB8", "SMC", "SMLABB", "SMLABT",
    "SMLAD", "SMLADX", "SMLAL", "SMLALBB", "SMLALBT", "SMLALD", "SMLALDX",
    "SMLALTB", "SMLALTT", "SMLATB", "SMLATT", "SMLAWB", "SMLAWT", "SMLSD",
    "SMLSDX", "SMLSLD", "SMLSLDX", "SMMLA", "SMMLAR", "SMMLS", "SMMLSR",
    "SMMUL", "SMMULR", "SMUAD", "SMUADX", "SMULBB", "SMULBT", "SMULL",
    "SMULTB", "SMULTT", "SMULWB", "SMULWT", "SMUSD", "SMUSDX", "SRSDA",
    "SRSDB", "SRSIA", "SRSIB", "SSAT", "SSAT16", "SSAX", "SSUB16",
    "SSUB8", "STC2L", "STC2", "STCL", "STC", "STL", "STLB", "STLEX",
    "STLEXB", "STLEXD", "STLEXH", "STLH", "STMDA", "STMDB", "STM",
    "STMIB", "STRBT", "STRB", "STRD", "STREX", "STREXB", "STREXD",
    "STREXH", "STRH", "STRHT", "STRT", "STR", "SUB", "SVC", "SWP", "SWPB",
    "SXTAB", "SXTAB16", "SXTAH", "SXTB", "SXTB16", "SXTH", "TEQ", "TRAP",
    "TST", "UADD16", "UADD8", "UASX", "UBFX", "UDIV", "UHADD16", "UHADD8",
    "UHASX", "UHSAX", "UHSUB16", "UHSUB8", "UMAAL", "UMLAL", "UMULL",
    "UQADD16", "UQADD8", "UQASX", "UQSAX", "UQSUB16", "UQSUB8", "USAD8",
    "USADA8", "USAT", "USAT16", "USAX", "USUB16", "USUB8", "UXTAB",
    "UXTAB16", "UXTAH", "UXTB", "UXTB16", "UXTH", "VABAL", "VABA",
    "VABDL", "VABD", "VABS", "VACGE", "VACGT", "VADD", "VADDHN", "VADDL",
    "VADDW", "VAND", "VBIC", "VBIF", "VBIT", "VBSL", "VCEQ", "VCGE",
    "VCGT", "VCLS", "VCLZ", "VCMP", "VCMPE", "VCNT", "VCVTA", "VCVTB",
    "VCVT", "VCVTM", "VCVTN", "VCVTP", "VCVTT", "VDIV", "VDUP", "VEOR",
    "VEXT", "VFMA", "VFMS", "VFNMA", "VFNMS", "VHADD", "VHSUB", "VLD1",
    "VLD2", "VLD3", "VLD4", "VLDMDB", "VLDMIA", "VLDR", "VMAXNM", "VMAX",
    "VMINNM", "VMIN", "VMLA", "VMLAL", "VMLS", "VMLSL", "VMOVL", "VMOVN",
    "VMSR", "VMUL", "VMULL", "VMVN", "VNEG", "VNMLA", "VNMLS", "VNMUL",
    "VORN", "VORR", "VPADAL", "VPADDL", "VPADD", "VPMAX", "VPMIN",
    "VQABS", "VQADD", "VQDMLAL", "VQDMLSL", "VQDMULH", "VQDMULL",
    "VQMOVUN", "VQMOVN", "VQNEG", "VQRDMULH", "VQRSHL", "VQRSHRN",
    "VQRSHRUN", "VQSHL", "VQSHLU", "VQSHRN", "VQSHRUN", "VQSUB",
    "VRADDHN", "VRECPE", "VRECPS", "VREV16", "VREV32", "VREV64", "VRHADD",
    "VRINTA", "VRINTM", "VRINTN", "VRINTP", "VRINTR", "VRINTX", "VRINTZ",
    "VRSHL", "VRSHRN", "VRSHR", "VRSQRTE", "VRSQRTS", "VRSRA", "VRSUBHN",
    "VSELEQ", "VSELGE", "VSELGT", "VSELVS", "VSHLL", "VSHL", "VSHRN",
    "VSHR", "VSLI", "VSQRT", "VSRA", "VSRI", "VST1", "VST2", "VST3",
    "VST4", "VSTMDB", "VSTMIA", "VSTR", "VSUB", "VSUBHN", "VSUBL",
    "VSUBW", "VSWP", "VTBL", "VTBX", "VCVTR", "VTRN", "VTST", "VUZP",
    "VZIP", "ADDW", "ASR", "DCPS1", "DCPS2", "DCPS3", "IT", "LSL", "LSR",
    "ORN", "ROR", "RRX", "SUBS", "SUBW", "TBB", "TBH", "CBNZ", "CBZ",
    "MOVS", "POP", "PUSH",
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});

exports.INS_MAX = ins.length; // mark the end of the list of insn


/**
 * ARM instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf arm
 */
var groups = [
    "INVALID",

    "CRYPTO", "DATABARRIER", "DIVIDE", "FPARMV8", "MULTPRO", "NEON",
    "T2EXTRACTPACK", "THUMB2DSP", "TRUSTZONE", "V4T", "V5T", "V5TE", "V6",
    "V6T2", "V7", "V8", "VFP2", "VFP3", "VFP4", "ARM", "MCLASS", "NOTMCLASS",
    "THUMB", "THUMB1ONLY", "THUMB2", "PREV8", "FPVMLX", "MULOPS", "CRC",
    "DPVFP", "V6M",

    "JUMP", // all jump instructions (conditional+direct+indirect jumps)
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});

exports.GRP_MAX = groups.length; // <-- mark the end of the list of groups


/**
 * ARM shift type.
 *
 * Name | Description
 * -----|------------
 * SFT_INVALID | Invalid
 * SFT_ASR | Arithmetic Shift Right with immediate
 * SFT_LSL | Logical Shift Left with immediate
 * SFT_LSR | Logical Shift Right with immediate
 * SFT_ROR | ROtate Right with immediate
 * SFT_RRX | Rotate Right and eXtend with immediate
 * SFT_ASR_REG | Arithmetic Shift Right with register
 * SFT_LSL_REG | Logical Shift Left with register
 * SFT_LSR_REG | Logical Shift Right with register
 * SFT_ROR_REG | ROtate Right with register
 * SFT_RRX_REG | Rotate Right and eXtend with register
 *
 * @name SFT
 * @enum
 * @memberOf arm
 */
var sft = [
    "INVALID",
    "ASR", "LSL", "LSR", "ROR", "RRX",
    "ASR_REG", "LSL_REG", "LSR_REG", "ROR_REG", "RRX_REG",
];
sft.forEach(function (type, i) {
    exports["SFT_" + type] = i;
});


/**
 * ARM condition code.
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
 *
 * @name CC
 * @enum
 * @memberOf arm
 */
var cc = [
    "INVALID",
    "EQ", "NE", "HS", "LO", "MI", "PL", "VS", "VC",
    "HI", "LS", "GE", "LT", "GT", "LE",
    "AL",
];
cc.forEach(function (type, i) {
    exports["CC_" + type] = i;
});


/**
 * ARM operand types.
 *
 * Name | Description
 * -----|------------
 * OP_INVALID | Uninitialized operand
 * OP_REG | Register operand
 * OP_CIMM | C-Immediate (coprocessor registers)
 * OP_PIMM | P-Immediate (coprocessor registers)
 * OP_IMM | Immediate operand
 * OP_FP | Floating-Point immediate operand
 * OP_MEM | Memory operand
 *
 * @name OP
 * @enum
 * @memberOf arm
 */
exports.OP_INVALID  = 0;
exports.OP_REG      = 1;
exports.OP_CIMM     = 2;
exports.OP_PIMM     = 3;
exports.OP_IMM      = 4;
exports.OP_FP       = 5;
exports.OP_MEM      = 6;


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
    "type"  : "int",        // operand type
    "data"  : new UnionType({
        "reg"   : "uint",   // register value for REG operand
        "imm"   : "int32",  // immediate value, or index for C-IMM/IMM operand
        "fp"    : "double", // floating point value for FP operand
        "mem"   : new StructType({
            "base"  : "uint",   // base register
            "index" : "uint",   // index register
            "scale" : "int",    // scale for index register (can be 1, or -1)
            "disp"  : "int",    // displacement/offset value
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

    // does this insn writeback?
    "writeback"     : "bool",

    // Number of operands of this instruction,
    // or 0 when instruction has no operand.
    "op_count"      : "uint8",

    // operands for this instruction.
    "operands"      : new ArrayType(OperandType, 36),
});

/**
 * Native instruction detail struct.
 * @name _load
 * @function
 * @memberOf arm._DetailType
 * @ignore
 * @param {arm._Detail} source JavaScript detail structure.
 */
Object.defineProperty(exports._DetailType, "_load", {
    "value" : function (source) {
        this.cc             = source.cc;
        this.update_flags   = source.update_flags;
        this.writeback      = source.writeback;
        this.operands       = [];

        for (var i = 0; i < 36; i++) {
            var mem = this.operands[i].data.mem;

            mem.base    = 0;
            mem.index   = 0;
            mem.scale   = 0;
            mem.disp    = 0;
        }

        for (var j = 0; j < source.operands.length; j++) {
            var operand = source.operands[j];
            var shift = this.operands[j].shift;
            var type = this.operands[j].type = operand.type;
            var data = this.operands[j].data;

            shift.type  = operand.shift.type;
            shift.value = operand.shift.value;

            switch (type) {
            case exports.OP_REG:
                data.reg = operand.reg;
                break;

            case exports.OP_CIMM:
            case exports.OP_PIMM:
            case exports.OP_IMM:
                data.imm = operand.imm;
                break;

            case exports.OP_FP:
                data.fp = operand.fp;
                break;

            case exports.OP_MEM:
                data.mem.base   = operand.mem.base;
                data.mem.index  = operand.mem.index;
                data.mem.scale  = operand.mem.scale;
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
 * @param {arm._DetailType} source Native detail structure.
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
            "type"  : type,
        };

        switch (type) {
        case exports.OP_REG:
            operand.reg = data.reg;
            break;

        case exports.OP_CIMM:
        case exports.OP_PIMM:
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
                "scale" : data.mem.scale,
                "disp"  : data.mem.disp,
            };
            break;
        }

        this.operands.push(operand);
    }
};
