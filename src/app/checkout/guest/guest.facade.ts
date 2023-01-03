import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { CartState } from 'src/app/store/cart/cart.state';
import { ShippingState } from 'src/app/store/shipping/shipping.state';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { StrapiUserState } from 'src/app/store/strapi-user/strapi-user.state';


@Injectable({
    providedIn: 'root'
})
export class GuestFacade {

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    @Select(StrapiUserState.isLoggedIn) isUserLoggedIn$: Observable<any>;

    @Select(CartState.getCart) cart$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {

        this.viewState$ = combineLatest(
            [
                this.isCustomerLoggedIn$,
                this.isUserLoggedIn$,
                this.cart$,
            ]
        ).pipe(
            map(([
                isCustomerLoggedIn,
                isUserLoggedIn,
                cart
            ]) => ({
                isCustomerLoggedIn,
                isUserLoggedIn,
                cart
            }))
        );
    }
}
