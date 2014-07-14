var ArrayType   = require("ref-array");
var StructType  = require("ref-struct");
var UnionType   = require("ref-union");

var ref         = require("ref");
var ffi         = require("ffi");

/**
 * ARM Architecture (including Thumb, Thumb-2)
 * @name arm
 * @module
 */
exports.arm = require("./arm");

/**
 * ARM64 Architecture, also called AArch64
 * @name arm64
 * @module
 */
exports.arm64 = require("./arm64");

/**
 * MIPS Architecture
 * @name mips
 * @module
 */
exports.mips = require("./mips");

/**
 * PowerPC Architecture
 * @name ppc
 * @module
 */
exports.ppc = require("./ppc");

/**
 * X86 Architecture
 * @name x86
 * @module
 */
exports.x86 = require("./x86");

/**
 * Sparc Architecture
 * @name sparc
 * @module
 */
exports.sparc = require("./sparc");

/**
 * SystemZ Architecture
 * @name sysz
 * @module
 */
exports.sysz = require("./systemz");


/**
 * XCore Architecture
 * @name xcore
 * @module
 */
exports.xcore = require("./xcore");


/**
 * Version should match the Capstone library
 * @ignore
 */
var VERSION = require("../package").version.split(".");


/**
 * Supported architectures.
 *
 * **FIXME: Determine which makes better documentation: table or list**
 *
 * Name | Description
 * -----|------------
 * ARCH_ARM | ARM architecture (including Thumb, Thumb-2)
 * ARCH_ARM64 | ARM-64 architecture, also called AArch64
 * ARCH_MIPS | MIPS architecture
 * ARCH_PPC | PowerPC architecture
 * ARCH_X86 | X86 architecture (including x86 and x86_64)
 * ARCH_SPARC | Sparc architecture
 * ARCH_SYSZ | SystemZ architecture
 * ARCH_XCORE | XCore architecture
 * ARCH_ALL | All architectures
 * ARCH_MAX | Architecture count
 *
 * - `ARCH_ARM`: ARM architecture (including Thumb, Thumb-2)
 * - `ARCH_ARM64`: ARM-64 architecture, also called AArch64
 * - `ARCH_MIPS`: MIPS architecture
 * - `ARCH_PPC`: PowerPC architecture
 * - `ARCH_X86`: X86 architecture (including x86 and x86_64)
 * - `ARCH_SPARC`: Sparc architecture
 * - `ARCH_SYSZ`: SystemZ architecture
 * - `ARCH_XCORE`: XCore architecture
 * - `ARCH_ALL`: All architectures
 * - `ARCH_MAX`: Architecture count
 * @name ARCH
 * @enum
 */
var archs = [
    "ARM",
    "ARM64",
    "MIPS",
    "X86",
    "PPC",
    "SPARC",
    "SYSZ",
    "XCORE",
];

exports.ARCH_MAX = archs.length;
exports.ARCH_ALL = 0xFFFF;

archs.forEach(function (arch, i) {
    exports["ARCH_" + arch] = i;
});
archs.toString = function (arch) {
    return archs[arch].toLowerCase();
};


/**
 * Supported library features.
 *
 * - `SUPPORT_DIET`: Super lightweight embedded build
 * - `SUPPORT_REDUCE`: Ultra lightweight embedded build (X86)
 * @name SUPPORT
 * @enum
 */
exports.SUPPORT_DIET    = exports.ARCH_ALL + 1;
exports.SUPPORT_REDUCE  = exports.ARCH_ALL + 2;


/**
 * Error codes.
 *
 * - `ERR_OK`: No error: everything was fine
 * - `ERR_MEM`: Out-Of-Memory error: new Cs(), disasm()
 * - `ERR_ARCH`: Unsupported architecture: new Cs()
 * - `ERR_MODE`: Invalid/unsupported mode: new Cs()
 * - `ERR_DETAIL`: Information is unavailable because detail option is OFF
 * - `ERR_DIET`: Access irrelevant data in "diet" engine
 * - `ERR_SKIPDATA`: Access irrelevant "data" instruction in SKIPDATA mode
 * @name ERR
 * @enum
 */
