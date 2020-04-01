import { Component, OnInit } from '@angular/core';
// Services
import { GlobalService } from '../../../../services/global.service';
import 'owl.carousel';
import { SliderProductsService } from '../../services/slider-products.service';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss']
})
export class ProductsSliderComponent implements OnInit {

  public image_url: string;
  public sliderNewProducts: any[];
  public sliderNewProductsStatus = false;
  public sliderNewPersianProductsStatus = false;
  public sliderNewKnowledgebaseProductsStatus = false;
  public sliderNewPersianProducts: any[];
  public sliderNewKnowledgebaseProducts: any[];
  tabIndex = 1;

  constructor(private _global: GlobalService,
    private _sliderProducts: SliderProductsService,
    private _router: Router) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.loadSliderNewKnowledgebaseProducts();
    this.loadSliderNewPersianProducts();
    this.loadSliderNewProducts();
  }

  seller(id) {
    this._router.navigateByUrl('/seller/' + id);
  }

  loadSliderNewProducts() {
    this._sliderProducts.getNewProducts().subscribe(
      data => {
        this.sliderNewProducts = data;
        // console.log(data);
      },
      error => { },
      () => {
        this.sliderNewProductsStatus = true;
      }
    );
  }

  loadSliderNewPersianProducts() {
    this._sliderProducts.getNewPersianProducts().subscribe(
      data => {
        this.sliderNewPersianProducts = data;
        // console.log(this.sliderNewPersianProducts);
      },
      error => { },
      () => {
        this.sliderNewPersianProductsStatus = true;
      }
    );
  }

  loadSliderNewKnowledgebaseProducts() {
    this._sliderProducts.getNewKnowledgebaseProducts().subscribe(
      data => {
        this.sliderNewKnowledgebaseProducts = data;
        // console.log(this.sliderNewKnowledgebaseProducts);
      },
      error => { },
      () => {
        this.sliderNewKnowledgebaseProductsStatus = true;
      }
    );
  }

  productsCarousel() {
    $('.products-wrap').owlCarousel({
      items: 3,
      stagePadding: 10,
      dots: false,
      rtl: true,
      responsiveClass: true,
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1024: {
          items: 2,
        },
        1300: {
          items: 3,
        },
        1440: {
          items: 3,
        }
      }
    });
  }

  changeTab(num) {
    this.tabIndex = num;
  }

}
