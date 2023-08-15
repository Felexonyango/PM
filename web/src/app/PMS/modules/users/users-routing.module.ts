import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './components/user-create/user-create.component';

import { UsersListsComponent } from './components/users-lists/users-lists.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users-list',
    pathMatch: 'full'
  },
  {
    path: 'users-list',
    component: UsersListsComponent,
    data: {
      title: 'Users List'
    }
  },
  {
    path: 'users-list/workspace/:workspaceId',
    component: UsersListsComponent,
    data: {
      title: 'Users List'
    }
  },
  {
    path: 'add-user',
    component: UserCreateComponent,
    data: {
      title: 'Add User'
    }
  },
  {
    path: 'edit-user/:userId',
    component: UserCreateComponent,
    data: {
      title: 'Edit User'
    }
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
