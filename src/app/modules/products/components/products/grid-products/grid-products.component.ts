import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { GlobalService } from '../../../../../services/global.service';

@Component({
  selector: 'app-grid-products',
  templateUrl: './grid-products.component.html',
  styleUrls: ['./grid-products.component.scss']
})
export class GridProductsComponent implements OnInit {

  public image_url: string;
  @Input() products: any;
  constructor(private _global: GlobalService,
    private _router: Router,
  ) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
  }

  seller(id) {
    this._router.navigateByUrl('/seller/' + id);
  }

  productDetail(id: number) {
    this._router.navigateByUrl('/products/detail/' + id);
  }

  compareProducts(id: number) {
    this._router.navigateByUrl('/compare/' + id);
  }
}
