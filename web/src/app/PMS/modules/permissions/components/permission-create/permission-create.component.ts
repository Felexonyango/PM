import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import {
    PermissionFormlyFields,
} from './permission.formly';
import { IAllowedPermissions, IPermission } from 'src/app/PMS/model/user.model';
import { PermissionService } from 'src/app/PMS/services/permission/permission.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';

@Component({
    selector: 'app-permission-create',
    templateUrl: './permission-create.component.html',
    styleUrls: ['./permission-create.component.scss'],
})
export class PermissionCreateComponent implements OnInit, OnDestroy {
    permissionToEdit: IPermission;
    isEdit = false;
    permissionCreateForm = new FormGroup({});
    permissionModel: any = {};
    permissionFormlyFields: FormlyFieldConfig[] = [];
    allowedPermissions: IAllowedPermissions[] = [];

    selectedPermissionAccess: any[] = [];
 

    subscriptions = new Subscription();
   
    constructor(
        public utilService: UtilService,
        private permissionService: PermissionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.permissionFormlyFields = PermissionFormlyFields;
        this.getPermissionIdAndActionFromParam();
       
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getPermissionIdAndActionFromParam(): void {
        this.subscriptions.add(
            this.activatedRoute.params.subscribe({
                next: (params) => {
                    const permissionId = params['permissionId'];
                    const action = params['action'];
                    if (permissionId) {
                        this.isEdit = true;
                        this.getPermissionById(permissionId);
                    }
                    
                },
            })
        );
    }

    getPermissionById(permissionId: string): void {
        this.subscriptions.add(
            this.permissionService.getPermissionById(permissionId).subscribe({
                next: (res) => {
                    this.permissionToEdit = res.result;
                    this.selectedPermissionAccess = this.permissionToEdit
                        .permissions
                        ? this.permissionToEdit.permissions
                        : [];
                    this.permissionModel = this.permissionToEdit;
                },
            })
        );
    }

    createOrUpdatePermission(): void {
        const dataToSubmit: IPermission = {
            ...this.permissionModel,
            permissions: this.isEdit
                ? this.selectedPermissionAccess
                : [],
        };

        const submitURL = this.isEdit
            ? this.permissionService.updatePermission(
                  this.permissionToEdit._id,
                  dataToSubmit
              )
            : this.permissionService.createPermission(dataToSubmit);

        this.subscriptions.add(
            submitURL.subscribe({
                next: (res) => {
                    const permission: IPermission = res.result;
                    this.getPermissionById(permission._id);
                 
                },
            })
        );
    }


    onCheckboxClick(event: any): void {
        this.selectedPermissionAccess = event.checked;
        this.createOrUpdatePermission();
    }


}
