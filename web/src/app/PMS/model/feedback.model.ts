import { User } from "./auth";

export interface IFeedback {
  _id?: string;
  title: string;
  description?: string;
  isActioned?: boolean;
  menuItems?: any;
  from?: User;
  createdAt?:Date;
  __v?: any;
}
