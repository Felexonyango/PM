import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListsComponent } from './components/users-lists/users-lists.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import {RadioButtonModule} from 'primeng/radiobutton';

import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import {CheckboxModule} from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
// import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { SharedModule } from '../../shared/shared.module';
// import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
  declarations: [
    UsersListsComponent,
    UserCreateComponent,
    // ProfileComponent,
    
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AvatarModule,
    BadgeModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    SharedModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    SplitButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    FormlyPrimeNGModule,
    FormlyModule.forRoot({
      validationMessages: [
        {name: 'required', message: 'This field is required'},
      ],
    }),
  ]
})
export class UsersModule { }
