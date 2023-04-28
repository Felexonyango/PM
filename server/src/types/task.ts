import { Status } from "./project";

export interface ITask{
    _id?:string;
    name?:string
    isCompleted?:boolean
    assignedTo?:string
    startDate?:Date
    endDate?:Date
    status?:Status

}
