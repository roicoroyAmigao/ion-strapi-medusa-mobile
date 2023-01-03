import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { ProductDetailFacade } from '../product-details/products-details.facade';

@Component({
  selector: 'app-variant-modal',
  templateUrl: './variant-modal.component.html',
  styleUrls: ['./variant-modal.component.scss'],
})
export class VariantModalComponent {

  @Input() variant: any;

  viewState$: Observable<any>;

  min = 1;
  max = 10;
  step = 1;

  counterValue: number | any;
  get counter() {
    return this.counterValue;
  }

  constructor(
    private modalCtrl: ModalController,
    private facade: ProductDetailFacade,
    private store: Store,
  ) {
    this.viewState$ = this.facade.viewState$;
  }

  ionViewWillEnter() {
    this.counterValue = this.min;
  }

  addToCart() {
    const cartId = this.store.selectSnapshot<any>((state) => state.cart?.cartId);
    if (cartId != null && this.variant != null) {
      this.store.dispatch(new CartActions.AddProductMedusaToCart(cartId, this.counterValue, this.variant?.id));
      this.dismiss();
    } else {
      this.store.dispatch(new CartActions.CreateMedusaCart()).subscribe((state) => {
        this.store.dispatch(new CartActions.AddProductMedusaToCart(state.cart?.cartId, this.counterValue, this.variant?.id));
        this.dismiss();
      });
    }
  }

  increment() {
    if (this.counterValue < this.max) {
      this.counterValue = this.counterValue + this.step;
    }
  }

  decrement() {
    if (this.counterValue > this.min) {
      this.counterValue = this.counterValue - this.step;
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

}
