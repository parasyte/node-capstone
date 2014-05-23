var ArrayType = require("ref-array");
var StructType = require("ref-struct");
var UnionType = require("ref-union");


/**
 * Calculate relative address for X86_64, for the given `Insn` structure.
 * @name REL_ADDR
 * @function
 * @param {Insn} insn Instruction
 * @return {Number} Instruction address
 * @memberOf x86
 */
exports.REL_ADDR = function (insn) {
    return insn.address + insn.size + insn.detail.arch.x86.disp;
};


/**
 * X86 register IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
 *
 * console.log(capstone.x86.REG_EIP); //> 26
 * console.log(cs.reg_name(capstone.x86.REG_EIP)); //> "eip"
 *
 * cs.close();
 * ```
 *
 * @name REG
 * @enum
 * @memberOf x86
 */
var regs = [
    "INVALID",

    "AH", "AL", "AX", "BH", "BL",
    "BP", "BPL", "BX", "CH", "CL",
    "CS", "CX", "DH", "DI", "DIL",
    "DL", "DS", "DX", "EAX", "EBP",
    "EBX", "ECX", "EDI", "EDX", "EFLAGS",
    "EIP", "EIZ", "ES", "ESI", "ESP",
    "FPSW", "FS", "GS", "IP", "RAX",
    "RBP", "RBX", "RCX", "RDI", "RDX",
    "RIP", "RIZ", "RSI", "RSP", "SI",
    "SIL", "SP", "SPL", "SS", "CR0",
    "CR1", "CR2", "CR3", "CR4", "CR5",
    "CR6", "CR7", "CR8", "CR9", "CR10",
    "CR11", "CR12", "CR13", "CR14", "CR15",
    "DR0", "DR1", "DR2", "DR3", "DR4",
    "DR5", "DR6", "DR7", "FP0", "FP1",
    "FP2", "FP3", "FP4", "FP5", "FP6",
    "K0", "K1", "K2", "K3", "K4",
    "K5", "K6", "K7", "MM0", "MM1",
    "MM2", "MM3", "MM4", "MM5", "MM6",
    "MM7", "R8", "R9", "R10", "R11",
    "R12", "R13", "R14", "R15",
    "ST0", "ST1", "ST2", "ST3",
    "ST4", "ST5", "ST6", "ST7",
    "XMM0", "XMM1", "XMM2", "XMM3", "XMM4",
    "XMM5", "XMM6", "XMM7", "XMM8", "XMM9",
    "XMM10", "XMM11", "XMM12", "XMM13", "XMM14",
    "XMM15", "XMM16", "XMM17", "XMM18", "XMM19",
    "XMM20", "XMM21", "XMM22", "XMM23", "XMM24",
    "XMM25", "XMM26", "XMM27", "XMM28", "XMM29",
    "XMM30", "XMM31", "YMM0", "YMM1", "YMM2",
    "YMM3", "YMM4", "YMM5", "YMM6", "YMM7",
    "YMM8", "YMM9", "YMM10", "YMM11", "YMM12",
    "YMM13", "YMM14", "YMM15", "YMM16", "YMM17",
    "YMM18", "YMM19", "YMM20", "YMM21", "YMM22",
    "YMM23", "YMM24", "YMM25", "YMM26", "YMM27",
    "YMM28", "YMM29", "YMM30", "YMM31", "ZMM0",
    "ZMM1", "ZMM2", "ZMM3", "ZMM4", "ZMM5",
    "ZMM6", "ZMM7", "ZMM8", "ZMM9", "ZMM10",
    "ZMM11", "ZMM12", "ZMM13", "ZMM14", "ZMM15",
    "ZMM16", "ZMM17", "ZMM18", "ZMM19", "ZMM20",
    "ZMM21", "ZMM22", "ZMM23", "ZMM24", "ZMM25",
    "ZMM26", "ZMM27", "ZMM28", "ZMM29", "ZMM30",
    "ZMM31", "R8B", "R9B", "R10B", "R11B",
    "R12B", "R13B", "R14B", "R15B", "R8D",
    "R9D", "R10D", "R11D", "R12D", "R13D",
    "R14D", "R15D", "R8W", "R9W", "R10W",
    "R11W", "R12W", "R13W", "R14W", "R15W",
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});

exports.REG_MAX = regs.length; // <-- mark the end of the list of registers


/**
 * X86 instruction IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
 *
 * console.log(capstone.x86.INS_ADD); //> 8
 * console.log(cs.insn_name(capstone.x86.INS_ADD)); //> "add"
 *
 * cs.close();
 * ```
 *
 * @name INS
 * @enum
 * @memberOf x86
 */
