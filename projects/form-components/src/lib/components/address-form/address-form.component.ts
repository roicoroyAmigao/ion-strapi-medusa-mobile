import { Component, forwardRef, ChangeDetectionStrategy, OnInit, OnDestroy, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { fade } from "projects/services/src/lib/animations/animations";
import { Subscription, Observable, Subject } from "rxjs";
import { AddressesActions } from "src/app/store/addresses/addresses.actions";
import { TestAddressFacade } from "src/app/test/user/address.test-facade";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  animations: [fade()],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent implements OnInit, ControlValueAccessor, OnDestroy {

  adressForm: FormGroup | any;

  @Input() set vs(vs: any) {
    this.regionList = vs?.regionList;
    this.countryList = vs?.countryList;
  }
  regionList: any;
  countryList: any;

  onChange: any = () => { };
  onTouched: any = () => { };

  subscriptions: Subscription[] = [];

  private readonly ngUnsubscribe = new Subject();

  get value() {
    return this.adressForm.value;
  }
  set value(value: any) {
    this.adressForm?.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  get regionCodeControl() {
    return this.adressForm.get('region_code');
  }
  validation_messages = {
    'address_1': [
      { type: 'required', message: 'Name is required.' }
    ],
    'address_2': [
      { type: 'required', message: 'Name is required.' }
    ],
    'region_code': [
      { type: 'required', message: 'Name is required.' }
    ],
    'country': [
      { type: 'required', message: 'Name is required.' }
    ],
    'city': [
      { type: 'required', message: 'Name is required.' }
    ],
    'postal_code': [
      { type: 'required', message: 'Name is required.' }
    ],
    'phone': [
      { type: 'required', message: 'Name is required.' }
    ],

  };
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {
    this.adressForm = this.formBuilder.group({
      address_1: new FormControl('', Validators.required),
      address_2: new FormControl('', Validators.required),
      region_code: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
    this.subscriptions.push(
      this.adressForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  ngOnInit() {
    this.store.dispatch(new AddressesActions.GetRegionList());
  }
  async onRegionCodeChange(regionId?: string) {
    this.store.dispatch(new AddressesActions.GetCountries(regionId));
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
    if (value === null) {
      this.adressForm.reset();
    }
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  validate(_: FormControl) {
    // return this.adressForm.valid ? null : { passwords: { valid: false, }, };
  }
  reset() {
    this.adressForm.reset();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.subscriptions.forEach(s => s.unsubscribe());
    this.reset();
  }
}
