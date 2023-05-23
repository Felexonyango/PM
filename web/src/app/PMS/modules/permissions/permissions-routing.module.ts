import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCreateComponent } from './components/permission-create/permission-create.component';
import { PermissionsListComponent } from './components/permissions-list/permissions-list.component';

const routes: Routes = [
    {
        path: '',
        component: PermissionsListComponent,
        data: {
            title: 'Permissions list',
          },
    },
    {
        path: 'create',
        component: PermissionCreateComponent,
        data: {
            title: 'Create Permission',
          },
    },
    {
        path: 'edit/:permissionId',
        component: PermissionCreateComponent,
        data: {
            title: 'Create Permission',
          },
    },
    {
        path: 'edit/:permissionId/:action',
        component: PermissionCreateComponent,
        data: {
            title: 'Create Permission',
          },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
