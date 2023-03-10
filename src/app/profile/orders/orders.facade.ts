import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { StrapiUserState } from 'src/app/store/strapi-user/strapi-user.state';


@Injectable({
    providedIn: 'root'
})
export class OrdersFacade {

    @Select(CustomerState.getSession) session$: Observable<any>;

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    @Select(StrapiUserState.isLoggedIn) isUserLoggedIn$: Observable<any>;

    @Select(StrapiUserState.getUser) user$: Observable<any>;

    @Select(StrapiUserState.getAvatar) avatar$: Observable<any>;



    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.session$,
                this.customer$,
                this.isCustomerLoggedIn$,
                this.isUserLoggedIn$,
                this.user$,
                this.avatar$,
            ]
        ).pipe(
            map((
                [
                    session,
                    customer,
                    isCustomerLoggedIn,
                    isUserLoggedIn,
                    user,
                    avatar
                ]
            ) => ({
                session,
                customer,
                isCustomerLoggedIn,
                isUserLoggedIn,
                user,
                avatar
            }))
        );
    }
}
