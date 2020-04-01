import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-tab-messengers',
  templateUrl: './tab-messengers.component.html',
  styleUrls: ['./tab-messengers.component.scss']
})
export class TabMessengersComponent implements OnInit {

  @Input() contactUs;
  public image_url: string;

  constructor(private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() { }

}
