import { Status } from "../types/project";
import { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface CustomerDocument extends Document {
name: string;
email:string;
phoneNumber:number;
country:string;
address:string;
workspace:ObjectId


}

const CustomerSChema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
   phoneNumber:{
      type: Number,
      required: true,
    },
    country:{
      type: String,
      required: true,
    },
    address:{
      type: String,
      required: true,
    },
    workspace:{
      type:ObjectId,
      ref: "Workspace",

    },

  
  },

  {
    timestamps: true,
  }
);
export const Customer = model<CustomerDocument>("Customer", CustomerSChema);
