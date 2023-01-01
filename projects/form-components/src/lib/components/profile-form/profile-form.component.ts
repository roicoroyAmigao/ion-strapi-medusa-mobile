import { Component, forwardRef, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface ProfileFormValues {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ProfileFormState {
  isUserLoggedIn: boolean;
  isCustomerLoggedIn: boolean;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: [
    './profile-form.component.scss',
    './styles/contact-card.page.scss',
    './styles/contact-card.shell.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent implements ControlValueAccessor, OnDestroy {

  @Input() set profileData(value: ProfileFormValues | any) {
    this._avatar = value.avatar ? value.avatar : 'assets/shapes.svg';
    this._isLoggedIn = value.isUserLoggedIn && value.isCustomerLoggedIn ? true : false;
  };
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  private _isLoggedIn: boolean;
  get avatar(): string {
    return this._avatar;
  }

  private _avatar: string;

  //
  profileForm: FormGroup | any;

  subscriptions: Subscription[] = [];

  onChange: any = () => { };
  onTouched: any = () => { };

  get value(): ProfileFormValues {
    return this.profileForm.value;
  }

  set value(value: ProfileFormValues) {
    this.profileForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get emailControl() {
    return this.profileForm.controls.email;
  }
  get usernameControl() {
    return this.profileForm.controls.username;
  }
  get firstNameControl() {
    return this.profileForm.controls.firstName
  }
  get lastNameControl() {
    return this.profileForm.controls.lastName;
  }
  get avatarControl() {
    return this.profileForm.controls.avatar;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.profileForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      avatar: new FormData(),
      phone: [''],
    });

    this.subscriptions.push(
      this.profileForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  public submitForm() {
    console.log(this.profileForm);
  }

  async onImagePicked(file: any) {
    const response = await fetch(file);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('files', blob, file.name);
    // this.uploadData(formData);
    this.profileForm.get('avatar').setValue(formData);

    return formData;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.profileForm.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.profileForm.valid ? null : { profile: { valid: false, }, };
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
