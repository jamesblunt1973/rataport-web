import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  step = 0;
  image_url;
  public loading = true;
  public loadingTable = false;
  public cols: any[];
  public payments: any[];
  public productName;
  public productCount;
  public unit;

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'paymentDate', header: 'paymentDate' },
      { field: 'price', header: 'price' },
      { field: 'refCode', header: 'refCode' },
      { field: 'status', header: 'status' },
      { field: 'targetID', header: 'targetID' }
    ];
    this.MyPayments();
  }

  MyPayments() {
    this._profile.MyPayments().subscribe(
      data => {
       
        this.payments = data;
      },
      error => { },
      () => { }
    );
  }

  PaymentDetails(id) {

    this.productName = '';
    this.productCount = '';

    this._profile.PaymentDetails(id).subscribe(
      data => {
        this.productName = data[0]['productName'];
        this.productCount = data[0]['productCount'];
        this.unit = data[0]['unit'];
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
       
      }
    );
  }
}
