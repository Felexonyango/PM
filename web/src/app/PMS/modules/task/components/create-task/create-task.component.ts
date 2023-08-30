import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/PMS/model/auth';
import { IProject } from 'src/app/PMS/model/project.model';
import { ITask } from 'src/app/PMS/model/task.model';
import { ProjectService } from 'src/app/PMS/services/project/project.service';
import { TaskService } from 'src/app/PMS/services/task/task.service';
import { UserService } from 'src/app/PMS/services/user/user.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { WorkspaceService } from 'src/app/PMS/services/workspace/workspace.service';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
    subscription = new Subscription();
    task: ITask;
    isEdit = false;
    users: User[] = [];
    workspaceId = '';
    projects: IProject[] = [];
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
                style: { width: '100%' },
            },
        },

        {
            fieldGroupClassName: 'grid',
            fieldGroup: [
                {
                    className: 'col-12 md:col-6',
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
                    className: 'col-12  md:col-6',
                    key: 'dueDate',
                    type: 'input',
                    props: {
                        type: 'date',
                        placeholder: 'Due Date',
                        required: true,
                        label: 'Due Date',
                    },
                },
            ],
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
        private userService: UserService,
        private projectService: ProjectService,
        private taskService: TaskService,
        public utilService: UtilService
    ) {}

    ngOnInit() {
        this.getAllProjects();
        this.getAllUsers()
        this.getTaskFromParams()
    }

    createOrUpdateTask() {
        const taskModel = {
            ...this.taskModel,
        };
        const taskUrl = this.isEdit
            ? this.taskService.editTask(taskModel, this.task?._id)
            : this.taskService.addTask(taskModel);

        taskUrl.subscribe({
            next: (result) => {
                this.router.navigateByUrl('/app/tasks/list')
            },
        });
    }
    getAllProjects(): void {
        this.subscription.add(
            this.projectService.getAllProjects().subscribe((res) => {
                this.projects = res.result;
                this.populateProjectDropdown(res.result);
            })
        );
    }
    populateProjectDropdown(project: IProject[]): void {
        const taskFields = this.taskFields.find((x) => x.key === 'project');
        const tasksOptions = project.map((x) => {
            return {
                label: x.projectName,
                value: x._id,
            };
        });
        taskFields.props.options = tasksOptions;
    }

    getAllUsers() {
        this.subscription.add(
            this.userService.getAllUsers().subscribe({
                next: (res) => {
                    this.users = res.result;
                    this.populateUsersDropdown(res.result);
                    console.log(this.users);
                },
            })
        );
    }

    populateUsersDropdown(user: User[]): void {
        const projectFields = this.taskFields.find(
            (x) => x.key === 'assignedTo'
        );

        const projectOptions = user.map((x) => {
            return {
                label: x.firstname,
                value: x._id,
            };
        });
        projectFields.props.options = projectOptions;
    }
    getTaskFromParams(){
        this.subscription.add(
            this.activatedRoute.params.subscribe((params)=>{
                const taskId=params['taskId'];
                this.getTaskById(taskId)
            })
        )
    }
getTaskById(taskId:string){
    this.subscription.add(
        this.taskService.getTaskById(taskId).subscribe({
            next:(res)=>{
                this.task=res.result
                console.log(this.task)
                this.taskModel={
                    ...this.task,
                    startDate: this.utilService.convertToSimpleDate(
                        new Date(
                            res.result?.startDate as
                                | string
                                | number
                                | Date
                        ),
                        
                        ),
                    dueDate: this.utilService.convertToSimpleDate(
                        new Date(
                            res.result?.dueDate as
                                | string
                                | number
                                | Date
                        ),
                        
                        ),
                      
                        assignedTo: this.task?.assignedTo?._id,
                        project: this.task?.project?._id
                }
            }
        })
    )
}
}
