import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { IProject } from 'src/app/PMS/model/project.model';
import { ITask } from 'src/app/PMS/model/task.model';
import { ProjectService } from 'src/app/PMS/services/project/project.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { WorkspaceService } from 'src/app/PMS/services/workspace/workspace.service';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
    subscription = new Subscription();
    task: ITask;
    isEdit = false;
    workspaceId = '';
    project: IProject[] = [];
    taskForm = new FormGroup({});
    taskModel = {};
    taskOptions: FormlyFormOptions = {};
    taskFields: FormlyFieldConfig[] = [
        {
            className: 'col-12',
            key: 'name',
            type: 'input',
            props: {
                placeholder: 'Task Title',
                required: true,
                label: 'Task Title',
            },
        },

        {
            className: 'col-12 md:col-12',
            key: 'project',
            type: 'select',
            props: {
                label: 'Select Project',
                options: [],
                placeholder: 'Select Project',
                required: true,
            },
        },
       
        {
            fieldGroupClassName:'grid',
            fieldGroup:[
            {
                className: 'col-12 md:col-4',
                key: 'startDate',
                type: 'input',
                props: {
                    type: 'date',
                    placeholder: 'Start Date',
                    required: true,
                    label: 'Start Date',
                },
            },
            {
                className: 'col-12 md:col-4',
                key: 'endDate',
                type: 'input',
                props: {
                    type: 'date',
                    placeholder: 'End Date',
                    required: true,
                    label: 'End Date',
                },
            },
            {
                className: 'col-12  md:col-4'  ,
                key: 'dueDate',
                type: 'input',
                props: {
                    type: 'date',
                    placeholder: 'Due Date',
                    required: true,
                    label: 'Due Date',
                },
            },
        ]
        },
     

        {
            className: 'col-12',
            key: 'assignedTo',
            type: 'select',
            props: {
                label: 'Assigned To ',
                options: [],
                placeholder: 'Assigned To ',
                required: true,
            },
        },
        {
            key: 'description',
            type: 'textarea',
            templateOptions: {
                placeholder: 'Task Description',
                type: 'text',
                label: 'Task Description',
                required: true,
                rows: 5,
            },
        },
    ];


    constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,

      private projectService: ProjectService,
     
      public utilService: UtilService
  ) {}


  createOrUpdateTask(){
    
  }

}
