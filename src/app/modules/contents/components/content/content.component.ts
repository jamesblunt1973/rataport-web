import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
// Services
import { SiteinfoService } from '../../../../services/siteinfo.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public pagesData: any;

  constructor(private _route: ActivatedRoute,
    private router: Router,
    private content: SiteinfoService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    const id = parseInt(this._route.snapshot.paramMap.get('id'), 10);
    this.loadPage(id);
  }

  loadPage(id) {
    this.content.getPage(id).subscribe(
      data => {
        this.pagesData = data;
      },
      error => { },
      () => { }
    );
  }

}
