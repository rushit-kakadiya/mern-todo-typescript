import { todoType } from "../../type/todo";
import { Schema } from "mongoose";
import { db2 } from "../index";

const todoSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true, versionKey: false }
);

const Todo2 = db2.model<todoType>("todo2", todoSchema, "todo2");
export default Todo2;
