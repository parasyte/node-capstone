var ArrayType = require("ref-array");
var StructType = require("ref-struct");
var UnionType = require("ref-union");


/**
 * Calculate relative address for X86_64, for the given `CsInsn` structure.
 * @name REL_ADDR
 * @function
 * @param {CsInsn} insn Instruction
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
    "FP2", "FP3", "FP4", "FP5", "FP6", "FP7",
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

    "ENDING", // <-- mark the end of the list of registers
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});


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
    "CMPPD", "CMPPS", "CMPSB", "CMPSD", "CMPSQ", "CMPSS", "CMPSW",
    "CMPXCHG16B", "CMPXCHG", "CMPXCHG8B", "COMISD", "COMISS", "FCOMP",
    "FCOMPI", "FCOMI", "FCOM", "FCOS", "CPUID", "CQO", "CRC32",
    "CVTDQ2PD", "CVTDQ2PS", "CVTPD2DQ", "CVTPD2PS", "CVTPS2DQ",
    "CVTPS2PD", "CVTSD2SI", "CVTSD2SS", "CVTSI2SD", "CVTSI2SS",
    "CVTSS2SD", "CVTSS2SI", "CVTTPD2DQ", "CVTTPS2DQ", "CVTTSD2SI",
    "CVTTSS2SI", "CWD", "CWDE", "DAA", "DAS", "DATA16", "DEC", "DIV",
    "DIVPD", "DIVPS", "FDIVR", "FIDIVR", "FDIVRP", "DIVSD", "DIVSS",
    "FDIV", "FIDIV", "FDIVP", "DPPD", "DPPS", "RET", "ENCLS", "ENCLU", "ENTER",
    "EXTRACTPS", "EXTRQ", "F2XM1", "LCALL", "LJMP", "FBLD", "FBSTP",
    "FCOMPP", "FDECSTP", "FEMMS", "FFREE", "FICOM", "FICOMP", "FINCSTP",
    "FLDCW", "FLDENV", "FLDL2E", "FLDL2T", "FLDLG2", "FLDLN2", "FLDPI",
    "FNCLEX", "FNINIT", "FNOP", "FNSTCW", "FNSTSW", "FPATAN", "FPREM",
    "FPREM1", "FPTAN", "FRNDINT", "FRSTOR", "FNSAVE", "FSCALE", "FSETPM",
    "FSINCOS", "FNSTENV", "FXAM", "FXRSTOR", "FXRSTOR64", "FXSAVE",
    "FXSAVE64", "FXTRACT", "FYL2X", "FYL2XP1", "MOVAPD", "MOVAPS", "ORPD",
    "ORPS", "VMOVAPD", "VMOVAPS", "XORPD", "XORPS", "GETSEC",
    "HADDPD", "HADDPS", "HLT", "HSUBPD", "HSUBPS", "IDIV", "FILD", "IMUL",
    "IN", "INC", "INSB", "INSERTPS", "INSERTQ", "INSD", "INSW", "INT",
    "INT1", "INT3", "INTO", "INVD", "INVEPT", "INVLPG", "INVLPGA",
    "INVPCID", "INVVPID", "IRET", "IRETD", "IRETQ", "FISTTP", "FIST",
    "FISTP", "UCOMISD", "UCOMISS", "VCMP", "VCOMISD", "VCOMISS",
    "VCVTSD2SS", "VCVTSI2SD", "VCVTSI2SS", "VCVTSS2SD", "VCVTTSD2SI",
    "VCVTTSD2USI", "VCVTTSS2SI", "VCVTTSS2USI", "VCVTUSI2SD",
    "VCVTUSI2SS", "VUCOMISD", "VUCOMISS", "JAE", "JA", "JBE", "JB",
    "JCXZ", "JECXZ", "JE", "JGE", "JG", "JLE", "JL", "JMP", "JNE", "JNO",
    "JNP", "JNS", "JO", "JP", "JRCXZ", "JS", "KANDB", "KANDD", "KANDNB",
    "KANDND", "KANDNQ", "KANDNW", "KANDQ", "KANDW", "KMOVB", "KMOVD",
    "KMOVQ", "KMOVW", "KNOTB", "KNOTD", "KNOTQ", "KNOTW", "KORB", "KORD",
    "KORQ", "KORTESTW", "KORW", "KSHIFTLW", "KSHIFTRW", "KUNPCKBW",
    "KXNORB", "KXNORD", "KXNORQ", "KXNORW", "KXORB", "KXORD", "KXORX",
    "KXORW", "LAHF", "LAR", "LDDQU", "LDMXCSR", "LDS", "FLDZ",
    "FLD1", "FLD", "LEA", "LEAVE", "LES", "LFENCE", "LFS", "LGDT", "LGS",
    "LIDT", "LLDT", "LMSW", "OR", "SUB", "XOR", "LODSB", "LODSD",
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
    "RDTSCP", "ROL", "ROR", "RORX", "ROUNDPD", "ROUNDPS", "ROUNDSD",
    "ROUNDSS", "RSM", "RSQRTPS", "RSQRTSS", "SAHF", "SAL", "SALC", "SAR",
    "SARX", "SBB", "SCASB", "SCASD", "SCASQ", "SCASW", "SETAE", "SETA",
    "SETBE", "SETB", "SETE", "SETGE", "SETG", "SETLE", "SETL", "SETNE",
    "SETNO", "SETNP", "SETNS", "SETO", "SETP", "SETS", "SFENCE", "SGDT",
    "SHA1MSG1", "SHA1MSG2", "SHA1NEXTE", "SHA1RNDS4", "SHA256MSG1",
    "SHA256MSG2", "SHA256RNDS2", "SHL", "SHLD", "SHLX", "SHR", "SHRD", "SHRX",
    "SHUFPD", "SHUFPS", "SIDT", "FSIN", "SKINIT", "SLDT", "SMSW", "SQRTPD",
    "SQRTPS", "SQRTSD", "SQRTSS", "FSQRT", "STAC", "STC", "STD", "STGI",
    "STI", "STMXCSR", "STOSB", "STOSD", "STOSQ", "STOSW", "STR", "FST",
    "FSTP", "FSTPNCE", "SUBPD", "SUBPS", "FSUBR", "FISUBR", "FSUBRP", "SUBSD",
    "SUBSS", "FSUB", "FISUB", "FSUBP", "SWAPGS", "SYSCALL", "SYSENTER",
    "SYSEXIT", "SYSRET", "T1MSKC", "TEST", "UD2", "FTST", "TZCNT", "TZMSK",
    "FUCOMPI", "FUCOMI", "FUCOMPP", "FUCOMP", "FUCOM", "UD2B", "UNPCKHPD",
    "UNPCKHPS", "UNPCKLPD", "UNPCKLPS", "VADDPD", "VADDPS", "VADDSD",
    "VADDSS", "VADDSUBPD", "VADDSUBPS", "VAESDECLAST", "VAESDEC",
    "VAESENCLAST", "VAESENC", "VAESIMC", "VAESKEYGENASSIST", "VALIGND",
    "VALIGNQ", "VANDNPD", "VANDNPS", "VANDPD", "VANDPS", "VBLENDMPD",
    "VBLENDMPS", "VBLENDPD", "VBLENDPS", "VBLENDVPD", "VBLENDVPS",
    "VBROADCASTF128", "VBROADCASTI128", "VBROADCASTI32X4", "VBROADCASTI64X4",
    "VBROADCASTSD", "VBROADCASTSS", "VCMPPD", "VCMPPS", "VCMPSD", "VCMPSS",
    "VCVTDQ2PD", "VCVTDQ2PS", "VCVTPD2DQX", "VCVTPD2DQ", "VCVTPD2PSX",
    "VCVTPD2PS", "VCVTPD2UDQ", "VCVTPH2PS", "VCVTPS2DQ", "VCVTPS2PD",
    "VCVTPS2PH", "VCVTPS2UDQ", "VCVTSD2SI", "VCVTSD2USI", "VCVTSS2SI",
    "VCVTSS2USI", "VCVTTPD2DQX", "VCVTTPD2DQ", "VCVTTPD2UDQ", "VCVTTPS2DQ",
    "VCVTTPS2UDQ", "VCVTUDQ2PD", "VCVTUDQ2PS", "VDIVPD", "VDIVPS", "VDIVSD",
    "VDIVSS", "VDPPD", "VDPPS", "VERR", "VERW", "VEXTRACTF128",
    "VEXTRACTF32X4", "VEXTRACTF64X4", "VEXTRACTI128", "VEXTRACTI32X4",
    "VEXTRACTI64X4", "VEXTRACTPS", "VFMADD132PD", "VFMADD132PS", "VFMADD213PD",
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
    "VGATHERDPS", "VGATHERPF0DPD", "VGATHERPF0DPS", "VGATHERPF0QPD",
    "VGATHERPF0QPS", "VGATHERPF1DPD", "VGATHERPF1DPS", "VGATHERPF1QPD",
    "VGATHERPF1QPS", "VGATHERQPD", "VGATHERQPS", "VHADDPD", "VHADDPS",
    "VHSUBPD", "VHSUBPS", "VINSERTF128", "VINSERTF32X4", "VINSERTF64X4",
    "VINSERTI128", "VINSERTI32X4", "VINSERTI64X4", "VINSERTPS", "VLDDQU",
    "VLDMXCSR", "VMASKMOVDQU", "VMASKMOVPD", "VMASKMOVPS", "VMAXPD",
    "VMAXPS", "VMAXSD", "VMAXSS", "VMCALL", "VMCLEAR", "VMFUNC", "VMINPD",
    "VMINPS", "VMINSD", "VMINSS", "VMLAUNCH", "VMLOAD", "VMMCALL",
    "VMOVQ", "VMOVDDUP", "VMOVD", "VMOVDQA32", "VMOVDQA64", "VMOVDQA",
    "VMOVDQU16", "VMOVDQU8",  "VMOVDQU32", "VMOVDQU64", "VMOVDQU", "VMOVHLPS",
    "VMOVHPD", "VMOVHPS", "VMOVLHPS", "VMOVLPD", "VMOVLPS", "VMOVMSKPD",
    "VMOVMSKPS", "VMOVNTDQA", "VMOVNTDQ", "VMOVNTPD", "VMOVNTPS", "VMOVSD",
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
    "VPINSRB", "VPINSRD", "VPINSRQ", "VPINSRW", "VPLZCNTD", "VPLZCNTQ",
    "VPMACSDD", "VPMACSDQH", "VPMACSDQL", "VPMACSSDD", "VPMACSSDQH",
    "VPMACSSDQL", "VPMACSSWD", "VPMACSSWW", "VPMACSWD", "VPMACSWW",
    "VPMADCSSWD", "VPMADCSWD", "VPMADDUBSW", "VPMADDWD", "VPMASKMOVD",
    "VPMASKMOVQ", "VPMAXSB", "VPMAXSD", "VPMAXSQ", "VPMAXSW", "VPMAXUB",
    "VPMAXUD", "VPMAXUQ", "VPMAXUW", "VPMINSB", "VPMINSD", "VPMINSQ",
    "VPMINSW", "VPMINUB", "VPMINUD", "VPMINUQ", "VPMINUW", "VPMOVDB",
    "VPMOVDW", "VPMOVMSKB", "VPMOVQB", "VPMOVQD", "VPMOVQW", "VPMOVSDB",
    "VPMOVSDW", "VPMOVSQB", "VPMOVSQD", "VPMOVSQW", "VPMOVSXBD", "VPMOVSXBQ",
    "VPMOVSXBW", "VPMOVSXDQ", "VPMOVSXWD", "VPMOVSXWQ", "VPMOVUSDB",
    "VPMOVUSDW", "VPMOVUSQB", "VPMOVUSQD", "VPMOVUSQW", "VPMOVZXBD",
    "VPMOVZXBQ", "VPMOVZXBW", "VPMOVZXDQ", "VPMOVZXWD", "VPMOVZXWQ",
    "VPMULDQ", "VPMULHRSW", "VPMULHUW", "VPMULHW", "VPMULLD", "VPMULLW",
    "VPMULUDQ", "VPORD", "VPORQ", "VPOR", "VPPERM", "VPROTB", "VPROTD",
    "VPROTQ", "VPROTW", "VPSADBW", "VPSCATTERDD", "VPSCATTERDQ", "VPSCATTERQD",
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
    "VRSQRTPS", "VRSQRTSS", "VSCATTERDPD", "VSCATTERDPS", "VSCATTERPF0DPD",
    "VSCATTERPF0DPS", "VSCATTERPF0QPD", "VSCATTERPF0QPS", "VSCATTERPF1DPD",
    "VSCATTERPF1DPS", "VSCATTERPF1QPD", "VSCATTERPF1QPS", "VSCATTERQPD",
    "VSCATTERQPS", "VSHUFPD", "VSHUFPS", "VSQRTPD", "VSQRTPS", "VSQRTSD",
    "VSQRTSS", "VSTMXCSR", "VSUBPD", "VSUBPS", "VSUBSD", "VSUBSS",
    "VTESTPD", "VTESTPS", "VUNPCKHPD", "VUNPCKHPS", "VUNPCKLPD",
    "VUNPCKLPS", "VZEROALL", "VZEROUPPER", "WAIT", "WBINVD", "WRFSBASE",
    "WRGSBASE", "WRMSR", "XABORT", "XACQUIRE", "XBEGIN", "XCHG", "FXCH",
    "XCRYPTCBC", "XCRYPTCFB", "XCRYPTCTR", "XCRYPTECB", "XCRYPTOFB",
    "XEND", "XGETBV", "XLATB", "XRELEASE", "XRSTOR", "XRSTOR64", "XSAVE",
    "XSAVE64", "XSAVEOPT", "XSAVEOPT64", "XSETBV", "XSHA1", "XSHA256",
    "XSTORE", "XTEST",

    "ENDING", // <-- mark the end of the list of instructions
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});


/**
 * X86 instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf x86
 */
