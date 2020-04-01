import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { SiteinfoService } from '../../../../services/siteinfo.service';

@Component({
  selector: 'app-root-contents',
  templateUrl: './root-contents.component.html',
  styleUrls: ['./root-contents.component.scss']
})
export class RootContentsComponent implements OnInit {

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
