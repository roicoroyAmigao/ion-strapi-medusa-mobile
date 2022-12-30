import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CounterInputComponent } from 'projects/components/src/lib/components/counter-input/counter-input.component';
import { DataStore } from 'projects/components/src/lib/shell/data-store';
import { Observable } from 'rxjs';
import { FashionService } from '../fashion.service';

import { FashionDetailsModel } from './fashion-details.model';

@Component({
  selector: 'app-fashion-details',
  templateUrl: './fashion-details.page.html',
  styleUrls: [
    './styles/fashion-details.page.scss',
    './styles/fashion-details.shell.scss',
    './styles/fashion-details.ios.scss',
    './styles/fashion-details.md.scss'
  ]
})
export class FashionDetailsPage implements OnInit {

  @ViewChild('counterInput') counterInput: CounterInputComponent;

  details: FashionDetailsModel | any;
  colorVariants: any = [];
  sizeVariants: any = [];
  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };

  @HostBinding('class.is-shell') get isShell() {
    return (this.details && this.details.isShell) ? true : false;
  }

  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController,
    private fashionService: FashionService
  ) { }

  ngOnInit(): void {
    const dataSource: Observable<FashionDetailsModel> = this.fashionService.getDetailsDataSource();
    dataSource.subscribe((state) => {
      console.log(state);
      this.details = state;
      this.colorVariants = state.colorVariants
        .map((item: any) => {
          const maped = {
            name: item.name,
            type: 'radio',
            label: item.name,
            value: item.value,
            checked: item.default
          };
          return maped;
        });
      console.log(this.colorVariants);
      this.sizeVariants = state.sizeVariants
        .map(item =>
        ({
          name: item.name,
          type: 'radio',
          label: item.name,
          value: item.value,
          checked: item.default
        })
        );
      console.log(this.sizeVariants);
    });
  }
  addToCart() {
    console.log(this.counterInput.counterValue);
  }
  async openColorChooser() {
    const alert = await this.alertController.create({
      header: 'Color',
      inputs: this.colorVariants,
      cssClass: 'variant-alert color-chooser',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async openSizeChooser() {
    const alert = await this.alertController.create({
      header: 'Size',
      inputs: this.sizeVariants,
      cssClass: 'variant-alert size-chooser',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          handler: (selectedValue) => {
            console.log('Selected Value', selectedValue);
          }
        }
      ]
    });

    await alert.present();
  }
}
