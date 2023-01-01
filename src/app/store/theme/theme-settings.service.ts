import { Injectable, Inject, Renderer2, RendererFactory2, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as Color from 'color';
import { firstValueFrom, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ThemeActions } from 'src/app/store/theme/theme.actions';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface AppTheme {
    primary?: string,
    secondary?: string,
    tertiary?: string,
    info?: string,
    success?: string,
    warning?: string,
    danger?: string,
    dark?: string,
    medium?: string,
    light?: string,
}

const defaults = {
    primary: '#3880ff',
    secondary: '#0cd1e8',
    tertiary: '#7044ff',
};
function CSSTextGenerator(colors: any) {
    colors = { ...defaults, ...colors };

    const {
        primary,
        secondary,
        tertiary,
    } = colors;

    const shadeRatio = 0.1;
    const tintRatio = 0.1;
    const shadowRatio = 0.5;

    return `
    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: 56,128,255;
    --ion-color-primary-contrast: ${contrast(primary)};
    --ion-color-primary-contrast-rgb: 255,255,255;
    --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
    --ion-color-primary-tint:  ${Color(primary).lighten(tintRatio)};
    --ion-color-primary-shadow:  ${Color(primary).lighten(shadeRatio)};

    --ion-color-secondary: ${secondary};
    --ion-color-secondary-rgb: 12,209,232;
    --ion-color-secondary-contrast: ${contrast(secondary)};
    --ion-color-secondary-contrast-rgb: 255,255,255;
    --ion-color-secondary-shade:  ${Color(secondary).darken(shadeRatio)};
    --ion-color-secondary-tint: ${Color(secondary).lighten(tintRatio)};
    --ion-color-secondary-shadow: ${Color(secondary).lighten(shadeRatio)};

    --ion-color-tertiary:  ${tertiary};
    --ion-color-tertiary-rgb: 112,68,255;
    --ion-color-tertiary-contrast: ${contrast(tertiary)};
    --ion-color-tertiary-contrast-rgb: 255,255,255;
    --ion-color-tertiary-shade: ${Color(tertiary).darken(shadeRatio)};
    --ion-color-tertiary-tint:  ${Color(tertiary).lighten(tintRatio)};
    --ion-color-tertiary-shadow:  ${Color(tertiary).lighten(shadowRatio)};
`;
}
function contrast(color: { isDark: () => any; lighten: (arg0: number) => any; darken: (arg0: number) => any; }, ratio = 0.8) {
    color = Color(color);
    return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    renderer: Renderer2;

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private renderFactory: RendererFactory2,
        @Inject(DOCUMENT) private document: Document,
        private store: Store,
        private httpClient: HttpClient,
    ) {
        this.renderer = this.renderFactory.createRenderer(null, null);
    }

    getAppTheme(): Observable<AppTheme> {

        return this.httpClient.get<AppTheme>(environment.BASE_PATH + '/api/app-infos?populate=*', { headers: this.headers });
    }
    postAppTheme(id: string, theme: AppTheme): Observable<AppTheme> {

        return this.httpClient.put<AppTheme>(environment.BASE_PATH + '/api/app-infos/' + id, theme, { headers: this.headers });
    }
    initTheme() {
        const theme: any = firstValueFrom(this.store.dispatch(new ThemeActions.GetTheme()));
        // console.log(theme.theme?.styles);
        this.store.dispatch(new ThemeActions.GetTheme());
        const styles = this.store.selectSnapshot<any>((state) => state.theme?.styles);
        // console.log('styles', styles);
        this.setTheme(styles);
    }

    setTheme(theme?: AppTheme) {
        const customColors = {
            primary: `${theme?.primary}`,
            secondary: `${theme?.secondary}`,
            tertiary: `${theme?.tertiary}`,
        };
        const cssText = CSSTextGenerator(customColors);
        // console.log(cssText)
        this.setGlobalCSS(cssText);
    }

    private setGlobalCSS(css: string) {
        this.document.documentElement.style.cssText = css;
    }

    enableDark() {
        this.renderer.addClass(this.document.body, 'dark-theme');
    }
    removeDark() {
        this.renderer.removeClass(this.document.body, 'dark-theme');
    }
}
