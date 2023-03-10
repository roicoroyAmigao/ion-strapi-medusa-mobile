import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { CartMenuComponent } from 'projects/components/src/lib/components/app-menu/cart-menu.component';
import { MedusaCartComponent } from 'projects/components/src/lib/components/medusa-cart/medusa-cart.component';
import { AppAuthService } from 'projects/services/src/lib/services/auth.service';
import { IonLanguageService } from 'src/app/store/language/language/language.service';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/store/theme/theme-settings.service';
import { AppFacade } from './app.facade';
import { clearSelectedProduct } from './store/products/products.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    'app.component.scss',
  ],

})
export class AppComponent {

  @ViewChild(MedusaCartComponent) medusaCartComponent: MedusaCartComponent;

  @ViewChild(CartMenuComponent) menuComponent: CartMenuComponent;

  viewState$: Observable<any>;

  constructor(
    private authService: AppAuthService,
    private ionLanguageService: IonLanguageService,
    public menu: MenuController,
    public store: Store,
    private platform: Platform,
    private theme: ThemeService,
    private facade: AppFacade,
  ) {
    this.initApp();
  }
  async initApp() {
    this.platform.ready().then(() => {
      this.viewState$ = this.facade.viewState$;
      this.ionLanguageService.initTranslate();
      this.theme.initTheme();
    });
  }
  checkout() {
    this.menu.toggle('end').then(() => {
      this.medusaCartComponent.goToCheckout();
      this.store.dispatch(new clearSelectedProduct());
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
