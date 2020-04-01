import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-tab-members',
  templateUrl: './tab-members.component.html',
  styleUrls: ['./tab-members.component.scss']
})
export class TabMembersComponent implements OnInit {

  @Input() team;
  public image_url: string;

  constructor(private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
  }

}
