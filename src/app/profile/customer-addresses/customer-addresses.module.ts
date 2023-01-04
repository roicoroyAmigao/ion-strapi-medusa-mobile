import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartAddressesPageRoutingModule } from './customer-addresses-routing.module';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { CustomComponentsModule } from 'projects/components/src/public-api';
import { FormComponentsModule } from 'projects/form-components/src/public-api';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { CustomerCartAddressesPage } from './customer-addresses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartAddressesPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxsModule,
    NgxsFormPluginModule,
    CustomComponentsModule,
    FormComponentsModule,
    NgxsStoragePluginModule,
  ],
  declarations: [
    CustomerCartAddressesPage,
    AddressDetailsComponent
  ],
  exports: [
    CustomerCartAddressesPage,
    AddressDetailsComponent
  ]
})
export class CustomerCartAddressesPageModule { }
