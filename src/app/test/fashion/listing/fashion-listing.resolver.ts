import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FashionService } from '../fashion.service';
import { FashionListingModel } from './fashion-listing.model';
import { combineLatest, map, Observable } from 'rxjs';
import { DataStore } from 'projects/components/src/lib/shell/data-store';
import { FashionFacade } from '../fashion.facade';

@Injectable()
export class FashionListingResolver implements Resolve<any> {

  constructor(
    private fashionService: FashionService,
    private facade: FashionFacade,
  ) { }

  resolve() {
    const dataSource: Observable<FashionListingModel> = this.fashionService.getListingDataSource();
    const dataStore: DataStore<FashionListingModel> = this.fashionService.getListingStore(dataSource);
    const viewState: Observable<any> = this.facade.viewState$;

    // const myData = combineLatest(
    //   [
    //     dataStore,
    //     viewState
    //   ]
    // ).pipe(
    //   map((
    //     [
    //       dataStore,
    //       viewState = null
    //     ]
    //   ) => ({
    //     dataStore,
    //     viewState
    //   }))
    // );

    return viewState;
  }
}
