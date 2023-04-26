import mongoose, { Model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "../types/role";
export interface IRole extends Document {
  role: Role[];
  
}

export interface RoleModel extends Model<IRole> {}


const RoleSchema: Schema = new Schema(
 {
   role: {
      type: String
     
    },
  
  },
  
  {
    timestamps: true,
  }
)

export const Roles = mongoose.model<IRole, RoleModel>("Roles", RoleSchema);
