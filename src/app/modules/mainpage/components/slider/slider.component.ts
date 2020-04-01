import { Component, OnInit } from '@angular/core';
import 'owl.carousel';
// Services
import { SliderService } from '../../services/slider.service';
import { GlobalService } from '../../../../services/global.service';
declare const $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  public image_url: string;
  public sliders: any[];
  public sliderStatus = false;

  constructor(private _slider: SliderService, private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.loadSliders();
  }

  loadSliders() {
    this._slider.getSliders().subscribe(
      data => {
        this.sliders = data;
      },
      error => { },
      () => {
        this.sliderStatus = true;
      }
    );
  }

  callOwlCarousel() {
    $('.products-wrap').owlCarousel({
      items: 1,
      // nav: true,
      navText: ['<i class="fa fa-angle-left"></id>', '<i class="fa fa-angle-right"></id>'],
      rtl: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      loop: true,
      margin: 0,
    });
  }

}
