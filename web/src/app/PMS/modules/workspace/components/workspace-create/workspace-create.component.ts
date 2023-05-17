
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { Subscription } from "rxjs";
import { IWorkspace } from "src/app/PMS/model/workspace.model";
import { UtilService } from "src/app/PMS/services/util/util.service";
import { WorkspaceService } from "src/app/PMS/services/workspace/workspace.service";

@Component({
    selector: "app-workspace-create",
    templateUrl: "./workspace-create.component.html",
    styleUrls: ["./workspace-create.component.scss"],
})
export class WorkspaceCreateComponent implements OnInit {
    subscription = new Subscription();
    workspace!: IWorkspace;
    isEdit = false;

    workspaceForm = new FormGroup({});
    workspaceModel: any = {};
    workspaceOptions: FormlyFormOptions = {};
    workspaceFields: FormlyFieldConfig[] = [
        {
            className: "col-12 md:col-12",
            key: "title",
            type: "input",
            templateOptions: {
                placeholder: "Workspace Title",
                required: true,
                label: "Title",
            },
        },
        {
            className: "col-12 md:col-12",
            key: "description",
            type: "input",
            templateOptions: {
                placeholder: "Workspace Description",
                required: true,
            label: " Description",
            },
        },
    ];
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private workspaceService: WorkspaceService,
        public utilService: UtilService, 
    ) {}

    ngOnInit(): void {
        this.getParam();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
      }
    createOrUpdateWorkspace(): void {
        const workspace = this.workspaceForm.value;
        const submitUrl = this.isEdit
            ? this.workspaceService.editWorkspace(workspace, this.workspace._id)
            : this.workspaceService.addWorkspace(workspace);

        submitUrl.subscribe({
            complete: () => {
                this.router.navigateByUrl("/workspace");
            },
        });
    }

    getParam(): void {
        this.subscription.add(
            this.activatedRoute.params.subscribe({
                next: (param) => {
                    const workspaceId = param['workspaceId'];
                    if (workspaceId) {
                        this.isEdit = true;
                        this.getworkspaceById(workspaceId);
                    }
                },
            })
        );
    }

    getworkspaceById(workspaceId: string): void {
        this.subscription.add(
            this.workspaceService
                .getWorkspaceById(workspaceId)
                .subscribe((response) => {
                    this.workspaceModel = response.result;
                    this.workspace = response.result;
                })
        );
    }
}
