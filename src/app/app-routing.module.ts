import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from  '../app/auth.guard'

const routes: Routes = [
  {
path: 'welcome',
loadChildren: () => import('../app/welcome/welcome.module').then(m => m.WelcomePageModule)
},
  {
    path: 'nurse',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'home/:id',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
    ]
  },
  
  
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'adminpage',
        loadChildren: () => import('./adminpage/adminpage.module').then( m => m.AdminpagePageModule)
      },
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
      }
    ]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  
 

  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
