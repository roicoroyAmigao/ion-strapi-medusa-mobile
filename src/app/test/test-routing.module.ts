import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestPage } from './test.page';

const routes: Routes = [
  {
    path: '',
    component: TestPage,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
      },
      {
        path: 'form',
        loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
      },
      {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestPageRoutingModule { }
