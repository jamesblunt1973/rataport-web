import { Component, OnInit } from '@angular/core';
// Services
import { GlobalService } from '../../../../services/global.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  items = [1, 2, 3, 4, 5, 6, 7, 8];
  public image_url: string;
  public result: any[];
  public discounts: any[];
  public offers: any[];
  public requests: any[];
  public productStatus = false;

  constructor(private _global: GlobalService, private _category: CategoryService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.loadOfferInHome();
  }

  loadOfferInHome() {
    this._category.getProductInHome().subscribe(
      data => {
        this.result = data;
        // console.log(this.result);
        this.discounts = data['discounts'];
        this.offers = data['offers'];
        this.requests = data['requests'];
      },
      error => { },
      () => {
        this.productStatus = true;
      }
    );
  }

}
