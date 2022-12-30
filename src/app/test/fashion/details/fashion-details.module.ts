import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { FashionDetailsPage } from './fashion-details.page';
import { FashionDetailsResolver } from './fashion-details.resolver';
import { FashionService } from '../fashion.service';
import { ComponentsModule } from 'projects/components/src/public-api';

const routes: Routes = [
  {
    path: '',
    component: FashionDetailsPage,
    resolve: {
      data: FashionDetailsResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [
    FashionDetailsPage
  ],
  providers: [
    FashionDetailsResolver,
    FashionService
  ]
})
export class FashionDetailsPageModule {}
