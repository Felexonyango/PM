import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { IProject } from 'src/app/PMS/model/project.model';
import { IWorkspace } from 'src/app/PMS/model/workspace.model';
import { ProjectService } from 'src/app/PMS/services/project/project.service';
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
    projectForm = new FormGroup({});
    projectModel = {};
    projectOptions: FormlyFormOptions = {};
    projectFields: FormlyFieldConfig[] = [
        {
            fieldGroupClassName: 'grid',
            fieldGroup: [
                {
                    className: 'col-12 md:col-6',
                    key: 'title',
                    type: 'input',
                    templateOptions: {
                        placeholder: 'Project Title',
                        required: true,
                        label: 'Project Title',
                    },
                },

                {
                    className: 'col-12 md:col-6',
                    key: 'type',
                    type: 'select',
                    templateOptions: {
                        label: 'Select Project Type',
                        placeholder: 'Select Project Type',
                        options: [
                            { label: 'ISSUE', value: 'ISSUE' },
                            {
                                label: 'IMPLEMENTATION',
                                value: 'IMPLEMENTATION',
                            },
                        ],
                    },
                },
            ],
        },
        {
            className: 'col-12 md:col-12',
            key: 'workspace',
            type: 'select',
            templateOptions: {
                label: 'Select Workspace',
                options: [],
                placeholder: 'Select Workspace',
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
        {
            className: 'col-12',
            key: 'tags',
            type: 'select',
            templateOptions: {
                label: 'Select a Tag',
                placeholder: 'Select a Tag',
            },
        },
        {
            key: 'projectFiles',
            type: 'repeat',
            props: {
                addText: 'Add Text',
            },
            fieldArray: {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                    {
                        className: 'col-12 md:col-6',
                        key: 'type',
                        type: 'input',
                        props: {
                            placeholder: 'Enter Document Type',
                            type: 'text',
                            required: false,
                        },
                    },
                    {
                        className: 'col-12 md:col-6',
                        key: 'url',
                        type: 'input',
                        props: {
                            placeholder: 'Enter document   Link',
                            type: 'link',
                            required: false,
                        },
                    },
                ],
            },
        },
    ];
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,

        private projectService: ProjectService,
        private workspaceService: WorkspaceService,

        public utilService: UtilService
    ) {}

    ngOnInit(): void {
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
}
