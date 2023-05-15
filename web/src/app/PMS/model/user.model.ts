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





