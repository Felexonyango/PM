import { Ipriority } from "../types";
import {Status } from "../types/project";
import mongoose, { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface projectDocument extends Document {
 
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
  projectduration?: number;
  status: Status;
  assignedTo:ObjectId |any;
  workspace:ObjectId
  priority:Ipriority,
  isContractive:boolean
  percentageCompleted: number;
  percentagePending: number;
}

const ProjectSchma = new Schema(
  {
    projectName: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    dueDate:{
      type: Date,
      required: false,
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
      default:Status.NOTSTARTED
    },
    user: {
      type: ObjectId,
      ref: "User",
      require:false
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
     priority:{
      type:String,
      default:Ipriority.NONE
    },
    isContractive:{
      type:Boolean,
      default:false

    },
 
  },

  {
    timestamps: false,
  }
);
export const Project = model<projectDocument>("Project", ProjectSchma);
