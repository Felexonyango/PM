
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Clipboard } from '@angular/cdk/clipboard';
import { Subscription } from 'rxjs';
import { User } from 'src/app/PMS/model/auth';
import { UserService } from 'src/app/PMS/services/user/user.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class UserDetailsComponent implements OnInit {
    subscriptions = new Subscription();
    isEdit: boolean;

    user: User;
    form = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[] = [
        {
            className: 'mx-auto',
            key: 'firstname',
            type: 'input',
            templateOptions: {
                label: 'First name',
                placeholder: 'First name',
                required: true,
            },
        },
        {
            key: 'lastname',
            type: 'input',
            templateOptions: {
                label: 'Last name',
                placeholder: 'Last name',
                required: true,
            },
        },
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                label: 'Primary email',
                placeholder: 'Email',
                type: 'email',
                readonly: true,
            },
            validators: {
                validation: ['email'],
            },
        },
        // {
        //     key: 'authItem',
        //     type: 'repeat',
        //     templateOptions: {
        //         addText: 'Add another email',
        //     },

        //     fieldArray: {
        //         fieldGroupClassName: 'grid',
        //         fieldGroup: [
        //             {
        //                 className: 'ml-2',
        //                 type: 'input',
        //                 key: 'amount',
        //                 templateOptions: {
        //                     placeholder: 'Email',
        //                     required: true,
        //                 },
        //                 validators: {
        //                     validation: ['email'],
        //                 },
        //             },
        //         ],
        //     },
        // },
    ];

    timeLeft = 10;
    interval;
    deleteMessage: Message[];
    referralURL: string;
    copingReferralURL = false;

    constructor(
        public utilService: UtilService,
        public userService: UserService,
        private confirmationService: ConfirmationService,
        private clipboard: Clipboard,
        
    ) {
        
    }

    ngOnInit(): void {
        this.getUserDetails();
        this.isEdit = false;
    }

    getUserDetails(): void {
        this.subscriptions.add(
            this.userService.getUserProfile().subscribe({
                next: (res) => {
                    this.user = res.result;
                    this.model = res.result;
                    this.model.email = this.user?.email
                    // this.utilService.userTheme = this.user.isDarkTheme;
                  
                },
            })
        );
    }

    updateUser(form): void {
        const user = {
            ...this.form.value,
        };
        this.subscriptions.add(
            this.userService.updateUserProfile(user).subscribe({
                complete: () => {
                    this.getUserDetails();
                },
            })
        );
    }
    // editStateChange(): void {
    //     this.isEdit = !this.isEdit;
    //     const firstNameField = this.fields.find((x) => x.key === 'firstname');
    //     const firstNameFieldIndex = this.fields.findIndex(
    //         (x) => x.key === 'firstname'
    //     );
    //     const lastNameField = this.fields.find((x) => x.key === 'lastname');
    //     const lastNameFieldIndex = this.fields.findIndex(
    //         (x) => x.key === 'lastname'
    //     );

    //     firstNameField.hideExpression = !this.isEdit;
    //     this.fields[firstNameFieldIndex] = firstNameField;
    //     lastNameField.hideExpression = !this.isEdit;
    //     this.fields[lastNameFieldIndex] = lastNameField;
    // }

    deleteAccount(): void {
        // this.subscriptions.add(
        //     this.userService.deleteAccount().subscribe({
        //         next: () => {
        //             this.authService.logout();
        //         },
        //     })
        // );
        console.log('account deleted');
    }
    confirmAccountDelete() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete your account? ',
            accept: () => {
                this.startTimer();
            },
        });
    }

    startTimer() {
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
            } else {
                this.deleteAccount();
            }
        }, 1000);
        this.deleteMessage = [
            {
                severity: 'error',
                detail:
                    ' Your account will be deleted in ' +
                    this.timeLeft +
                    '. You will be logged out.',
            },
        ];
    }
    copyLink() {
        this.copingReferralURL = true;
        const link = this.referralURL;
        this.clipboard.copy(link);
        setTimeout(() => this.copingReferralURL = false, 3000);
    }
}
