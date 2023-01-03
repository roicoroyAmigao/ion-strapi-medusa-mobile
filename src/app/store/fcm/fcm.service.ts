import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { from, Observable } from "rxjs";

export interface IAppFcm {
    fcmToken?: string;
    fcmAccepted?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class FcmService {

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private store: Store,
        private httpClient: HttpClient,
    ) {

    }
    initFcm():Observable<any> {
        console.log('FCM Init');
        const user = this.store.selectSnapshot<any>((state) => state.strapiUser?.user);
        return from([user]);
    }
}
