import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pre-factor',
  templateUrl: './pre-factor.component.html',
  styleUrls: ['./pre-factor.component.scss']
})
export class PreFactorComponent implements OnInit {

  orderid;
  loadPreFactorStatus = false;
  prefactor;
  refId;

  public discount;
  public prices;
  public total;

  constructor(private _factor: ProductService,
    private _auth: AuthService,
    private _location: Location,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.orderid = parseInt(this._route.snapshot.paramMap.get('orderid'), 10);
    this.getPreFactor(this.orderid);
  }

  backClicked() {
    this._location.back();
  }

  getPreFactor(id: number) {
    this._factor.getPreFactor(id).subscribe(
      data => {
        this.prefactor = data;

        this.discount = this.prefactor['unitPrice'] * this.prefactor['count'] - this.prefactor['prices'];
        this.prices = this.prefactor['unitPrice'] * this.prefactor['count'];

        this.total = this.prices - this.discount;
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.loadPreFactorStatus = true;
      }
    );
  }

  orderPaymentCreate() {
    this._factor.orderPaymentCreate(this.orderid).subscribe(data => {
      this.refId = data;
    },
      error => { },
      () => {
        this._factor.orderPayment(this.refId.result);
      });
  }

  pay() {
    this.orderPaymentCreate();
  }
}
