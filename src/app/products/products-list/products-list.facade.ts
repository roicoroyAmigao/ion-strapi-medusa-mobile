import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { ProductState } from 'src/app/store/products/products.state';
import { StrapiUserState } from 'src/app/store/strapi-user/strapi-user.state';

@Injectable({
    providedIn: 'root'
})
export class ProductsListinFacade {

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    @Select(StrapiUserState.isLoggedIn) isUserLoggedIn$: Observable<any>;

    @Select(StrapiUserState.getUser) user$: Observable<any>;

    @Select(ProductState.getSelectedVariant) selectedVariant$: Observable<any>;

    @Select(ProductState.getProductList) productList$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.isCustomerLoggedIn$,
                this.isUserLoggedIn$,
                this.user$,
                this.selectedVariant$,
                this.productList$,
            ]
        ).pipe(
            map((
                [
                    customer,
                    isCustomerLoggedIn,
                    isUserLoggedIn,
                    user,
                    selectedVariant,
                    productList,
                ]
            ) => ({
                customer,
                isCustomerLoggedIn,
                isUserLoggedIn,
                user,
                selectedVariant,
                productList,
            }))
        );
    }
}
