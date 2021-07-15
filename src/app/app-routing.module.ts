import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from  '../app/auth.guard'

const routes: Routes = [
  {
    path: 'nurse',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
    ]
  },
  
  
  {
    path: '',
    redirectTo: 'nurse/home',
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
  }
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
