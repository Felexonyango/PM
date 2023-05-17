import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Subscription } from "rxjs";
import { IProject } from "src/app/PMS/model/project.model";
import { IWorkspace } from "src/app/PMS/model/workspace.model";
import { ProjectService } from "src/app/PMS/services/project/project.service";
import { UtilService } from "src/app/PMS/services/util/util.service";
import { WorkspaceService } from "src/app/PMS/services/workspace/workspace.service";




@Component({
    selector: "app-project-list",
    templateUrl: "./project-list.component.html",
    styleUrls: ["./project-list.component.scss"],
    providers: [DialogService, DynamicDialogRef, MessageService],
})
export class ProjectListComponent implements OnInit {
    subscription = new Subscription();
    searchText: string;
    projectsList: IProject[];
    workspace: IWorkspace;
    checkedProjects = [];
    @Input() uploadURL: string;
    tableColumns: {
        fieldName: string;
        displayName: string;
    }[] = [
        {
            fieldName: "title",
            displayName: "Title",
        },
        {
            fieldName: "description",
            displayName: "Description",
        },
        {
            fieldName: "workspace.title",
            displayName: "Workspace",
        },
        {
            fieldName: "type",
            displayName: "Type",
        },
        {
            fieldName:'createdAt',
            displayName:'Date Created',
        },
        {
            fieldName: "isContractActive",
            displayName: "Status",
        },
   
    ];

  
    constructor(
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private projectService: ProjectService,
        public utilService: UtilService,
        public workspaceService: WorkspaceService,
        private dialogRef: DynamicDialogRef,
        public dialogService: DialogService,

       
    ) {
        
    }
    ngOnInit(): void {
       
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

        this.utilService.exportAsExcelFile(result, "All-projects");
    }
    getAllProjects(): void {
        this.subscription.add(
            this.projectService.getAllProjects().subscribe((res) => {
                this.projectsList =
                    res.result.length > 0
                        ? res.result.map((x) => this.getMenuItems(x))
                        : [];
            })
        );
    }

    getMenuItems(project: IProject): IProject {
        const menu = [
        ,        {
                label: "Edit",
                icon: "pi pi-pencil",
                command: () => {
                    this.router.navigate([
                        "/projects/edit-project",
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
                complete: () => {}
            })
        );
    }
   

   
    
}
