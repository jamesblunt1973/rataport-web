import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-tab-collection-information',
  templateUrl: './tab-collection-information.component.html',
  styleUrls: ['./tab-collection-information.component.scss']
})
export class TabCollectionInformationComponent implements OnInit {

  @Input() collectionInformation;
  @Input() slider;
  public image_url: string;

  constructor(private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    // console.log(this.slider);
  }

}
