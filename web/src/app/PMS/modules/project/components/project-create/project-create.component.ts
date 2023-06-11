import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/PMS/model/auth';
import { IProject } from 'src/app/PMS/model/project.model';
import { IWorkspace } from 'src/app/PMS/model/workspace.model';
import { ProjectService } from 'src/app/PMS/services/project/project.service';
import { UserService } from 'src/app/PMS/services/user/user.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { WorkspaceService } from 'src/app/PMS/services/workspace/workspace.service';

@Component({
    selector: 'app-project-create',
    templateUrl: './project-create.component.html',
    styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent implements OnInit {
    subscription = new Subscription();
    project: IProject;
    isEdit = false;
    workspaceId = '';
    workspaces:IWorkspace[]=[]
    users:User[] = [];
    projectForm = new FormGroup({});
    projectModel = {};
    projectOptions: FormlyFormOptions = {};
    projectFields: FormlyFieldConfig[] = [
             
                {
                    className: 'col-12',
                    key: 'title',
                    type: 'input',
                    props: {
                        placeholder: 'Project Title',
                        required: true,
                        label: 'Project Title',
                    },
                },

            
        
        {
            className:"col-12 md:col-12",
            key: 'workspace',
            type: 'select',
            props: {
                label: 'Select Workspace',
                options: [],
                placeholder: 'Select Workspace',
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
                placeholder: 'Project Description',
                type: 'text',
                label: 'Project Description',
                required: true,
                rows: 5,
            },
        },
    ]
       
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,

        private projectService: ProjectService,
        private workspaceService: WorkspaceService,
       private userService: UserService,
        public utilService: UtilService
    ) {}

    ngOnInit(): void {
        this.getAllworkspace()
        this.getAllUsers()
        this.getParam();
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    createOrUpdateProject(): void {
        let projectValue = {
            ...this.projectModel,
        };
        const projectId = this.project?._id ? this.project._id : '';
        const submitUrl = this.isEdit
            ? this.projectService.editProject(projectValue, projectId)
            : this.projectService.addProject(projectValue);
        submitUrl.subscribe({});
    }

    getParam(): void {
        this.subscription.add(
            this.activatedRoute.params.subscribe({
                next: (param) => {
                    const projectId = param['projectId'];

                    if (projectId) {
                        this.isEdit = true;
                        this.getProjectById(projectId);
                    }
                },
            })
        );
    }

    getProjectById(projectId: string): void {
        this.subscription.add(
            this.projectService.getProjectById(projectId).subscribe({
                next: (res) => {
                    this.projectModel = res.result;
                },
            })
        );
    }
    getAllworkspace(){
        this.subscription.add(
            this.workspaceService.getAllWorkspaces().subscribe({
                next:(res)=>{
                    this.workspaces=res.result
                    this.populateWorkspaceDropdown(res.result)
                   // console.log(this.workspaces)
                
                }
            })
        )
    }

     getAllUsers(){
        this.subscription.add(
            this.userService.getAllUsers().subscribe({
                next:(res)=>{
                    this.users=res.result
                    this.populateUsersDropdown(res.result)
                    console.log(this.users)
                
                }
            })
        )
    }
    populateWorkspaceDropdown(workspace: IWorkspace[]): void {
        const workspaceField = this.projectFields.find( (x) => x.key === "workspace");
        const workspacesOptions = workspace.map((x) => {
            return {
                label: x.title,
                value: x._id,
            };
        });
        workspaceField.props.options = workspacesOptions;
       
    }


    populateUsersDropdown(user: User[]): void {
        const projectFields = this.projectFields.find( (x) => x.key === "assignedTo");
     
        const projectOptions = user.map((x) => {
            return {
                label: x.firstname,
                value: x._id,
            };
        });
        projectFields.props.options = projectOptions;
       
    }
}


