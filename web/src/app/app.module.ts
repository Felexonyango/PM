import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './PMS/modules/auth/guard/Interceptors/Interceptor';
import { DasboardComponent } from './PMS/modules/dashboard/components/dasboard/dasboard.component';
export function tokenGetter() {
    return localStorage.getItem('token');
}
@NgModule({
    declarations: [
        AppComponent,
        DasboardComponent,
       
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            },
        }),
        
        
    ],
    
    providers: [
        { provide: History, useValue: window.history },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
