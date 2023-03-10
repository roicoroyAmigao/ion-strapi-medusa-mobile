import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MedusaState } from './store/medusa/medusa.state';
import localePT from '@angular/common/locales/pt';
import localeEN from '@angular/common/locales/en';
import { CustomerState } from './store/customer/customer.state';
import { AddressesState } from './store/addresses/addresses.state';
import { FormsState } from './store/forms/forms.state';
import { ErrorsLoggingStateModule } from './store/errors-logging/errors-logging.state';
import { CartState } from './store/cart/cart.state';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { PaymentState } from './store/payment/payment.state';
import { ShippingState } from './store/shipping/shipping.state';
import { StrapiUserState } from './store/strapi-user/strapi-user.state';
import { ThemeState } from './store/theme/theme.state';
import { CustomerRegisterState } from './store/customer-register/customer-register.state';
import { LanguageState } from './store/language/language.state';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormComponentsModule } from 'projects/form-components/src/public-api';
import { StrapiAuthInterceptor } from 'projects/services/src/lib/services/strapi.interceptor';
import { ProductState } from './store/products/products.state';
import { CustomComponentsModule } from 'projects/components/src/public-api';
import { CategoriesState } from './store/categories/categories.state';
import { FcmState } from './store/fcm/fcm.state';

registerLocaleData(localePT, 'pt');
registerLocaleData(localeEN, 'en');

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    IonicStorageModule.forRoot(),
    NgxsModule.forRoot([
      MedusaState,
      CustomerState,
      FormsState,
      AddressesState,
      CustomerRegisterState,
      ErrorsLoggingStateModule,
      ProductState,
      CartState,
      ShippingState,
      PaymentState,
      StrapiUserState,
      ThemeState,
      LanguageState,
      CategoriesState,
      FcmState
    ]),
    NgxsStoragePluginModule.forRoot({
      key: [
        'medusa',
        "addresses",
        'customer',
        'product',
        'forms',
        'errosLogging',
        'customerRegister',
        'cart',
        'shipping',
        'payment',
        'strapiUser',
        'language',
        'theme',
        "categories",
        "fcm"
      ]
    }),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: false
    }),
    NgxsLoggerPluginModule.forRoot({ disabled: true }),
    NgxStripeModule.forRoot(environment.STRIPE_KEY),
    ReactiveFormsModule,
    FormComponentsModule,
    CustomComponentsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'en' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StrapiAuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
