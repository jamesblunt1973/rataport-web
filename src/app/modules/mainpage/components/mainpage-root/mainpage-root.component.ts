import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderService } from '../../services/slider.service';
import { GlobalService } from '../../../../services/global.service';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-mainpage-root',
  templateUrl: './mainpage-root.component.html',
  styleUrls: ['./mainpage-root.component.scss']
})
export class MainpageRootComponent implements OnInit {


  public siteInfo1: any;
  public image_url: string;
  public status = false;

  constructor(private _route: Router, private _slider: SliderService, private _global: GlobalService
    ,private titleService: Title) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  
  ngOnInit() {
    this.SiteInfo1();
    //this.titleService.setTitle( "تست" );
  }

  SiteInfo1() {
    this._slider.getSiteInfo().subscribe(data => {
      this.siteInfo1 = data;
    },
      error => { },
      () => {
        this.status = true;
      });
  }

  brand() {
    this._route.navigateByUrl('/products/brands/list');
  }

  sign() {
    this._route.navigateByUrl('/fee');
  }

}
