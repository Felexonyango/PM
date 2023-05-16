
import { AppLayoutComponent } from './layout/app.layout.component';
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
                    path: "app",
                    component: AppLayoutComponent,
                    canActivate: [AuthGuard], // StoreGuard
                    children: [
                     {
                        path:'workspace',
                        loadChildren:()=>import(
                            './PMS/modules/workspace/workspace.module'
                        ).then((m)=>m.WorkspaceModule)
                     }
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
