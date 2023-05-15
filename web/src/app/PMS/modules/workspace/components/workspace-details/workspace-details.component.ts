
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IWorkspace } from 'src/app/PMS/model/workspace.model';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { WorkspaceService } from 'src/app/PMS/services/workspace/workspace.service';

@Component({
  selector: 'app-workspace-details',
  templateUrl: './workspace-details.component.html',
  styleUrls: ['./workspace-details.component.scss'],
})
export class WorkspaceDetailsComponent implements OnInit {
  subscription = new Subscription();
  workspace!: IWorkspace;
  modalDismissed!: boolean;
  workspaceProjects = [];

  workspaceMembersTableColumns: {
    displayName: string;
    fieldName: string;
  }[] = [
    {
      displayName: 'Name',
      fieldName: 'workspace.members.firstname',
    },
    {
      displayName: 'Contacts',
      fieldName: 'workspace.member.authItems[0].value',
    },
  ];

  workspaceProjectsTableColumns: {
    displayName: string;
    fieldName: string;
  }[] = [
    {
      displayName: 'Title',
      fieldName: 'title',
    },
    {
      displayName: 'Description',
      fieldName: 'description',
    },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private workspaceService: WorkspaceService,

    public utilService: UtilService,
 
    ) 
    {}

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
          const workspaceId = param['workspaceId'];
          this.getWorkspaceById(workspaceId);
        },
      })
    );
  }

  getWorkspaceById(workspaceId: string): void {
    this.subscription.add(
      this.workspaceService
        .getWorkspaceById(workspaceId)
        .subscribe((response) => {
          this.workspace = response.result;
          // this.workspace.members = this.workspace.members.filter(
          //   (x, index, array) => array.findIndex((t) => t._id == x._id) == index
          // );
          // this.getAllWorkspaceProjects();
        })
    );
  }
  
  // getAllWorkspaceProjects(): void {
  //   this.subscription.add(
  //     this.workspaceService
  //       .getAllWorkspaceProjects(this.workspace._id)
  //       .subscribe((response) => {
  //         this.workspaceProjects = response.result;
  //       })
  //   );
  // }
  public memberDeleteDialog(member: any) {
    // this.deleteConfirmService
    //   .confirm(
    //     'Are you sure you want to remove <b>' +
    //       member.firstname +
    //       ' ' +
    //       member.lastname +
    //       "'s</b> from this workspace?"
    //   )
    //   .then((confirmed) => {
    //     if (confirmed) {
    //       this.removeMemberFromWorkspace(member._id);
    //     }
    //   })

    //   .catch(() => (this.modalDismissed = true));
  }
  exportPatients(): void {
    this.utilService.exportAsExcelFile(this.workspaceProjects, "All-workspace");
}
}
