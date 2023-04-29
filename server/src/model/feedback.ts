
import { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface FeedBackDocument extends Document {
  title: string;
  description: string;
  resolved:boolean
  resolvedDate:Date
}

const FeedbackSChema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description:{
        type: String,
        required: true,
      
    },
    resolved: {
      type: Boolean,
     default: false
    },
    raisedBy:{
        type:ObjectId,
        ref:"User"
    },
    resolvedDate:{
        type:Date
    }
  },

  {
    timestamps: true,
  }
);
export const Feedback = model<FeedBackDocument>("Feedback", FeedbackSChema);
