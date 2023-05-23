import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ITask } from 'src/app/PMS/model/task.model';
import { TaskService } from 'src/app/PMS/services/task/task.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { WorkspaceService } from 'src/app/PMS/services/workspace/workspace.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers:[DialogService,DynamicDialogRef]
})
export class TaskListComponent {

  subscription = new Subscription();
  searchText: string;
  tasks: ITask[]=[];

  checkedTasks = [];
  @Input() uploadURL: string;
  tableColumns: {
      fieldName: string;
      displayName: string;
  }[] = [
      {
          fieldName: "name",
          displayName: "Name",
      },
    
      {
          fieldName: "description",
          displayName: "Description",
      },
      {
        fieldName:'project.name',
        displayName:'Project Name',
      },
      {
          fieldName: "dueDate",
          displayName: "Due Date",
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
      private taskservice: TaskService,
      public utilService: UtilService,
      public workspaceService: WorkspaceService,
      private dialogRef: DynamicDialogRef,
      public dialogService: DialogService,

     
  ) {
      
  }
  ngOnInit(): void {
      this.getAllTasks()
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
 
  exportData(): void {
      const result = this.tasks.map((x) => {
          
          delete x.menuItems;
          
          return {
              ...x,
              
          };
      });

      this.utilService.exportAsExcelFile(result, "All-tasks");
  }
  getAllTasks(): void {
      this.subscription.add(
          this.taskservice.getAllTasks().subscribe((res) => {
              this.tasks =
                  res.result.length > 0
                      ? res.result.map((x) => this.getMenuItems(x))
                      : [];
          })
      );
  }

  getMenuItems(task: ITask): ITask {
      const menu = [
      ,        {
              label: "Edit",
              icon: "pi pi-pencil",
              command: () => {
                  this.router.navigate([
                      "/tasks/edit-task",
                      task?._id,
                  ]);
              },
          },

         
      ];
      task.menuItems = menu;
      return task;
  }
  deleteTask(taskId: string): void {
      this.subscription.add(
          this.taskservice.deleteTask(taskId).subscribe({
              complete: () => {}
          })
      );
  }
 

 
  
}
