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

    "CARRY", "CC",
    "CR0", "CR1", "CR2", "CR3", "CR4", "CR5", "CR6", "CR7",
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
    "VS0", "VS1", "VS2", "VS3", "VS4", "VS5", "VS6", "VS7",
    "VS8", "VS9", "VS10", "VS11", "VS12", "VS13", "VS14", "VS15",
    "VS16", "VS17", "VS18", "VS19", "VS20", "VS21", "VS22", "VS23",
    "VS24", "VS25", "VS26", "VS27", "VS28", "VS29", "VS30", "VS31",
    "VS32", "VS33", "VS34", "VS35", "VS36", "VS37", "VS38", "VS39",
    "VS40", "VS41", "VS42", "VS43", "VS44", "VS45", "VS46", "VS47",
    "VS48", "VS49", "VS50", "VS51", "VS52", "VS53", "VS54", "VS55",
    "VS56", "VS57", "VS58", "VS59", "VS60", "VS61", "VS62", "VS63",

    // extra registers for PPCMapping
    "RM", "CTR8", "LR8", "CR1EQ",
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});

exports.REG_ENDING = regs.length; // <-- mark the end of the list of registers


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
    "ANDC", "ANDIS", "ANDI", "B", "BA", "BC", "BCCTR", "BCCTRL", "BCL", "BCLR",
    "BCLRL", "BCTR", "BCTRL", "BDNZ", "BDNZA", "BDNZL", "BDNZLA", "BDNZLR",
    "BDNZLRL", "BDZ", "BDZA", "BDZL", "BDZLA", "BDZLR", "BDZLRL", "BL", "BLA",
    "BLR", "BLRL", "BRINC", "CMPD", "CMPDI", "CMPLD", "CMPLDI", "CMPLW",
    "CMPLWI", "CMPW", "CMPWI", "CNTLZD", "CNTLZW", "CREQV", "CRXOR", "CRAND",
    "CRANDC", "CRNAND", "CRNOR", "CROR", "CRORC", "DCBA", "DCBF", "DCBI",
    "DCBST", "DCBT", "DCBTST", "DCBZ", "DCBZL", "BCCCI", "DIVD", "DIVDU",
    "DIVW", "DIVWU", "DSS", "DSSALL", "DST", "DSTST", "DSTSTT", "DSTT", "EIEIO",
    "EQV", "EVABS", "EVADDIW", "EVADDSMIAAW", "EVADDSSIAAW", "EVADDUMIAAW",
    "EVADDUSIAAW", "EVADDW", "EVAND", "EVANDC", "EVCMPEQ", "EVCMPGTS",
    "EVCMPGTU", "EVCMPLTS", "EVCMPLTU", "EVCNTLSW", "EVCNTLZW", "EVDIVWS",
    "EVDIVWU", "EVEQV", "EVEXTSB", "EVEXTSH", "EVLDD", "EVLDDX", "EVLDH",
    "EVLDHX", "EVLDW", "EVLDWX", "EVLHHESPLAT", "EVLHHESPLATX", "EVLHHOSSPLAT",
    "EVLHHOSSPLATX", "EVLHHOUSPLAT", "EVLHHOUSPLATX", "EVLWHE", "EVLWHEX",
    "EVLWHOS", "EVLWHOSX", "EVLWHOU", "EVLWHOUX", "EVLWHSPLAT", "EVLWHSPLATX",
    "EVLWWSPLAT", "EVLWWSPLATX", "EVMERGEHI", "EVMERGEHILO", "EVMERGELO",
    "EVMERGELOHI", "EVMHEGSMFAA", "EVMHEGSMFAN", "EVMHEGSMIAA", "EVMHEGSMIAN",
    "EVMHEGUMIAA", "EVMHEGUMIAN", "EVMHESMF", "EVMHESMFA", "EVMHESMFAAW",
    "EVMHESMFANW", "EVMHESMI", "EVMHESMIA", "EVMHESMIAAW", "EVMHESMIANW",
    "EVMHESSF", "EVMHESSFA", "EVMHESSFAAW", "EVMHESSFANW", "EVMHESSIAAW",
    "EVMHESSIANW", "EVMHEUMI", "EVMHEUMIA", "EVMHEUMIAAW", "EVMHEUMIANW",
    "EVMHEUSIAAW", "EVMHEUSIANW", "EVMHOGSMFAA", "EVMHOGSMFAN", "EVMHOGSMIAA",
    "EVMHOGSMIAN", "EVMHOGUMIAA", "EVMHOGUMIAN", "EVMHOSMF", "EVMHOSMFA",
    "EVMHOSMFAAW", "EVMHOSMFANW", "EVMHOSMI", "EVMHOSMIA", "EVMHOSMIAAW",
    "EVMHOSMIANW", "EVMHOSSF", "EVMHOSSFA", "EVMHOSSFAAW", "EVMHOSSFANW",
    "EVMHOSSIAAW", "EVMHOSSIANW", "EVMHOUMI", "EVMHOUMIA", "EVMHOUMIAAW",
    "EVMHOUMIANW", "EVMHOUSIAAW", "EVMHOUSIANW", "EVMRA", "EVMWHSMF",
    "EVMWHSMFA", "EVMWHSMI", "EVMWHSMIA", "EVMWHSSF", "EVMWHSSFA", "EVMWHUMI",
    "EVMWHUMIA", "EVMWLSMIAAW", "EVMWLSMIANW", "EVMWLSSIAAW", "EVMWLSSIANW",
    "EVMWLUMI", "EVMWLUMIA", "EVMWLUMIAAW", "EVMWLUMIANW", "EVMWLUSIAAW",
    "EVMWLUSIANW", "EVMWSMF", "EVMWSMFA", "EVMWSMFAA", "EVMWSMFAN", "EVMWSMI",
    "EVMWSMIA", "EVMWSMIAA", "EVMWSMIAN", "EVMWSSF", "EVMWSSFA", "EVMWSSFAA",
    "EVMWSSFAN", "EVMWUMI", "EVMWUMIA", "EVMWUMIAA", "EVMWUMIAN", "EVNAND",
    "EVNEG", "EVNOR", "EVOR", "EVORC", "EVRLW", "EVRLWI", "EVRNDW", "EVSLW",
    "EVSLWI", "EVSPLATFI", "EVSPLATI", "EVSRWIS", "EVSRWIU", "EVSRWS", "EVSRWU",
    "EVSTDD", "EVSTDDX", "EVSTDH", "EVSTDHX", "EVSTDW", "EVSTDWX", "EVSTWHE",
    "EVSTWHEX", "EVSTWHO", "EVSTWHOX", "EVSTWWE", "EVSTWWEX", "EVSTWWO",
    "EVSTWWOX", "EVSUBFSMIAAW", "EVSUBFSSIAAW", "EVSUBFUMIAAW", "EVSUBFUSIAAW",
    "EVSUBFW", "EVSUBIFW", "EVXOR", "EXTSB", "EXTSH", "EXTSW", "FABS", "FADD",
    "FADDS", "FCFID", "FCFIDS", "FCFIDU", "FCFIDUS", "FCMPU", "FCPSGN", "FCTID",
    "FCTIDUZ", "FCTIDZ", "FCTIW", "FCTIWUZ", "FCTIWZ", "FDIV", "FDIVS", "FMADD",
    "FMADDS", "FMR", "FMSUB", "FMSUBS", "FMUL", "FMULS", "FNABS", "FNEG",
    "FNMADD", "FNMADDS", "FNMSUB", "FNMSUBS", "FRE", "FRES", "FRIM", "FRIN",
    "FRIP", "FRIZ", "FRSP", "FRSQRTE", "FRSQRTES", "FSEL", "FSQRT", "FSQRTS",
    "FSUB", "FSUBS", "ICBI", "ICCCI", "ISEL", "ISYNC", "LA", "LBZ", "LBZU",
    "LBZUX", "LBZX", "LD", "LDARX", "LDBRX", "LDU", "LDUX", "LDX", "LFD", "LFDU",
    "LFDUX", "LFDX", "LFIWAX", "LFIWZX", "LFS", "LFSU", "LFSUX", "LFSX", "LHA",
    "LHAU", "LHAUX", "LHAX", "LHBRX", "LHZ", "LHZU", "LHZUX", "LHZX", "LI",
    "LIS", "LMW", "LSWI", "LVEBX", "LVEHX", "LVEWX", "LVSL", "LVSR", "LVX",
    "LVXL", "LWA", "LWARX", "LWAUX", "LWAX", "LWBRX", "LWZ", "LWZU", "LWZUX",
    "LWZX", "LXSDX", "LXVD2X", "LXVDSX", "LXVW4X", "MBAR", "MCRF", "MFCR",
    "MFCTR", "MFDCR", "MFFS", "MFLR", "MFMSR", "MFOCRF", "MFSPR", "MFSR",
    "MFSRIN", "MFTB", "MFVSCR", "MSYNC", "MTCRF", "MTCTR", "MTDCR", "MTFSB0",
    "MTFSB1", "MTFSF", "MTLR", "MTMSR", "MTMSRD", "MTOCRF", "MTSPR", "MTSR",
    "MTSRIN", "MTVSCR", "MULHD", "MULHDU", "MULHW", "MULHWU", "MULLD", "MULLI",
    "MULLW", "NAND", "NEG", "NOP", "ORI", "NOR", "OR", "ORC", "ORIS", "POPCNTD",
    "POPCNTW", "RFCI", "RFDI", "RFI", "RFID","RFMCI", "RLDCL", "RLDCR", "RLDIC",
    "RLDICL", "RLDICR", "RLDIMI", "RLWIMI", "RLWINM", "RLWNM", "SC", "SLBIA",
    "SLBIE", "SLBMFEE", "SLBMTE", "SLD", "SLW", "SRAD", "SRADI", "SRAW",
    "SRAWI", "SRD", "SRW", "STB", "STBU", "STBUX", "STBX", "STD", "STDBRX",
    "STDCX", "STDU", "STDUX", "STDX", "STFD", "STFDU", "STFDUX", "STFDX",
    "STFIWX", "STFS", "STFSU", "STFSUX", "STFSX", "STH", "STHBRX", "STHU",
    "STHUX", "STHX", "STMW", "STSWI", "STVEBX", "STVEHX", "STVEWX", "STVX",
    "STVXL", "STW", "STWBRX", "STWCX", "STWU", "STWUX", "STWX", "STXSDX",
    "STXVD2X", "STXVW4X", "SUBF", "SUBFC", "SUBFE", "SUBFIC", "SUBFME",
    "SUBFZE", "SYNC", "TD", "TDI", "TLBIA", "TLBIE", "TLBIEL", "TLBIVAX",
    "TLBLD", "TLBLI", "TLBRE", "TLBSX", "TLBSYNC", "TLBWE", "TRAP", "TW", "TWI",
    "VADDCUW", "VADDFP", "VADDSBS", "VADDSHS", "VADDSWS", "VADDUBM", "VADDUBS",
    "VADDUHM", "VADDUHS", "VADDUWM", "VADDUWS", "VAND", "VANDC", "VAVGSB",
    "VAVGSH", "VAVGSW", "VAVGUB", "VAVGUH", "VAVGUW", "VCFSX", "VCFUX",
    "VCMPBFP", "VCMPEQFP", "VCMPEQUB", "VCMPEQUH", "VCMPEQUW", "VCMPGEFP",
    "VCMPGTFP", "VCMPGTSB", "VCMPGTSH", "VCMPGTSW", "VCMPGTUB", "VCMPGTUH",
    "VCMPGTUW", "VCTSXS", "VCTUXS", "VEXPTEFP", "VLOGEFP", "VMADDFP", "VMAXFP",
    "VMAXSB", "VMAXSH", "VMAXSW", "VMAXUB", "VMAXUH", "VMAXUW", "VMHADDSHS",
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
    "VUPKLSH", "VXOR", "WAIT", "WRTEE", "WRTEEI", "XOR", "XORI", "XORIS",
    "XSABSDP", "XSADDDP", "XSCMPODP", "XSCMPUDP", "XSCPSGNDP", "XSCVDPSP",
    "XSCVDPSXDS", "XSCVDPSXWS", "XSCVDPUXDS", "XSCVDPUXWS", "XSCVSPDP",
    "XSCVSXDDP", "XSCVUXDDP", "XSDIVDP", "XSMADDADP", "XSMADDMDP", "XSMAXDP",
    "XSMINDP", "XSMSUBADP", "XSMSUBMDP", "XSMULDP", "XSNABSDP", "XSNEGDP",
    "XSNMADDADP", "XSNMADDMDP", "XSNMSUBADP", "XSNMSUBMDP", "XSRDPI", "XSRDPIC",
    "XSRDPIM", "XSRDPIP", "XSRDPIZ", "XSREDP", "XSRSQRTEDP", "XSSQRTDP",
    "XSSUBDP", "XSTDIVDP", "XSTSQRTDP", "XVABSDP", "XVABSSP", "XVADDDP",
    "XVADDSP", "XVCMPEQDP", "XVCMPEQSP", "XVCMPGEDP", "XVCMPGESP", "XVCMPGTDP",
    "XVCMPGTSP", "XVCPSGNDP", "XVCPSGNSP", "XVCVDPSP", "XVCVDPSXDS",
    "XVCVDPSXWS", "XVCVDPUXDS", "XVCVDPUXWS", "XVCVSPDP", "XVCVSPSXDS",
    "XVCVSPSXWS", "XVCVSPUXDS", "XVCVSPUXWS", "XVCVSXDDP", "XVCVSXDSP",
    "XVCVSXWDP", "XVCVSXWSP", "XVCVUXDDP", "XVCVUXDSP", "XVCVUXWDP",
    "XVCVUXWSP", "XVDIVDP", "XVDIVSP", "XVMADDADP", "XVMADDASP", "XVMADDMDP",
    "XVMADDMSP", "XVMAXDP", "XVMAXSP", "XVMINDP", "XVMINSP", "XVMSUBADP",
    "XVMSUBASP", "XVMSUBMDP", "XVMSUBMSP", "XVMULDP", "XVMULSP", "XVNABSDP",
    "XVNABSSP", "XVNEGDP", "XVNEGSP", "XVNMADDADP", "XVNMADDASP", "XVNMADDMDP",
    "XVNMADDMSP", "XVNMSUBADP", "XVNMSUBASP", "XVNMSUBMDP", "XVNMSUBMSP",
    "XVRDPI", "XVRDPIC", "XVRDPIM", "XVRDPIP", "XVRDPIZ", "XVREDP", "XVRESP",
    "XVRSPI", "XVRSPIC", "XVRSPIM", "XVRSPIP", "XVRSPIZ", "XVRSQRTEDP",
    "XVRSQRTESP", "XVSQRTDP", "XVSQRTSP", "XVSUBDP", "XVSUBSP", "XVTDIVDP",
    "XVTDIVSP", "XVTSQRTDP", "XVTSQRTSP", "XXLAND", "XXLANDC", "XXLNOR",
    "XXLOR", "XXLXOR", "XXMRGHW", "XXMRGLW", "XXPERMDI", "XXSEL", "XXSLDWI",
    "XXSPLTW", "BCA", "BCLA",

	// extra & alias instructions
    "SLWI", "SRWI", "SLDI", "BTA", "CRSET", "CRNOT", "CRMOVE", "CRCLR", "MFBR0",
    "MFBR1", "MFBR2", "MFBR3", "MFBR4", "MFBR5", "MFBR6", "MFBR7", "MFXER",
    "MFRTCU", "MFRTCL", "MFDSCR", "MFDSISR", "MFDAR", "MFSRR2", "MFSRR3",
    "MFCFAR", "MFAMR", "MFPID", "MFTBLO", "MFTBHI", "MFDBATU", "MFDBATL",
    "MFIBATU", "MFIBATL", "MFDCCR", "MFICCR", "MFDEAR", "MFESR", "MFSPEFSCR",
    "MFTCR", "MFASR", "MFPVR", "MFTBU", "MTCR", "MTBR0", "MTBR1", "MTBR2",
    "MTBR3", "MTBR4", "MTBR5", "MTBR6", "MTBR7", "MTXER", "MTDSCR", "MTDSISR",
    "MTDAR", "MTSRR2", "MTSRR3", "MTCFAR", "MTAMR", "MTPID", "MTTBL", "MTTBU",
    "MTTBLO", "MTTBHI", "MTDBATU", "MTDBATL", "MTIBATU", "MTIBATL", "MTDCCR",
    "MTICCR", "MTDEAR", "MTESR", "MTSPEFSCR", "MTTCR", "NOT", "MR", "ROTLD",
    "ROTLDI", "CLRLDI", "ROTLWI", "CLRLWI", "ROTLW", "SUB", "SUBC", "LWSYNC",
    "PTESYNC", "TDLT", "TDEQ", "TDGT", "TDNE", "TDLLT", "TDLGT", "TDU", "TDLTI",
    "TDEQI", "TDGTI", "TDNEI", "TDLLTI", "TDLGTI", "TDUI", "TLBREHI", "TLBRELO",
    "TLBWEHI", "TLBWELO", "TWLT", "TWEQ", "TWGT", "TWNE", "TWLLT", "TWLGT",
    "TWU", "TWLTI", "TWEQI", "TWGTI", "TWNEI", "TWLLTI", "TWLGTI", "TWUI",
    "WAITRSV", "WAITIMPL", "XNOP", "XVMOVDP", "XVMOVSP", "XXSPLTD", "XXMRGHD",
    "XXMRGLD", "XXSWAPD", "BT", "BF", "BDNZT", "BDNZF", "BDZF", "BDZT", "BFA",
    "BDNZTA", "BDNZFA", "BDZTA", "BDZFA", "BTCTR", "BFCTR", "BTCTRL", "BFCTRL",
    "BTL", "BFL", "BDNZTL", "BDNZFL", "BDZTL", "BDZFL", "BTLA", "BFLA",
    "BDNZTLA", "BDNZFLA", "BDZTLA", "BDZFLA", "BTLR", "BFLR", "BDNZTLR",
    "BDZTLR", "BDZFLR", "BTLRL", "BFLRL", "BDNZTLRL", "BDNZFLRL", "BDZTLRL",
    "BDZFLRL",
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});

