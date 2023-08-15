import { Status } from "../types/project";
import { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface FaqDocument extends Document {
  question: string;
  askedBy:any
}

const FaqSChema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    askedBy:{
        type: ObjectId,
        ref: "User",
    },
  
  },

  {
    timestamps: true,
  }
);
export const Faq = model<FaqDocument>("Faq", FaqSChema);
