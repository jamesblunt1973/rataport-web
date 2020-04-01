import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-tab-contact-info',
  templateUrl: './tab-contact-info.component.html',
  styleUrls: ['./tab-contact-info.component.scss']
})
export class TabContactInfoComponent implements OnInit {

  @Input() contactUs;
  public image_url: string;

  constructor(private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() { }

}
