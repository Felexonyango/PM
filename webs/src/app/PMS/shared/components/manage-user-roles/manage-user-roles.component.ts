import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { UserRoles } from 'src/app/PMS/model/auth';
import { UserService } from 'src/app/PMS/services/user/user.service';

@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.scss'],
  providers: [DialogService], 
})
export class ManageUserRolesComponent implements OnInit {

  userRolesArray: string[] = [];
  subscriptions = new Subscription();

  @Input() activeModuleRoles: string[] = [];
  @Output() passEntry: EventEmitter<{role: string, action: any}> = new EventEmitter();
  roleAction :any;
  isLoading = false;

  constructor(
    public dialogService: DialogService,
  
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.userRolesArray = userRoleArray;
    this.getAllUserRoles();
  }

  checkIfModuleHasRole(role: UserRoles): boolean {
    return this.config.data.activeModuleRoles.includes(role) ? true : false;
  }

  updateModuleRoles(role: UserRoles, action: any): void {
    const returnRoleAndAction = {
      role,
      action
    }
    this.ref.close(returnRoleAndAction);

  }

  getAllUserRoles(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.userService.getAllHardCodedUserRoles().subscribe({
        next: (res) => {
          this.userRolesArray = res.result;
          this.isLoading = false;
        }
      })
    );
  }



}
