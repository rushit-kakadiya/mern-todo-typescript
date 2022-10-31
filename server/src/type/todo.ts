import { Document } from "mongoose";

export interface todoType extends Document {
  name: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
