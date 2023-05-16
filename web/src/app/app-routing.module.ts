import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
};

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'workspace',
                loadChildren: () =>
                    import('./PMS/modules/workspace/workspace.module').then(
                        (m) => m.WorkspaceModule
                    ),
            },
        ],
    },
    {
        path: 'auth',
        data: { breadcrumb: 'Auth' },
        loadChildren: () =>
            import('./demo/components/auth/auth.module').then(
                (m) => m.AuthModule
            ),
    },
    {
        path: 'landing',
        loadChildren: () =>
            import('./demo/components/landing/landing.module').then(
                (m) => m.LandingModule
            ),
    },
    {
        path: 'notfound',
        loadChildren: () =>
            import('./demo/components/notfound/notfound.module').then(
                (m) => m.NotfoundModule
            ),
    },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
