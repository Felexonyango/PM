import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HTTPResponseStatus, User } from 'src/app/PMS/model/auth';
import { AuthService } from 'src/app/PMS/services/auth/auth.service';
import { UserService } from 'src/app/PMS/services/user/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    confirmed: boolean = false;

    registerForm!: FormGroup;
    rememberMe: boolean = false;
    submitting = false;
    HTTPResponseMessage!: {
        type: HTTPResponseStatus;
        title: string;
        message: string;
    };
    HTTPResponseStatus = HTTPResponseStatus;
    subscriptions = new Subscription();
    constructor(
        public layoutService: LayoutService,
        private authservice: AuthService,
        private userService: UserService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.HTTPResponseMessage = this.authservice.loginPageStatusMessage;
        this.RegisterFormFunc();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    get loginFormFields() {
        return this.registerForm.controls;
    }

    RegisterFormFunc(): void {
        this.registerForm = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }
    submitRegisterForm(): void {
        const userDetails: User = this.registerForm.value;

        this.subscriptions.add(
            this.userService.createUser(userDetails).subscribe({
                next: (res) => {
                    this.HTTPResponseMessage = {
                        type: HTTPResponseStatus.SUCCESS,
                        title: 'Success',
                        message:
                            'You have successfully registered in, please wait as we redirect you',
                    };
                },
                error: (err) => {},
            })
        );
    }
    get dark(): boolean {
        return this.layoutService.config.colorScheme !== 'light';
    }
}
