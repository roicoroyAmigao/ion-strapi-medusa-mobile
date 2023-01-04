import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { PaymentFacade } from './payment.facade';
import { Observable } from 'rxjs';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { UtilityService } from 'projects/services/src/lib/services/utility.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnDestroy {

  @ViewChild(StripePaymentElementComponent)

  paymentElement: StripePaymentElementComponent;

  elementsOptions: StripeElementsOptions;

  viewState$: Observable<any>;

  constructor(
    private stripeService: StripeService,
    private store: Store,
    private utility: UtilityService,
    private facade: PaymentFacade,
    private navigation: NavigationService,
  ) {
    this.viewState$ = this.facade.viewState$;
  }

  async confirm() {
    this.utility.presentLoading('...');
    return this.stripeService.confirmPayment({
      elements: this.paymentElement.elements,
      redirect: 'if_required'
    }).subscribe(async (result: any) => {
      if (result.error) {
        this.utility.dismissLoading();
        this.utility.showToast(result.error?.message, 'middle', 1500);
      }
      if (!result.error) {
        const cartId = await this.store.selectSnapshot<any>((state: any) => state.cart?.cartId);

        this.store.dispatch(new CartActions.CompleteCart(cartId));
        this.store.dispatch(new MedusaActions.LogOut());
        this.store.dispatch(new CartActions.LogOut());
        this.store.dispatch(new AddressesActions.LogOut());
        this.store.dispatch(new MedusaActions.UnSetSecretKey());
        this.store.dispatch(new CartActions.ClearIsGuest());

        this.utility.dismissLoading().then(() => this.navigateToReview());

      }
    });
  }
  navigateToReview() {
    this.navigation.navigateFlip('/checkout/flow/order-review');
  }
  back() {
    this.navigation.navigateFlip('checkout/flow/shipping');
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy() {
    // this.store.dispatch(new MedusaActions.UnSetSecretKey());
  }
}
