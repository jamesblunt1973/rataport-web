import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { SiteinfoService } from '../../../../services/siteinfo.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  public image_url = '';
  public sitemapinfo: any = [];
  public loadSitemapinfoStatus = false;

  constructor(private _global: GlobalService, private _siteinfo: SiteinfoService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.loadSitemapMenu();
  }

  loadSitemapMenu() {
    this._siteinfo.getSitemapInfo().subscribe(
      data => {
        this.sitemapinfo = data;
      },
      error => { },
      () => {
        this.loadSitemapinfoStatus = true;
      }
    );
  }

}