exports.INS_ENDING = ins.length; // mark the end of the list of insn


/**
 * PPC instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf ppc
 */
var groups = [
    "INVALID",

    "ALTIVEC", "MODE32", "MODE64", "BOOKE", "NOTBOOKE", "SPE", "VSX", "E500",
    "PPC4XX", "PPC6XX",

    "JUMP",   // all jump instructions (conditional+direct+indirect jumps)
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});

exports.GRP_ENDING = groups.length; // <-- mark the end of the list of groups


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
 * BC_SO | Summary Overflow
 * BC_NS | Not Summary overflow
 *
 * @name BC
 * @enum
 * @memberOf ppc
 */
var bc = {
    "INVALID"   : 0,
    "LT"        : (0 << 5) | 12,
    "LE"        : (1 << 5) |  4,
    "EQ"        : (2 << 5) | 12,
    "GE"        : (0 << 5) |  4,
    "GT"        : (1 << 5) | 12,
    "NE"        : (2 << 5) |  4,
    "UN"        : (3 << 5) | 12,
    "NU"        : (3 << 5) |  4,
    "SO"        : 4 << 5,
    "NS"        : 4 << 5,
};
Object.keys(bc).forEach(function (cond) {
    exports["BC_" + cond] = bc[cond];
});


/**
 * PPC branch hint for some branch instructions.
 *
 * Name | Description
 * -----|------------
 * BH_INVALID | No hint
 * BH_PLUS | PLUS hint
 * BH_MINUS | MINUS hint
 *
 * @name BC
 * @enum
 * @memberOf ppc
 */
exports.BH_INVALID  = 0;
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
