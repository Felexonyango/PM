import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsListComponent } from './components/permissions-list/permissions-list.component';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PermissionCreateComponent } from './components/permission-create/permission-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    PermissionsListComponent,
    PermissionCreateComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    SplitButtonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
     
    }),
    FormlyPrimeNGModule,
  
    CheckboxModule
  ],
  exports: [
    PermissionsListComponent
  ]
})
export class PermissionsModule { }
