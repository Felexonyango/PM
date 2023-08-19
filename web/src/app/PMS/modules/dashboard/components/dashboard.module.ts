import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DasboardComponent } from './dasboard/dasboard.component';
import { UpcomingTasksComponent } from './upcoming-tasks/upcoming-tasks.component';
import { OverdueTasksComponent } from './overdue-tasks/overdue-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { TabViewModule } from 'primeng/tabview';
import { MytasksComponent } from './dasboard/mytasks/mytasks.component';
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
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'src/app/PMS/shared/shared.module';


@NgModule({
  declarations: [
    DasboardComponent,
    UpcomingTasksComponent,
    OverdueTasksComponent,
    MytasksComponent,
    CompletedTasksComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TableModule,
    ButtonModule,
    CardModule,
    ToastModule,
    MessagesModule ,
    TagModule,
    SharedModule,
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
  
    

  ]
})
export class DashboardModule { }
