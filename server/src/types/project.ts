export enum Status {
  PENDING= "PENDING",
  COMPLETED= "COMPLETED",
  CANCELLED= "CANCELLED",
  ONGOING="ONGOING",

}
export interface Iproject {
  _id?: string;
  projectName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  projectduration?:number;
  budget?:number
  status?: Status;
}
