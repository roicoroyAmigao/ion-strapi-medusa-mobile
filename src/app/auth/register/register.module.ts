import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { UserComponent } from './user/user.component';
import { AddressComponent } from './address/address.component';
import { CustomComponentsModule } from 'projects/components/src/public-api';
import { FormComponentsModule } from 'projects/form-components/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    NgxsStoragePluginModule,
    FormComponentsModule,
    CustomComponentsModule
  ],
  declarations: [
    UserComponent,
    AddressComponent
  ]
})
export class RegisterPageModule { }
