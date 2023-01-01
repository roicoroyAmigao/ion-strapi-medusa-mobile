import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ColorsFormComponent } from 'projects/form-components/src/lib/components/colors-form/colors-form.component';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { ThemeActions } from 'src/app/store/theme/theme.actions';
import { TestSettingsFacade } from './test-settings.facade';

@Component({
  selector: 'app-test-settings',
  templateUrl: './test-settings.page.html',
  styleUrls: ['./test-settings.page.scss'],
})
export class TestSettingsPage {

  @ViewChild('colorsForm') colorsForm: ColorsFormComponent;

  viewState$: Observable<any>;

  constructor(
    private facade: TestSettingsFacade,
    private navigation: NavigationService,
    public store: Store,
  ) {

    // this.store.dispatch(new ThemeActions.GetTheme);

    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((vs: any) => {
    //   console.log(vs);
    // });
  }

  submitForm() {
    const theme = {
      data: {
        primary: this.colorsForm.primary ? this.colorsForm.primary : '#3880ff',
        secondary: this.colorsForm.secondary ? this.colorsForm.secondary : '#3dc2ff',
        tertiary: this.colorsForm.tertiary ? this.colorsForm.tertiary : '#5260ff',
      }
    }
    console.log(theme);
    // this.store.dispatch(new ThemeActions.PostUpdateTheme(theme));
  }

}