exports.ERR_OK          = 0;
exports.ERR_MEM         = 1;
exports.ERR_ARCH        = 2;
//exports.ERR_HANDLE    = 3; // Invalid handle: op_count(), op_index()
//exports.ERR_CSH       = 4; // Invalid csh argument: close(), errno(), option()
exports.ERR_MODE        = 5;
// exports.ERR_OPTION   = 6; // Invalid/unsupported option: option()
exports.ERR_DETAIL      = 7;
//exports.ERR_MEMSETUP  = 8; // Dynamic memory management uninitialized
//exports.ERR_VERSION   = 9; // Unsupported version (bindings)
exports.ERR_DIET        = 10;
exports.ERR_SKIPDATA    = 11;


/**
 * Disassembler runtime modes.
 *
 * - `MODE_LITTLE_ENDIAN`: Little endian mode (default)
 * - `MODE_BIG_ENDIAN`: Big endian mode
 * - `MODE_16`: 16-bit mode
 * - `MODE_32`: 32-bit mode
 * - `MODE_64`: 64-bit mode
 *
 * ARM Architecture:
 *
 * - `MODE_ARM`: 32-bit ARM
 * - `MODE_THUMB`: ARM's Thumb mode, including Thumb-2
 *
 * MIPS Architecture:
 *
 * - `MODE_MICRO`: MicroMips mode (MIPS architecture)
 * - `MODE_N64`: Nintendo-64 mode (MIPS architecture)
 *
 * Sparc Architecture:
 *
 * - `MODE_V9`: SparcV9 mode (Sparc architecture)
 * @name MODE
 * @enum
 */
exports.MODE_LITTLE_ENDIAN  = 0;
exports.MODE_ARM            = 0;
exports.MODE_16             = 1 << 1;
exports.MODE_32             = 1 << 2;
exports.MODE_64             = 1 << 3;
exports.MODE_THUMB          = 1 << 4;
exports.MODE_MICRO          = 1 << 4;
exports.MODE_N64            = 1 << 5;
exports.MODE_V9             = 1 << 4;
exports.MODE_BIG_ENDIAN     = 1 << 31;


/**
 * Assembly language syntax.
 *
 * - `SYNTAX_DEFAULT`: Default asm syntax
 * - `SYNTAX_INTEL`: X86 Intel asm syntax - default on X86
 * - `SYNTAX_ATT`: X86 ATT asm syntax
 * - `SYNTAX_NOREGNAME`: Print register numbers only
 * @name SYNTAX
 * @enum
 */
exports.SYNTAX_DEFAULT      = 0;
exports.SYNTAX_INTEL        = 1;
exports.SYNTAX_ATT          = 2;
exports.SYNTAX_NOREGNAME    = 3;


/**
 * Skipdata Callback Type
 * @class
 * @ignore
 */
var SkipdataCbType = new ffi.Function("size_t", [
    "uint8 *", "size_t", "size_t", "void *"
]);

/**
 * Skipdata Type
 * @class
 * @ignore
 */
var SkipdataType = new StructType({
    "mnemonic"  : "string",
    "callback"  : SkipdataCbType,
    "user_data" : "void *",
});

/**
 * Options for SKIPDATA mode
 *
 * `callback` accepts four arguments:
 * - `code` : The code `Buffer` being disassembled
 * - `code_size` : The size (in bytes) of the code buffer
 * - `offset` : Offset of the data being skipped within the code buffer
 * - `user_data` : The user data passed to the `CsSkipdata` constructor
 *
 * `callback` must return the number of bytes to be skipped, or `0` to stop
 * disassembling. The default return value is architecture-dependent. See
 * [capstone.h](http://goo.gl/XzAc9Q) for details.
 *
 * *NOTE: The `code` buffer is given a size of 1 byte by default. You will have
 * to reinterpret its size to access all data in the buffer:*
 *
 * ```javascript
 * var cs = new Cs(capstone.ARCH_X86, capstone.MODE_64);
 *
 * // Enable SKIPDATA mode with a callback
 * cs.skipdata = new capstone.CsSkipdata(
 *     ".db",
 *     function (code, code_size, offset, user) {
 *         // Reinterpret `code` buffer to the proper size
 *         code = code.reinterpret(code_size, 0);
 *
 *         console.log(
 *             "skipdata: 0x%s [ %s ], user_data: %s",
 *             offset.toString(16),
 *             code.toJSON().map(function (value) {
 *                 return "0x" + value.toString(16);
 *             }).join(", "),
 *             user
 *         );
 *
 *         return 4;
 *     },
 *     { "foo" : "bar" }
 * );
 *
 * cs.disasm(code, addr);
 * cs.close();
 * ```
 *
 * @name CsSkipdata
 * @class
 * @param {String} mnemonic User-specified mnemonic for "data" instructions.
 * @param {Function} [callback] User-defined callback for "data" instructions.
 * @param {Object} [user_data] User data to be passed to `callback`.
 */
