import mongoose, { Model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "../types/role";
const { ObjectId } = mongoose.Types;
export interface Iuser extends Document {
  firstname: string;
  lastname:string
  email: string;
  password: string
  role:Types.ObjectId[]; 
   

  comparePassword(candidatepassword: string): Promise<boolean>;
}

export interface UserModel extends Model<Iuser> {}


const UserSchema: Schema = new Schema(
  {
    firstname: {
      type: String,
      required:true
    },
    lastname:{
      type:String,
      required:true
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
  

    password: {
      type: String,
      required: true,
    },

    

    role: {
      type: [mongoose.Types.ObjectId],
      ref: "Roles",
      default: [ObjectId("6448d330febc8c2878fec0b1")]
    },
  
  },
  
  {
    timestamps: true,
  }
);

UserSchema.pre<Iuser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

UserSchema.methods.comparePassword = async function (
  candidatepassword: string
): Promise<boolean> {
  const user = <Iuser>this;
  return await bcrypt.compare(candidatepassword, user.password);
};

export const User = mongoose.model<Iuser, UserModel>("User", UserSchema);
