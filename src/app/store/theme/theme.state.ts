import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { ThemeService } from 'src/app/store/theme/theme-settings.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { ThemeActions } from './theme.actions';

export class ThemeStateModel {
    styles: ThemeService;
}
@State<ThemeStateModel>({
    name: 'theme',
    defaults: {
        styles: null,
    }
})
@Injectable()
export class ThemeState {

    constructor(
        private themeService: ThemeService,
        private store: Store,
    ) { }

    @Selector()
    static getTheme(state: ThemeStateModel) {
        return state.styles;
    }

    @Action(ThemeActions.GetTheme)
    getTheme(ctx: StateContext<ThemeStateModel>) {
        const state = ctx.getState();
        // console.log("payload", payload);
        this.themeService.getAppTheme()
            .pipe(
                catchError((err: HttpErrorResponse) => throwError(() => {
                    this.store.dispatch(new LogErrorEntry(err));
                    return new Error(err.message)
                })),
            )
            .subscribe({
                next: (v: any) => {
                    return ctx.patchState({
                        ...state,
                        styles: v.data?.attributes,
                    });
                },
                error: (e: any) => {
                    console.error(e);
                },
                complete: () => console.info('complete')
            });
    }

    @Action(ThemeActions.SetTheme)
    setTheme(ctx: StateContext<ThemeStateModel>, { theme }: ThemeActions.SetTheme) {
        const state = ctx.getState();
        ctx.patchState({
            ...state,
            styles: theme,
        });
    }

    @Action(ThemeActions.PostUpdateTheme)
    postUpdateTheme(ctx: StateContext<ThemeStateModel>, { theme }: ThemeActions.PostUpdateTheme) {
        const state = ctx.getState();
        console.log(theme);
        this.themeService.postAppTheme(theme)
            .pipe(
                catchError((err: HttpErrorResponse) => throwError(() => {
                    this.store.dispatch(new LogErrorEntry(err));
                    return new Error(err.message)
                })),
            )
            .subscribe({
                next: (v: any) => {
                    return ctx.patchState({
                        ...state,
                        styles: v.data?.attributes,
                    });
                },
                error: (e: any) => {
                    console.error(e);
                },
                complete: () => {
                    this.themeService.initTheme();
                    console.info('complete');
                }
            });
    }


}
