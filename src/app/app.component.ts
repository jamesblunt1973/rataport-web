import { Component, OnInit } from '@angular/core';
// Servicess
import { GlobalService } from './services/global.service';
import { SiteinfoService } from './services/siteinfo.service';
import { AuthService } from './services/auth.service';
import { Title } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public siteinfo: any[];
  public headerinfo: any[];
  public footerinfo: any[];
  public sitemapinfo: any[];
  public image_url: string;

  public loadSiteinfoStatus = false;
  public loadHeaderinfoStatus = false;
  public loadFooterinfoStatus = false;
  public loadSitemapinfoStatus = false;

  constructor(private _global: GlobalService,
    private _siteinfo: SiteinfoService,
    private _auth: AuthService,
    private titleService: Title ) {
    this.image_url = _global.BASE_IMAGE_API_URL;
    
  }

  ngOnInit() {
    this.loadSiteinfo();
    this.loadHeaderMenu();
    this.loadFooterMenu();
    this.loadSitemapMenu();
    // this.loadPermissions();
  }

  loadSiteinfo() {
    this._siteinfo.getInfo().subscribe(
      data => {
        this.siteinfo = data;
        // console.log(data);
      },
      error => { },
      () => {
        this.loadSiteinfoStatus = true;
      }
    );
  }

  loadHeaderMenu() {
    this._siteinfo.getHeaderInfo().subscribe(
      data => {
        this.headerinfo = data;
      },
      error => { },
      () => {
        this.loadHeaderinfoStatus = true;
      }
    );
  }
  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  loadFooterMenu() {
    this._siteinfo.getFooterInfo().subscribe(
      data => {
        this.footerinfo = data;
        // console.log(this.footerinfo);
      },
      error => { },
      () => {
        this.loadFooterinfoStatus = true;
      }
    );
  }

  loadSitemapMenu() {
    this._siteinfo.getSitemapInfo().subscribe(
      data => {
        this.sitemapinfo = data;
        // console.log(this.sitemapinfo);
      },
      error => { },
      () => {
        this.loadSitemapinfoStatus = true;
      }
    );
  }

  loadPermissions() {
    this._auth.packagePermissions().subscribe(
      data => {
        // console.log(data);
      },
      error => { },
      () => { }
    );
  }

}
