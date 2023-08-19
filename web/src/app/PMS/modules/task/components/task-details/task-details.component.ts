import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ITask } from 'src/app/PMS/model/task.model';
import { TaskService } from 'src/app/PMS/services/task/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {
  subscription = new Subscription();
  isEdittask = false;
  isEditType = false;
  taskMenuItems!: MenuItem[];
   task:ITask
 

  constructor(
      private activatedRoute: ActivatedRoute,
      public router: Router,
      private taskService: TaskService,
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
                  const taskId = param['taskId'];
                  console.log(taskId)
                  this.getTaskById(taskId);
              },
          })
      );
  }

  getTaskById(taskId: string): void {
      this.subscription.add(
          this.taskService.getTaskById(taskId).subscribe({
              next: (response) => {
                  this.task = response.result;
              
                  // this.editButtonDropdown();
              },
          })
      );
  }
  markAsActive(isActive: boolean): void {
      const task = {
          status: !isActive,
      };
      this.taskService.editTask(task, this.task?._id).subscribe({
          complete: () => {
              this.getTaskById(this.task?._id);
          },
      });
  }

  // editButtonDropdown(): void {
  //     this.taskMenuItems = [
  //         {
  //             label: this.task?.isContractive
  //                 ? "Deactivate"
  //                 : "Activate",
  //             icon: "pi pi-refresh",
  //             command: () => {
  //                 this.markAsActive(this.task?.isContractive);
  //             },
  //         },
  //     ];
  // }
  




}
