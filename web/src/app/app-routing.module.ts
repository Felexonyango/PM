import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './PMS/modules/auth/guard/auth-guard/auth.guard';
import { AppNotfoundComponent } from './PMS/shared/components/app-notfound/app.notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    redirectTo: 'app',
                    pathMatch: 'full',
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./PMS/modules/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },

                {
                    path: 'app',
                    component: AppLayoutComponent,
                    canActivate: [AuthGuard],
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './PMS/modules/dashboard/components/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'workspace',
                            loadChildren: () =>
                                import(
                                    './PMS/modules/workspace/workspace.module'
                                ).then((m) => m.WorkspaceModule),
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
                                import(
                                    './PMS/modules/permissions/permissions.module'
                                ).then((m) => m.PermissionsModule),
                        },
                        {
                            path: 'projects',
                            loadChildren: () =>
                                import(
                                    './PMS/modules/project/project.module'
                                ).then((m) => m.ProjectModule),
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
                                import(
                                    './PMS/modules/feedback/feedback.module'
                                ).then((m) => m.FeedbackModule),
                        },
                    ],
                },
                { path: 'notfound', component: AppNotfoundComponent },
                // { path: 'verify-account', component: VerifyAccountComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            { scrollPositionRestoration: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
