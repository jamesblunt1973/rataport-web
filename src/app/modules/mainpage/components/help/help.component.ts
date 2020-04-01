import { Component, OnInit } from '@angular/core';
// Services
import { GlobalService } from '../../../../services/global.service';
import { HelpUserService } from '../../services/help-user.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  step = 0;
  public loadHelpStatus = false;
  public image_url: string;
  public helpData: any[];
  tabIndex = 1;
  helpContent: any[] = [
    { tabIndex: '1' },
    { tabIndex: '2' },
    { tabIndex: '3' },
    { tabIndex: '4' },
    { tabIndex: '5' }
  ];

  constructor(private _global: GlobalService, private _help: HelpUserService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.loadHelpData();
  }

  changeTab(num: number) {
    this.tabIndex = num;
  }

  loadHelpData() {
    this._help.getHelpData().subscribe(
      data => {
        this.helpData = data;
        // console.log(this.helpData);
      },
      error => { },
      () => {
        this.loadHelpStatus = true;
      }
    );
  }

}
