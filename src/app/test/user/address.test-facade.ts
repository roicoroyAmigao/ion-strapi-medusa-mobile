import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressesState } from 'src/app/store/addresses/addresses.state';
import { CustomerState } from 'src/app/store/customer/customer.state';

@Injectable({
    providedIn: 'root'
})
export class TestAddressFacade {

    @Select(AddressesState.getRegionList) regionList$: Observable<any> | any;

    @Select(AddressesState.getCountryList) countryList$: Observable<any> | any;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.regionList$,
                this.countryList$
            ]
        ).pipe(
            map((
                [
                    regionList,
                    countryList = 1

                ]
            ) => ({
                regionList,
                countryList
            }))
        );
    }
}
