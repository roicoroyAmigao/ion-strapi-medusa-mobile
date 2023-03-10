import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesState } from '../store/categories/categories.state';
import { CustomerState } from '../store/customer/customer.state';
import { StrapiUserState } from '../store/strapi-user/strapi-user.state';

@Injectable({
    providedIn: 'root'
})
export class HomeFacade {

    @Select(CategoriesState.getgetCategoreisTheme) categories$: Observable<any>;

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    @Select(StrapiUserState.isLoggedIn) isUserLoggedIn$: Observable<any>;

    @Select(StrapiUserState.getUser) user$: Observable<any>;

    @Select(StrapiUserState.getAvatar) avatar$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.categories$,
                this.customer$,
                this.isCustomerLoggedIn$,
                this.isUserLoggedIn$,
                this.user$,
                this.avatar$,
            ]
        ).pipe(
            map((
                [
                    categories,
                    customer,
                    isCustomerLoggedIn,
                    isUserLoggedIn,
                    user,
                    avatar
                ]
            ) => ({
                categories,
                customer,
                isCustomerLoggedIn,
                isUserLoggedIn,
                user,
                avatar
            }))
        );
    }
}
