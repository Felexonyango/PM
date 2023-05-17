
import { User } from "./auth";
import { IWorkspace } from "./workspace.model";
export interface IProject {
    _id?: string;
    projectName?:string
    description?:string;
    budget?:number
    dueDate?:Date
    status?:boolean
    workspace?:IWorkspace
    createdAt?:Date
    createdBy?:User
    menuItems?:any
    projectHours?:number

    __v?:any

    

    
}





    
