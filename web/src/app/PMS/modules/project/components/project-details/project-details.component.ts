import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Subscription } from "rxjs";
import { IProject } from "src/app/PMS/model/project.model";
import { ProjectService } from "src/app/PMS/services/project/project.service";

@Component({
    selector: "app-project-details",
    templateUrl: "./project-details.component.html",
    styleUrls: ["./project-details.component.scss"],
    providers: [DialogService, DynamicDialogRef, MessageService],
})
export class ProjectDetailsComponent implements OnInit {

    subscription = new Subscription();
    isEditProject = false;
    isEditType = false;
    projectMenuItems!: MenuItem[];
     project:IProject
    @Input() uploadURL!: string;
    projectProjects = [];
   
    tableColumns: {
        displayName: string;
        fieldName: string;
    }[] = [
        {
            displayName: "Type",
            fieldName: "type",
        },
        {
            displayName: "Link",
            fieldName: "url",
        },
    ];
    constructor(
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private projectService: ProjectService,
        private dialogRef: DynamicDialogRef,
        public dialogService: DialogService,

       
    ) {
        
    }

    ngOnInit(): void {
        this.getParam();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    getParam(): void {
        this.subscription.add(
            this.activatedRoute.params.subscribe({
                next: (param) => {
                    const projectId = param['projectId'];
                    this.getProjectById(projectId);
                },
            })
        );
    }

    getProjectById(projectId: string): void {
        this.subscription.add(
            this.projectService.getProjectById(projectId).subscribe({
                next: (response) => {
                    this.project = response.result;
                
                    this.editButtonDropdown();
                },
            })
        );
    }
    markAsActive(isActive: boolean): void {
        const project = {
            status: !isActive,
        };
        this.projectService.editProject(project, this.project?._id).subscribe({
            complete: () => {
                this.getProjectById(this.project?._id);
            },
        });
    }

    editButtonDropdown(): void {
        this.projectMenuItems = [
            {
                label: this.project?.isContractive
                    ? "Deactivate"
                    : "Activate",
                icon: "pi pi-refresh",
                command: () => {
                    this.markAsActive(this.project?.isContractive);
                },
            },
        ];
    }
    



  
}
