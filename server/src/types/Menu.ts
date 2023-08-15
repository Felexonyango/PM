import { Role } from "./role";

export type Menu = {
  _id?: string;
  label?: string;
  routerLink?: [string];
  icon?:string
  role?: Role[];
  items?:any[]

};
