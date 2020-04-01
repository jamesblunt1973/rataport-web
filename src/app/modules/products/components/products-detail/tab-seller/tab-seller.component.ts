import { Component, OnInit, Input } from '@angular/core';
// Slider
import 'owl.carousel';
import { GlobalService } from '../../../../../services/global.service';
declare const $: any;

@Component({
  selector: 'app-tab-seller',
  templateUrl: './tab-seller.component.html',
  styleUrls: ['./tab-seller.component.scss']
})
export class TabSellerComponent implements OnInit {

  public image_status = true;
  public image_url: string;
  sliders = [1, 2, 3, 4, 5, 6];
  @Input() seller;

  constructor(private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    // console.log(this.seller);
  }

  slide() {
    $('.sellerImg').owlCarousel({
      items: 1,
      nav: false,
      navText: ['<i class="fa fa-angle-left"></id>', '<i class="fa fa-angle-right"></id>'],
      rtl: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      loop: true,
      dots: true,
      margin: 10
    });
  }

}
