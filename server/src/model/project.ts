import {Status } from "../types/project";
import mongoose, { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface projectDocument extends Document {
 
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectduration?: number;
  status: Status;
  assignedTo:ObjectId |any;
  workspace:ObjectId
  percentageCompleted?: number;
  percentagePending?: number;
}

const ProjectSchma = new Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate:{
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
    projectduration: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "User",
      require:true
    },
    assignedTo:{
      type: ObjectId,
      ref: "User",
    },
    workspace:{
      type:ObjectId,
      ref: "Workspace",

    },
    budget:{
      type:Number,
    },
    percentageCompleted: { 
      type: Number,
       default: 0 
      },
    percentagePending: { 
      type: Number, default: 0
     },
     task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
 
  },

  {
    timestamps: true,
  }
);
export const Project = model<projectDocument>("Project", ProjectSchma);
