import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-colors-form',
  templateUrl: './colors-form.component.html',
  styleUrls: ['./colors-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorsFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ColorsFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsFormComponent implements OnInit, OnDestroy {

  colorsForm: FormGroup | any;

  radioColorForm: FormGroup;

  subscriptions: Subscription[] = [];

  onChange: any = () => { };
  onTouched: any = () => { };

  get value(): any {
    return this.colorsForm.value;
  }

  set value(value: any) {
    this.colorsForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  // get emailControl() {
  //   return this.colorsForm.controls.email;
  // }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.radioColorForm = new FormGroup({
      selected_color: new FormControl('#fc9961')
    });

    this.colorsForm = this.formBuilder.group({
      // email: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      // ])),
      // password: new FormControl('', Validators.compose([
      //   Validators.minLength(5),
      //   Validators.required,
      //   Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      // ])),
    });

    this.subscriptions.push(
      this.colorsForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() { }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
    if (value === null) {
      this.colorsForm.reset();
    }
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  validate(_: FormControl) {
    return this.colorsForm.valid ? null : { profile: { valid: false, }, };
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
