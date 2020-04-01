import { Component, OnInit, Input } from '@angular/core';
import 'owl.carousel';
import { GlobalService } from '../../../../../services/global.service';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss']
})
export class SimilarProductsComponent implements OnInit {

  @Input() products;
  image_url;

  constructor(private _global: GlobalService,
    private _router: Router) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    // console.log(this.products);
  }

  seller(id) {
    this._router.navigateByUrl('/seller/' + id);
  }

  carouselSimilarProducts() {
    $('.similar-products').owlCarousel({
      rtl: true,
      items: 4,
      stagePadding: 10,
      dots: true,
      responsiveClass: true,
      loop: false,
      margin: 15,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      // nav: true,
      // navText: ["<i class='fa fa-angle-left'></id>", "<i class='fa fa-angle-right'></id>"],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 3,
        },
        1300: {
          items: 4,
        },
        1440: {
          items: 4,
        }
      }
    });
  }
}
