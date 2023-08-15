import { User } from "./auth";

export interface IWorkspace {
  _id?: string;
  title?: string;
  description?: string;
  workspaceOwner?:User;
  members?: User[]
  menuItems?: any
  createdBy?:User
  workspace?:User
  isOwner?:boolean
  createdAt?:Date
  __v?:unknown
  
}

