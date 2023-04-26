export enum workspaceActions  {
  VIEWDETAILS = 'VIEWDETAILS',
  VIEWDASHBOARD = 'VIEWDASHBOARD'
}
export type Iworkspace = {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  OrgType: string;
  action :workspaceActions
};