var groups = [
    "INVALID",
    "JUMP", // all jump instructions (conditional+direct+indirect jumps)
    "CALL", // all call instructions
    "RET",  // all call return instructions
    "INT",  // all interrupt instructions (int+syscall)
    "IRET", // all interrupt return instructions
];

var arch_groups = [
    "VM",   // all virtualization instructions (VT-x + AMD-V)
    "3DNOW", "AES", "ADX", "AVX", "AVX2", "AVX512", "BMI", "BMI2", "CMOV",
    "F16C", "FMA", "FMA4", "FSGSBASE", "HLE", "MMX", "MODE32", "MODE64", "RTM",
    "SHA", "SSE1", "SSE2", "SSE3", "SSE41", "SSE42", "SSE4A", "SSSE3", "PCLMUL",
    "XOP", "CDI", "ERI", "TBM", "16BITMODE", "NOT64BITMODE", "SGX", "DQI",
    "BWI", "PFI", "VLX", "SMAP", "NOVLX",

    "ENDING", // <-- mark the end of the list of groups
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});
arch_groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i + 128;
});


/**
 * X86 operand types.
 *
 * Name | Description
 * -----|------------
 * OP_INVALID | Uninitialized operand
 * OP_REG | Register operand
 * OP_IMM | Immediate operand
 * OP_MEM | Memory operand
 * OP_FP | Floating-point immediate operand
 *
 * @name OP
 * @enum
 * @memberOf x86
 */
exports.OP_INVALID  = 0;
exports.OP_REG      = 1;
exports.OP_IMM      = 2;
exports.OP_MEM      = 3;
exports.OP_FP       = 4;


/**
 * X86 AVX broadcast type.
 *
 * Name | Description
 * -----|------------
 * AVX_BCAST_INVALID | Uninitialized
 * AVX_BCAST_2 | AVX512 broadcast type 1to2
 * AVX_BCAST_4 | AVX512 broadcast type 1to4
 * AVX_BCAST_8 | AVX512 broadcast type 1to8
 * AVX_BCAST_16 | AVX512 broadcast type 1to16
 *
 * @name AVX_BCAST
 * @enum
 * @memberOf x86
 */
exports.AVX_BCAST_INVALID   = 0;
exports.AVX_BCAST_2         = 1;
exports.AVX_BCAST_4         = 2;
exports.AVX_BCAST_8         = 3;
exports.AVX_BCAST_16        = 4;


/**
 * X86 SSE condition codes.
 *
 * Name | Description
 * -----|------------
 * SSE_CC_INVALID |
 * SSE_CC_EQ |
 * SSE_CC_LT |
 * SSE_CC_LE |
 * SSE_CC_UNORD |
 * SSE_CC_NEQ |
 * SSE_CC_NLT |
 * SSE_CC_NLE |
 * SSE_CC_ORD |
 * SSE_CC_EQ_UQ |
 * SSE_CC_NGE |
 * SSE_CC_NGT |
 * SSE_CC_FALSE |
 * SSE_CC_NEQ_QQ |
 * SSE_CC_GE |
 * SSE_CC_GT |
 * SSE_CC_TRUE |
 *
 * @name AVX_SSE_CC
 * @enum
 * @memberOf x86
 */
exports.SSE_CC_INVALID  = 0;
exports.SSE_CC_EQ       = 1;
exports.SSE_CC_LT       = 2;
exports.SSE_CC_LE       = 3;
exports.SSE_CC_UNORD    = 4;
exports.SSE_CC_NEQ      = 5;
exports.SSE_CC_NLT      = 6;
exports.SSE_CC_NLE      = 7;
exports.SSE_CC_ORD      = 8;
exports.SSE_CC_EQ_UQ    = 9;
exports.SSE_CC_NGE      = 10;
exports.SSE_CC_NGT      = 11;
exports.SSE_CC_FALSE    = 12;
exports.SSE_CC_NEQ_QQ   = 13;
exports.SSE_CC_GE       = 14;
exports.SSE_CC_GT       = 15;
exports.SSE_CC_TRUE     = 16;


/**
 * X86 AVX condition codes.
 *
 * Name | Description
 * -----|------------
 * AVX_CC_INVALID |
 * AVX_CC_EQ |
 * AVX_CC_LT |
 * AVX_CC_LE |
 * AVX_CC_UNORD |
 * AVX_CC_NEQ |
 * AVX_CC_NLT |
 * AVX_CC_NLE |
 * AVX_CC_ORD |
 * AVX_CC_EQ_UQ |
 * AVX_CC_NGE |
 * AVX_CC_NGT |
 * AVX_CC_FALSE |
 * AVX_CC_NEQ_QQ |
 * AVX_CC_GE |
 * AVX_CC_GT |
 * AVX_CC_TRUE |
 * AVX_CC_EQ_OS |
 * AVX_CC_LT_OQ |
 * AVX_CC_LE_OQ |
 * AVX_CC_UNORD_S |
 * AVX_CC_NEQ_US |
 * AVX_CC_NLT_US |
 * AVX_CC_NLE_US |
 * AVX_CC_ORD_S |
 * AVX_CC_EQ_US |
 * AVX_CC_NGE_UQ |
 * AVX_CC_NGT_UQ |
 * AVX_CC_FALSE_OS |
 * AVX_CC_NEQ_OS |
 * AVX_CC_GE_OQ |
 * AVX_CC_GT_OQ |
 * AVX_CC_TRUE_US |
 *
 * @name AVX_AVX_CC
 * @enum
 * @memberOf x86
 */
