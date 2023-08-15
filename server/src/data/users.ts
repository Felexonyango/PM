import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { Role, Roles } from "../types";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Roles[];
}

const Users: User[] = [
  {
    firstname: "John",
    lastname: "Doe",
    email: "projectmanager@gmail.com",
    password: bcrypt.hashSync("@projectmanager254", 12),
    role: [
      {
        _id: Types.ObjectId("644966e4b063a954a811a912"),
        name: "SYSADMIN",
      },
    ],
  },

];





export default Users;