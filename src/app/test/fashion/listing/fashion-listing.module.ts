import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { FashionListingPage } from './fashion-listing.page';
import { FashionListingResolver } from './fashion-listing.resolver';
import { FashionService } from '../fashion.service';
import { CustomComponentsModule, ShellModule } from 'projects/components/src/public-api';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { FormComponentsModule } from 'projects/form-components/src/public-api';

const routes: Routes = [
  {
    path: '',
    component: FashionListingPage,
    resolve: {
      data: FashionListingResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CustomComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    TranslateModule,
    FormComponentsModule,
    CustomComponentsModule,
    ShellModule
  ],
  declarations: [FashionListingPage],
  providers: [
    FashionListingResolver,
    FashionService
  ]
})
export class FashionListingPageModule {}