exports.AVX_CC_INVALID  = 0;
exports.AVX_CC_EQ       = 1;
exports.AVX_CC_LT       = 2;
exports.AVX_CC_LE       = 3;
exports.AVX_CC_UNORD    = 4;
exports.AVX_CC_NEQ      = 5;
exports.AVX_CC_NLT      = 6;
exports.AVX_CC_NLE      = 7;
exports.AVX_CC_ORD      = 8;
exports.AVX_CC_EQ_UQ    = 9;
exports.AVX_CC_NGE      = 10;
exports.AVX_CC_NGT      = 11;
exports.AVX_CC_FALSE    = 12;
exports.AVX_CC_NEQ_QQ   = 13;
exports.AVX_CC_GE       = 14;
exports.AVX_CC_GT       = 15;
exports.AVX_CC_TRUE     = 16;
exports.AVX_CC_EQ_OS    = 17;
exports.AVX_CC_LT_OQ    = 18;
exports.AVX_CC_LE_OQ    = 19;
exports.AVX_CC_UNORD_S  = 20;
exports.AVX_CC_NEQ_US   = 21;
exports.AVX_CC_NLT_US   = 22;
exports.AVX_CC_NLE_US   = 23;
exports.AVX_CC_ORD_S    = 24;
exports.AVX_CC_EQ_US    = 25;
exports.AVX_CC_NGE_UQ   = 26;
exports.AVX_CC_NGT_UQ   = 27;
exports.AVX_CC_FALSE_OS = 28;
exports.AVX_CC_NEQ_OS   = 29;
exports.AVX_CC_GE_OQ    = 30;
exports.AVX_CC_GT_OQ    = 31;
exports.AVX_CC_TRUE_US  = 32;


