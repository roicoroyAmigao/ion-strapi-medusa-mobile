import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestProfilePage } from './test-profile.page';

const routes: Routes = [
  {
    path: '',
    component: TestProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestProfilePageRoutingModule {}
