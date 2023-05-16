import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { Subscription } from "rxjs";
import { IWorkspace } from "src/app/PMS/model/workspace.model";
import { UtilService } from "src/app/PMS/services/util/util.service";
import { WorkspaceService } from "src/app/PMS/services/workspace/workspace.service";
import { DeleteConfirmComponent } from "src/app/PMS/shared/components/delete-confirm/delete-confirm.component";

@Component({
    selector: "app-workspace-list",
    templateUrl: "./workspace-list.component.html",
    styleUrls: ["./workspace-list.component.scss"],
    providers: [DialogService],
})
export class WorkspaceListComponent implements OnInit {
    subscription = new Subscription();
workspaceList: IWorkspace[]=[]

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
            fieldName: "owner",
            displayName: "Owner",
        },
        {
            fieldName: "members",
            displayName: "Number of members",
        },
    ];


    constructor(
        private activatedRoute: ActivatedRoute,
        public router: Router,
        public dialogService: DialogService,
        private workspaceService: WorkspaceService,
        public utilService: UtilService,
  
    ) {
        
    }

    ngOnInit(): void {
        
     this.getAllWorkspaces()
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }



    exportData(): void {
        const result = this.workspaceList.map((x) => {
            delete x.__v;
            delete x.menuItems;
            delete x.createdBy;
            delete x.members;
            delete x.workspace;

            return {
                ...x,
                title: x.title,
                workspaceOwner: x.createdBy
            };
        });

        this.utilService.exportAsExcelFile(result, "All-workspace");
    }

    getAllWorkspaces(): void {
        this.subscription.add(
            this.workspaceService.getAllWorkspaces().subscribe({
                next: (res) => {
                    this.workspaceList =
                        res.result.length > 0
                            ? res.result.map((x) => this.getMenuItems(x))
                            : [];
                    console.log(this.workspaceList);
                },
            })
        );
    }

    getMenuItems(workspace: IWorkspace): IWorkspace {
        const menu = [
            {
                label: "Edit",
                icon: "pi pi-pencil",
                command: () => {
                    this.router.navigate([
                        "/workspace/edit-workspace",
                        workspace?._id,
                    ]);
                },
            },

            {
                label: "delete",
                icon: "pi pi-times",
                command: () => {
                    this.openDeleteDialog(workspace);
                },
            },
        ];
        workspace.menuItems = menu;
        return workspace;
    }

    deleteWorkspace(workspaceId: string): void {
        this.subscription.add(
            this.workspaceService.deleteWorkspace(workspaceId).subscribe({
                complete: () => this.getAllWorkspaces(),
            })
        );
    }
  
    public openDeleteDialog(workspace: IWorkspace): void {
        const ref = this.dialogService.open(DeleteConfirmComponent, {
            width: "30%",
            height: "30%",
            header: "Delete Confirmation",
        });

        ref.onClose.subscribe((confirm) => {
            if (confirm) {
               // this.deleteWorkspace(workspace?._id);
            }
        });
    }
}
