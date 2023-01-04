import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartState } from 'src/app/store/cart/cart.state';
import { CategoriesState } from 'src/app/store/categories/categories.state';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { StrapiUserState } from 'src/app/store/strapi-user/strapi-user.state';

@Injectable({
    providedIn: 'root'
})
export class StartFacade {

    @Select(CartState.getCart) cart$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    @Select(StrapiUserState.isLoggedIn) isUserLoggedIn$: Observable<any>;

    @Select(StrapiUserState.getAvatar) avatar$: Observable<any>;


    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(StrapiUserState.getUser) user$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.cart$,
                this.isCustomerLoggedIn$,
                this.user$,
                this.customer$,
                this.isUserLoggedIn$,
                this.avatar$,
            ]
        ).pipe(
            map((
                [
                    cart,
                    isCustomerLoggedIn,
                    user,
                    customer,
                    isUserLoggedIn,
                    avatar
                ]
            ) => ({
                cart,
                isCustomerLoggedIn,
                user,
                customer,
                isUserLoggedIn,
                avatar
            }))
        );
    }
}
