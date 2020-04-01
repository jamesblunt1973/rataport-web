import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { GlobalService } from '../../../../../services/global.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  public image_url: string;
  @Input() products: any;
  constructor(private _global: GlobalService,
    private _route: Router) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
  }

  productDetail(id: number) {
    this._route.navigateByUrl('/products/detail/' + id);
  }

  compareProducts(id: number) {
    this._route.navigateByUrl('/compare/' + id);
  }

  seller(id) {
    this._route.navigateByUrl('/seller/' + id);
  }

}
