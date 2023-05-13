// import { NgModule } from '@angular/core';
// import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';


// const routerOptions: ExtraOptions = {
//     anchorScrolling: 'enabled'
// };

// const routes: Routes = [
//     {
//         path: '', component: AppLayoutComponent,
//         children: [
//             { path: '', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },

//         ]
//     },
   // { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
//     { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
//     { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
//     { path: '**', redirectTo: '/notfound' }
// ];

// @NgModule({
//     imports: [RouterModule.forRoot(routes, routerOptions)],
//     exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./PMS/modules/auth/guard/auth-guard/auth.guard";
import { ReverseGuard } from "./PMS/modules/auth/guard/reverse-guard/reverse.guard";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
               

                {
                    path: "auth",
                    loadChildren: () =>
                        import("./PMS/modules/auth/auth.module").then(
                            (m) => m.AuthModule
                        ),
                    canActivate: [ReverseGuard],
                },

                {
                    path: "",
                    component: AppLayoutComponent,
                    canActivate: [AuthGuard], // StoreGuard
                    children: [
                     
                    ],
                },
               
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
    ],
{ scrollPositionRestoration: "enabled" }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
