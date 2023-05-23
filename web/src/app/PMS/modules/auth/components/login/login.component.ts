import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HTTPResponseStatus, User } from 'src/app/PMS/model/auth';
import { AuthService } from 'src/app/PMS/services/auth/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent {
	loginForm!: FormGroup ;
	rememberMe: boolean = false;
	submitting = false;
	HTTPResponseMessage!: {
		type: HTTPResponseStatus;
		title: string;
		message: string;
	  };
	  HTTPResponseStatus = HTTPResponseStatus;
	subscriptions=new Subscription()
	constructor(
		public layoutService: LayoutService,
		private authservice:AuthService,
		private fb:FormBuilder

		) {}


	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

	ngOnInit(): void {
		this.HTTPResponseMessage = this.authservice.loginPageStatusMessage;
		this.loginFormFunc();
		
	  }
	
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get loginFormFields() { return this.loginForm.controls; }

  loginFormFunc(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  submitLoginForm(): void {
    this.submitting = true;
    const userDetails: User = this.loginForm.value;
    this.subscriptions.add(
      this.authservice.login(userDetails).subscribe({
        next: (res) => {
          this.submitting = false;
          this.HTTPResponseMessage = {
            type: HTTPResponseStatus.SUCCESS,
            title: 'Success',
            message: 'You have successfully logged in, please wait as we redirect you'
          };
        },
        error: (err) => {
          this.submitting = false;
          this.HTTPResponseMessage = {
            type: HTTPResponseStatus.ERROR,
            title: `We couldn't sign you in`,
            message: err?.error?.message ? err?.error?.message : 'There was an error when trying to log you in, please try again'
          };
        }
      })
    );
  }


}
