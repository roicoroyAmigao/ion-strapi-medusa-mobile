import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@capacitor/device';
import { LanguageModel } from './language.model';
import { IonStorageService } from '../../../../../projects/services/src/lib/services/ionstorage.service';
import { Store } from '@ngxs/store';
import { LanguageActions } from 'src/app/store/language/language.actions';
import { BehaviorSubject, of } from 'rxjs';
export const SAVED_LANGUAGE = 'saved_language';

// export interface IAvailableLanguages {
//   name: string;
//   code: string;
// }

@Injectable({
  providedIn: 'root'
})
export class IonLanguageService {
  languages: Array<LanguageModel> = new Array<LanguageModel>();

  public availableLanguages$ = new BehaviorSubject<LanguageModel[]>(null);

  constructor(
    public translate: TranslateService,
    private store: Store,
  ) { }

  getLanguages(): any {
    this.languages = [];
    this.languages.push(
      { name: 'English', code: 'en' },
      { name: 'Portuguese', code: 'pt' },
    );
    // return this.availableLanguages$.next(this.languages);
    return of(this.languages);
  }

  async initTranslate() {
    const language = await Device.getLanguageCode();
    const device = await Device.getInfo();
    // const getLanguageTag = await Device.getLanguageTag();
    // console.log("language", language);
    // console.log("device", device);
    // console.log("getLanguageTag", getLanguageTag);
    const deviceLanguage = await this.shortLanguage(language);
    const useLang = deviceLanguage.match(/en|pt/) ? deviceLanguage : 'en';
    if (useLang) {
      this.store.dispatch(new LanguageActions.SetLanguageDeviceInfo(useLang, device));
      setTimeout(async () => {
        const lang = this.store.selectSnapshot<any>((state) => state.language.language);
        // console.log(lang);
        if (lang && lang !== undefined) {
          await this.translate.use(lang);
          this.store.dispatch(new LanguageActions.SetLanguageDeviceInfo(lang, device));
        } else {
          await this.translate.use(useLang);
          await this.store.dispatch(new LanguageActions.SetLanguageDeviceInfo(useLang, device));
        }
      }, 100);
    }
  }
  async shortLanguage(language: any) {
    if (language) {
      const short = language.value.split('-');
      return await short[0];
    }
  }
}
