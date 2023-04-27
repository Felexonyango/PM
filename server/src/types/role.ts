export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SYSADMIN = "SYSADMIN",
}
export interface Roles {
  _id: any;
  name: any
  role?:Role
}
