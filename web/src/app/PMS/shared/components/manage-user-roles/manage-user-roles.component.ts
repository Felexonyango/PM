import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { IPermission } from 'src/app/PMS/model/user.model';
import { RoleAction } from 'src/app/PMS/model/userRoles.model';
import { PermissionService } from 'src/app/PMS/services/permission/permission.service';

@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.scss'],
  providers: [DialogService], 
})
export class ManageUserRolesComponent implements OnInit {

  userRolesArray: IPermission[] = [];
  subscriptions = new Subscription();

  @Input() activeModuleRoles: string[] = [];
  @Input() activeModuleDetails: any;
  @Output() passEntry: EventEmitter<{ role: string; action: RoleAction }> =
      new EventEmitter();
  roleAction = RoleAction;
  isLoading = false;



  constructor(
    public dialogService: DialogService,
  
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.getAllUserRoles();
  }

  checkIfModuleHasRole(role: IPermission): boolean {
    return this.config?.data?.assignedRole?._id === role._id ? true : false;
}

updateModuleRoles(role: IPermission): void {
    this.ref.close(role);
}

  getAllUserRoles(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.permissionService.getAllPermissions().subscribe({
        next: (res) => {
          this.userRolesArray = res.result;
          
          this.isLoading = false;
        }
      })
    );
  }



}
