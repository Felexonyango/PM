import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppNotfoundComponent } from './PMS/shared/components/app-notfound/app.notfound.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
};

const routes: Routes = [
    {
        path: 'app',
        component: AppLayoutComponent,
        children: [
            {
                path: 'workspace',
                loadChildren: () =>
                    import('./PMS/modules/workspace/workspace.module').then(
                        (m) => m.WorkspaceModule
                    ),
            },
            {
                path: 'users',
                loadChildren: () =>
                    import('./PMS/modules/users/users.module').then(
                        (m) => m.UsersModule
                    ),
            },

            {
                path: 'permissions',
                loadChildren: () =>
                    import('./PMS/modules/permissions/permissions.module').then(
                        (m) => m.PermissionsModule
                    ),
            },
            {
                path: 'projects',
                loadChildren: () =>
                    import('./PMS/modules/project/project.module').then(
                        (m) => m.ProjectModule
                    ),
            },
            {
                path: 'tasks',
                loadChildren: () =>
                    import('./PMS/modules/task/task.module').then(
                        (m) => m.TaskModule
                    ),
            },
            {
                path: 'feedback',
                loadChildren: () =>
                    import('./PMS/modules/feedback/feedback.module').then(
                        (m) => m.FeedbackModule
                    ),
            },
        ],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./PMS/modules/auth/auth.module').then((m) => m.AuthModule),
    },
    // {
    //     path: 'landing',
    //     loadChildren: () =>
    //         import('./demo/components/landing/landing.module').then(
    //             (m) => m.LandingModule
    //         ),
    // },
    {
        path: 'notfound',
        component: AppNotfoundComponent,
    },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
