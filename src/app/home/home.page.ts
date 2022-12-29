
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthRoutePath } from '../auth/route-path.enum';
import { AppAuthService } from 'projects/services/src/lib/services/auth.service';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { HomeFacade } from './home.facade';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HomePage {

    viewState$: Observable<any>;

    constructor(
        private navigation: NavigationService,
        private facade: HomeFacade,
        private auth: AppAuthService,
    ) { }
    ionViewWillEnter() {
        this.viewState$ = this.facade.viewState$;
    }
    enterTestPage() {
        this.navigation.navigateForward('/test', 'forward');
    }
    enterShop() {
        this.navigation.navigateForward('/shop/products-list', 'forward');
    }
    enterBlog() {
        this.navigation.navigateForward('/blog/strapi/news', 'forward');
    }
    home() {
        this.navigation.navigateForward('/home', 'forward');
    }
    login() {
        this.navigation.navControllerDefault(AuthRoutePath.login);
    }
    logout() {
        this.auth.logout();
    }
}