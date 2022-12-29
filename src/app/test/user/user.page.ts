import { Component, ViewChild } from '@angular/core';
import { AddressFormComponent } from 'projects/form-components/src/lib/components/address-form/address-form.component';
import { LoginFormComponent } from 'projects/form-components/src/lib/components/login-form/login-form.component';
import { PasswordFormComponent } from 'projects/form-components/src/lib/components/password-form/password-form.component';
import { UserFormComponent } from 'projects/form-components/src/lib/components/user-form/user-form.component';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { TestAddressFacade } from './address.test-facade';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {

  @ViewChild('userForm') userForm: UserFormComponent;

  @ViewChild('addressForm') addressForm: AddressFormComponent;

  @ViewChild('loginForm') loginForm: LoginFormComponent;

  @ViewChild('passwordForm') passwordForm: PasswordFormComponent;

  viewState$: Observable<any>;

  constructor(
    private navigation: NavigationService,
    private facade: TestAddressFacade
  ) {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((state) => {
    //   console.log(state);
    // });
  }
  ionViewDidEnter() {
    if (this.loginForm) {
      this.loginForm.loginForm.get('email').setValue('roicoroy@yahoo.com.br');
      this.loginForm.loginForm.get('password').setValue('Rwbento123!');
    }
    if (this.userForm) {
      this.userForm.userForm.get('username').setValue('rocio');
      this.userForm.userForm.get('first_name').setValue('Rocio');
      this.userForm.userForm.get('last_name').setValue('de Oliveira');
      this.userForm.userForm.get('email').setValue('rocio@test.com');
      this.userForm.userForm.get('phone').setValue('+4407510998877');
      this.userForm.userForm.get('matching_passwords').get('password').setValue('Rwbento123');
      this.userForm.userForm.get('matching_passwords').get('confirm_password').setValue('Rwbento123');
    }

  }
  submitUserForm() {
    console.log(this.userForm.userForm.get('username').value);
    console.log(this.userForm.userForm.get('first_name').value);
    console.log(this.userForm.userForm.get('last_name').value);
    console.log(this.userForm.userForm.get('email').value);
    console.log(this.userForm.userForm.get('phone').value);
    console.log(this.userForm.userForm.get('matching_passwords').value);
    console.log(this.userForm.userForm.get('matching_passwords').value);
  }
  submitAddressForm() {
    console.log(this.addressForm.adressForm.get('address_1').value);
    console.log(this.addressForm.adressForm.get('address_2').value);
    console.log(this.addressForm.adressForm.get('region_code').value);
    console.log(this.addressForm.adressForm.get('country').value);
    console.log(this.addressForm.adressForm.get('city').value);
    console.log(this.addressForm.adressForm.get('postal_code').value);
    console.log(this.addressForm.adressForm.get('phone').value);
  }
  submitLoginForm() {
    console.log(this.loginForm.loginForm.get('email').value);
    console.log(this.loginForm.loginForm.value.email);
    console.log(this.loginForm.loginForm.get('password').value);
    console.log(this.loginForm.loginForm.value.password);
  }
  submitPassowordForm() {
    console.log(this.passwordForm.passwordForm.get('password').value);
    console.log(this.passwordForm.passwordForm.value.password);
    console.log(this.passwordForm.passwordForm.get('confirmPassword').value);
    console.log(this.passwordForm.passwordForm.value.confirmPassword);
  }

  back() {
    this.navigation.navigateFlip('test');
  }

}