exports.CsSkipdata = function (mnemonic, callback, user_data) {
    var skipdata = new SkipdataType();

    skipdata.mnemonic = mnemonic ? mnemonic : ref.NULL;
    skipdata.callback = (
        typeof(callback) === "function" ?
        SkipdataCbType.toPointer(function (code, code_size, offset, user) {
            return callback(code, code_size, offset, user.readObject(0));
        }) :
        ref.NULL
    );
    skipdata.user_data = ref.alloc("Object", user_data);

    // XXX: Find a better way to get the address of `skipdata`
    this._skipdata = "" + ref.address(skipdata["ref.buffer"]);
};


/**
 * Runtime options for the disassembler engine.
 * @ignore
 */
var OPT_TYPE = {
    "SYNTAX"    : 1,        // Assembly output syntax
    "DETAIL"    : 2,        // Break down instruction structure into details
    "MODE"      : 3,        // Change engine's mode at run-time
//  "MEM"       : 4,        // User-defined dynamic memory related functions
    "SKIPDATA"  : 5,        // Skip data when disassembling
    "SKIPDATA_SETUP" : 6,   // Setup user-defined function for SKIPDATA option
};

var OPT_VALUE = {
    "OFF"       : 0,        // Turn OFF an option - default for DETAIL.
    "ON"        : 3,        // Turn ON an option (DETAIL).
};


// Detailed disassembled instruction information
var DetailType = new StructType({
    // list of implicit registers read by this insn
    "regs_read"         : new ArrayType("uint8", 12),
    "regs_read_count"   : "uint8",

    // list of implicit registers modified by this insn
    "regs_write"        : new ArrayType("uint8", 20),
    "regs_write_count"  : "uint8",

    // list of group this instruction belong to
    "groups"            : new ArrayType("uint8", 8),
    "groups_count"      : "uint8",

    // Architecture-specific instruction info
    "arch"  : new UnionType({
        "x86"   : exports.x86._DetailType,
        "arm64" : exports.arm64._DetailType,
        "arm"   : exports.arm._DetailType,
        "mips"  : exports.mips._DetailType,
        "ppc"   : exports.ppc._DetailType,
        "sparc" : exports.sparc._DetailType,
        "sysz"  : exports.sysz._DetailType,
        "xcore" : exports.xcore._DetailType,
    }),
});

// Disassembled instruction information
var InsnType = new StructType({
    // Instruction ID
    "id"        : "uint",

    // Address (EIP) of this instruction
    "address"   : "uint64",

    // Size of this instruction
    "size"      : "uint16",

    // Machine bytes of this instruction
    // with number of bytes indicated by @size above
    "bytes"     : new ArrayType("uint8", 16),

    // Ascii text of instruction mnemonic
    "mnemonic"  : new ArrayType("char", 32),

    // Ascii text of instruction operands
    "op_str"    : new ArrayType("char", 160),

    // NOTE: All information in detail is only available when detail = true
    "detail"    : ref.refType(DetailType),
});

/**
 * Disassembled instruction information represented as a JavaScript object.
 * @name CsInsn
 * @class
 * @private
 * @param {InsnType} insn Native instruction struct.
 * @param {ARCH} arch Architecture.
 */
