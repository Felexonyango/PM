
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';

import { ConfirmationService } from 'primeng/api';
import { AppConfig } from 'src/app/layout/service/app.layout.service';
import { User, HTTPResponseStatus } from 'src/app/PMS/model/auth';
import { AuthItemType, IAuthItem } from 'src/app/PMS/model/user.model';
import { UserService } from 'src/app/PMS/services/user/user.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';

export enum inviteStatus {
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [ConfirmationService],
})
export class ProfileComponent implements OnInit {
    config: AppConfig;
    isDarkTheme: boolean;
    user: User;

    subscriptions = new Subscription();
    moduleType = 'PROFILEPIC';
    profilePicture: any;
    authItemType = AuthItemType;
    authItemModalRef: any;
    HTTPResponseStatus = HTTPResponseStatus;
    modalDismissed: boolean;
    isEdit: boolean;

    authItemValue: string;
    addEmailModal = false;
    createUserForm = new FormGroup({});
    userDetailsModel: any;
    userFormlyFields: FormlyFieldConfig[] = [
        {
            fieldGroup: [
                {
                    fieldGroupClassName: 'grid',
                    fieldGroup: [
                        {
                            className: 'col-6',
                            key: 'firstname',
                            type: 'input',
                            templateOptions: {
                                placeholder: 'Enter firstname',
                                required: true,
                            },
                        },
                        {
                            className: 'col-6',
                            key: 'lastname',
                            type: 'input',
                            templateOptions: {
                                placeholder: 'Enter lastname',
                                required: true,
                            },
                        },
                    ],
                },
                {
                    key: 'email',
                    type: 'input',
                    templateOptions: {
                        placeholder: 'Enter email',
                        disabled: true,
                    },
                },
            ],
        },
    ];

    constructor(
        private userService: UserService,
        // public appMain: AppMainComponent,
        private utilService: UtilService,
        // public configService: ConfigService,
        private confirmationService: ConfirmationService,
     
    ) {
        // this.config = this.configService.config;
        // this.subscriptions = this.configService.configUpdate$.subscribe(
        //     (config) => {
        //         this.config = config;
        //         this.updateChartOptions();
        //     }
        // );
    }

    ngOnInit(): void {
        this.getUserDetails();
    }

    getUserDetails(): void {
        this.subscriptions.add(
            this.userService.getUserProfile().subscribe({
                next: (res) => {
                    this.user = res.result;
                    this.userDetailsModel = res.result;
                  
                     this.userDetailsModel.email = this.user?.email
                  
                },
                complete: () => {
                    
                },
            })
        );
    }

    updateUser(): void {
        const user = {
            ...this.createUserForm.value,
        };
        this.subscriptions.add(
            this.userService.updateUserProfile(user).subscribe({
                complete: () => {
                    this.getUserDetails();
                    this.isEdit = false;
                },
            })
        );
    }
   
   
    showAddEmailModal(): void {
        this.addEmailModal = true;
    }
    addUserAuthItem(): void {
        const authItem = {
            value: this.authItemValue,
            authType: AuthItemType.EMAIL,
        };
        this.subscriptions.add(
            this.userService.addUserAuthItem(authItem).subscribe({
                next: (res) => {
                    this.getUserDetails();
                    this.addEmailModal = false;
                },
            })
        );
    }
    // deleteUserAuthItem(authItem: IAuthItem): void {
    //     this.subscriptions.add(
    //         this.userService.deleteUserAuthItem(authItem).subscribe({
    //             next: () => {
    //                 this.getUserDetails();
    //             },
    //         })
    //     );
    // }
    confirm(event: Event, authItem) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure that you want to delete this email?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //this.deleteUserAuthItem(authItem);
            },
        });
    }
    confirmDeleteProfile(event: Event, authItem) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure you want to delete your account? ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
               // this.deleteUserAuthItem(authItem);
            },
        });
    }
    updateChartOptions() {
    //     if (this.config.dark) {
    //         this.isDarkTheme = true;
    //     } else {
    //         this.isDarkTheme = false;
    //     }
    }

}
