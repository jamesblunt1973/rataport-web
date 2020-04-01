import { Component, OnInit } from '@angular/core';
// Services
import { CategoryService } from '../../services/category.service';
import { GlobalService } from '../../../../services/global.service';
// Slider
import 'owl.carousel';
declare const $: any;

@Component({
  selector: 'app-application-slider',
  templateUrl: './application-slider.component.html',
  styleUrls: ['./application-slider.component.scss']
})
export class ApplicationSliderComponent implements OnInit {

  public slides = [
    {
      src: '/public/images/mobile.png',
      title: 'اپلیکیشن‌ پیام رسان رتاپورت',
      description: 'به راحتی با هم در ارتباط باشید و لذت ببرید!'
    },
    {
      src: '/public/images/mobile.png',
      title: 'اپلیکیشن‌ خریدارها',
      description: ' محصولات تخفیف دار و ویژه را در کمترین زمان ممکن پیدا کنید و خرید کنید!'
    },
  ];
  public image_status = true;
  public image_url: string;
  public apps: any[];
  public sliderStatus = false;
  public loadStatus = false;

  constructor(private _global: GlobalService, private _category: CategoryService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.getApps();
  }

  slide() {
    $('.apps').owlCarousel({
      items: 1,
      nav: false,
      rtl: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      loop: true,
      dots: true,
      // dot: true,
      margin: 20
    });
  }


  getApps() {
    this._category.getApps().subscribe(
      data => {
        this.apps = data;
        if (this.apps.length > 0) {
          this.loadStatus = true;
        }
      },
      error => { },
      () => {
        this.sliderStatus = true;
      }
    );
  }

}
