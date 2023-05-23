import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { IFeedback } from 'src/app/PMS/model/feedback.model';
import { FeedbackService } from 'src/app/PMS/services/feedback/feedback.service';
import { ProjectService } from 'src/app/PMS/services/project/project.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent {

  subscription = new Subscription();
  feedbackList: IFeedback[] = [];
  modalReference: any;
  feedback: IFeedback;
  tableColumns: {
      fieldName: string;
      displayName: string;
  }[] = [
      {
          fieldName: "title",
          displayName: "Title",
      },
      {
          fieldName: "description",
          displayName: "Description",
      },
      {
          fieldName: "isActioned",
          displayName: "Actioned",
      },
      {
          fieldName: "createdAt",
          displayName: "Date raised",
      },
  ];

  constructor(
      public projectService: ProjectService,
      public utilService: UtilService,
      private router: Router,
      private feebackService:FeedbackService,

  ){}

  display: boolean = false;

  ngOnInit(): void {
    this.getAllFeedback()
  }



  showDialog() {
      this.display = true;
  }

  getAllFeedback(): void {
      this.subscription.add(
          this.feebackService.getAllFeedback().subscribe({
              next: (res) => {
                  this.feedbackList = res.result.reverse();
              },
          })
      );
  }

  getMenuItems(feedback: IFeedback): IFeedback {
      const menu = [
          {
              label: feedback?.isActioned ? "Unaction" : "Action",
              icon: "pi pi-refresh",
              command: () => {
                  this.action(feedback?._id);
              },
          },
          {
              label: " Log as issue",
              icon: "pi pi-eye",
              command: () => {
                  this.saveFeedbackToIssue(feedback);
              },
          },
      ];
      feedback.menuItems = menu;
      return feedback;
  }

  exportData(): void {
      const result = this.feedbackList.map((x) => {
          delete x.__v;
          delete x.menuItems;

          return {
              ...x,
          };
      });

      this.utilService.exportAsExcelFile(result, "All-workspace");
  }
  getAllUnactionedFeedback(): void {
      this.subscription.add(
          this.feebackService.getAllUnactionedFeedback().subscribe({
              next: (res) => {
                  this.feedbackList =
                      res.result.length > 0
                          ? res.result.map((x) => this.getMenuItems(x))
                          : [];
                          //console.log(this.feedbackList)
              },
          })
      );
  }

  clear(table: Table) {
      // table.clear();
  }
  action(itemId): void {
      this.subscription.add(
          this.feebackService.actionFeedback(itemId).subscribe({
              next: (res) => {
                  this.getAllFeedback();
              },
          })
      );
  }
  getIssueDetails(feedbackId: string): void {
      this.subscription.add(
          this.feebackService.getFeedbackById(feedbackId).subscribe({
              next: (res) => {
                  this.feedback = res.result;
              },
          })
      );
  }
  saveFeedbackToIssue(feedback): void {
      this.feebackService.feedbackData = feedback;
      this.router.navigate(["/issues/create/admin/feedback"]);
  }
  openModal(feedback: IFeedback): void {
      this.display = true;
      this.getIssueDetails(feedback?._id);
  }
}
