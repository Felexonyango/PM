import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { CreateFeedbackComponent } from './components/create-feedback/create-feedback.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { FeedbackDetailsComponent } from './components/feedback-details/feedback-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    CreateFeedbackComponent,
    FeedbackListComponent,
    FeedbackDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginatorModule,
    TableModule,
    SplitButtonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
        validationMessages: [
            { name: 'required', message: 'This field is required' },
        ],
    }),
    FormlyPrimeNGModule,
    MessagesModule,
    TabViewModule,
    ToastModule,
    DialogModule,  
    FeedbackRoutingModule,

  ]
})
export class FeedbackModule { }
