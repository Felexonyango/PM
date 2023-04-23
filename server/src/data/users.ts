import bcrypt from "bcryptjs";
import { Role } from "../types";
import { User } from "../types/user";
const Users:User[]=[
  {
    firstname: "John",
    lastname:'Doe',
    email: "projectmanager@gmail.com",
    password: bcrypt.hashSync("@projectmanager254", 12), 
    role: [Role.Admin]
  }
  
]
export default Users;
