import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Store } from "@ngxs/store";
import { AppAuthService } from "projects/services/src/lib/services/auth.service";
import { NavigationService } from "projects/services/src/lib/services/navigation.service";
import { Observable } from "rxjs";
import { AuthRoutePath } from "src/app/auth/route-path.enum";
import { GuestComponent } from "../guest/guest.component";
import { StartFacade } from "./start.facade";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent {

  viewState$: Observable<any>;

  isLogged: boolean;

  constructor(
    private navigation: NavigationService,
    private facade: StartFacade,
    private store: Store,
    private auth: AppAuthService,
    private modalCtrl: ModalController,
  ) {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((state) => {
    //   console.log(state);
    // });
  }
  navigateBack() {
    this.navigation.navigateForward('/home', 'back');
  }
  cartReviewMedusa() {
    this.navigation.navigateForward('/checkout/flow/cart-review', 'forward');
  }
  addressesMedusa() {
    this.navigation.navigateForward('/checkout/flow/cart-addresses', 'forward');
  }
  loginMedusa() {
    this.navigation.navigateForward(AuthRoutePath.login, 'forward');
  }
  registerMedusa() {
    this.navigation.navigateForward(AuthRoutePath.user, 'forward');
  }
  async continueAsGuest() {
    const modal = await this.modalCtrl.create({
      component: GuestComponent,
      cssClass: 'guest-modal'
    });
    await modal.present();
    // const { data, role } = await modal.onDidDismiss();
    // // .then((res) => {
    // //   console.log(res);
    // //   // this.store.dispatch(new clearSelectedVariant());
    // // });
    // console.log(data, role);

    // this.navigation.navigateForward('/checkout/flow/guest', 'forward');
  }
  checkoutMedusa() {
    this.navigation.navigateForward('/checkout/flow/shipping', 'forward');
  }
  logoutUser() {
    this.auth.logoutUser();
  }
}
