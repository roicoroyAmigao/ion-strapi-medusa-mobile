import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProfileFormComponent } from 'projects/form-components/src/lib/components/profile-form/profile-form.component';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { StrapiUserActions } from '../store/strapi-user/strapi-user.actions';
import { ProfileFacade } from './profile.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('profileForm') profileForm: ProfileFormComponent;

  viewState$: Observable<any>;

  constructor(
    private store: Store,
    private navigation: NavigationService,
    private facade: ProfileFacade,
  ) {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((state) => {
    //   console.log(state);
    // });
  }

  ngOnInit() {
  }

  submitProfileForm() {
    console.log(this.profileForm.profileForm.get('avatar').value);

    // this.profileForm.submitForm();
    // const formData: FormData = this.profileForm.profileForm.get('avatar').value;
    // this.store.dispatch(new StrapiUserActions.UploadProfileImage(formData));
  }

}
