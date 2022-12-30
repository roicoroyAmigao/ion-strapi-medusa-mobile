import { Component, Input } from '@angular/core';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
export interface ICategoriesList {
  id?: string,
  url?: string,
  title?: string,
  image?: string,
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: [
    './styles/categories.page.scss',
    './styles/categories.shell.scss',
    './styles/categories.responsive.scss'
  ]
})
export class CategoriesPage {
  @Input() categoriesData: any;

  constructor(
    private navigation: NavigationService,
) { }

  navigate(url: string) {
    console.log('navigate', url);
    this.navigation.navigateFlip(url);
  }
}
