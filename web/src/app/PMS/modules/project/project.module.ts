import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProjectRoutingModule } from "./project-routing.module";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { ProjectCreateComponent } from "./components/project-create/project-create.component";
import { ProjectDetailsComponent } from "./components/project-details/project-details.component";
import { PaginatorModule } from "primeng/paginator";
import { TableModule } from "primeng/table";
import { MultiSelectModule } from "primeng/multiselect";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { TagModule } from "primeng/tag";

import { InputTextModule } from "primeng/inputtext";
import { FormlyPrimeNGModule } from "@ngx-formly/primeng";
import { SplitButtonModule } from "primeng/splitbutton";
import { ButtonModule } from "primeng/button";

import { BadgeModule } from "primeng/badge";
import { TabViewModule } from "primeng/tabview";

import { CalendarModule } from "primeng/calendar";

import { DialogModule } from "primeng/dialog";
import { ChartModule } from "primeng/chart";
import { CardModule } from "primeng/card";
import { EditorModule } from "primeng/editor";
import { InputSwitchModule } from "primeng/inputswitch";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from "primeng/toast";

@NgModule({
    declarations: [
        ProjectListComponent,
        ProjectCreateComponent,
        ProjectDetailsComponent,
  
       
    ],
    imports: [
        CommonModule,
        ProjectRoutingModule,
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
        SplitButtonModule,
       
    ],
})
export class ProjectModule {}
