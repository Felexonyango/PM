
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-notfound',
  templateUrl: './app.notfound.component.html',
})
export class AppNotfoundComponent {
    // projectConstants = projectConstants;

    constructor(
      public app: AppComponent,
       public utilService: UtilService,
      public  router: Router
      ) {}   
}
