import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:"list",
    component:TaskListComponent
  },
  {
    path:'create',
    component:CreateTaskComponent
  },
  {
    path:'edit/:taskId',
    component:CreateTaskComponent
  },
  {
    path:'details/:id',
    component:TaskDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
