import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestHomePageRoutingModule } from './test-home-routing.module';

import { TestHomePage } from './test-home.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { FormComponentsModule } from 'projects/form-components/src/public-api';
import { ComponentsModule } from 'projects/components/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestHomePageRoutingModule,
    ReactiveFormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    TranslateModule,
    FormComponentsModule,
    ComponentsModule,
  ],
  declarations: [TestHomePage]
})
export class TestHomePageModule {}
