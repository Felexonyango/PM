import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './PMS/modules/auth/Interceptors/Interceptor';

export function tokenGetter() {
    return localStorage.getItem('token');
  }
  
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter
            },
          }),
        AppLayoutModule,
    ],
    providers: [
        { provide: History, useValue: window.history },

        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
          },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        
    ],
    
    bootstrap: [AppComponent]
})
export class AppModule { }
