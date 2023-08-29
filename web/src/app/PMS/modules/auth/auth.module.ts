import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './components/login/login.component';
import { FormlyModule } from '@ngx-formly/core';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
    declarations: [LoginComponent,RegisterComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
        }),
        ReactiveFormsModule,
    ]
})
export class AuthModule { }
