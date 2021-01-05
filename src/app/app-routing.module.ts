import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'usabillity',
    loadChildren: () => import('./usabillity/usabillity.module').then( m => m.UsabillityPageModule)
  },
  {
    path: 'factory',
    loadChildren: () => import('./factory/factory.module').then( m => m.FactoryPageModule)
  },
  {
    path: 'warehousetask',
    loadChildren: () => import('./warehousetask/warehousetask.module').then( m => m.WarehousetaskPageModule)
  },
  {
    path: 'operation',
    loadChildren: () => import('./operation/operation.module').then( m => m.OperationPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
