import { Component, HostBinding } from '@angular/core';
import { Store } from '@ngxs/store';
import { DataStore } from 'projects/components/src/lib/shell/data-store';
import { Observable } from 'rxjs';
import { GetProductList } from 'src/app/store/products/products.actions';
import { FashionFacade } from '../fashion.facade';
import { FashionService } from '../fashion.service';

import { FashionListingModel } from './fashion-listing.model';

@Component({
  selector: 'app-fashion-listing',
  templateUrl: './fashion-listing.page.html',
  styleUrls: [
    './styles/fashion-listing.page.scss',
    './styles/fashion-listing.shell.scss'
  ]
})
export class FashionListingPage {
  listing: FashionListingModel | any;

  @HostBinding('class.is-shell') get isShell() {
    return (this.listing && this.listing.isShell) ? true : false;
  }
  dataStore$: DataStore<FashionListingModel>;

  viewState$: Observable<any>;

  constructor(
    private fashionService: FashionService,
    private store: Store,
    private facade: FashionFacade,
  ) {
    this.viewState$ = this.facade.viewState$;
    this.viewState$.subscribe((state) => {
      console.log(state.productList);
    });
    const dataSource: Observable<FashionListingModel> = this.fashionService.getListingDataSource();
    dataSource.subscribe((src) => {
      console.log(src);
      this.listing = src;
    });
  }
  ionViewWillEnter() {
    this.store.dispatch(new GetProductList());
  }
}
