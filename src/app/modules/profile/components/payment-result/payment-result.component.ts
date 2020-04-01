import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProfileService } from '../../services/profile.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResultComponent implements OnInit {

  public success: string;
  public result: string;
  public date: string;
  public refCode: string;
  public price: string;

  paymentResult = [];
  paymentResultStatus = false;

  constructor(private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private _profile: ProfileService,
    private _route: Router) {
    this.route.queryParams.subscribe(params => {
      this.success = params['success'];
      this.result = params['result'];
      this.date = params['date'];
      this.refCode = params['refCode'];
      this.price = params['price'];
      this.paymentResultStatus = true;
    });
  }

  ngOnInit() {
    console.log(this.success);
    console.log(this.result);
    console.log(this.date);
    console.log(this.refCode);
    console.log(this.price);
    // this.paymentVerification(this.authority);
  }

  // paymentVerification(authority) {
  //  this._profile.paymentVerification(authority).subscribe(
  //    data => {
  //      console.log(data);
  //      this.paymentResult = data;
  //      this.paymentResultStatus = true;
  //    },
  //    error => { },
  //    () => { }
  //  );
  // }

  onConfirm() {
    this._route.navigateByUrl('/profile/payment');
  }
}