var CsInsn = function (insn, arch) {
    this.arch = arch;

    // Convert arch number to string
    var archStr = archs.toString(arch);

    Object.defineProperty(this, "_nativeInsn", {
        "configurable"  : true,
        "value"         : null,
    });

    /**
     * Instruction id
     * @name id
     * @type Number
     * @memberOf CsInsn
     */
    this.id = insn.id;

    /**
     * Instruction address
     * @name address
     * @type Number
     * @memberOf CsInsn
     */
    this.address = insn.address;

    /**
     * Instruction bytes
     * @name bytes
     * @type Array
     * @memberOf CsInsn
     */
    this.bytes = insn.bytes.buffer.toJSON().slice(0, insn.size);

    /**
     * Instruction mnemonic string
     * @name mnemonic
     * @type String
     * @memberOf CsInsn
     */
    this.mnemonic = insn.mnemonic.buffer.readCString(0);

    /**
     * Instruction operand string
     * @name op_str
     * @type String
     * @memberOf CsInsn
     */
    this.op_str = insn.op_str.buffer.readCString(0);

    if (insn.detail.address()) {
        var detail = insn.detail.deref();
        /**
         * Instruction detailed information
         *
         * *NOTE: only valid when detail option is ON (OFF by default)*
         *
         * @name detail
         * @type Object
         * @memberOf CsInsn
         */
        this.detail = {
            /**
             * Registers implicitly read by this instruction
             * @name detail.regs_read
             * @type Array
             * @memberOf CsInsn
             */
            "regs_read" : detail.regs_read.buffer.toJSON().slice(
                0,
                detail.regs_read_count
            ),

            /**
             * Registers implicitly modified by this instruction
             * @name detail.regs_write
             * @type Array
             * @memberOf CsInsn
             */
            "regs_write" : detail.regs_write.buffer.toJSON().slice(
                0,
                detail.regs_write_count
            ),

            /**
             * Groups this instruction belongs to
             * @name detail.groups
             * @type Array
             * @memberOf CsInsn
             */
            "groups" : detail.groups.buffer.toJSON().slice(
                0,
                detail.groups_count
            ),
        };

        var ArchDetail = exports[archStr]._Detail;
        this.detail[archStr] = new ArchDetail(detail.arch[archStr]);
    }

    return this;
};

/**
 * Convert JavaScript object to native struct.
 * @name _toNative
 * @function
 * @private
 * @memberOf CsInsn
 * @return {InsnType} Native instruction struct.
 */
Object.defineProperty(CsInsn.prototype, "_toNative", {
    "value" : function () {
        if (this._nativeInsn) {
            return this._nativeInsn;
        }

        // Convert arch number to string
        var archStr = exports.ARCH.toString(this.arch);

        var insn = new InsnType();

        insn.id.set(this.id);
        insn.address.set(this.address);
        insn.size.set(this.bytes.length);

        new Buffer(this.bytes).copy(insn.bytes);

        insn.mnemonic.writeCString(0, this.mnemonic);
        insn.op_str.writeCString(0, this.op_str);

        if (this.detail) {
            insn.detail = ref.alloc(DetailType);
            var detail = insn.detail.deref();

            detail.regs_read.buffer.fill(0);
            detail.regs_write.buffer.fill(0);
            detail.groups.buffer.fill(0);

            new Buffer(this.detail.regs_read).copy(detail.regs_read.buffer);
            new Buffer(this.detail.regs_write).copy(detail.regs_write.buffer);
            new Buffer(this.detail.groups).copy(detail.groups.buffer);

            detail.regs_read_count.set(this.detail.regs_read.length);
            detail.regs_write_count.set(this.detail.regs_write.length);
            detail.groups_count.set(this.detail.groups.length);

            detail.arch[archStr]._load(this.detail[archStr]);
        }

        Object.defineProperty(this, "_nativeInsn", {
            "get" : function () {
                return insn;
            }
        });

        return insn;
    }
});

/**
 * Calculate the offset of a disassembled instruction in its buffer,
 * given its position in its array of disassembled insn
 *
 * *NOTE: this macro works with position (>=1), not index*
 *
 * @name INSN_OFFSET
 * @function
 * @param {CsInsn[]} insns Array of instructions.
 * @param {Number} pos Position.
 * @return {Number} Instruction offset.
 */
