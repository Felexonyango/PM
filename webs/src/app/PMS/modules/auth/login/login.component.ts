import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { HTTPResponseStatus, User } from 'src/app/PMS/model/auth';
import { AuthService } from 'src/app/PMS/services/auth/auth.service';
import { loginFormlyFields } from './login-user.formly';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  subscriptions = new Subscription();
  loginForm = new FormGroup({});
  isEdit=false
  userModel: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  user!: User;
  rememberMe: boolean = false;
  submitting!: false;
  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private authservice: AuthService,
    public utilService:UtilService

  ) {}

  ngOnInit() {
    this.fields = loginFormlyFields;
  }
  get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

  HTTPResponseMessage!: {
    type: HTTPResponseStatus;
    title: string;
    message: string;
  };
  HTTPResponseStatus = HTTPResponseStatus;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  login() {
    const userDetails={
      ...this.userModel
    }
    this.subscriptions.add(
      this.authservice.login(userDetails).subscribe({
        next:(res)=>{
        
        }
      })
    
    )
  
  
  }
}
