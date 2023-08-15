
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DialogModule } from "primeng/dialog";
import { Subscription } from "rxjs";

import { PrimeNGConfig } from "primeng/api";

import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { Paginator } from "primeng/paginator";
import { User, UserRoles } from "src/app/PMS/model/auth";
import { RoleAction } from "src/app/PMS/model/userRoles.model";
import { IWorkspace } from "src/app/PMS/model/workspace.model";
import { UserService } from "src/app/PMS/services/user/user.service";
import { UtilService } from "src/app/PMS/services/util/util.service";
import { WorkspaceService } from "src/app/PMS/services/workspace/workspace.service";
import { DeleteConfirmComponent } from "src/app/PMS/shared/components/delete-confirm/delete-confirm.component";
import { ManageUserRolesComponent } from "src/app/PMS/shared/components/manage-user-roles/manage-user-roles.component";
import { IPermission } from "src/app/PMS/model/user.model";

@Component({
    selector: "app-users-lists",
    templateUrl: "./users-lists.component.html",
    styleUrls: ["./users-lists.component.scss"],
    providers: [DialogService,DynamicDialogConfig],
})
export class UsersListsComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription();
    users: User[] = [];

    workspace: IWorkspace;
    userRoles = UserRoles;

    userTableColumns: string[] = [
        "Firstname",
        "Lastname",
        "Email",
        !this.utilService.doesURLHaveText("workspace") ? "Roles" : null,
    ];

    rows = 50;
    defaultPagination = {
        page: 0,
        pageSize: this.rows,
        searchParam: null,
    };
    allUsersCount = 0;
    checkedUsers = [];
    existingMembersArrayId = [];
    searchText: string;
    initialSearch: string;
    modalDismissed: boolean;
    roleAction = RoleAction;
    modalRef: any;
    @ViewChild("paginator", { static: true }) paginator: Paginator;

    constructor(
        private primengConfig: PrimeNGConfig,
        private userService: UserService,
        public utilService: UtilService,
        public workspaceService: WorkspaceService,
        public dialogService: DialogService,
        public config: DynamicDialogConfig,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        
    ) {
        
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        if (this.utilService.doesURLHaveText("workspace")) {
            this.getWorkspace();
        }
        this.getAllUsers();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getAllUsers(): void {
        this.subscriptions.add(
            this.userService.getAllUsers().subscribe({
                next: (res) => {
                    this.users =
                        res.result.length > 0
                            ? res.result.map((x) => this.getMenuItems(x))
                            : [];

                    if (this.utilService.doesURLHaveText("workspace")) {
                        this.users = this.users.filter(
                            (x) => !this.existingMembersArrayId.includes(x._id)
                        );
                    }
                },
            })
        );
    }

    getMenuItems(user: User): User {
        const menu = [
            {
                label: "Edit",
                icon: "pi pi-pencil",
                command: () => {
                    this.router.navigate(["/users/edit-user", user?._id]);
                },
            },

            {
                label: "delete",
                icon: "pi pi-times",
                command: () => {
                    this.openDeleteDialog(user);
                },
            },
        ];
        user.menuItems = menu;
        return user;
    }
   

    deleteUser(userId: string): void {
        this.subscriptions.add(
            this.userService.deleteUser(userId).subscribe({
                complete: () => {}
            })
        );
    }

    exportPatients(): void {
        this.utilService.exportAsExcelFile(this.users, "All-Users");
    }

    public openDeleteDialog(user: User): void {
        const ref = this.dialogService.open(DeleteConfirmComponent, {
            width: "30%",
            height: "30%",
            header: "Delete Confirmation",
        });

        ref.onClose.subscribe((confirm) => {
            if (confirm) {
                this.deleteUser(user._id);
            }
        });
    }



    
    display: boolean = false;

    showDialog() {
        this.display = true;
    }
    

 openUpdateRolesModal(user: User): void {
    console.log(user.roles)
        let ref =this.dialogService.open(ManageUserRolesComponent,{
            data: {
                activeModuleRoles: user.roles
            },
          width: '30%',
          height:'55%',
          header:"Manage Roles"
        })
        
        ref.onClose.subscribe((receivedEntry)=>{
        this.assignUserARole(user, receivedEntry);
          
        })
        }
  
        
        assignUserARole(user: User, role: IPermission): void {
            const userId = user?._id;
            this.subscriptions.add(
                this.userService.assignUserRole(userId, role).subscribe({
                    next: (res) => {
                        
                        this.getAllUsers();
                    },
                    
                })
            );
        }
  
    getWorkspace() {
        const workspaceId = this.activatedRoute.snapshot.params['workspaceId'];
        this.workspaceService
            .getWorkspaceById(workspaceId)
            .subscribe((response) => {
                this.workspace = response.result;
                this.existingMembersArrayId = this.workspace.members.map(
                    (x:any) => x._id
                );
            });
    }


    addUserToWorkspace() {
        const members = {
            members: this.checkedUsers,
        };
    
        this.workspaceService.addMembersToWorkspace(this.workspace._id, members)
            .subscribe((res) => {
                this.getWorkspace();
            });
        this.router.navigate(["/workspaces/details/" + this.workspace._id]);
    }

  
}
