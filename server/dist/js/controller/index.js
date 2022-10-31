"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo1_1 = __importDefault(require("../db/models/todo1"));
// import Todo2 from "../db/models/todo2";
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo1_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, isCompleted } = req.body;
        const checkData = yield todo1_1.default.findOne({ name });
        if (checkData)
            throw new Error('Task already exists');
        const createData = yield todo1_1.default.create({ name, description, isCompleted });
        if (!createData)
            throw new Error('Error creating task');
        const todos = yield todo1_1.default.find();
        if (!(todos === null || todos === void 0 ? void 0 : todos.length))
            throw new Error('No Data found');
        res.status(201).json({ todos });
    }
    catch (error) {
        res.status(401).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body } = req;
        const updateTodo = yield todo1_1.default.findByIdAndUpdate({ _id: id }, body, { new: true });
        if (!updateTodo)
            throw new Error('Error updating task');
        const todos = yield todo1_1.default.find();
        if (!(todos === null || todos === void 0 ? void 0 : todos.length))
            throw new Error('No Data found');
        res.status(200).json({ todos });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo1_1.default.findByIdAndRemove(req.params.id);
        if (!deletedTodo)
            throw new Error('Error deleting task');
        const todos = yield todo1_1.default.find();
        if (!(todos === null || todos === void 0 ? void 0 : todos.length))
            throw new Error('No Data found');
        res.status(200).json({ todos });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.deleteTodo = deleteTodo;
