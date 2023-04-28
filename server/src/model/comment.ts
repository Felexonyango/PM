import { Status } from "../types/project";
import { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface CommentDocument extends Document {
  comment: string;
  project: ObjectId;
  commentedBy:any
}

const CommentSChema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    commentedBy:{
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
export const Comment = model<CommentDocument>("Comment", CommentSChema);
