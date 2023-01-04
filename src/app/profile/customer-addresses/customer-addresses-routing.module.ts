import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCartAddressesPageModule } from './customer-addresses.module';


const routes: Routes = [
  {
    path: '',
    component: CustomerCartAddressesPageModule
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartAddressesPageRoutingModule {}
