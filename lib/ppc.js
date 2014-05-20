var ArrayType = require("ref-array");
var StructType = require("ref-struct");
var UnionType = require("ref-union");


/**
 * PPC register IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
 *
 * console.log(capstone.ppc.REG_LR); //> 67
 * console.log(cs.reg_name(capstone.ppc.REG_LR)); //> "lr"
 *
 * cs.close();
 * ```
 *
 * @name REG
 * @enum
 * @memberOf ppc
 */
var regs = [
    "INVALID",

    "CARRY",
    "CR0", "CR1", "CR2", "CR3", "CR4", "CR5", "CR6", "CR7",
    "CR8", "CR9", "CR10", "CR11", "CR12", "CR13", "CR14", "CR15",
    "CR16", "CR17", "CR18", "CR19", "CR20", "CR21", "CR22", "CR23",
    "CR24", "CR25", "CR26", "CR27", "CR28", "CR29", "CR30", "CR31",
    "CTR",
    "F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7",
    "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15",
    "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23",
    "F24", "F25", "F26", "F27", "F28", "F29", "F30", "F31",
    "LR",
    "R0", "R1", "R2", "R3", "R4", "R5", "R6", "R7",
    "R8", "R9", "R10", "R11", "R12", "R13", "R14", "R15",
    "R16", "R17", "R18", "R19", "R20", "R21", "R22", "R23",
    "R24", "R25", "R26", "R27", "R28", "R29", "R30", "R31",
    "V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7",
    "V8", "V9", "V10", "V11", "V12", "V13", "V14", "V15",
    "V16", "V17", "V18", "V19", "V20", "V21", "V22", "V23",
    "V24", "V25", "V26", "V27", "V28", "V29", "V30", "V31",
    "VRSAVE",

    // extra registers for mapping.c
    "RM", "CTR8", "LR8", "CR1EQ",
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});

exports.REG_MAX = regs.length; // <-- mark the end of the list of registers


/**
 * PPC instruction IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_PPC, capstone.MODE_BIG_ENDIAN);
 *
 * console.log(capstone.ppc.INS_AND); //> 9
 * console.log(cs.insn_name(capstone.ppc.INS_AND)); //> "and"
 *
 * cs.close();
 * ```
 *
 * @name INS
 * @enum
 * @memberOf ppc
 */
var ins = [
    "INVALID",

    "ADD", "ADDC", "ADDE", "ADDI", "ADDIC", "ADDIS", "ADDME", "ADDZE", "AND",
    "ANDC", "ANDIS", "ANDI", "B", "BA", "BCL", "BCTR", "BCTRL", "BDNZ",
    "BDNZA", "BDNZL", "BDNZLA", "BDNZLR", "BDNZLRL", "BDZ", "BDZA", "BDZL",
    "BDZLA", "BDZLR", "BDZLRL", "BL", "BLA", "BLR", "BLRL", "CMPD", "CMPDI",
    "CMPLD", "CMPLDI", "CMPLW", "CMPLWI", "CMPW", "CMPWI", "CNTLZD",
    "CNTLZW", "CREQV", "CRXOR", "CRAND", "CRANDC", "CRNAND", "CRNOR", "CROR",
    "CRORC", "DCBA", "DCBF", "DCBI", "DCBST", "DCBT", "DCBTST", "DCBZ",
    "DCBZL", "DIVD", "DIVDU", "DIVW", "DIVWU", "DSS", "DSSALL", "DST",
    "DSTST", "DSTSTT", "DSTT", "EIEIO", "EQV", "EXTSB", "EXTSH", "EXTSW",
    "FABS", "FADD", "FADDS", "FCFID", "FCFIDS", "FCFIDU", "FCFIDUS", "FCMPU",
    "FCPSGN", "FCTID", "FCTIDUZ", "FCTIDZ", "FCTIW", "FCTIWUZ", "FCTIWZ",
    "FDIV", "FDIVS", "FMADD", "FMADDS", "FMR", "FMSUB", "FMSUBS", "FMUL",
    "FMULS", "FNABS", "FNEG", "FNMADD", "FNMADDS", "FNMSUB", "FNMSUBS",
    "FRE", "FRES", "FRIM", "FRIN", "FRIP", "FRIZ", "FRSP", "FRSQRTE",
    "FRSQRTES", "FSEL", "FSQRT", "FSQRTS", "FSUB", "FSUBS", "ICBI", "ISEL",
    "ISYNC", "LA", "LBZ", "LBZU", "LBZUX", "LBZX", "LD", "LDARX", "LDBRX",
    "LDU", "LDUX", "LDX", "LFD", "LFDU", "LFDUX", "LFDX", "LFIWAX", "LFIWZX",
    "LFS", "LFSU", "LFSUX", "LFSX", "LHA", "LHAU", "LHAUX", "LHAX", "LHBRX",
    "LHZ", "LHZU", "LHZUX", "LHZX", "LI", "LIS", "LMW", "LVEBX", "LVEHX",
    "LVEWX", "LVSL", "LVSR", "LVX", "LVXL", "LWA", "LWARX", "LWAUX", "LWAX",
    "LWBRX", "LWZ", "LWZU", "LWZUX", "LWZX", "MCRF", "MFCR", "MFCTR", "MFFS",
    "MFLR", "MFMSR", "MFOCRF", "MFSPR", "MFTB", "MFVSCR", "MSYNC", "MTCRF",
    "MTCTR", "MTFSB0", "MTFSB1", "MTFSF", "MTLR", "MTMSR", "MTMSRD",
    "MTOCRF", "MTSPR", "MTVSCR", "MULHD", "MULHDU", "MULHW", "MULHWU",
    "MULLD", "MULLI", "MULLW", "NAND", "NEG", "NOP", "ORI", "NOR", "OR", "ORC",
    "ORIS", "POPCNTD", "POPCNTW", "RLDCL", "RLDCR", "RLDIC", "RLDICL",
    "RLDICR", "RLDIMI", "RLWIMI", "RLWINM", "RLWNM", "SC", "SLBIA", "SLBIE",
    "SLBMFEE", "SLBMTE", "SLD", "SLW", "SRAD", "SRADI", "SRAW", "SRAWI",
    "SRD", "SRW", "STB", "STBU", "STBUX", "STBX", "STD", "STDBRX", "STDCX",
    "STDU", "STDUX", "STDX", "STFD", "STFDU", "STFDUX", "STFDX", "STFIWX",
    "STFS", "STFSU", "STFSUX", "STFSX", "STH", "STHBRX", "STHU", "STHUX",
    "STHX", "STMW", "STVEBX", "STVEHX", "STVEWX", "STVX", "STVXL", "STW",
    "STWBRX", "STWCX", "STWU", "STWUX", "STWX", "SUBF", "SUBFC", "SUBFE",
    "SUBFIC", "SUBFME", "SUBFZE", "SYNC", "TD", "TDI", "TLBIE", "TLBIEL",
    "TLBSYNC", "TRAP", "TW", "TWI", "VADDCUW", "VADDFP", "VADDSBS",
    "VADDSHS", "VADDSWS", "VADDUBM", "VADDUBS", "VADDUHM", "VADDUHS",
    "VADDUWM", "VADDUWS", "VAND", "VANDC", "VAVGSB", "VAVGSH", "VAVGSW",
    "VAVGUB", "VAVGUH", "VAVGUW", "VCFSX", "VCFUX", "VCMPBFP", "VCMPEQFP",
    "VCMPEQUB", "VCMPEQUH", "VCMPEQUW", "VCMPGEFP", "VCMPGTFP", "VCMPGTSB",
    "VCMPGTSH", "VCMPGTSW", "VCMPGTUB", "VCMPGTUH", "VCMPGTUW", "VCTSXS",
    "VCTUXS", "VEXPTEFP", "VLOGEFP", "VMADDFP", "VMAXFP", "VMAXSB",
    "VMAXSH", "VMAXSW", "VMAXUB", "VMAXUH", "VMAXUW", "VMHADDSHS",
    "VMHRADDSHS", "VMINFP", "VMINSB", "VMINSH", "VMINSW", "VMINUB",
    "VMINUH", "VMINUW", "VMLADDUHM", "VMRGHB", "VMRGHH", "VMRGHW", "VMRGLB",
    "VMRGLH", "VMRGLW", "VMSUMMBM", "VMSUMSHM", "VMSUMSHS", "VMSUMUBM",
    "VMSUMUHM", "VMSUMUHS", "VMULESB", "VMULESH", "VMULEUB", "VMULEUH",
    "VMULOSB", "VMULOSH", "VMULOUB", "VMULOUH", "VNMSUBFP", "VNOR", "VOR",
    "VPERM", "VPKPX", "VPKSHSS", "VPKSHUS", "VPKSWSS", "VPKSWUS", "VPKUHUM",
    "VPKUHUS", "VPKUWUM", "VPKUWUS", "VREFP", "VRFIM", "VRFIN", "VRFIP",
    "VRFIZ", "VRLB", "VRLH", "VRLW", "VRSQRTEFP", "VSEL", "VSL", "VSLB",
    "VSLDOI", "VSLH", "VSLO", "VSLW", "VSPLTB", "VSPLTH", "VSPLTISB",
    "VSPLTISH", "VSPLTISW", "VSPLTW", "VSR", "VSRAB", "VSRAH", "VSRAW",
    "VSRB", "VSRH", "VSRO", "VSRW", "VSUBCUW", "VSUBFP", "VSUBSBS",
    "VSUBSHS", "VSUBSWS", "VSUBUBM", "VSUBUBS", "VSUBUHM", "VSUBUHS",
    "VSUBUWM", "VSUBUWS", "VSUM2SWS", "VSUM4SBS", "VSUM4SHS", "VSUM4UBS",
    "VSUMSWS", "VUPKHPX", "VUPKHSB", "VUPKHSH", "VUPKLPX", "VUPKLSB",
    "VUPKLSH", "VXOR", "WAIT", "XOR", "XORI", "XORIS", "BC", "BCA", "BCCTR",
    "BCCTRL", "BCLA", "BCLR", "BCLRL",
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});

