import { Component, OnInit, Input } from '@angular/core';
// Slider
import 'owl.carousel';
import { GlobalService } from '../../../../services/global.service';
declare const $: any;

@Component({
  selector: 'app-transactions-seller',
  templateUrl: './transactions-seller.component.html',
  styleUrls: ['./transactions-seller.component.scss']
})
export class TransactionsSellerComponent implements OnInit {

  @Input() deals;
  public image_status = true;
  public image_url: string;

  constructor(private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    console.log(this.deals);
  }

  slide2() {

    $('.transactions').owlCarousel({
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
