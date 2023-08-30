import { User } from "./auth";
import { IProject, Status } from "./project.model";

export interface ITask{
    _id?: string;
    name?:string
    description?:string
    dueDate?:Date
    startDate?:Date
    endDate?:Date
    project?:IProject
    assignedTo?:User
    user?:User
    priority?:any
    status?:Status
    menuItems?:any
    createdAt?:Date
    _V?:any
}