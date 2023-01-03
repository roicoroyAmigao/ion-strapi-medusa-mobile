import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { CounterInputComponent } from 'projects/components/src/lib/components/counter-input/counter-input.component';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { clearSelectedProduct } from 'src/app/store/products/products.actions';
import { ProductsListinFacade } from '../products-list/products-list.facade';
import { ProductDetailFacade } from './products-details.facade';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  @ViewChild('counterInput') counterInput: CounterInputComponent;


  viewState$: Observable<any>;

  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };

  productOptions: any = [];

  optionsVariants: any = [];

  productVariants: any = [];

  selectedOptionId: string;

  selectedVariantId: string;

  constructor(
    private store: Store,
    private navigation: NavigationService,
    private facade: ProductDetailFacade,
    public alertController: AlertController,
  ) { }

  ionViewWillEnter() {
    this.viewState$ = this.facade.viewState$;
    // this.productOptions = [];
    // this.viewState$.subscribe((state) => {
    //   // this.productOptions = state.selectedProduct.options;
    //   // console.log(state.selectedProduct.options);
    //   console.log(state.selectedProduct.variants);

    //   // this.productOptions = state.selectedProduct.options
    //   //   .map((item: any) => {
    //   //     const maped = {
    //   //       name: item.title,
    //   //       type: 'radio',
    //   //       label: item.title,
    //   //       value: item.id,
    //   //     };
    //   //     return maped;
    //   //   });
    // });
  }
  ngOnInit() {

  }
  onSelectChange(option: any) {
    // console.log(option);
    this.selectedOptionId = option.id;
    this.optionsVariants = [];
    this.selectedVariantId = '';
    this.optionsVariants = option;
    // console.log(this.optionsVariants);
    const selectedProduct = this.store.selectSnapshot<any>((state) => state.product.selectedProduct);
    // console.log('selectedProduct', selectedProduct);

    // this.viewState$.subscribe((state) => {
    //   this.optionsVariants = state.selectedProduct.variants;
    // });
  }
  onSelectOption(option: any) {
    console.log(option.variant_id);
    this.selectedVariantId = option.variant_id;
  }
  onSelectVariant(variantId: any) {
    console.log(variantId.variant_id);
    // this.optionsVariants = variantId;
    // this.selectedVariantId = '';
    this.selectedVariantId = variantId.variant_id;
    // // console.log(option);
    // this.selectedVariantId = '';
    // this.selectedVariantId = option.variant_id;
    // this.optionsVariants = [];
    // this.optionsVariants = $event.detail.value.values;
    // console.log(this.selectedVariantId);
  }
  addToCart() {
    const addToCart = {
      variant_id: this.selectedVariantId,
      quantity: this.counterInput?.counterValue
    };
    if (this.selectedVariantId && this.counterInput?.counterValue > 0) {
      console.log(addToCart);
      // console.log(this.selectedVariantId);
      // console.log(this.counterInput.counterValue);
    }

    // const cartId = this.store.selectSnapshot<any>((state) => state.cart?.cartId);
    // if (cartId != null && this.selectedVariantId != null) {
    //   this.store.dispatch(new CartActions.AddProductMedusaToCart(cartId, this.counterInput.counterValue, this.selectedVariantId));
    // } else {
    //   this.store.dispatch(new CartActions.CreateMedusaCart()).subscribe((state) => {
    //     this.store.dispatch(new CartActions.AddProductMedusaToCart(state.cart?.cartId, this.counterInput.counterValue, this.selectedVariantId));
    //   });
    // }
  }
  // async openProductsOtionsChooser() {
  //   const alert = await this.alertController.create({
  //     header: 'Options',
  //     inputs: this.productOptions,
  //     cssClass: 'variant-alert color-chooser',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'OK',
  //         handler: () => {
  //           console.log('Confirm Ok');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  navigateBack() {
    this.optionsVariants = [];
    this.navigation.navigateFlip('products-list');
    this.store.dispatch(new clearSelectedProduct());
  }
}
