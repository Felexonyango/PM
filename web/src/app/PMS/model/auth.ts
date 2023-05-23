export class User {
  _id?: string;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?:string
  menuItems?:any
  roles?:any
  profileBgColor?:any
  
    
  }
  export enum HTTPResponseStatus {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
  }
  export enum UserRoles {
   
    USER = 'user',
    ADMIN = 'admin',
 
  }

   export  interface Imenu{
    
      name: string
      url: string
      role: string[]
      
  
  }
  