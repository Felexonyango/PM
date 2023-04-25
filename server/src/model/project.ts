import { IStatus } from "../types/project";
import { Schema, model, Document } from "mongoose";
const { ObjectId } = Schema.Types;

export interface projectDocument extends Document {
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectduration?: number;
  status: IStatus;
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
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
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
    },
  },

  {
    timestamps: true,
  }
);
export const Project = model<projectDocument>("Project", ProjectSchma);
