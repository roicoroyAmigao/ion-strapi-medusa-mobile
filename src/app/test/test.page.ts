import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(
    private navigation: NavigationService
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  userCase() {
    this.navigation.navigateFlip('test/user');
  }
  formCase() {
    this.navigation.navigateFlip('test/form');
  }
  fashionPage() {
    this.navigation.navigateFlip('test/fashion');
  }
  testHomePage() {
    this.navigation.navigateFlip('test/test-home');
  }
  testProfilePage() {
    this.navigation.navigateFlip('test/test-profile');
  }
  testSettingsPage() {
    this.navigation.navigateFlip('test/test-settings');
  }
}
