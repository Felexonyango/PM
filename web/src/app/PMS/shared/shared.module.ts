import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ManageUserRolesComponent } from './components/manage-user-roles/manage-user-roles.component';
import { AvatarGeneratorComponent } from './components/avatar-generator/avatar-generator.component';
import { SearchFilterPipe } from './pipes/search/search-filter.pipe';

import { CheckboxModule } from 'primeng/checkbox';
import { FormlyModule } from '@ngx-formly/core';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import {CalendarModule} from 'primeng/calendar';
import { BadgeModule } from 'primeng/badge';
import {FileUploadModule} from 'primeng/fileupload';
import {SplitButtonModule} from 'primeng/splitbutton';
import { AuthHeaderComponent } from './components/auth-header/auth-header/auth-header.component';
@NgModule({
  declarations: [
    DeleteConfirmComponent,
    ManageUserRolesComponent,
    AvatarGeneratorComponent,
    SearchFilterPipe,
    AuthHeaderComponent

   
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    TableModule,
    TagModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
   
    CheckboxModule,
    CalendarModule,
    BadgeModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    ProgressBarModule,
    AvatarModule,
    DialogModule,
    SplitButtonModule,
      
   FormlyModule.forRoot({
    validationMessages: [
      { name: 'required', message: 'This field is required' },
    ],
  }),
  ],
  exports: [
 
    AvatarGeneratorComponent,
    SearchFilterPipe,

    AuthHeaderComponent
  ],
})
export class SharedModule {}
