import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Paginator } from 'primeng/paginator';
import { Subscription } from 'rxjs';
import { IPermission } from 'src/app/PMS/model/user.model';
import { PermissionService } from 'src/app/PMS/services/permission/permission.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { DeleteConfirmComponent } from 'src/app/PMS/shared/components/delete-confirm/delete-confirm.component';

@Component({
    selector: 'app-permissions-list',
    templateUrl: './permissions-list.component.html',
    styleUrls: ['./permissions-list.component.scss'],
    providers: [DialogService, MessageService],
})
export class PermissionsListComponent implements OnInit, OnDestroy {
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    subscriptions = new Subscription();
    permissionsList: IPermission[] = [];
    isLoaded: boolean;
    tableColumns: {
        displayName: string;
        fieldName: string;
    }[] = [
        {
            displayName: 'Name',
            fieldName: 'name',
        },
        {
            displayName: 'Description',
            fieldName: 'description',
        },
        
    ];
    searchText: string;

    constructor(
        private permissionService: PermissionService,
        public utilService: UtilService,
        private dialogService: DialogService,
        public router: Router
    ) {}

    ngOnInit(): void {
        this.getAllPermissions();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getAllPermissions(): void {
        this.subscriptions.add(
            this.permissionService.getAllPermissions().subscribe({
                next: (res) => {
                    this.permissionsList = res.result?.length > 0 ?
                        res.result.map(x => this.appendDropdownItemsToItem(x)) :
                        [];
                },
            })
        );
    }

    appendDropdownItemsToItem(permission: IPermission): IPermission {
        const tableActionButtons = [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                routerLink: ['edit/' + permission?._id],
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => this.openConfirmDeleteDialog(permission),
            },
        ];
        permission.menuItems = tableActionButtons;
        return permission;
    }

    openConfirmDeleteDialog(permission: IPermission): void {
        const ref = this.dialogService.open(DeleteConfirmComponent, {
            header: "Delete Confirmation",
            width: "50%",
            baseZIndex: 10000,
        });
        ref.onClose.subscribe((confirm) => {
            if (confirm) {
                this.deletePermission(permission?._id);
            }
        });
    }

    deletePermission(permissionId: string): void {
        this.subscriptions.add(
            this.permissionService.deletePermission(permissionId).subscribe({
                complete: () => this.getAllPermissions(),
            })
        );
    }
}
