import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectListComponent } from './components/project-list/project-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    data: {
      title: 'Projects List'
    }
  },
  {
    path: 'project-list/workspace/:workspaceId',
    component: ProjectListComponent,
    data: {
      title: 'Project List'
    }
  },

  {
    path: 'create',
    component: ProjectCreateComponent,
    data: {
      title: 'Create Project'
    }
  },

  {
    path: 'edit-project/:projectId',
    component: ProjectCreateComponent,
    data: {
      title: 'Edit Project'
    }
  },
  {
    path: 'details-project/:projectId',
    component: ProjectDetailsComponent,
    data: {
      title: 'Project Details'
    }
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
