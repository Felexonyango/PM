import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/PMS/services/auth/auth.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';
import { WorkspaceService } from 'src/app/PMS/services/workspace/workspace.service';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-auth-header',
    templateUrl: './auth-header.component.html',
    styleUrls: ['./auth-header.component.scss'],
})
export class AuthHeaderComponent implements OnInit {
    currentStore!: {};
  

    @Input() title!: string;

    constructor(
        public app: AppComponent,
        private storeService: WorkspaceService,
        public utilService: UtilService,
        public authService: AuthService,

    ) {}

    ngOnInit(): void {
        if (this.utilService.doesURLHaveText('store')) {
            // this.getStore();
        }
    }
    // getStore() {
    //     this.storeService.getCurrentWorkspace().subscribe((res) => {
    //         this.currentStore = !(res.result = null)
    //             ? res?.result.workSpace.title
    //             : '';
    //     });
    // }
    logout() {
        this.authService.logout();
    }
    isMobile() {
        return window.innerWidth <= 991;
    }
}