exports.INSN_OFFSET = function (insns, pos) {
    return insns[pos - 1].address - insns[0].address;
};


/**
 * FFI interface for libcapstone
 * @ignore
 */
try {
    var capstone = ffi.Library("libcapstone", {
        "cs_version"    : [ "int", [ "int *", "int *" ] ],
        "cs_support"    : [ "bool", [ "int" ] ],
        "cs_open"       : [ "int", [ "int", "int", "size_t *" ] ],
        "cs_close"      : [ "int", [ "size_t *" ] ],
        "cs_option"     : [ "int", [ "size_t", "int", "size_t" ] ],
        "cs_errno"      : [ "int", [ "size_t" ] ],
        "cs_strerror"   : [ "string", [ "int" ] ],
        "cs_disasm_ex"  : [ "size_t", [
            "size_t", "uint8 *", "size_t", "uint64", "size_t",
            ref.refType(ref.refType(InsnType))
        ] ],
        "cs_free"       : [ "void", [ ref.refType(InsnType), "size_t" ] ],
        "cs_reg_name"   : [ "string", [ "size_t", "uint" ] ],
        "cs_insn_name"  : [ "string", [ "size_t", "uint" ] ],
        "cs_insn_group" : [ "bool", [
            "size_t", ref.refType(InsnType), "uint"
        ] ],
        "cs_reg_read"   : [ "bool", [
            "size_t", ref.refType(InsnType), "uint"
        ] ],
        "cs_reg_write"  : [ "bool", [
            "size_t", ref.refType(InsnType), "uint"
        ] ],
        "cs_op_count"   : [ "int", [
            "size_t", ref.refType(InsnType), "uint"
        ] ],
        "cs_op_index"   : [ "int", [
            "size_t", ref.refType(InsnType), "uint", "uint"
        ] ]
    });
}
catch (e) {
    var error = "libcapstone could not be loaded. Make sure it is installed " +
        "and available in your PATH\n" + e.message;
    throw error;
}

/**
 * Retrieve version number from the Capstone library.
 *
 * ```javascript
 * var version = capstone.version();
 * console.log(
 *     "combined: 0x%s, version: %s",
 *     version[0].toString(16), version.slice(1).join(".")
 * );
 * //> combined: 0x201, version: 2.1
 * ```
 *
 * @name version
 * @function
 * @return {Number[]} Three-element array containing: [ combined, major, minor ]
 */
exports.version = function () {
    var major = ref.alloc("int");
    var minor = ref.alloc("int");
    var combined = capstone.cs_version(major, minor);
    return [ combined, major.deref(), minor.deref() ];
};

/**
 * Retrieve version number from the JavaScript bindings.
 *
 * ```javascript
 * var version = capstone.version();
 * console.log(
 *     "combined: 0x%s, version: %s",
 *     version[0].toString(16), version.slice(1).join(".")
 * );
 * //> combined: 0x201, version: 2.1
 * ```
 *
 * @name version_bind
 * @function
 * @return {Number[]} Three-element array containing: [ combined, major, minor ]
 */
exports.version_bind = function () {
    return [ VERSION[0] << 8 | VERSION[1], VERSION[0], VERSION[1] ];
};


/**
 * Version check
 * @ignore
 */
(function () {
    var libver  = "0x" + exports.version()[0].toString(16);
    var bindver = "0x" + exports.version_bind()[0].toString(16);
    if (libver !== bindver) {
        throw "Library version mismatch. " +
            "Got: " + libver + ", expected: " + bindver;
    }
})();


/**
 * Query Capstone for supported architectures.
 *
 * ```javascript
 * console.log(capstone.support(capstone.ARCH_ALL)); //> true
 * console.log(capstone.support(capstone.SUPPORT_DIET)); //> false
 * ```
 *
 * @name support
 * @function
 * @param {ARCH|SUPPORT} query Architecture or Support query.
 * @return {Bool} True if Capstone supports the given arch or support.
 */
exports.support = capstone.cs_support;

