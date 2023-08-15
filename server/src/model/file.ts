import { Status } from "../types/project";
import { Schema, model, Document, ObjectId } from "mongoose";
const { ObjectId } = Schema.Types;

export interface FileDocument extends Document {
  name: string;
  project: ObjectId;
  path:string
}

const FileSChema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path:{
        type: String,

    },
    file: {
        type: String,
       
      },
    project:{
        type:ObjectId,
        ref:'Project'
    },
    uploadedBy:{
        type:ObjectId,
        ref:'User'
    }
  
   
  },

  {
    timestamps: true,
  }
);
export const File = model<FileDocument>("File", FileSChema);
