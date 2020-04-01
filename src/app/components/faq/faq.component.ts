import { Component, OnInit, Input } from '@angular/core';
// Route
import { SiteinfoService } from '../../services/siteinfo.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  step = 0;
  public loading = false;
  items;

  constructor(private _siteinfo: SiteinfoService) { }

  ngOnInit() {
    this.getFees();
  }

  getFees() {
    this._siteinfo.getFees().subscribe(
      data => {
        this.items = data;
        console.log(data);
      },
      error => { },
      () => {
        this.loading = true;
      }
    );
  }

}
