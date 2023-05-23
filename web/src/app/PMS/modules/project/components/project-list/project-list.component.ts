import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import {
    IProject,
    ProjectPriorityTypes,
    Status,
} from 'src/app/PMS/model/project.model';
import { IWorkspace } from 'src/app/PMS/model/workspace.model';
import { ProjectService } from 'src/app/PMS/services/project/project.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { WorkspaceService } from 'src/app/PMS/services/workspace/workspace.service';

enum FilterType {
    STATUS = 'status',
    PRIORITY = 'priority',
    ASSIGNEDTO = 'assignedTo',
}

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    providers: [DialogService, DynamicDialogRef, MessageService],
})
export class ProjectListComponent implements OnInit {
    subscription = new Subscription();
    searchText: string;
    filterType = FilterType;
    filters = {};
    checked;
    projectsList: IProject[];
    sortedProjectList: IProject[] = [];
    workspace: IWorkspace;
    isShowFilters = false;
    projectStatus = Status;
    projectPriority = ProjectPriorityTypes;
    projectPriorityArray = Object.values(this.projectPriority);
    projectStatusArray = Object.values(this.projectStatus);
    tableColumns: {
        fieldName: string;
        displayName: string;
    }[] = [
        {
            fieldName: 'title',
            displayName: 'Title',
        },

        {
            fieldName: 'Priority',
            displayName: 'priority',
        },
        {
            fieldName: 'workspace.name',
            displayName: 'Workspace Name',
        },
        {
            fieldName: 'createdAt',
            displayName: 'Date Created',
        },
        {
            fieldName: 'status',
            displayName: 'Status',
        },
    ];

    constructor(
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private projectService: ProjectService,
        public utilService: UtilService,
        public workspaceService: WorkspaceService,
        private dialogRef: DynamicDialogRef,
        public dialogService: DialogService
    ) {}
    ngOnInit(): void {
        this.getAllProjects();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    exportData(): void {
        const result = this.projectsList.map((x) => {
            delete x.__v;
            delete x.menuItems;

            return {
                ...x,
            };
        });

        this.utilService.exportAsExcelFile(result, 'All-projects');
    }
    getAllProjects(): void {
        this.subscription.add(
            this.projectService.getAllProjects().subscribe((res) => {
                this.projectsList =
                    res.result.length > 0
                        ? res.result.map((x) => this.getMenuItems(x))
                        : [];
                for (let i = 0; i < this.projectsList.length; i++) {
                    const x = this.projectsList[i];
                    if (
                        x?.priority === ProjectPriorityTypes.CRITICAL ||
                        x?.priority === ProjectPriorityTypes.HIGH
                    ) {
                        if (
                            x?.status !== Status.COMPLETED &&
                            x?.status !== Status.ONHOLD
                        ) {
                            this.sortedProjectList.unshift(x);
                        }
                    } else {
                        this.sortedProjectList.push(x);
                    }
                }

                this.projectsList = this.sortedProjectList;
            })
        );
    }

    getMenuItems(project: IProject): IProject {
        const menu = [
            ,
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => {
                    this.router.navigate([
                        '/projects/edit-project',
                        project?._id,
                    ]);
                },
            },
        ];
        project.menuItems = menu;
        return project;
    }
    deleteProject(projectId: string): void {
        this.subscription.add(
            this.projectService.deleteProject(projectId).subscribe({
                complete: () => {},
            })
        );
    }

    onStatusChange(dropDownEvent: any, filterType: FilterType): void {
        let filter = dropDownEvent.value;

        if (filter) {
            this.filters[filterType] = filter;
        } else {
            delete this.filters[filterType];
        }
        this.projectsList = this.sortedProjectList.filter((x) =>
            this.filterItem(x)
        );
        console.log(this.projectsList);
    }

    filterItem(item): boolean {
        const filterKeys = Object.keys(this.filters);
        // validates all filter criteria
        return filterKeys.every((key) => {
            // ignores an empty filter
            if (this.filters[key] === null || this.filters[key] === 'null')
                return true;
            if (typeof item[key] === 'object') {
                return this.filters[key] === item[key]?._id ? true : false;
            }
            return this.filters[key] === item[key] ? true : false;
        });
    }

    filterByAssignedToMe(e: any): void {
        let dropDownEvent = {};

        if (e.checked) {
            dropDownEvent = {
                value: this.utilService.getUserId(),
            };
        }

        this.onStatusChange(dropDownEvent, this.filterType?.ASSIGNEDTO);
    }
}
