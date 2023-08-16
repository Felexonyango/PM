import { Menu, Role } from "../types";

const MenuData: Menu[] = [
  {
    label: 'Apps',
    icon: 'pi pi-th-large',
    items: [
      {
    label: "Dashboard",
    routerLink: ["/app"],
    icon: "pi pi-home",
    role: [Role.PROJECTMANAGER, Role.SYSADMIN, Role.USER],
  },
      
  {
    label: "Projects",
    routerLink: ["/app/projects"],
    role: [Role.PROJECTMANAGER, Role.SYSADMIN, Role.USER],
    icon: 'pi pi-fw pi-image',
  },
  {
    label: "Tasks",
    routerLink: ["/app/tasks"],
    role: [Role.PROJECTMANAGER, Role.SYSADMIN, Role.USER],
    icon: 'pi pi-fw pi-check-square',
  },

  {
    label: "Workspace",
    routerLink: ["/app/workspace"],
    role: [Role.PROJECTMANAGER, Role.SYSADMIN],
     icon: "pi pi-align-justify",
  },
  {
    label: "Users",
    routerLink: ["/app/users"],
    role: [Role.PROJECTMANAGER, Role.SYSADMIN],
    icon: 'pi pi-fw pi-users',
  },
  {
    label: "Roles",
    routerLink: ["/app/permissions"],
    role: [Role.PROJECTMANAGER, Role.SYSADMIN],
    icon: 'pi pi-fw pi-list',
  },

  {
    label: "Feedback",
    routerLink: ["/app/feedback"],
    icon: 'pi pi-question-circle',
    role: [Role.PROJECTMANAGER, Role.SYSADMIN, Role.USER],
  },
       
        
    ]
},

  
];

export default MenuData;
