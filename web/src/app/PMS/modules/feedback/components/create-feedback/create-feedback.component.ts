import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import {FeedbackFormlyFields} from '../feedbackformly'
import { HTTPResponseStatus } from 'src/app/PMS/model/auth';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { FeedbackService } from 'src/app/PMS/services/feedback/feedback.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.scss']
})
export class CreateFeedbackComponent {
  subscriptions = new Subscription();
  feedBackForm = new FormGroup({});

  model: any = {};
  feedBackFormFields: FormlyFieldConfig[] = [];
  HTTPResponseMessage: {
    type: HTTPResponseStatus;
    title: string;
    message: string;
  };
  HTTPResponseStatus = HTTPResponseStatus;
  constructor(
    public utilService: UtilService,
 private feedbackService:FeedbackService
    ){}
    

    ngOnInit(): void {
      this.feedBackFormFields =FeedbackFormlyFields
     
    }



    submitFeedBack(): void {
      const feedback: any =
      {
          ...this.feedBackForm.value
      }
      this.subscriptions.add(
        this.feedbackService.sendFeedback(feedback).subscribe({
          next: () => {
            this.HTTPResponseMessage = {
              type: HTTPResponseStatus.SUCCESS,
              title: 'Sent',
              message: 'Your message has been sent to the successfully',
            };
            setTimeout(() => {this.utilService.goBack()}, 5000);
          },
          error: (err) => {
            this.HTTPResponseMessage = {
              type: HTTPResponseStatus.ERROR,
              title: `Error!`,
              message: err?.error?.message
                ? err?.error?.message
                : 'There was an error when trying to log you in, please try again',
            };
          },
        })
      );
    }
}
