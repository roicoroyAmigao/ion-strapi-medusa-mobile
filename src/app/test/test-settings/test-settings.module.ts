import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestSettingsPageRoutingModule } from './test-settings-routing.module';

import { TestSettingsPage } from './test-settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { CustomComponentsModule } from 'projects/components/src/public-api';
import { FormComponentsModule } from 'projects/form-components/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestSettingsPageRoutingModule,
    NgxsModule,
    NgxsFormPluginModule,
    TranslateModule,
    FormComponentsModule,
    CustomComponentsModule,
  ],
  declarations: [TestSettingsPage]
})
export class TestSettingsPageModule {}
