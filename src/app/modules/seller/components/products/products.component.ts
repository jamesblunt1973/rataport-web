import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() products;
  public image_status = true;
  public image_url: string;

  constructor(private _global: GlobalService,
    private _route: Router) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() { }

  productDetail(id: number) {
    this._route.navigateByUrl('/products/detail/' + id);
  }

}
