import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { IProject } from 'src/app/PMS/model/project.model';
import { IWorkspace } from 'src/app/PMS/model/workspace.model';
import { ProjectService } from 'src/app/PMS/services/project/project.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { WorkspaceService } from 'src/app/PMS/services/workspace/workspace.service';

@Component({
  selector: 'app-completed-projects',
  templateUrl: './completed-projects.component.html',
  styleUrls: ['./completed-projects.component.scss']
})
export class CompletedProjectsComponent {
  subscription = new Subscription();

  projectsList: IProject[];;
  tableColumns: {
      fieldName: string;
      displayName: string;
  }[] = [
      {
          fieldName: "title",
          displayName: "Title",
      },
    
      {
          fieldName: "Priority",
          displayName: "priority",
      },
      {
          fieldName: "workspace.name",
          displayName: "Workspace Name",
      },
      {
          fieldName:'createdAt',
          displayName:'Date Created',
      },
      {
          fieldName: "status",
          displayName: "Status",
      },
 
  ];


  constructor(
      private activatedRoute: ActivatedRoute,
      public router: Router,
      private projectService: ProjectService,
      public utilService: UtilService,
      private dialogRef: DynamicDialogRef,
      public dialogService: DialogService,

     
  ) {
      
  }
  ngOnInit(): void {
      this.getAllCompletedProjects()
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
  getAllCompletedProjects(): void {
      this.subscription.add(
          this.projectService.getAllCompletedProjects().subscribe((res) => {
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
              label: "delete",
              icon: "pi pi-pencil",
              command: () => {
                this.deleteProject(project?._id)
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
