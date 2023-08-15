import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { CreateFeedbackComponent } from './components/create-feedback/create-feedback.component';
import { FeedbackDetailsComponent } from './components/feedback-details/feedback-details.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'list',
    component:FeedbackListComponent
  },
  {
    path:'create-feedback',
    component:CreateFeedbackComponent
  },
  {
    path:'edit-feedback/:id',
    component:CreateFeedbackComponent
  },
  {
    path:'details/:id',
    component:FeedbackDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
