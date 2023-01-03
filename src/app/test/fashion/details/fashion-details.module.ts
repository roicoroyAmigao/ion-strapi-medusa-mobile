import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { FashionDetailsPage } from './fashion-details.page';
import { FashionDetailsResolver } from './fashion-details.resolver';
import { FashionService } from '../fashion.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { CustomComponentsModule } from 'projects/components/src/public-api';
import { FormComponentsModule } from 'projects/form-components/src/public-api';

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
    HttpClientModule,
    ReactiveFormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    TranslateModule,
    FormComponentsModule,
    CustomComponentsModule
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