/**
 * X86 AVX static rounding modes.
 *
 * Name | Description
 * -----|------------
 * AVX_RM_INVALID |
 * AVX_RM_RN |
 * AVX_RM_RD |
 * AVX_RM_RU |
 * AVX_RM_RZ |
 *
 * @name AVX_RM
 * @enum
 * @memberOf x86
 */
exports.AVX_RM_INVALID  = 0;
exports.AVX_RM_RN       = 1;
exports.AVX_RM_RD       = 2;
exports.AVX_RM_RU       = 3;
exports.AVX_RM_RZ       = 4;


/**
 * X86 instruction prefixes.
 *
 * Name | Description
 * -----|------------
 * PREFIX_LOCK | lock
 * PREFIX_REP | rep
 * PREFIX_REPNE | repne
 * PREFIX_CS | segment override CS
 * PREFIX_SS | segment override SS
 * PREFIX_DS | segment override DS
 * PREFIX_ES | segment override ES
 * PREFIX_FS | segment override FS
 * PREFIX_GS | segment override GS
 * PREFIX_OPSIZE | operand-size override
 * PREFIX_ADDRSIZE | address-size override
 *
 * @name PREFIX
 * @enum
 * @memberOf x86
 */
exports.PREFIX_LOCK     = 0xf0;
exports.PREFIX_REP      = 0xf3;
exports.PREFIX_REPNE    = 0xf2;
exports.PREFIX_CS       = 0x2e;
exports.PREFIX_SS       = 0x36;
exports.PREFIX_DS       = 0x3e;
exports.PREFIX_ES       = 0x26;
exports.PREFIX_FS       = 0x64;
exports.PREFIX_GS       = 0x65;
exports.PREFIX_OPSIZE   = 0x66;
exports.PREFIX_ADDRSIZE = 0x67;

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
            "segment"   : "uint",   // segment register
            "base"      : "uint",   // base register
            "index"     : "uint",   // index register
            "scale"     : "int",    // scale for index register (1, or -1)
            "disp"      : "int64",  // displacement value
        }),
    }),
    "size"      : "uint8",          // size of this operand (in bytes)
    "avx_bcast" : "int",            // AVX broadcast type, or 0 if irrelevant
    "avx_zero_opmask" : "bool",     // AVX zero opmask {z}
});

/**
 * Native instruction detail struct.
 * @name _DetailType
 * @class
 * @ignore
 */
