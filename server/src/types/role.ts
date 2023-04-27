export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SYSADMIN = "SYSADMIN",
  MEMBER = "MEMBER",
  PROJECTMANAGER='PROJECTMANAGER'
}
export interface Roles {
  _id: any;
  name: any;
  role?: Role;
}
