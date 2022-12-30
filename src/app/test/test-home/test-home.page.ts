import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-home',
  templateUrl: './test-home.page.html',
  styleUrls: ['./test-home.page.scss'],
})
export class TestHomePage implements OnInit {
  categoriesData = [
    {
      id: 1,
      url: 'news',
      title: 'News',
      image: 'assets/shapes.svg',
    },
    {
      id: 2,
      url: 'fashion',
      title: 'fashion',
      image: 'assets/shapes.svg',
    },
    {
      id: 3,
      url: 'deals',
      title: 'deals',
      image: 'assets/shapes.svg',
    }
  ]

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

}
