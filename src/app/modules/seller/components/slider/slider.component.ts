import { Component, OnInit, Input } from '@angular/core';
// Slider
import 'owl.carousel';
import { GlobalService } from '../../../../services/global.service';
declare const $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() slides;
  public image_status = true;
  public image_url: string;

  constructor(private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
     
  }

  slide() {
    $('.sellerImgSlider').owlCarousel({
      items: 1,
      nav: false,
      navText: ['<i class="fa fa-angle-left"></id>', '<i class="fa fa-angle-right"></id>'],
      rtl: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      loop: true,
      dots: false,
      margin: 10
    });
  }

}
