var ArrayType = require("ref-array");
var StructType = require("ref-struct");
var UnionType = require("ref-union");


/**
 * MIPS register IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(
 *     capstone.ARCH_MIPS,
 *     capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
 * );
 *
 * console.log(capstone.mips.REG_RA); //> 32
 * console.log(cs.reg_name(capstone.mips.REG_RA)); //> "ra"
 *
 * cs.close();
 * ```
 *
 * @name REG
 * @enum
 * @memberOf mips
 */
var regs = [
    "INVALID",
    // General purpose registers
    "ZERO", "AT", "V0", "V1", "A0", "A1", "A2", "A3",
    "T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7",
    "S0", "S1", "S2", "S3", "S4", "S5", "S6", "S7",
    "T8", "T9", "K0", "K1", "GP", "SP", "FP", "RA",

    // DSP registers
    "DSPCCOND", "DSPCARRY", "DSPEFI", "DSPOUTFLAG", "DSPOUTFLAG16_19",
    "DSPOUTFLAG20", "DSPOUTFLAG21", "DSPOUTFLAG22", "DSPOUTFLAG23", "DSPPOS",
    "DSPSCOUNT",

    // ACC registers
    "AC0", "AC1", "AC2", "AC3",

    // COP registers
    "CC0", "CC1", "CC2", "CC3", "CC4", "CC5", "CC6", "CC7",

    // FPU registers
    "F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7",
    "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15",
    "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23",
    "F24", "F25", "F26", "F27", "F28", "F29", "F30", "F31",

    "FCC0", "FCC1", "FCC2", "FCC3", "FCC4", "FCC5", "FCC6", "FCC7",

    // AFPR128
    "W0", "W1", "W2", "W3", "W4", "W5", "W6", "W7",
    "W8", "W9", "W10", "W11", "W12", "W13", "W14", "W15",
    "W16", "W17", "W18", "W19", "W20", "W21", "W22", "W23",
    "W24", "W25", "W26", "W27", "W28", "W29", "W30", "W31",

    "HI", "LO", "P0", "P1", "P2", "MPL0", "MPL1", "MPL2"
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});

exports.REG_ENDING = regs.length; // <-- mark the end of the list of registers

// alias registers
exports.REG_0   = exports.REG_ZERO;
exports.REG_1   = exports.REG_AT;
exports.REG_2   = exports.REG_V0;
exports.REG_3   = exports.REG_V1;
exports.REG_4   = exports.REG_A0;
exports.REG_5   = exports.REG_A1;
exports.REG_6   = exports.REG_A2;
exports.REG_7   = exports.REG_A3;
exports.REG_8   = exports.REG_T0;
exports.REG_9   = exports.REG_T1;
exports.REG_10  = exports.REG_T2;
exports.REG_11  = exports.REG_T3;
exports.REG_12  = exports.REG_T4;
exports.REG_13  = exports.REG_T5;
exports.REG_14  = exports.REG_T6;
exports.REG_15  = exports.REG_T7;
exports.REG_16  = exports.REG_S0;
exports.REG_17  = exports.REG_S1;
exports.REG_18  = exports.REG_S2;
exports.REG_19  = exports.REG_S3;
exports.REG_20  = exports.REG_S4;
exports.REG_21  = exports.REG_S5;
exports.REG_22  = exports.REG_S6;
exports.REG_23  = exports.REG_S7;
exports.REG_24  = exports.REG_T8;
exports.REG_25  = exports.REG_T9;
exports.REG_26  = exports.REG_K0;
exports.REG_27  = exports.REG_K1;
exports.REG_28  = exports.REG_GP;
exports.REG_29  = exports.REG_SP;
exports.REG_30  = exports.REG_S8 = exports.REG_FP;
exports.REG_31  = exports.REG_RA;
exports.REG_HI0 = exports.REG_AC0;
exports.REG_HI1 = exports.REG_AC1;
exports.REG_HI2 = exports.REG_AC2;
exports.REG_HI3 = exports.REG_AC3;
exports.REG_LO0 = exports.REG_HI0;
exports.REG_LO1 = exports.REG_HI1;
exports.REG_LO2 = exports.REG_HI2;
exports.REG_LO3 = exports.REG_HI3;