/**
 * Return a string describing the given error code.
 *
 * ```javascript
 * console.log(capstone.strerror(capstone.ERR_DETAIL));
 * ```
 *
 * @name strerror
 * @function
 * @param {ERR} code Error code
 * @return {String} Error description
 */
exports.strerror = capstone.cs_strerror;


/**
 * Set option for disassembly engine at runtime.
 * @ignore
 * @param {OPT_TYPE} type Option type
 * @param {OPT_VALUE|MODE} value Option value
 */
function option(csh, type, value) {
    var errno = capstone.cs_option(csh, type, value);
    if (errno) {
        throw "cs_option returned " + errno + ": " + exports.strerror(errno);
    }
}


/**
 * Primary Capstone class.
 *
 * ```javascript
 * var code = new Buffer([
 *     0x55, 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00
 * ]);
 *
 * var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
 *
 * cs.detail = true;
 * cs.disasm(code, 0x1000).forEach(function (insn) {
 *     console.log(
 *         "0x%s:\t%s\t%s\t%s",
 *         insn.address.toString(16), insn.mnemonic, insn.op_str,
 *         JSON.stringify(insn.detail)
 *     );
 * });
 *
 * cs.close();
 * ```
 *
 * @name Cs
 * @class
 * @param {ARCH} arch Architecture to work with.
 * @param {MODE} mode Additional architecture mode settings.
 */
exports.Cs = function (arch, mode) {
    this.arch = arch;
    this.csh = ref.alloc("size_t");

    var errno = capstone.cs_open(arch, mode, this.csh);
    if (errno) {
        throw "cs_open returned " + errno + ": " + exports.strerror(errno);
    }

    this._detail = false;
    this._mode = mode;
    this._syntax = (arch === exports.ARCH_X86) ? exports.SYNTAX_INTEL : 0;
    this._skipdata = false;

    Object.defineProperties(this, {
        /**
         * Capstone disassembler detail option.
         *
         * True to enable detailed instruction information.
         *
         * ```javascript
         * var cs = new Cs(capstone.ARCH_X86, capstone.MODE_64);
         *
         * // Enable detailed instruction information
         * cs.detail = true;
         *
         * cs.disasm(code, addr);
         * cs.close();
         * ```
         *
         * @name detail
         * @type Bool
         * @default false
         * @memberOf Cs
         */
        "detail" : {
            "enumerable" : true,
            "get" : function () {
                return this._detail;
            },
            "set" : function (opt) {
                option(
                    this.csh.deref(),
                    OPT_TYPE.DETAIL,
                    opt ? OPT_VALUE.ON : OPT_VALUE.OFF
                );
                this._detail = opt;
            }
        },

        /**
         * Capstone disassembler mode option.
         *
         * ```javascript
         * var cs = new Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
         *
         * // Switch to Thumb mode
         * cs.mode = capstone.MODE.THUMB;
         * cs.disasm(thumb_code, thumb_addr);
         *
         * // Switch back to ARM mode
         * cs.mode = capstone.MODE.ARM;
         * cs.disasm(arm_code, arm_addr);
         * cs.close();
         * ```
         *
         * @name mode
         * @type MODE
         * @memberOf Cs
         */
        "mode" : {
            "enumerable" : true,
            "get" : function () {
                return this._mode;
            },
            "set" : function (opt) {
                option(this.csh.deref(), OPT_TYPE.MODE, opt);
                this._mode = opt;
            }
        },

        /**
         * Capstone disassembler syntax option.
         *
         * ```javascript
         * var cs = new Cs(capstone.ARCH_X86, capstone.MODE_64);
         *
         * // Switch to ATT syntax
         * cs.syntax = capstone.SYNTAX_ATT;
         * cs.disasm(code, addr);
         *
         * // Switch back to INTEL syntax
         * cs.syntax = capstone.SYNTAX_INTEL;
         * cs.disasm(code, addr);
         *
         * cs.close();
         * ```
         *
         * @name syntax
         * @type SYNTAX
         * @memberOf Cs
         */
        "syntax" : {
            "enumerable" : true,
            "get" : function () {
                return this._syntax;
            },
            "set" : function (opt) {
                option(this.csh.deref(), OPT_TYPE.SYNTAX, opt);
                this._syntax = opt;
            }
        },

        /**
         * Capstone disassembler skipdata option.
         *
         * ```javascript
         * var cs = new Cs(capstone.ARCH_X86, capstone.MODE_64);
         *
         * // Enable SKIPDATA mode with specified mnemonic
         * cs.skipdata = new capstone.CsSkipdata(".db");
         *
         * cs.disasm(code, addr);
         * cs.close();
         * ```
         *
         * @name skipdata
         * @type CsSkipData
         * @default undefined
         * @memberOf Cs
         */
        "skipdata" : {
            "enumerable" : true,
            "get" : function () {
                return this._skipdata;
            },
            "set" : function (opt) {
                if (opt) {
                    option(this.csh.deref(), OPT_TYPE.SKIPDATA, OPT_VALUE.ON);
                    option(
                        this.csh.deref(),
                        OPT_TYPE.SKIPDATA_SETUP,
                        opt._skipdata
                    );
                    this._skipdata = opt;
                }
                else {
                    option(this.csh.deref(), OPT_TYPE.SKIPDATA, OPT_VALUE.OFF);
                    this._skipdata = false;
                }
            }
        }
    });
};

