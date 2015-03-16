var ArrayType = require("ref-array");
var StructType = require("ref-struct");
var UnionType = require("ref-union");


/**
 * XCore register IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_XCORE, capstone.MODE_BIG_ENDIAN);
 *
 * console.log(capstone.xcore.REG_SP); //> 11
 * console.log(cs.reg_name(capstone.xcore.REG_SP)); //> "sp"
 *
 * cs.close();
 * ```
 *
 * @name REG
 * @enum
 * @memberOf xcore
 */
var regs = [
    "INVALID",

    "CP",
    "DP",
    "LR",
    "SP",
    "R0",
    "R1",
    "R2",
    "R3",
    "R4",
    "R5",
    "R6",
    "R7",
    "R8",
    "R9",
    "R10",
    "R11",

    //> pseudo registers
    "PC",  // pc

    // internal thread registers
    // see The-XMOS-XS1-Architecture(X7879A).pdf
    "SCP", // save pc
    "SSR", // save status
    "ET",  // exception type
    "ED",  // exception data
    "SED", // save exception data
    "KEP", // kernel entry pointer
    "KSP", // kernel stack pointer
    "ID",  // thread ID
];
regs.forEach(function (reg, i) {
    exports["REG_" + reg] = i;
});

exports.REG_ENDING = regs.length; // <-- mark the end of the list of registers


/**
 * XCore instruction IDs.
 *
 * ```javascript
 * var cs = new capstone.Cs(capstone.ARCH_XCORE, capstone.MODE_BIG_ENDIAN);
 *
 * console.log(capstone.xcore.INS_AND); //> 8
 * console.log(cs.insn_name(capstone.xcore.INS_AND)); //> "and"
 *
 * cs.close();
 * ```
 *
 * @name INS
 * @enum
 * @memberOf xcore
 */
var ins = [
    "INVALID",

    "ADD", "ANDNOT", "AND", "ASHR", "BAU", "BITREV", "BLA", "BLAT", "BL", "BF",
    "BT", "BU", "BRU", "BYTEREV", "CHKCT", "CLRE", "CLRPT", "CLRSR", "CLZ",
    "CRC8", "CRC32", "DCALL", "DENTSP", "DGETREG", "DIVS", "DIVU", "DRESTSP",
    "DRET", "ECALLF", "ECALLT", "EDU", "EEF", "EET", "EEU", "ENDIN", "ENTSP",
    "EQ", "EXTDP", "EXTSP", "FREER", "FREET", "GETD", "GET", "GETN", "GETR",
    "GETSR", "GETST", "GETTS", "INCT", "INIT", "INPW", "INSHR", "INT", "IN",
    "KCALL", "KENTSP", "KRESTSP", "KRET", "LADD", "LD16S", "LD8U", "LDA16",
    "LDAP", "LDAW", "LDC", "LDW", "LDIVU", "LMUL", "LSS", "LSUB", "LSU",
    "MACCS", "MACCU", "MJOIN", "MKMSK", "MSYNC", "MUL", "NEG", "NOT", "OR",
    "OUTCT", "OUTPW", "OUTSHR", "OUTT", "OUT", "PEEK", "REMS", "REMU", "RETSP",
    "SETCLK", "SET", "SETC", "SETD", "SETEV", "SETN", "SETPSC", "SETPT",
    "SETRDY", "SETSR", "SETTW", "SETV", "SEXT", "SHL", "SHR", "SSYNC", "ST16",
    "ST8", "STW", "SUB", "SYNCR", "TESTCT", "TESTLCL", "TESTWCT", "TSETMR",
    "START", "WAITEF", "WAITET", "WAITEU", "XOR", "ZEXT",
];
ins.forEach(function (insn, i) {
    exports["INS_" + insn] = i;
});

exports.INS_ENDING = ins.length; // mark the end of the list of insn


/**
 * XCore instruction group IDs.
 * @name GRP
 * @enum
 * @memberOf xcore
 */
var groups = [
    "INVALID",

    "JUMP", // all jump instructions (conditional+direct+indirect jumps)
];
groups.forEach(function (grp, i) {
    exports["GRP_" + grp] = i;
});

exports.GRP_ENDING = groups.length; // <-- mark the end of the list of groups


/**
 * XCore operand types.
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
 * @memberOf xcore
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
            "direct": "int",    // +1: forward, -1: backward
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
 * @memberOf xcore._DetailType
 * @ignore
 * @param {xcore._Detail} source JavaScript detail structure.
 */
Object.defineProperty(exports._DetailType, "_load", {
    "value" : function (source) {
        this.operands   = [];

        for (var i = 0; i < 8; i++) {
            var mem = this.operands[i].data.mem;

            mem.base    = 0;
            mem.index   = 0;
            mem.disp    = 0;
            mem.direct  = 0;
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
                data.mem.direct = operand.mem.direct;
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
 * @param {xcore._DetailType} source Native detail structure.
 */
exports._Detail = function (source) {
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
                "direct": data.mem.direct,
            };
            break;
        }

        this.operands.push(operand);
    }
};