/**
 * MIPS instruction IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(
 *     capstone.ARCH_MIPS,
 *     capstone.MODE_32 | capstone.MODE_BIG_ENDIAN
 * );
 *
 * console.log(capstone.mips.INS_ADDIU); //> 20
 * console.log(cs.insn_name(capstone.mips.INS_ADDIU)); //> "addiu"
 *
 * cs.close();
 * ```
 *
 * @name INS
 * @enum
 * @memberOf mips
 */
var ins = [
    "INVALID",

    "ABSQ_S", "ADD", "ADDIUPC", "ADDQH", "ADDQH_R", "ADDQ", "ADDQ_S", "ADDSC",
    "ADDS_A", "ADDS_S", "ADDS_U", "ADDUH", "ADDUH_R", "ADDU", "ADDU_S", "ADDVI",
    "ADDV", "ADDWC", "ADD_A", "ADDI", "ADDIU", "ALIGN", "ALUIPC", "AND", "ANDI",
    "APPEND", "ASUB_S", "ASUB_U", "AUI", "AUIPC", "AVER_S", "AVER_U", "AVE_S",
    "AVE_U", "BADDU", "BAL", "BALC", "BALIGN", "BC", "BC0F", "BC0FL", "BC0T",
    "BC0TL", "BC1EQZ", "BC1F", "BC1FL", "BC1NEZ", "BC1T", "BC1TL", "BC2EQZ",
    "BC2F", "BC2FL", "BC2NEZ", "BC2T", "BC2TL", "BC3F", "BC3FL", "BC3T",
    "BC3TL", "BCLRI", "BCLR", "BEQ", "BEQC", "BEQL", "BEQZALC", "BEQZC", "BGEC",
    "BGEUC", "BGEZ", "BGEZAL", "BGEZALC", "BGEZALL", "BGEZALS", "BGEZC",
    "BGEZL", "BGTZ", "BGTZALC", "BGTZC", "BGTZL", "BINSLI", "BINSL", "BINSRI",
    "BINSR", "BITREV", "BITSWAP", "BLEZ", "BLEZALC", "BLEZC", "BLEZL", "BLTC",
    "BLTUC", "BLTZ", "BLTZAL", "BLTZALC", "BLTZALL", "BLTZALS", "BLTZC",
    "BLTZL", "BMNZI", "BMNZ", "BMZI", "BMZ", "BNE", "BNEC", "BNEGI", "BNEG",
    "BNEL", "BNEZALC", "BNEZC", "BNVC", "BNZ", "BOVC", "BPOSGE32", "BREAK",
    "BSELI", "BSEL", "BSETI", "BSET", "BZ", "BEQZ", "B", "BNEZ", "BTEQZ",
    "BTNEZ", "CACHE", "CEIL", "CEQI", "CEQ", "CFC1", "CFCMSA", "CINS", "CINS32",
    "CLASS", "CLEI_S", "CLEI_U", "CLE_S", "CLE_U", "CLO", "CLTI_S", "CLTI_U",
    "CLT_S", "CLT_U", "CLZ", "CMPGDU", "CMPGU", "CMPU", "CMP", "COPY_S",
    "COPY_U", "CTC1", "CTCMSA", "CVT", "C", "CMPI", "DADD", "DADDI", "DADDIU",
    "DADDU", "DAHI", "DALIGN", "DATI", "DAUI", "DBITSWAP", "DCLO", "DCLZ",
    "DDIV", "DDIVU",  "DERET", "DEXT", "DEXTM", "DEXTU", "DI", "DINS", "DINSM",
    "DINSU", "DIV", "DIVU", "DIV_S", "DIV_U", "DLSA", "DMFC0", "DMFC1", "DMFC2",
    "DMOD", "DMODU", "DMTC0", "DMTC1", "DMTC2", "DMUH", "DMUHU", "DMUL",
    "DMULT", "DMULTU", "DMULU", "DOTP_S", "DOTP_U", "DPADD_S", "DPADD_U",
    "DPAQX_SA", "DPAQX_S", "DPAQ_SA", "DPAQ_S", "DPAU", "DPAX", "DPA", "DPOP",
    "DPSQX_SA", "DPSQX_S", "DPSQ_SA", "DPSQ_S", "DPSUB_S", "DPSUB_U",
    "DPSU", "DPSX", "DPS", "DROTR", "DROTR32", "DROTRV", "DSBH",
    "DSHD", "DSLL", "DSLL32", "DSLLV", "DSRA", "DSRA32", "DSRAV", "DSRL",
    "DSRL32", "DSRLV", "DSUB", "DSUBU", "EHB", "EI", "ERET", "EXT",
    "EXTP", "EXTPDP", "EXTPDPV", "EXTPV", "EXTRV_RS", "EXTRV_R", "EXTRV_S",
    "EXTRV", "EXTR_RS", "EXTR_R", "EXTR_S", "EXTR", "EXTS", "EXTS32", "ABS",
    "FADD", "FCAF", "FCEQ", "FCLASS", "FCLE", "FCLT", "FCNE", "FCOR", "FCUEQ",
    "FCULE", "FCULT", "FCUNE", "FCUN", "FDIV", "FEXDO", "FEXP2", "FEXUPL",
    "FEXUPR", "FFINT_S", "FFINT_U", "FFQL", "FFQR", "FILL", "FLOG2", "FLOOR",
    "FMADD", "FMAX_A", "FMAX", "FMIN_A", "FMIN", "MOV", "FMSUB", "FMUL", "MUL",
    "NEG", "FRCP", "FRINT", "FRSQRT", "FSAF", "FSEQ", "FSLE", "FSLT", "FSNE",
    "FSOR", "FSQRT", "SQRT", "FSUB", "SUB", "FSUEQ", "FSULE", "FSULT", "FSUNE",
    "FSUN", "FTINT_S", "FTINT_U", "FTQ", "FTRUNC_S", "FTRUNC_U", "HADD_S",
    "HADD_U", "HSUB_S", "HSUB_U", "ILVEV", "ILVL", "ILVOD", "ILVR", "INS",
    "INSERT", "INSV", "INSVE", "J", "JAL", "JALR", "JALRS", "JALS", "JALX",
    "JIALC", "JIC", "JR", "JRADDIUSP", "JRC", "JALRC", "LB", "LBUX", "LBU",
    "LD", "LDC1", "LDC2", "LDC3", "LDI", "LDL", "LDPC", "LDR", "LDXC1", "LH",
    "LHX", "LHU", "LL", "LLD", "LSA", "LUXC1", "LUI", "LW", "LWC1", "LWC2",
    "LWC3", "LWL", "LWPC", "LWR", "LWUPC", "LWU", "LWX", "LWXC1", "LI", "MADD",
    "MADDF", "MADDR_Q", "MADDU", "MADDV", "MADD_Q", "MAQ_SA", "MAQ_S", "MAXA",
    "MAXI_S", "MAXI_U", "MAX_A", "MAX", "MAX_S", "MAX_U", "MFC0", "MFC1",
    "MFC2", "MFHC1", "MFHI", "MFLO", "MINA", "MINI_S", "MINI_U", "MIN_A", "MIN",
    "MIN_S", "MIN_U", "MOD", "MODSUB", "MODU", "MOD_S", "MOD_U", "MOVE", "MOVF",
    "MOVN", "MOVT", "MOVZ", "MSUB", "MSUBF", "MSUBR_Q", "MSUBU", "MSUBV",
    "MSUB_Q", "MTC0", "MTC1", "MTC2", "MTHC1", "MTHI", "MTHLIP", "MTLO", "MTM0",
    "MTM1", "MTM2", "MTP0", "MTP1", "MTP2", "MUH", "MUHU", "MULEQ_S", "MULEU_S",
    "MULQ_RS", "MULQ_S", "MULR_Q", "MULSAQ_S", "MULSA", "MULT", "MULTU", "MULU",
    "MULV", "MUL_Q", "MUL_S", "NLOC", "NLZC", "NMADD", "NMSUB", "NOR", "NORI",
    "NOT", "OR", "ORI", "PACKRL", "PAUSE", "PCKEV", "PCKOD", "PCNT", "PICK",
    "POP", "PRECEQU", "PRECEQ", "PRECEU", "PRECRQU_S", "PRECRQ", "PRECRQ_RS",
    "PRECR", "PRECR_SRA", "PRECR_SRA_R", "PREF", "PREPEND", "RADDU", "RDDSP",
    "RDHWR", "REPLV", "REPL", "RINT", "ROTR", "ROTRV", "ROUND", "SAT_S",
    "SAT_U", "SB", "SC", "SCD", "SD", "SDBBP", "SDC1", "SDC2", "SDC3", "SDL",
    "SDR", "SDXC1", "SEB", "SEH", "SELEQZ", "SELNEZ", "SEL", "SEQ", "SEQI",
    "SH", "SHF", "SHILO", "SHILOV", "SHLLV", "SHLLV_S", "SHLL", "SHLL_S",
    "SHRAV", "SHRAV_R", "SHRA", "SHRA_R", "SHRLV", "SHRL", "SLDI", "SLD", "SLL",
    "SLLI", "SLLV", "SLT", "SLTI", "SLTIU", "SLTU", "SNE", "SNEI", "SPLATI",
    "SPLAT", "SRA", "SRAI", "SRARI", "SRAR", "SRAV", "SRL", "SRLI", "SRLRI",
    "SRLR", "SRLV", "SSNOP", "ST", "SUBQH", "SUBQH_R", "SUBQ", "SUBQ_S",
    "SUBSUS_U", "SUBSUU_S", "SUBS_S", "SUBS_U", "SUBUH", "SUBUH_R", "SUBU",
    "SUBU_S", "SUBVI", "SUBV", "SUXC1", "SW", "SWC1", "SWC2", "SWC3", "SWL",
    "SWR", "SWXC1", "SYNC", "SYSCALL", "TEQ", "TEQI", "TGE", "TGEI", "TGEIU",
    "TGEU", "TLBP", "TLBR", "TLBWI", "TLBWR", "TLT", "TLTI", "TLTIU", "TLTU",
    "TNE", "TNEI", "TRUNC", "V3MULU", "VMM0", "VMULU", "VSHF", "WAIT", "WRDSP",
    "WSBH", "XOR", "XORI",

    //> some alias instructions
    "NOP",
    "NEGU",

    "JALR_HB",  // jump and link with Hazard Barrier
    "JR_HB",	// jump register with Hazard Barrier
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});

