import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AuthService } from '../PMS/services/auth/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('searchinput') searchInput!: ElementRef;
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    searchActive: boolean = false;
    constructor(
        public layoutService: LayoutService,public el: ElementRef,
        private authservice: AuthService
        ) { }
    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }
    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }
    
    onSidebarButtonClick() {
        this.layoutService.showSidebar();
    }
    logout(){
        this.authservice.logout()
    }
}