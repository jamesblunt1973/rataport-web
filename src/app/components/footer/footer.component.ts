import { Component, OnInit, Input } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() sitemapInfo: any[];
  @Input() footerinfo: any[];
  @Input() siteinfo: any[];

  constructor() { }

  public a = " پارادایم";
  public b = "http://www.paradaim.com";

  ngOnInit() {
    // console.log(this.siteinfo);
    // console.log(this.footerinfo);
  }

  goto() {
    jQuery('html, body').animate({ scrollTop: 0 }, 800);
  }

}
