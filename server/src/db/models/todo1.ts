import { todoType } from "../../type/todo";
import { Schema } from "mongoose";
import { db1 } from "../index";

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

const Todo1 = db1.model<todoType>("todo1", todoSchema, "todo1");
export default Todo1;
