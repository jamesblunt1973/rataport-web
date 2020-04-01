import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../../services/global.service';

@Component({
  selector: 'app-tab-detail',
  templateUrl: './tab-detail.component.html',
  styleUrls: ['./tab-detail.component.scss']
})
export class TabDetailComponent implements OnInit {

  @Input() productDetails;

  image_url: string;

  constructor(private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    // console.log(this.productDetails);
    // console.log(this.productDetails);
  }

}
