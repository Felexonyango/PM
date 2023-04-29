import { Ipriority } from "../types";
import { Status } from "../types/project";
import { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface taskDocument extends Document {
  name: string;
  dueDate:Date
  startDate: Date;
  endDate: Date;
  status: Status;
  priority:Ipriority,
  assignedTo: ObjectId|any
  project: ObjectId;
}

const taskSChema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      required: false,
    },

    endDate: {
      type: Date,
      required: false,
    },
   
    status: {
      type: String,
    },
    priority:{
      type:String
    },
    user: {
      type: ObjectId,
      ref: "User",
      require: true,
    },
    assignedTo: {
      type: ObjectId,
      ref: "User",
    },
    project: {
      type: ObjectId,
      ref: "Project",
    },
  },

  {
    timestamps: true,
  }
);
export const Task = model<taskDocument>("Task", taskSChema);
