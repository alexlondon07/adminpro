import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent , data: { title: 'Progreso'} },
            { path: 'graficas1', component: Graficas1Component , data: { title: 'Gráficas'} },
            { path: 'promises', component: PromisesComponent , data: { title: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent , data: { title: 'Rxjs'} },
            { path: 'account-settings', component: AccoutSettingsComponent , data: { title: 'Ajustes del tema'} },
            { path: 'profile', component: ProfileComponent , data: { title: 'Perfil de usuario'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
