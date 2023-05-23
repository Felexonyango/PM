
import { User } from "./auth";
import { IWorkspace } from "./workspace.model";
export interface IProject {
    _id?: string;
    projectName?:string
    description?:string;
    budget?:number
    dueDate?:Date
    isContractive?:boolean
    status?:Status
    priority?:ProjectPriorityTypes
    percentageCompleted?:number
    percentagePending?:number
    workspace?:IWorkspace
    createdAt?:Date
    createdBy?:User
    menuItems?:any
    projectduration?:number
    __v?:any
}

export enum Status {
    NOTSTARTED= "NOTSTARTED",
    COMPLETED= "COMPLETED",
    ONHOLD= "ONHOLD",
    ONGOING="ONGOING",
  
  }
  export enum ProjectPriorityTypes {
    CRITICAL = 'CRITICAL',
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}




    
