import { WorkspaceDetailsComponent } from './components/workspace-details/workspace-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceCreateComponent } from './components/workspace-create/workspace-create.component';
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceListComponent,
    data: {
      title: 'Workspace List',
    },
  },
  {
    path: 'create',
    component: WorkspaceCreateComponent,
    data: {
      title: 'Create Workspace',
    },
  },
  {
    path: 'edit-workspace/:workspaceId',
    component: WorkspaceCreateComponent,
   
  },
  {
    path: 'details/:workspaceId',
    component: WorkspaceDetailsComponent,
    data: {
      title: 'Workspace Details',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
