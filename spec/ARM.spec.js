describe("ARM", function () {
    var capstone = require("..");

    var CODE_ARM = new Buffer([
        0xed, 0xff, 0xff, 0xeb, 0x04, 0xe0, 0x2d, 0xe5,
        0x00, 0x00, 0x00, 0x00, 0xe0, 0x83, 0x22, 0xe5,
        0xf1, 0x02, 0x03, 0x0e, 0x00, 0x00, 0xa0, 0xe3,
        0x02, 0x30, 0xc1, 0xe7, 0x00, 0x00, 0x53, 0xe3,
        0x00, 0x02, 0x01, 0xf1, 0x05, 0x40, 0xd0, 0xe8,
        0xf4, 0x80, 0x00, 0x00
    ]);

    var EXPECT_ARM = [
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_BL,
            "address" : 0x1000,
            "bytes" : [ 0xed, 0xff, 0xff, 0xeb ],
            "mnemonic" : "bl",
            "op_str" : "#0xfbc"
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_STR,
            "address" : 0x1004,
            "bytes" : [ 0x04, 0xe0, 0x2d, 0xe5 ],
            "mnemonic" : "str",
            "op_str" : "lr, [sp, #-4]!"
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_AND,
            "address" : 0x1008,
            "bytes" : [ 0x00, 0x00, 0x00, 0x00 ],
            "mnemonic" : "andeq",
            "op_str" : "r0, r0, r0"
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_STR,
            "address" : 0x100C,
            "bytes" : [ 0xe0, 0x83, 0x22, 0xe5 ],
            "mnemonic" : "str",
            "op_str" : "r8, [r2, #-0x3e0]!"
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_MCR,
            "address" : 0x1010,
            "bytes" : [ 0xf1, 0x02, 0x03, 0x0e ],
            "mnemonic" : "mcreq",
            "op_str" : "p2, #0, r0, c3, c1, #7"
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_MOV,
            "address" : 0x1014,
            "bytes" : [ 0x00, 0x00, 0xa0, 0xe3 ],
            "mnemonic" : "mov",
            "op_str" : "r0, #0"
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_STRB,
            "address" : 0x1018,
            "bytes" : [ 0x02, 0x30, 0xc1, 0xe7 ],
            "mnemonic" : "strb",
            "op_str" : "r3, [r1, r2]"
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_CMP,
            "address" : 0x101C,
            "bytes" : [ 0x00, 0x00, 0x53, 0xe3 ],
            "mnemonic" : "cmp",
            "op_str" : "r3, #0"
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_SETEND,
            "address" : 0x1020,
            "bytes" : [ 0x00, 0x02, 0x01, 0xf1 ],
            "mnemonic" : "setend",
            "op_str" : "be"
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_LDM,
            "address" : 0x1024,
            "bytes" : [ 0x05, 0x40, 0xd0, 0xe8 ],
            "mnemonic" : "ldm",
            "op_str" : "r0, {r0, r2, lr} ^"
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_STRD,
            "address" : 0x1028,
            "bytes" : [ 0xf4, 0x80, 0x00, 0x00 ],
            "mnemonic" : "strdeq",
            "op_str" : "r8, sb, [r0], -r4"
        },
    ];

    var EXPECT_ARM_LITE = [
        [ 0x1000, 4, "bl", "#0xfbc" ],
        [ 0x1004, 4, "str", "lr, [sp, #-4]!" ],
        [ 0x1008, 4, "andeq", "r0, r0, r0" ],
        [ 0x100C, 4, "str", "r8, [r2, #-0x3e0]!" ],
        [ 0x1010, 4, "mcreq", "p2, #0, r0, c3, c1, #7" ],
        [ 0x1014, 4, "mov", "r0, #0"],
        [ 0x1018, 4, "strb", "r3, [r1, r2]" ],
        [ 0x101C, 4, "cmp", "r3, #0" ],
        [ 0x1020, 4, "setend", "be" ],
        [ 0x1024, 4, "ldm", "r0, {r0, r2, lr} ^" ],
        [ 0x1028, 4, "strdeq", "r8, sb, [r0], -r4" ],
    ];

    var EXPECT_ARM_DETAIL = [
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_BL,
            "address" : 0x1000,
            "bytes" : [ 0xed, 0xff, 0xff, 0xeb ],
            "mnemonic" : "bl",
            "op_str" : "#0xfbc",
            "detail" : {
                "regs_read" : [ capstone.arm.REG_PC ],
                "regs_write" : [ capstone.arm.REG_LR ],
                "groups" : [
                    capstone.arm.GRP_JUMP,
                    capstone.arm.GRP_ARM,
                ],
                "arm" : {
                    "usermode" : false,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_AL,
                    "update_flags" : false,
                    "writeback" : false,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_IMM,
                            "subtracted" : false,
                            "imm" : 0xfbc,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_STR,
            "address" : 0x1004,
            "bytes" : [ 0x04, 0xe0, 0x2d, 0xe5 ],
            "mnemonic" : "str",
            "op_str" : "lr, [sp, #-4]!",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.arm.GRP_ARM ],
                "arm" : {
                    "usermode" : false,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_AL,
                    "update_flags" : false,
                    "writeback" : true,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_LR,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_MEM,
                            "subtracted" : false,
                            "mem" : {
                                "base" : capstone.arm.REG_SP,
                                "index" : 0,
                                "scale" : 1,
                                "disp" : -4,
                            },
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_AND,
            "address" : 0x1008,
            "bytes" : [ 0x00, 0x00, 0x00, 0x00 ],
            "mnemonic" : "andeq",
            "op_str" : "r0, r0, r0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.arm.GRP_ARM ],
                "arm" : {
                    "usermode" : false,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_EQ,
                    "update_flags" : false,
                    "writeback" : false,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R0,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R0,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R0,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_STR,
            "address" : 0x100C,
            "bytes" : [ 0xe0, 0x83, 0x22, 0xe5 ],
            "mnemonic" : "str",
            "op_str" : "r8, [r2, #-0x3e0]!",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.arm.GRP_ARM ],
                "arm" : {
                    "usermode" : false,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_AL,
                    "update_flags" : false,
                    "writeback" : true,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R8,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_MEM,
                            "subtracted" : false,
                            "mem" : {
                                "base" : capstone.arm.REG_R2,
                                "index" : 0,
                                "scale" : 1,
                                "disp" : -0x3e0,
                            },
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_MCR,
            "address" : 0x1010,
            "bytes" : [ 0xf1, 0x02, 0x03, 0x0e ],
            "mnemonic" : "mcreq",
            "op_str" : "p2, #0, r0, c3, c1, #7",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.arm.GRP_ARM ],
                "arm" : {
                    "usermode" : false,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_EQ,
                    "update_flags" : false,
                    "writeback" : false,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_PIMM,
                            "subtracted" : false,
                            "imm" : 2,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_IMM,
                            "subtracted" : false,
                            "imm" : 0,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R0,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_CIMM,
                            "subtracted" : false,
                            "imm" : 3,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_CIMM,
                            "subtracted" : false,
                            "imm" : 1,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_IMM,
                            "subtracted" : false,
                            "imm" : 7,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_MOV,
            "address" : 0x1014,
            "bytes" : [ 0x00, 0x00, 0xa0, 0xe3 ],
            "mnemonic" : "mov",
            "op_str" : "r0, #0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.arm.GRP_ARM ],
                "arm" : {
                    "usermode" : false,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_AL,
                    "update_flags" : false,
                    "writeback" : false,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R0,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_IMM,
                            "subtracted" : false,
                            "imm" : 0,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_STRB,
            "address" : 0x1018,
            "bytes" : [ 0x02, 0x30, 0xc1, 0xe7 ],
            "mnemonic" : "strb",
            "op_str" : "r3, [r1, r2]",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.arm.GRP_ARM ],
                "arm" : {
                    "usermode" : false,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_AL,
                    "update_flags" : false,
                    "writeback" : false,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R3,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_MEM,
                            "subtracted" : false,
                            "mem" : {
                                "base" : capstone.arm.REG_R1,
                                "index" : capstone.arm.REG_R2,
                                "scale" : 1,
                                "disp" : 0,
                            },
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_CMP,
            "address" : 0x101C,
            "bytes" : [ 0x00, 0x00, 0x53, 0xe3 ],
            "mnemonic" : "cmp",
            "op_str" : "r3, #0",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [ 3 ],
                "groups" : [ capstone.arm.GRP_ARM ],
                "arm" : {
                    "usermode" : false,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_AL,
                    "update_flags" : true,
                    "writeback" : false,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R3,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_IMM,
                            "subtracted" : false,
                            "imm" : 0,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_SETEND,
            "address" : 0x1020,
            "bytes" : [ 0x00, 0x02, 0x01, 0xf1 ],
            "mnemonic" : "setend",
            "op_str" : "be",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.arm.GRP_ARM ],
                "arm" : {
                    "usermode" : false,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_AL,
                    "update_flags" : false,
                    "writeback" : false,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_SETEND,
                            "subtracted" : false,
                            "setend" : 1,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_LDM,
            "address" : 0x1024,
            "bytes" : [ 0x05, 0x40, 0xd0, 0xe8 ],
            "mnemonic" : "ldm",
            "op_str" : "r0, {r0, r2, lr} ^",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.arm.GRP_ARM ],
                "arm" : {
                    "usermode" : true,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_AL,
                    "update_flags" : false,
                    "writeback" : false,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R0,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R0,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R2,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_LR,
                        }
                    ]
                }
            }
        },
        {
            "arch" : capstone.ARCH_ARM,
            "id" : capstone.arm.INS_STRD,
            "address" : 0x1028,
            "bytes" : [ 0xf4, 0x80, 0x00, 0x00 ],
            "mnemonic" : "strdeq",
            "op_str" : "r8, sb, [r0], -r4",
            "detail" : {
                "regs_read" : [],
                "regs_write" : [],
                "groups" : [ capstone.arm.GRP_ARM ],
                "arm" : {
                    "usermode" : false,
                    "vector_size" : 0,
                    "vector_data" : 0,
                    "cps_mode" : 0,
                    "cps_flag" : 0,
                    "cc" : capstone.arm.CC_EQ,
                    "update_flags" : false,
                    "writeback" : true,
                    "mem_barrier" : capstone.arm.MB_INVALID,
                    "operands" : [
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_R8,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : false,
                            "reg" : capstone.arm.REG_SB,
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_MEM,
                            "subtracted" : false,
                            "mem" : {
                                "base" : capstone.arm.REG_R0,
                                "index" : 0,
                                "scale" : 1,
                                "disp" : 0,
                            }
                        },
                        {
                            "vector_index" : -1,
                            "shift" : { "type" : 0, "value" : 0 },
                            "type" : capstone.arm.OP_REG,
                            "subtracted" : true,
                            "reg" : capstone.arm.REG_R4,
                        }
                    ]
                }
            }
        }
    ];

    /*
    var CODE_ARMTHUMB = new Buffer([
        0xd1, 0xe8, 0x00, 0xf0, 0xf0, 0x24, 0x04, 0x07,
        0x1f, 0x3c, 0xf2, 0xc0, 0x00, 0x00, 0x4f, 0xf0,
        0x00, 0x01, 0x46, 0x6c
    ]);
    var CODE_THUMB = new Buffer([
        0x70, 0x47, 0xeb, 0x46, 0x83, 0xb0, 0xc9, 0x68,
        0x1f, 0xb1
    ]);
    var CODE_THUMB2 = new Buffer([
        0x4f, 0xf0, 0x00, 0x01, 0xbd, 0xe8, 0x00, 0x88,
        0xd1, 0xe8, 0x00, 0xf0
    ]);
    */


    it("can print the correct register", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        var output = cs.reg_name(capstone.arm.REG_S31);
        cs.close();
        expect(output).toEqual("s31");
    });

    it("can print the correct instruction", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        var output = cs.insn_name(capstone.arm.INS_VPOP);
        cs.close();
        expect(output).toEqual("vpop");

    });

    it("can be disassembled", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        var output = cs.disasm(CODE_ARM, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_ARM);
    });

    it("can be disassembled quickly", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        var output = cs.disasm_lite(CODE_ARM, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_ARM_LITE);
    });

    it("can be disassembled with detail", function () {
        var cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_ARM);
        cs.detail = true;
        var output = cs.disasm(CODE_ARM, 0x1000);
        cs.close();
        expect(output).not.toBeDiff(EXPECT_ARM_DETAIL);
    });
});
