import { Menu, Role } from "../types";

const MenuData: Menu[] = [
  {
    label: 'Apps',
    icon: 'pi pi-th-large',
    items: [
        {
            label: 'Blog',
            icon: 'pi pi-fw pi-comment',
            
        },
      
       
        
    ]
},

  // {
  //   label: "Dashboard",
  //   routerLink: ["app/admin"],
  //   icon: "pi pi-align-justify",
  //   role: [Role.PROJECTMANAGER, Role.SYSADMIN, Role.USER],
  // },

  // {
  //   label: "Projects",
  //   routerLink: ["leave/apply-leave"],
  //   role: [Role.PROJECTMANAGER, Role.SYSADMIN, Role.USER],
  //    icon: "pi pi-align-justify",
  // },
  // {
  //   label: "Tasks",
  //   routerLink: ["leave/request/history"],
  //   role: [Role.PROJECTMANAGER, Role.SYSADMIN, Role.USER],
  //    icon: "pi pi-align-justify",
  // },

  // {
  //   label: "Workspace",
  //   routerLink: ["leave/all-request/history"],
  //   role: [Role.PROJECTMANAGER, Role.SYSADMIN, Role.USER],
  //    icon: "pi pi-align-justify",
  // },

  // {
  //   label: "Feedback",
  //   routerLink: ["app/admin"],
  //    icon: "pi pi-align-justify",
  //   role: [Role.PROJECTMANAGER, Role.SYSADMIN, Role.USER],
  // },
];

export default MenuData;
