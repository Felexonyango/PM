import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { Subscription } from "rxjs";
import { userFormly } from "./user-create.formly";
import { User } from "src/app/PMS/model/auth";
import { userRoleArray } from "src/app/PMS/model/user.model";
import { UserService } from "src/app/PMS/services/user/user.service";
import { UtilService } from "src/app/PMS/services/util/util.service";

enum RoleAction {
    ASSIGN = "ASSIGN",
    UNASSIGN = "UNASSIGN",
}

enum ComponentAction {
    CREATE = "CREATE",
    EDITUSER = "EDITUSER",
    EDITPROFILE = "EDITPROFILE",
}

@Component({
    selector: "app-user-create",
    templateUrl: "./user-create.component.html",
    styleUrls: ["./user-create.component.scss"],
})
export class UserCreateComponent implements OnInit, OnDestroy {
    createUserForm = new FormGroup({});
    userDetailsModel = {};
    userFormlyFields: FormlyFieldConfig[] = [];
    subscriptions = new Subscription();
    user: User;
    userRolesArray: string[] = [];
    roleAction = RoleAction;
    isLoadingClinics = false;
    componentActionsEnum = ComponentAction;
    componentAction: ComponentAction = ComponentAction.CREATE;
    isEdit = false;
    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        public utilService: UtilService,
      
    ) {
        
    }

    ngOnInit(): void {
        this.userFormlyFields = userFormly;
        this.userRolesArray = userRoleArray;
        this.getUserIdFromParam();
        
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

   

    createUpdateUser(): void {
        const user: any = {
            ...this.createUserForm.value,
        };
        const submitUrl =
            this.componentAction === this.componentActionsEnum.EDITPROFILE
                ? this.userService.updateUserProfile(user)
                : this.componentAction === this.componentActionsEnum.EDITUSER
                ? this.userService.updateUser(user, this.user._id)
                : this.userService.createUser(user);

        this.subscriptions.add(
            submitUrl.subscribe({
                complete: () => {
                    this.utilService.goBack();
                },
            })
        );
    }

    getUserDetails(userId: string): void {
        const submitURL =
            this.componentAction === this.componentActionsEnum.EDITUSER
                ? this.userService.getUserById(userId)
                : this.userService.getUserProfile();

        submitURL.subscribe({
            next: (res) => {
                this.user = res.result;
                this.userDetailsModel = {
                    ...this.user,
                    
                };
            },
        });
    }
    getUserIdFromParam(): void {
        this.subscriptions.add(
            this.activatedRoute.params.subscribe({
                next: (param) => {
                    const userId = param['userId'];
                    if (userId) {
                        this.isEdit = true;
                        this.componentAction =
                            userId === "MYPROFILE"
                                ? this.componentActionsEnum.EDITPROFILE
                                : this.componentActionsEnum.EDITUSER;
                        this.getUserDetails(userId);
                    }
                    this.formlyFieldsUpdate();
                },
            })
        );
    }
    formlyFieldsUpdate() {
        if (this.isEdit) {
            const emailField = this.userFormlyFields[0].fieldGroup.find(
                (x) => x.key === "email"
            );
            // const passwordField = this.userFormlyFields[0].fieldGroup.find(
            //   (x) => x.key === 'password'
            // );
            // const confirmPasswordField = this.userFormlyFields[0].fieldGroup.find(
            //   (x) => x.key === 'passwordConfirm'
            // );
            emailField.templateOptions.disabled = true;
            // passwordField.hideExpression = true
            // confirmPasswordField.hideExpression = true
        } else {
            const emailField = this.userFormlyFields[0].fieldGroup.find(
                (x) => x.key === "email"
            );
            // const passwordField = this.userFormlyFields[0].fieldGroup.find(
            //   (x) => x.key === 'password'
            // );
            // const confirmPasswordField = this.userFormlyFields[0].fieldGroup.find(
            //   (x) => x.key === 'passwordConfirm'
            // );
            emailField.templateOptions.disabled = false;
            // passwordField.hideExpression = false
            // confirmPasswordField.hideExpression = false
        }
    }
}