/**
 * Free allocated memory for this Capstone instance. This must be called when
 * the Capstone instance is no longer needed. DO NOT let the Capstone instance
 * get garbage collected until this method has been called.
 * @name close
 * @function
 * @memberOf Cs
 */
exports.Cs.prototype.close = function () {
    var errno = capstone.cs_close(this.csh);
    if (errno) {
        throw "cs_close returned " + errno + ": " + exports.strerror(errno);
    }
};

/**
 * Report last error when a Capstone API function fails.
 * @name errno
 * @function
 * @memberOf Cs
 * @return {ERR} Error code
 */
exports.Cs.prototype.errno = function () {
    return capstone.cs_errno(this.csh.deref());
};

/**
 * Return a string describing the last error code.
 * @name strerror
 * @function
 * @memberOf Cs
 * @return {String} Error description
 */
exports.Cs.prototype.strerror = function () {
    return capstone.cs_strerror(this.errno());
};

/**
 * Disassemble the binary contained in a Buffer.
 * @name disasm
 * @function
 * @memberOf Cs
 * @param {Buffer} buffer Binary to disassemble.
 * @param {Number} addr Starting address for the given buffer.
 * @param {Number} [max=0] Max number of instructions to disassemble
 * @return {CsInsn[]} Array of instructions.
 */
exports.Cs.prototype.disasm = function (buffer, addr, max) {
    var insn = ref.alloc(new ArrayType(InsnType));

    var count = capstone.cs_disasm_ex(
        this.csh.deref(),
        buffer,
        buffer.length,
        addr,
        max || 0,
        insn
    );
    if (!count) {
        var errno = this.errno();
        throw "cs_disasm_ex returned " + errno + ": " + exports.strerror(errno);
    }

    // Get instruction array, and fix length
    var insns = insn.deref();
    insns.length = count;

    // Create a JavaScript view of the instruction array
    var instructions = [];
    for (var i = 0; i < count; i++) {
        instructions.push(new CsInsn(insns[i], this.arch));
    }

    // Free the native instruction array
    capstone.cs_free(insns.buffer, count);

    return instructions;
};

/**
 * Disassemble the binary contained in a Buffer, with a lightweight API.
 * @name disasm_lite
 * @function
 * @memberOf Cs
 * @param {Buffer} buffer Binary to disassemble.
 * @param {Number} addr Starting address for the given buffer.
 * @param {Number} [max=0] Max number of instructions to disassemble
 * @return {Array[]} Instruction arrays: [ address, size, mnemonic, op_str ]
 */
