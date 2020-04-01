import { Component, OnInit, Input } from '@angular/core';
// Services
import { GlobalService } from '../../../../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-seller',
  templateUrl: './grid-seller.component.html',
  styleUrls: ['./grid-seller.component.scss']
})
export class GridSellerComponent implements OnInit {

  public image_url: string;
  @Input() sellers: any;
  constructor(private _global: GlobalService,
    private _route: Router) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() { }

  sellerDetail(id: number) {
    this._route.navigateByUrl('/seller/' + id);
  }

}