var ins = [
    "INVALID",

    "AAA", "AAD", "AAM", "AAS", "FABS", "ADC", "ADCX", "ADD", "ADDPD",
    "ADDPS", "ADDSD", "ADDSS", "ADDSUBPD", "ADDSUBPS", "FADD", "FIADD",
    "FADDP", "ADOX", "AESDECLAST", "AESDEC", "AESENCLAST", "AESENC",
    "AESIMC", "AESKEYGENASSIST", "AND", "ANDN", "ANDNPD", "ANDNPS",
    "ANDPD", "ANDPS", "ARPL", "BEXTR", "BLCFILL", "BLCI", "BLCIC",
    "BLCMSK", "BLCS", "BLENDPD", "BLENDPS", "BLENDVPD", "BLENDVPS",
    "BLSFILL", "BLSI", "BLSIC", "BLSMSK", "BLSR", "BOUND", "BSF", "BSR",
    "BSWAP", "BT", "BTC", "BTR", "BTS", "BZHI", "CALL", "CBW", "CDQ",
    "CDQE", "FCHS", "CLAC", "CLC", "CLD", "CLFLUSH", "CLGI", "CLI",
    "CLTS", "CMC", "CMOVA", "CMOVAE", "CMOVB", "CMOVBE", "FCMOVBE",
    "FCMOVB", "CMOVE", "FCMOVE", "CMOVG", "CMOVGE", "CMOVL", "CMOVLE",
    "FCMOVNBE", "FCMOVNB", "CMOVNE", "FCMOVNE", "CMOVNO", "CMOVNP",
    "FCMOVNU", "CMOVNS", "CMOVO", "CMOVP", "FCMOVU", "CMOVS", "CMP",
    "CMPPD", "CMPPS", "CMPSW", "CMPSD", "CMPSQ", "CMPSB", "CMPSS",
    "CMPXCHG16B", "CMPXCHG", "CMPXCHG8B", "COMISD", "COMISS", "FCOMP",
    "FCOMPI", "FCOMI", "FCOM", "FCOS", "CPUID", "CQO", "CRC32", "CS",
    "CVTDQ2PD", "CVTDQ2PS", "CVTPD2DQ", "CVTPD2PS", "CVTPS2DQ",
    "CVTPS2PD", "CVTSD2SI", "CVTSD2SS", "CVTSI2SD", "CVTSI2SS",
    "CVTSS2SD", "CVTSS2SI", "CVTTPD2DQ", "CVTTPS2DQ", "CVTTSD2SI",
    "CVTTSS2SI", "CWD", "CWDE", "DAA", "DAS", "DATA16", "DEC", "DIV",
    "DIVPD", "DIVPS", "FDIVR", "FIDIVR", "FDIVRP", "DIVSD", "DIVSS",
    "FDIV", "FIDIV", "FDIVP", "DPPD", "DPPS", "DS", "ENTER", "ES",
    "EXTRACTPS", "EXTRQ", "F2XM1", "LCALL", "LJMP", "FBLD", "FBSTP",
    "FCOMPP", "FDECSTP", "FEMMS", "FFREE", "FICOM", "FICOMP", "FINCSTP",
    "FLDCW", "FLDENV", "FLDL2E", "FLDL2T", "FLDLG2", "FLDLN2", "FLDPI",
    "FNCLEX", "FNINIT", "FNOP", "FNSTCW", "FNSTSW", "FPATAN", "FPREM",
    "FPREM1", "FPTAN", "FRNDINT", "FRSTOR", "FNSAVE", "FSCALE", "FSETPM",
    "FSINCOS", "FNSTENV", "FS", "FXAM", "FXRSTOR", "FXRSTOR64", "FXSAVE",
    "FXSAVE64", "FXTRACT", "FYL2X", "FYL2XP1", "MOVAPD", "MOVAPS", "ORPD",
    "ORPS", "VMOVAPD", "VMOVAPS", "XORPD", "XORPS", "GETSEC", "GS",
    "HADDPD", "HADDPS", "HLT", "HSUBPD", "HSUBPS", "IDIV", "FILD", "IMUL",
    "INSW", "IN", "INSD", "INSB", "INC", "INSERTPS", "INSERTQ", "INT",
    "INT1", "INT3", "INTO", "INVD", "INVEPT", "INVLPG", "INVLPGA",
    "INVPCID", "INVVPID", "IRET", "IRETD", "IRETQ", "FISTTP", "FIST",
    "FISTP", "UCOMISD", "UCOMISS", "VCMP", "VCOMISD", "VCOMISS",
    "VCVTSD2SS", "VCVTSI2SD", "VCVTSI2SS", "VCVTSS2SD", "VCVTTSD2SI",
    "VCVTTSD2USI", "VCVTTSS2SI", "VCVTTSS2USI", "VCVTUSI2SD",
    "VCVTUSI2SS", "VUCOMISD", "VUCOMISS", "JAE", "JA", "JBE", "JB",
    "JCXZ", "JECXZ", "JE", "JGE", "JG", "JLE", "JL", "JMP", "JNE", "JNO",
    "JNP", "JNS", "JO", "JP", "JRCXZ", "JS", "KANDNW", "KANDW", "KMOVW",
    "KNOTW", "KORTESTW", "KORW", "KSHIFTLW", "KSHIFTRW", "KUNPCKBW",
    "KXNORW", "KXORW", "LAHF", "LAR", "LDDQU", "LDMXCSR", "LDS", "FLDZ",
    "FLD1", "FLD", "LEA", "LEAVE", "LES", "LFENCE", "LFS", "LGDT", "LGS",
    "LIDT", "LLDT", "LMSW", "OR", "LOCK", "SUB", "XOR", "LODSB", "LODSD",
    "LODSQ", "LODSW", "LOOP", "LOOPE", "LOOPNE", "RETF", "RETFQ", "LSL",
    "LSS", "LTR", "XADD", "LZCNT", "MASKMOVDQU", "MAXPD", "MAXPS",
    "MAXSD", "MAXSS", "MFENCE", "MINPD", "MINPS", "MINSD", "MINSS",
    "CVTPD2PI", "CVTPI2PD", "CVTPI2PS", "CVTPS2PI", "CVTTPD2PI",
    "CVTTPS2PI", "EMMS", "MASKMOVQ", "MOVD", "MOVDQ2Q", "MOVNTQ",
    "MOVQ2DQ", "MOVQ", "PABSB", "PABSD", "PABSW", "PACKSSDW", "PACKSSWB",
    "PACKUSWB", "PADDB", "PADDD", "PADDQ", "PADDSB", "PADDSW", "PADDUSB",
    "PADDUSW", "PADDW", "PALIGNR", "PANDN", "PAND", "PAVGB", "PAVGW",
    "PCMPEQB", "PCMPEQD", "PCMPEQW", "PCMPGTB", "PCMPGTD", "PCMPGTW",
    "PEXTRW", "PHADDSW", "PHADDW", "PHADDD", "PHSUBD", "PHSUBSW",
    "PHSUBW", "PINSRW", "PMADDUBSW", "PMADDWD", "PMAXSW", "PMAXUB",
    "PMINSW", "PMINUB", "PMOVMSKB", "PMULHRSW", "PMULHUW", "PMULHW",
    "PMULLW", "PMULUDQ", "POR", "PSADBW", "PSHUFB", "PSHUFW", "PSIGNB",
    "PSIGND", "PSIGNW", "PSLLD", "PSLLQ", "PSLLW", "PSRAD", "PSRAW",
    "PSRLD", "PSRLQ", "PSRLW", "PSUBB", "PSUBD", "PSUBQ", "PSUBSB",
    "PSUBSW", "PSUBUSB", "PSUBUSW", "PSUBW", "PUNPCKHBW", "PUNPCKHDQ",
    "PUNPCKHWD", "PUNPCKLBW", "PUNPCKLDQ", "PUNPCKLWD", "PXOR", "MONITOR",
    "MONTMUL", "MOV", "MOVABS", "MOVBE", "MOVDDUP", "MOVDQA", "MOVDQU",
    "MOVHLPS", "MOVHPD", "MOVHPS", "MOVLHPS", "MOVLPD", "MOVLPS",
    "MOVMSKPD", "MOVMSKPS", "MOVNTDQA", "MOVNTDQ", "MOVNTI", "MOVNTPD",
    "MOVNTPS", "MOVNTSD", "MOVNTSS", "MOVSB", "MOVSD", "MOVSHDUP",
    "MOVSLDUP", "MOVSQ", "MOVSS", "MOVSW", "MOVSX", "MOVSXD", "MOVUPD",
    "MOVUPS", "MOVZX", "MPSADBW", "MUL", "MULPD", "MULPS", "MULSD",
    "MULSS", "MULX", "FMUL", "FIMUL", "FMULP", "MWAIT", "NEG", "NOP",
    "NOT", "OUT", "OUTSB", "OUTSD", "OUTSW", "PACKUSDW", "PAUSE",
    "PAVGUSB", "PBLENDVB", "PBLENDW", "PCLMULQDQ", "PCMPEQQ", "PCMPESTRI",
    "PCMPESTRM", "PCMPGTQ", "PCMPISTRI", "PCMPISTRM", "PDEP", "PEXT",
    "PEXTRB", "PEXTRD", "PEXTRQ", "PF2ID", "PF2IW", "PFACC", "PFADD",
    "PFCMPEQ", "PFCMPGE", "PFCMPGT", "PFMAX", "PFMIN", "PFMUL", "PFNACC",
    "PFPNACC", "PFRCPIT1", "PFRCPIT2", "PFRCP", "PFRSQIT1", "PFRSQRT",
    "PFSUBR", "PFSUB", "PHMINPOSUW", "PI2FD", "PI2FW", "PINSRB", "PINSRD",
    "PINSRQ", "PMAXSB", "PMAXSD", "PMAXUD", "PMAXUW", "PMINSB", "PMINSD",
    "PMINUD", "PMINUW", "PMOVSXBD", "PMOVSXBQ", "PMOVSXBW", "PMOVSXDQ",
    "PMOVSXWD", "PMOVSXWQ", "PMOVZXBD", "PMOVZXBQ", "PMOVZXBW",
    "PMOVZXDQ", "PMOVZXWD", "PMOVZXWQ", "PMULDQ", "PMULHRW", "PMULLD",
    "POP", "POPAW", "POPAL", "POPCNT", "POPF", "POPFD", "POPFQ",
    "PREFETCH", "PREFETCHNTA", "PREFETCHT0", "PREFETCHT1", "PREFETCHT2",
    "PREFETCHW", "PSHUFD", "PSHUFHW", "PSHUFLW", "PSLLDQ", "PSRLDQ",
    "PSWAPD", "PTEST", "PUNPCKHQDQ", "PUNPCKLQDQ", "PUSH", "PUSHAW",
    "PUSHAL", "PUSHF", "PUSHFD", "PUSHFQ", "RCL", "RCPPS", "RCPSS", "RCR",
    "RDFSBASE", "RDGSBASE", "RDMSR", "RDPMC", "RDRAND", "RDSEED", "RDTSC",
    "RDTSCP", "REPNE", "REP", "RET", "REX64", "ROL", "ROR", "RORX",
    "ROUNDPD", "ROUNDPS", "ROUNDSD", "ROUNDSS", "RSM", "RSQRTPS",
    "RSQRTSS", "SAHF", "SAL", "SALC", "SAR", "SARX", "SBB", "SCASW", "SCASD",
    "SCASQ", "SCASB", "SETAE", "SETA", "SETBE", "SETB", "SETE", "SETGE",
    "SETG", "SETLE", "SETL", "SETNE", "SETNO", "SETNP", "SETNS", "SETO",
    "SETP", "SETS", "SFENCE", "SGDT", "SHA1MSG1", "SHA1MSG2", "SHA1NEXTE",
    "SHA1RNDS4", "SHA256MSG1", "SHA256MSG2", "SHA256RNDS2", "SHL", "SHLD",
    "SHLX", "SHR", "SHRD", "SHRX", "SHUFPD", "SHUFPS", "SIDT", "FSIN",
    "SKINIT", "SLDT", "SMSW", "SQRTPD", "SQRTPS", "SQRTSD", "SQRTSS",
    "FSQRT", "SS", "STAC", "STC", "STD", "STGI", "STI", "STMXCSR",
    "STOSB", "STOSD", "STOSQ", "STOSW", "STR", "FST", "FSTP", "FSTPNCE",
    "SUBPD", "SUBPS", "FSUBR", "FISUBR", "FSUBRP", "SUBSD", "SUBSS", "FSUB",
    "FISUB", "FSUBP", "SWAPGS", "SYSCALL", "SYSENTER", "SYSEXIT",
    "SYSRET", "T1MSKC", "TEST", "UD2", "FTST", "TZCNT", "TZMSK",
    "FUCOMPI", "FUCOMI", "FUCOMPP", "FUCOMP", "FUCOM", "UD2B", "UNPCKHPD",
    "UNPCKHPS", "UNPCKLPD", "UNPCKLPS", "VADDPD", "VADDPS", "VADDSD",
    "VADDSS", "VADDSUBPD", "VADDSUBPS", "VAESDECLAST", "VAESDEC",
    "VAESENCLAST", "VAESENC", "VAESIMC", "VAESKEYGENASSIST", "VALIGND",
    "VALIGNQ", "VANDNPD", "VANDNPS", "VANDPD", "VANDPS", "VBLENDMPD",
    "VBLENDMPS", "VBLENDPD", "VBLENDPS", "VBLENDVPD", "VBLENDVPS",
    "VBROADCASTF128", "VBROADCASTI128", "VBROADCASTSD", "VBROADCASTSS",
    "VCMPPD", "VCMPPS", "VCMPSD", "VCMPSS", "VCVTDQ2PD", "VCVTDQ2PS",
    "VCVTPD2DQX", "VCVTPD2DQ", "VCVTPD2PSX", "VCVTPD2PS", "VCVTPD2UDQ",
    "VCVTPH2PS", "VCVTPS2DQ", "VCVTPS2PD", "VCVTPS2PH", "VCVTPS2UDQ",
    "VCVTSD2SI", "VCVTSD2USI", "VCVTSS2SI", "VCVTSS2USI", "VCVTTPD2DQX",
    "VCVTTPD2DQ", "VCVTTPD2UDQ", "VCVTTPS2DQ", "VCVTTPS2UDQ",
    "VCVTUDQ2PD", "VCVTUDQ2PS", "VDIVPD", "VDIVPS", "VDIVSD", "VDIVSS",
    "VDPPD", "VDPPS", "VERR", "VERW", "VEXTRACTF128", "VEXTRACTF32X4",
    "VEXTRACTF64X4", "VEXTRACTI128", "VEXTRACTI32X4", "VEXTRACTI64X4",
    "VEXTRACTPS", "VFMADD132PD", "VFMADD132PS", "VFMADD213PD",
    "VFMADD213PS", "VFMADDPD", "VFMADD231PD", "VFMADDPS", "VFMADD231PS",
    "VFMADDSD", "VFMADD213SD", "VFMADD132SD", "VFMADD231SD", "VFMADDSS",
    "VFMADD213SS", "VFMADD132SS", "VFMADD231SS", "VFMADDSUB132PD",
    "VFMADDSUB132PS", "VFMADDSUB213PD", "VFMADDSUB213PS", "VFMADDSUBPD",
    "VFMADDSUB231PD", "VFMADDSUBPS", "VFMADDSUB231PS", "VFMSUB132PD",
    "VFMSUB132PS", "VFMSUB213PD", "VFMSUB213PS", "VFMSUBADD132PD",
    "VFMSUBADD132PS", "VFMSUBADD213PD", "VFMSUBADD213PS", "VFMSUBADDPD",
    "VFMSUBADD231PD", "VFMSUBADDPS", "VFMSUBADD231PS", "VFMSUBPD",
    "VFMSUB231PD", "VFMSUBPS", "VFMSUB231PS", "VFMSUBSD", "VFMSUB213SD",
    "VFMSUB132SD", "VFMSUB231SD", "VFMSUBSS", "VFMSUB213SS",
    "VFMSUB132SS", "VFMSUB231SS", "VFNMADD132PD", "VFNMADD132PS",
    "VFNMADD213PD", "VFNMADD213PS", "VFNMADDPD", "VFNMADD231PD",
    "VFNMADDPS", "VFNMADD231PS", "VFNMADDSD", "VFNMADD213SD",
    "VFNMADD132SD", "VFNMADD231SD", "VFNMADDSS", "VFNMADD213SS",
    "VFNMADD132SS", "VFNMADD231SS", "VFNMSUB132PD", "VFNMSUB132PS",
    "VFNMSUB213PD", "VFNMSUB213PS", "VFNMSUBPD", "VFNMSUB231PD",
    "VFNMSUBPS", "VFNMSUB231PS", "VFNMSUBSD", "VFNMSUB213SD",
    "VFNMSUB132SD", "VFNMSUB231SD", "VFNMSUBSS", "VFNMSUB213SS",
    "VFNMSUB132SS", "VFNMSUB231SS", "VFRCZPD", "VFRCZPS", "VFRCZSD",
    "VFRCZSS", "VORPD", "VORPS", "VXORPD", "VXORPS", "VGATHERDPD",
    "VGATHERDPS", "VGATHERQPD", "VGATHERQPS", "VHADDPD", "VHADDPS",
    "VHSUBPD", "VHSUBPS", "VINSERTF128", "VINSERTF32X4", "VINSERTF64X4",
    "VINSERTI128", "VINSERTI32X4", "VINSERTI64X4", "VINSERTPS", "VLDDQU",
    "VLDMXCSR", "VMASKMOVDQU", "VMASKMOVPD", "VMASKMOVPS", "VMAXPD",
    "VMAXPS", "VMAXSD", "VMAXSS", "VMCALL", "VMCLEAR", "VMFUNC", "VMINPD",
    "VMINPS", "VMINSD", "VMINSS", "VMLAUNCH", "VMLOAD", "VMMCALL",
    "VMOVQ", "VMOVDDUP", "VMOVD", "VMOVDQA32", "VMOVDQA64", "VMOVDQA",
    "VMOVDQU32", "VMOVDQU64", "VMOVDQU", "VMOVHLPS", "VMOVHPD", "VMOVHPS",
    "VMOVLHPS", "VMOVLPD", "VMOVLPS", "VMOVMSKPD", "VMOVMSKPS",
    "VMOVNTDQA", "VMOVNTDQ", "VMOVNTPD", "VMOVNTPS", "VMOVSD",
    "VMOVSHDUP", "VMOVSLDUP", "VMOVSS", "VMOVUPD", "VMOVUPS", "VMPSADBW",
    "VMPTRLD", "VMPTRST", "VMREAD", "VMRESUME", "VMRUN", "VMSAVE",
    "VMULPD", "VMULPS", "VMULSD", "VMULSS", "VMWRITE", "VMXOFF", "VMXON",
    "VPABSB", "VPABSD", "VPABSQ", "VPABSW", "VPACKSSDW", "VPACKSSWB",
    "VPACKUSDW", "VPACKUSWB", "VPADDB", "VPADDD", "VPADDQ", "VPADDSB",
    "VPADDSW", "VPADDUSB", "VPADDUSW", "VPADDW", "VPALIGNR", "VPANDD",
    "VPANDND", "VPANDNQ", "VPANDN", "VPANDQ", "VPAND", "VPAVGB", "VPAVGW",
    "VPBLENDD", "VPBLENDMD", "VPBLENDMQ", "VPBLENDVB", "VPBLENDW",
    "VPBROADCASTB", "VPBROADCASTD", "VPBROADCASTMB2Q", "VPBROADCASTMW2D",
    "VPBROADCASTQ", "VPBROADCASTW", "VPCLMULQDQ", "VPCMOV", "VPCMP",
    "VPCMPD", "VPCMPEQB", "VPCMPEQD", "VPCMPEQQ", "VPCMPEQW",
    "VPCMPESTRI", "VPCMPESTRM", "VPCMPGTB", "VPCMPGTD", "VPCMPGTQ",
    "VPCMPGTW", "VPCMPISTRI", "VPCMPISTRM", "VPCMPQ", "VPCMPUD",
    "VPCMPUQ", "VPCOMB", "VPCOMD", "VPCOMQ", "VPCOMUB", "VPCOMUD",
    "VPCOMUQ", "VPCOMUW", "VPCOMW", "VPCONFLICTD", "VPCONFLICTQ",
    "VPERM2F128", "VPERM2I128", "VPERMD", "VPERMI2D", "VPERMI2PD",
    "VPERMI2PS", "VPERMI2Q", "VPERMIL2PD", "VPERMIL2PS", "VPERMILPD",
    "VPERMILPS", "VPERMPD", "VPERMPS", "VPERMQ", "VPERMT2D", "VPERMT2PD",
    "VPERMT2PS", "VPERMT2Q", "VPEXTRB", "VPEXTRD", "VPEXTRQ", "VPEXTRW",
    "VPGATHERDD", "VPGATHERDQ", "VPGATHERQD", "VPGATHERQQ", "VPHADDBD",
    "VPHADDBQ", "VPHADDBW", "VPHADDDQ", "VPHADDD", "VPHADDSW",
    "VPHADDUBD", "VPHADDUBQ", "VPHADDUBW", "VPHADDUDQ", "VPHADDUWD",
    "VPHADDUWQ", "VPHADDWD", "VPHADDWQ", "VPHADDW", "VPHMINPOSUW",
    "VPHSUBBW", "VPHSUBDQ", "VPHSUBD", "VPHSUBSW", "VPHSUBWD", "VPHSUBW",
    "VPINSRB", "VPINSRD", "VPINSRQ", "VPINSRW", "VPMACSDD", "VPMACSDQH",
    "VPMACSDQL", "VPMACSSDD", "VPMACSSDQH", "VPMACSSDQL", "VPMACSSWD",
    "VPMACSSWW", "VPMACSWD", "VPMACSWW", "VPMADCSSWD", "VPMADCSWD",
    "VPMADDUBSW", "VPMADDWD", "VPMASKMOVD", "VPMASKMOVQ", "VPMAXSB",
    "VPMAXSD", "VPMAXSQ", "VPMAXSW", "VPMAXUB", "VPMAXUD", "VPMAXUQ",
    "VPMAXUW", "VPMINSB", "VPMINSD", "VPMINSQ", "VPMINSW", "VPMINUB",
    "VPMINUD", "VPMINUQ", "VPMINUW", "VPMOVDB", "VPMOVDW", "VPMOVMSKB",
    "VPMOVQB", "VPMOVQD", "VPMOVQW", "VPMOVSDB", "VPMOVSDW", "VPMOVSQB",
    "VPMOVSQD", "VPMOVSQW", "VPMOVSXBD", "VPMOVSXBQ", "VPMOVSXBW",
    "VPMOVSXDQ", "VPMOVSXWD", "VPMOVSXWQ", "VPMOVUSDB", "VPMOVUSDW",
    "VPMOVUSQB", "VPMOVUSQD", "VPMOVUSQW", "VPMOVZXBD", "VPMOVZXBQ",
    "VPMOVZXBW", "VPMOVZXDQ", "VPMOVZXWD", "VPMOVZXWQ", "VPMULDQ",
    "VPMULHRSW", "VPMULHUW", "VPMULHW", "VPMULLD", "VPMULLW", "VPMULUDQ",
    "VPORD", "VPORQ", "VPOR", "VPPERM", "VPROTB", "VPROTD", "VPROTQ",
    "VPROTW", "VPSADBW", "VPSCATTERDD", "VPSCATTERDQ", "VPSCATTERQD",
    "VPSCATTERQQ", "VPSHAB", "VPSHAD", "VPSHAQ", "VPSHAW", "VPSHLB",
    "VPSHLD", "VPSHLQ", "VPSHLW", "VPSHUFB", "VPSHUFD", "VPSHUFHW",
    "VPSHUFLW", "VPSIGNB", "VPSIGND", "VPSIGNW", "VPSLLDQ", "VPSLLD",
    "VPSLLQ", "VPSLLVD", "VPSLLVQ", "VPSLLW", "VPSRAD", "VPSRAQ",
    "VPSRAVD", "VPSRAVQ", "VPSRAW", "VPSRLDQ", "VPSRLD", "VPSRLQ",
    "VPSRLVD", "VPSRLVQ", "VPSRLW", "VPSUBB", "VPSUBD", "VPSUBQ",
    "VPSUBSB", "VPSUBSW", "VPSUBUSB", "VPSUBUSW", "VPSUBW", "VPTESTMD",
    "VPTESTMQ", "VPTESTNMD", "VPTESTNMQ", "VPTEST", "VPUNPCKHBW",
    "VPUNPCKHDQ", "VPUNPCKHQDQ", "VPUNPCKHWD", "VPUNPCKLBW", "VPUNPCKLDQ",
    "VPUNPCKLQDQ", "VPUNPCKLWD", "VPXORD", "VPXORQ", "VPXOR", "VRCP14PD",
    "VRCP14PS", "VRCP14SD", "VRCP14SS", "VRCP28PD", "VRCP28PS",
    "VRCP28SD", "VRCP28SS", "VRCPPS", "VRCPSS", "VRNDSCALEPD",
    "VRNDSCALEPS", "VRNDSCALESD", "VRNDSCALESS", "VROUNDPD", "VROUNDPS",
    "VROUNDSD", "VROUNDSS", "VRSQRT14PD", "VRSQRT14PS", "VRSQRT14SD",
    "VRSQRT14SS", "VRSQRT28PD", "VRSQRT28PS", "VRSQRT28SD", "VRSQRT28SS",
    "VRSQRTPS", "VRSQRTSS", "VSCATTERDPD", "VSCATTERDPS", "VSCATTERQPD",
    "VSCATTERQPS", "VSHUFPD", "VSHUFPS", "VSQRTPD", "VSQRTPS", "VSQRTSD",
    "VSQRTSS", "VSTMXCSR", "VSUBPD", "VSUBPS", "VSUBSD", "VSUBSS",
    "VTESTPD", "VTESTPS", "VUNPCKHPD", "VUNPCKHPS", "VUNPCKLPD",
    "VUNPCKLPS", "VZEROALL", "VZEROUPPER", "WAIT", "WBINVD", "WRFSBASE",
    "WRGSBASE", "WRMSR", "XABORT", "XACQUIRE", "XBEGIN", "XCHG", "FXCH",
    "XCRYPTCBC", "XCRYPTCFB", "XCRYPTCTR", "XCRYPTECB", "XCRYPTOFB",
    "XEND", "XGETBV", "XLATB", "XRELEASE", "XRSTOR", "XRSTOR64", "XSAVE",
    "XSAVE64", "XSAVEOPT", "XSAVEOPT64", "XSETBV", "XSHA1", "XSHA256",
    "XSTORE", "XTEST",
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});

exports.INS_MAX = ins.length; // mark the end of the list of insn


/**
 * X86 instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf x86
 */
var groups = [
    "INVALID",

    "3DNOW", "AES", "ADX", "AVX", "AVX2", "AVX512", "BMI", "BMI2", "CMOV",
    "F16C", "FMA", "FMA4", "FSGSBASE", "HLE", "MMX", "MODE32", "MODE64", "RTM",
    "SHA", "SSE1", "SSE2", "SSE3", "SSE41", "SSE42", "SSE4A", "SSSE3", "PCLMUL",
    "XOP", "CDI", "ERI", "TBM", "16BITMODE", "NOT64BITMODE",

    "JUMP", // all jump instructions (conditional+direct+indirect jumps)
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});

exports.GRP_MAX = groups.length;


/**
 * X86 operand types.
 *
 * Name | Description
 * -----|------------
 * OP_INVALID | Uninitialized operand
 * OP_REG | Register operand
 * OP_IMM | Immediate operand
 * OP_FP | Floating-point immediate operand
 * OP_MEM | Memory operand
 *
 * @name OP
 * @enum
 * @memberOf x86
 */
exports.OP_INVALID  = 0;
exports.OP_REG      = 1;
exports.OP_IMM      = 2;
exports.OP_FP       = 3;
exports.OP_MEM      = 4;


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
        "imm"   : "int64",      // immediate value for IMM operand
        "fp"    : "double",     // floating point value for FP operand
        "mem"   : new StructType({
            "base"  : "uint",   // base register
            "index" : "uint",   // index register
            "scale" : "int",    // scale for index register (1, or -1)
            "disp"  : "int64",  // displacement value
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
    // (Optional) instruction prefix, which can be up to 5 bytes.
    // A prefix byte gets value 0 when irrelevant.
    "prefix"    : new ArrayType("uint8", 5),

    // (Optional) segment override, which can be among CS, DS, SS, ES, FS, GS.
    // This field get value 0 when irrelevant.
    "segment"   : "int",

    // Instruction opcode, which can be from 1 to 3 bytes in size.
    // This contains VEX opcode as well.
    // An opcode byte gets value 0 when irrelevant.
    "opcode"    : new ArrayType("uint8", 3),

    // Operand size, which can be overridden with above prefix[5].
    "op_size"   : "uint8",

    // Address size, which can be overridden with above prefix[5].
    "addr_size" : "uint8",

    // Size of (optional) displacement.
    // This field get value 0 when irrelevant.
    "disp_size" : "uint8",

    // Size of immediate operand
    "imm_size"  : "uint8",

    // ModR/M byte
    "modrm"     : "uint8",

    // SIB value, or 0 when irrelevant.
    "sib"       : "uint8",

    // Displacement value, or 0 when irrelevant.
    "disp"      : "int32",

    // SIB index register, or X86_REG_INVALID when irrelevant.
    "sib_index" : "int",
    // SIB scale. only applicable if sib_index is relavant.
    "sib_scale" : "int8",
    // SIB base register, or X86_REG_INVALID when irrelevant.
    "sib_base"  : "int",

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
 * @memberOf x86._DetailType
 * @ignore
 * @param {x86._Detail} source JavaScript detail structure.
 */
Object.defineProperty(exports._DetailType, "_load", {
    "value" : function (source) {
        new Buffer(source.prefix).copy(this.prefix);
        new Buffer(source.opcode).copy(this.opcode);

        this.segment    = source.segment;
        this.op_size    = source.op_size;
        this.addr_size  = source.addr_size;
        this.disp_size  = source.disp_size;
        this.imm_size   = source.imm_size;
        this.modrm      = source.modrm;
        this.sib        = source.sib;
        this.disp       = source.disp;
        this.sib_index  = source.sib_index;
        this.sib_scale  = source.sib_scale;
        this.sib_base   = source.sib_base;
        this.op_count   = source.operands.length;

        for (var i = 0; i < 8; i++) {
            var mem = this.operands[i].data.mem;

            mem.base    = 0;
            mem.index   = 0;
            mem.scale   = 0;
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
 * @param {x86._DetailType} source Native detail structure.
 */
exports._Detail = function (source) {
    this.prefix     = source.prefix.buffer.toJSON();
    this.segment    = source.segment;
    this.opcode     = source.opcode.buffer.toJSON();
    this.op_size    = source.op_size;
    this.addr_size  = source.addr_size;
    this.disp_size  = source.disp_size;
    this.imm_size   = source.imm_size;
    this.modrm      = source.modrm;
    this.sib        = source.sib;
    this.disp       = source.disp;
    this.sib_index  = source.sib_index;
    this.sib_scale  = source.sib_scale;
    this.sib_base   = source.sib_base;
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
