import mongoose, { Model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "../types/role";
export interface IRole extends Document {
  name:String,
  description:string
  
}

export interface RoleModel extends Model<IRole> {}


const RoleSchema: Schema = new Schema(
 {
  
    name: {
      type: String,
      enum: ["USER", "ADMIN", "SYSADMIN"],
      required: true,
      unique: true,
    },
    description:{
      type: String,
      required: false,

    }
  
  },
  
  {
    timestamps: true,
  }
)

export const Roles = mongoose.model<IRole, RoleModel>("Roles", RoleSchema);
