import { Component, OnInit, Input } from '@angular/core';
// Slider
import 'owl.carousel';
import { GlobalService } from '../../../../services/global.service';
declare const $: any;

@Component({
  selector: 'app-followers-slider',
  templateUrl: './followers-slider.component.html',
  styleUrls: ['./followers-slider.component.scss']
})
export class FollowersSliderComponent implements OnInit {

  @Input() followers;
  public image_status = true;
  public image_url: string;

  constructor(private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
  }

  // slide() {
  //   $('.followers').owlCarousel({
  //     items: 1,
  //     nav: false,
  //     navText: ['<i class="fa fa-angle-left"></id>', '<i class="fa fa-angle-right"></id>'],
  //     rtl: true,
  //     autoplay: true,
  //     autoplayTimeout: 3000,
  //     autoplayHoverPause: true,
  //     loop: true,
  //     dots: true,
  //     margin: 10
  //   });
  // }

}
