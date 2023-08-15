import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';
import { WorkspaceCreateComponent } from './components/workspace-create/workspace-create.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyModule } from '@ngx-formly/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { WorkspaceDetailsComponent } from './components/workspace-details/workspace-details.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    WorkspaceListComponent,
    WorkspaceCreateComponent,
    WorkspaceDetailsComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    CommonModule,
    TableModule,
    PaginatorModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyPrimeNGModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    TabViewModule,
    DynamicDialogModule

  ]
})
export class WorkspaceModule { }
