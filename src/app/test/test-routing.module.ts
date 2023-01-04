import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestPage } from './test.page';

const routes: Routes = [
  {
    path: '',
    component: TestPage,
  },
  // {
  //   path: '',
  //   redirectTo: 'fashion',
  //   pathMatch: 'full'
  // },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then(m => m.FormPageModule)
  },
  {
    path: 'test-home',
    loadChildren: () => import('./test-home/test-home.module').then( m => m.TestHomePageModule)
  },
  {
    path: 'test-profile',
    loadChildren: () => import('./test-profile/test-profile.module').then( m => m.TestProfilePageModule)
  },
  {
    path: 'test-settings',
    loadChildren: () => import('./test-settings/test-settings.module').then( m => m.TestSettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestPageRoutingModule { }
