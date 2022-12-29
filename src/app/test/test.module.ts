import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';

import { TestPage } from './test.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from 'projects/components/src/public-api';
import { FormComponentsModule } from 'projects/form-components/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule,
    ReactiveFormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    TranslateModule,
    FormComponentsModule,
    ComponentsModule
  ],
  declarations: [TestPage]
})
export class TestPageModule {}
