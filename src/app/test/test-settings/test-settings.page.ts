import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ColorsFormComponent } from 'projects/form-components/src/lib/components/colors-form/colors-form.component';

@Component({
  selector: 'app-test-settings',
  templateUrl: './test-settings.page.html',
  styleUrls: ['./test-settings.page.scss'],
})
export class TestSettingsPage implements OnInit, AfterViewInit {

  @ViewChild('colorsForm') colorsForm: ColorsFormComponent;

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngAfterViewInit(): void {
    console.log(this.colorsForm);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }


}