exports.INS_MAX = ins.length; // mark the end of the list of insn


/**
 * PPC instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf ppc
 */
var groups = [
    "INVALID",

    "ALTIVEC", "MODE32", "MODE64", "BOOKE", "NOTBOOKE",

    "JUMP",   // all jump instructions (conditional+direct+indirect jumps)
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});

exports.GRP_MAX = groups.length; // <-- mark the end of the list of groups


/**
 * PPC branch codes for some branch instructions.
 *
 * Name | Description
 * -----|------------
 * BC_LT | Less Than
 * BC_LE | Less than or Equal to
 * BC_EQ | EQual to
 * BC_GE | Greater than or Equal to
 * BC_GT | Greater Than
 * BC_NE | Not Equal to
 * BC_UN | UNordered
 * BC_NU | Not Unordered
 * BC_LT_MINUS | Less Than with MINUS hint
 * BC_LE_MINUS | Less than or Equal to with MINUS hint
 * BC_EQ_MINUS | EQual to with MINUS hint
 * BC_GE_MINUS | Greater than or Equal to with MINUS hint
 * BC_GT_MINUS | Greater Than with MINUS hint
 * BC_NE_MINUS | Not Equal to with MINUS hint
 * BC_UN_MINUS | UNordered with MINUS hint
 * BC_NU_MINUS | Not Unordered with MINUS hint
 * BC_LT_PLUS | Less Than with PLUS hint
 * BC_LE_PLUS | Less than or Equal to with PLUS hint
 * BC_EQ_PLUS | EQual to with PLUS hint
 * BC_GE_PLUS | Greater than or Equal to with PLUS hint
 * BC_GT_PLUS | Greater Than with PLUS hint
 * BC_NE_PLUS | Not Equal to with PLUS hint
 * BC_UN_PLUS | UNordered with PLUS hint
 * BC_NU_PLUS | Not Unordered with PLUS hint
 *
 * @name BC
 * @enum
 * @memberOf ppc
 */
var bc = {
    "LT"        : (0 << 5) | 12,
    "LE"        : (1 << 5) |  4,
    "EQ"        : (2 << 5) | 12,
    "GE"        : (0 << 5) |  4,
    "GT"        : (1 << 5) | 12,
    "NE"        : (2 << 5) |  4,
    "UN"        : (3 << 5) | 12,
    "NU"        : (3 << 5) |  4,
    "LT_MINUS"  : (0 << 5) | 14,
    "LE_MINUS"  : (1 << 5) |  6,
    "EQ_MINUS"  : (2 << 5) | 14,
    "GE_MINUS"  : (0 << 5) |  6,
    "GT_MINUS"  : (1 << 5) | 14,
    "NE_MINUS"  : (2 << 5) |  6,
    "UN_MINUS"  : (3 << 5) | 14,
    "NU_MINUS"  : (3 << 5) |  6,
    "LT_PLUS"   : (0 << 5) | 15,
    "LE_PLUS"   : (1 << 5) |  7,
    "EQ_PLUS"   : (2 << 5) | 15,
    "GE_PLUS"   : (0 << 5) |  7,
    "GT_PLUS"   : (1 << 5) | 15,
    "NE_PLUS"   : (2 << 5) |  7,
    "UN_PLUS"   : (3 << 5) | 15,
    "NU_PLUS"   : (3 << 5) |  7,
};
Object.keys(bc).forEach(function (cond) {
    exports["BC_" + cond] = bc[cond];
});


/**
 * PPC branch hint for some branch instructions.
 *
 * Name | Description
 * -----|------------
 * BH_NO | No hint
 * BH_PLUS | PLUS hint
 * BH_MINUS | MINUS hint
 *
 * @name BC
 * @enum
 * @memberOf ppc
 */
exports.BH_NO       = 0;
exports.BH_PLUS     = 1;
exports.BH_MINUS    = 2;


/**
 * PPC operand types.
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
 * @memberOf ppc
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
        "reg"   : "uint",       // register value for REG operand
        "imm"   : "int32",      // immediate value for IMM operand
        "mem"   : new StructType({
            "base"  : "uint",   // base register
            "disp"  : "int32",  // displacement value
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
    // branch code for branch instructions
    "bc"        : "int",

    // branch hint for branch instructions
    "bh"        : "int",

    // if update_cr0 = True, then this 'dot' insn updates CR0
    "update_cr0": "bool",

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
 * @memberOf ppc._DetailType
 * @ignore
 * @param {ppc._Detail} source JavaScript detail structure.
 */
Object.defineProperty(exports._DetailType, "_load", {
    "value" : function (source) {
        this.bc         = source.bc;
        this.bh         = source.bh;
        this.update_cr0 = source.update_cr0;

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
 * @param {ppc._DetailType} source Native detail structure.
 */
exports._Detail = function (source) {
    this.bc         = source.bc;
    this.bh         = source.bh;
    this.update_cr0 = source.update_cr0;
    this.operands   = [];

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
