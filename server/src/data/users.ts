import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { Role } from "../types";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Types.ObjectId[];
}

const Users: User[] = [
  {
    firstname: "John",
    lastname: "Doe",
    email: "projectmanager@gmail.com",
    password: bcrypt.hashSync("@projectmanager254", 12),
    role: [Types.ObjectId("6448d342febc8c2878fec0b2") ] 
  },
];




export default Users;