exports.INS_ENDING = ins.length; // mark the end of the list of insn


/**
 * MIPS instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf mips
 */
var groups = [
    "INVALID",

    "BITCOUNT", "DSP", "DSPR2", "FPIDX", "MSA", "MIPS32R2", "MIPS64",
    "MIPS64R2", "SEINREG", "STDENC", "SWAP", "MICROMIPS", "MIPS16MODE",
    "FP64BIT", "NONANSFPMATH", "NOTFP64BIT", "NOTINMICROMIPS", "NOTNACL",
    "NOTMIPS32R6", "NOTMIPS64R6", "CNMIPS", "MIPS32", "MIPS32R6", "MIPS64R6",
    "MIPS2", "MIPS3", "MIPS3_32", "MIPS3_32R2", "MIPS4_32", "MIPS4_32R2",
    "MIPS5_32R2", "GP32BIT", "GP64BIT",

    "JUMP",  // all jump instructions (conditional+direct+indirect jumps)
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});

exports.GRP_ENDING = groups.length; // <-- mark the end of the list of groups


/**
 * MIPS operand types.
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
 * @memberOf mips
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
    "type"  : "int",    // operand type
    "data"  : new UnionType({
        "reg"   : "uint",   // register value for REG operand
        "imm"   : "int64",  // immediate value for IMM operand
        "mem"   : new StructType({
            "base"  : "uint",   // base register
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
    // Number of operands of this instruction,
    // or 0 when instruction has no operand.
    "op_count"  : "uint8",

    // operands for this instruction.
    "operands"  : new ArrayType(OperandType, 8),
});

/**
 * Native instruction detail struct.
 * @name _load
 * @function
 * @memberOf mips._DetailType
 * @ignore
 * @param {mips._Detail} source JavaScript detail structure.
 */
Object.defineProperty(exports._DetailType, "_load", {
    "value" : function (source) {
        this.operands = [];

        for (var i = 0; i < 8; i++) {
            var mem = this.operands[i].data.mem;

            mem.base = 0;
            mem.disp = 0;
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
                data.mem.base = operand.mem.base;
                data.mem.disp = operand.mem.disp;
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
 * @param {mips._DetailType} source Native detail structure.
 */
exports._Detail = function (source) {
    this.operands = [];

    for (var i = 0; i < source.op_count; i++) {
        var type = source.operands[i].type;
        var data = source.operands[i].data;

        var operand = {
            "type" : type,
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
                "base" : data.mem.base,
                "disp" : data.mem.disp,
            };
            break;
        }

        this.operands.push(operand);
    }
};
