import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "projects/components/src/public-api";
import { FormComponentsModule } from "projects/form-components/src/public-api";
import { AuthPageRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    AuthPageRoutingModule,
    FormComponentsModule,
    ComponentsModule
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AuthModule { }
