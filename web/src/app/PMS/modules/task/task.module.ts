import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    CreateTaskComponent,
    TaskListComponent,
    TaskDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    TableModule,
    ButtonModule,
    CardModule,
    ToastModule,
    MessagesModule ,
    TagModule,
    DialogModule,
    ChartModule,
    CalendarModule,
    PaginatorModule,
    TabViewModule,
    MultiSelectModule,
    ReactiveFormsModule,
    InputSwitchModule,
    FormlyModule.forRoot({
        validationMessages: [
            { name: "required", message: "This field is required" },
        ],
    }),
    FormlyPrimeNGModule,
  
    BadgeModule,
    EditorModule,
    InputTextModule,
    SplitButtonModule
  ],
  providers:[
    DialogService,DynamicDialogRef
  ]
})
export class TaskModule { }
