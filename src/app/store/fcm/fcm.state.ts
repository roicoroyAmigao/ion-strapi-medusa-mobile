import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { catchError, throwError } from 'rxjs';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { FcmActions } from './fcm.actions';
import { FcmService } from './fcm.service';

export class FcmStateModel {
    device_token: string;
    fcm_accepted: string;
}
@State<FcmStateModel>({
    name: 'fcm',
    defaults: {
        device_token: null,
        fcm_accepted: null,
    }
})
@Injectable()
export class FcmState {

    constructor(
        private fcmService: FcmService,
        private store: Store,
    ) { }

    @Action(FcmActions.GetFcmToken)
    getTheme(ctx: StateContext<FcmStateModel>) {
        const state = ctx.getState();
        this.fcmService.initFcm()
            .pipe(
                catchError((err: HttpErrorResponse) => throwError(() => {
                    this.store.dispatch(new LogErrorEntry(err));
                    return new Error(err.message)
                })),
            )
            .subscribe({
                next: (v: any) => {
                    ctx.patchState({
                        ...state,
                        device_token: v?.device_token,
                        fcm_accepted: v?.fcm_accepted,
                    });
                },
                error: (e: any) => {
                    console.error(e);
                },
            });
    }

}
