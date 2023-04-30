export enum Role {
  USER = "USER",
  SYSADMIN = "SYSADMIN",
  PROJECTMANAGER='PROJECTMANAGER'
}
export interface Roles {
  _id: any;
  name: any;
  role?: Role;
}
