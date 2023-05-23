export enum UserRoles {
  USERMANAGER = 'USERMANAGER',
  USER = 'USER',
  SYSADMIN = 'SYSADMIN',
  MANAGEWORKSPACES = 'MANAGEWORKSPACES',
  MANAGEISSUES = 'MANAGEISSUES',
}

export const userRoleArray: string[] = [
  'USERMANAGER',
  'USER',
  'MANAGEISSUES',
  'SYSADMIN',
  'MANAGEWORKSPACES'
];

export enum AuthItemType {
  EMAIL = 'EMAIL',
  PHONENUMBER = 'PHONENUMBER'
}

export interface IAuthItem {
  value: string;
  authType: AuthItemType;
  isVerified: boolean
};


export interface IPermission {
  _id?: string;
  name: string;
  description?: string;
  permissions?: string[];
  menuItems?: any[];
}
export interface IAllowedPermissions {
  value: string;
  text: string;
}


