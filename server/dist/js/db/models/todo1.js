"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const index_1 = require("../index");
const todoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true, versionKey: false });
const Todo1 = index_1.db1.model("todo1", todoSchema, "todo1");
exports.default = Todo1;
