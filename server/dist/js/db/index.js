"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db2 = exports.db1 = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function makeNewConnection(uri) {
    const db = mongoose_1.default.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    db.on("error", function (error) {
        console.log(`MongoDB :: connection ${JSON.stringify(error === null || error === void 0 ? void 0 : error.message)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection`));
    });
    db.on("connected", () => {
        mongoose_1.default.set("debug", (col, method, query, doc) => {
            console.log(`MongoDB :: ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
        });
        console.log(`MongoDB :: connected`);
    });
    db.on("disconnected", function () {
        console.log(`MongoDB :: disconnected`);
    });
    return db;
}
exports.db1 = makeNewConnection("mongodb://localhost:27017/todo1");
exports.db2 = makeNewConnection("mongodb://localhost:27017/todo2");
