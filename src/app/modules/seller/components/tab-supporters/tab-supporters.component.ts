import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-tab-supporters',
  templateUrl: './tab-supporters.component.html',
  styleUrls: ['./tab-supporters.component.scss']
})
export class TabSupportersComponent implements OnInit {
  @Input() supporters;
  public image_url: string;

  constructor(private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
  }

}