exports._DetailType = new StructType({
    // (Optional) instruction prefix, which can be up to 4 bytes.
    // A prefix byte gets value 0 when irrelevant.
    // prefix[0] indicates REP/REPNE/LOCK prefix (See X86_PREFIX_REP/REPNE/LOCK above)
	// prefix[1] indicates segment override (irrelevant for x86_64):
	// See X86_PREFIX_CS/SS/DS/ES/FS/GS above.
	// prefix[2] indicates operand-size override (X86_PREFIX_OPSIZE)
	// prefix[3] indicates address-size override (X86_PREFIX_ADDRSIZE)
    "prefix"    : new ArrayType("uint8", 4),

    // Instruction opcode, which can be from 1 to 3 bytes in size.
    // This contains VEX opcode as well.
    // An opcode byte gets value 0 when irrelevant.
    "opcode"    : new ArrayType("uint8", 4),

    // REX prefix: only a non-zero value is relevant for x86_64
    "rex"       : "uint8",

    // Address size, which can be overridden with above `prefix`.
    "addr_size" : "uint8",

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

    // SSE Code Condition
    "sse_cc"    : "int",

    // AVX Code Condition
    "avx_cc"    : "int",

    // AVX Suppress All Exceptions
    "avx_sae"   : "bool",

    // AVX static rounding mode
    "avx_rm"    : "int",

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

        this.addr_size  = source.addr_size;
        this.rex        = source.rex;
        this.modrm      = source.modrm;
        this.sib        = source.sib;
        this.disp       = source.disp;
        this.sib_index  = source.sib_index;
        this.sib_scale  = source.sib_scale;
        this.sib_base   = source.sib_base;
        this.sse_cc     = source.sse_cc;
        this.avx_cc     = source.avx_cc;
        this.avx_sae    = source.avx_sae;
        this.avx_rm     = source.avx_rm;
        this.op_count   = source.operands.length;

        for (var i = 0; i < 8; i++) {
            var mem = this.operands[i].data.mem;

            mem.segment = 0;
            mem.base    = 0;
            mem.index   = 0;
            mem.scale   = 0;
            mem.disp    = 0;
        }

        for (var j = 0; j < source.operands.length; j++) {
            var operand = source.operands[j];
            var type = this.operands[j].type = operand.type;
            var data = this.operands[j].data;
            var size = source.operands[j].size;
            var avx_bcast = source.operands[j].avx_bcast;
            var avx_zero_opmask = source.operands[j].avx_zero_opmask;

            this.operands[j].size               = size;
            this.operands[j].avx_bcast          = avx_bcast;
            this.operands[j].avx_zero_opmask    = avx_zero_opmask;

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
                data.mem.segment    = operand.mem.segment;
                data.mem.base       = operand.mem.base;
                data.mem.index      = operand.mem.index;
                data.mem.scale      = operand.mem.scale;
                data.mem.disp       = operand.mem.disp;
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
    this.prefix     = source.prefix.buffer.toJSON().data;
    this.opcode     = source.opcode.buffer.toJSON().data;
    this.addr_size  = source.addr_size;
    this.rex        = source.rex;
    this.modrm      = source.modrm;
    this.sib        = source.sib;
    this.disp       = source.disp;
    this.sib_index  = source.sib_index;
    this.sib_scale  = source.sib_scale;
    this.sib_base   = source.sib_base;
    this.sse_cc     = source.sse_cc;
    this.avx_cc     = source.avx_cc;
    this.avx_sae    = source.avx_sae;
    this.avx_rm     = source.avx_rm;
    this.operands   = [];

    for (var i = 0; i < source.op_count; i++) {
        var type = source.operands[i].type;
        var data = source.operands[i].data;
        var size = source.operands[i].size;
        var avx_bcast = source.operands[i].avx_bcast;
        var avx_zero_opmask = source.operands[i].avx_zero_opmask;

        var operand = {
            "type"              : type,
            "size"              : size,
            "avx_bcast"         : avx_bcast,
            "avx_zero_opmask"   : avx_zero_opmask,
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
                "segment"   : data.mem.segment,
                "base"      : data.mem.base,
                "index"     : data.mem.index,
                "scale"     : data.mem.scale,
                "disp"      : data.mem.disp,
            };
            break;
        }

        this.operands.push(operand);
    }
};