exports.Cs.prototype.disasm_lite = function (buffer, addr, max) {
    var insn = ref.alloc(new ArrayType(InsnType));

    var count = capstone.cs_disasm_ex(
        this.csh.deref(),
        buffer,
        buffer.length,
        addr,
        max || 0,
        insn
    );
    if (!count) {
        var errno = this.errno();
        throw "cs_disasm_lite returned " + errno + ": " +
            exports.strerror(errno);
    }

    // Get instruction array, and fix length
    var insns = insn.deref();
    insns.length = count;

    // Create a JavaScript view of the instruction array
    var instructions = [];
    for (var i = 0; i < count; i++) {
        instructions.push([
            insns[i].address,
            insns[i].size,
            insns[i].mnemonic.buffer.readCString(0),
            insns[i].op_str.buffer.readCString(0)
        ]);
    }

    // Free the native instruction array
    capstone.cs_free(insns.buffer, count);

    return instructions;
};

/**
 * Return register name as a string for given register ID.
 * @name reg_name
 * @function
 * @memberOf Cs
 * @param {Number} id Register ID
 * @return {String} Register name, or null on error
 */
exports.Cs.prototype.reg_name = function (id) {
    return capstone.cs_reg_name(this.csh.deref(), id);
};

/**
 * Return instruction name as a string for given instruction ID.
 * @name insn_name
 * @function
 * @memberOf Cs
 * @param {Number} id Instruction ID
 * @return {String} Instruction name, or null on error
 */
exports.Cs.prototype.insn_name = function (id) {
    return capstone.cs_insn_name(this.csh.deref(), id);
};

/**
 * Check if a disassembled instruction belongs to a particular group.
 *
 * *NOTE: this API is only valid when detail option is ON (OFF by default)*
 *
 * @name insn_group
 * @function
 * @memberOf Cs
 * @param {CsInsn} insn Instruction
 * @param {Number} id Group ID
 * @return {Bool} True if the instruction belongs to the given group.
 */
exports.Cs.prototype.insn_group = function (insn, id) {
    return capstone.cs_insn_group(this.csh.deref(), insn._toNative(), id);
};

/**
 * Check if a disassembled instruction IMPLICITLY reads a particular register.
 *
 * *NOTE: this API is only valid when detail option is ON (OFF by default)*
 *
 * @name reg_read
 * @function
 * @memberOf Cs
 * @param {CsInsn} insn Instruction
 * @param {Number} id Register ID
 * @return {Bool} True if the instruction reads the given register.
 */
exports.Cs.prototype.reg_read = function (insn, id) {
    return capstone.cs_reg_read(this.csh.deref(), insn._toNative(), id);
};

/**
 * Check if a disassembled instruction IMPLICITLY writes a particular register.
 *
 * *NOTE: this API is only valid when detail option is ON (OFF by default)*
 *
 * @name reg_write
 * @function
 * @memberOf Cs
 * @param {CsInsn} insn Instruction
 * @param {Number} id Register ID
 * @return {Bool} True if the instruction writes the given register.
 */
exports.Cs.prototype.reg_write = function (insn, id) {
    return capstone.cs_reg_write(this.csh.deref(), insn._toNative(), id);
};

/**
 * Count the number of operands with a particular type for an instruction.
 *
 * *NOTE: this API is only valid when detail option is ON (OFF by default)*
 *
 * @name op_count
 * @function
 * @memberOf Cs
 * @param {CsInsn} insn Instruction
 * @param {Number} op_type Operand type to be found.
 * @return {Number} Number of operands, or -1 on failure.
 */
exports.Cs.prototype.op_count = function (insn, op_type) {
    return capstone.cs_op_count(this.csh.deref(), insn._toNative(), op_type);
};

/**
 * Retrieve position of the operand of given type in disassembled instruction.
 *
 * `position` must be in range: `{ 1 .. Cs.op_count(insn, op_type) }`
 *
 * *NOTE: this API is only valid when detail option is ON (OFF by default)*
 *
 * @name op_index
 * @function
 * @memberOf Cs
 * @param {CsInsn} insn Instruction
 * @param {Number} op_type Operand type to be found.
 * @param {Number} position Position of the operand to be found.
 * @return {Number} Number of operands, or -1 on failure.
 */
exports.Cs.prototype.op_index = function (insn, op_type, position) {
    return capstone.cs_op_index(
        this.csh.deref(),
        insn._toNative(),
        op_type,
        position
    );
};
