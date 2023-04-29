export enum Status {
  PENDING= "PENDING",
  COMPLETED= "COMPLETED",
  ONHOLD= "ONHOLD",
  ONGOING="ONGOING",

}
export interface Iproject {
  _id?: string;
  projectName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  dueDate?:Date
  projectduration?:number;
  budget?:number
  status?: Status;
  percentageCompleted?: number;
  percentagePending?: number;

}
