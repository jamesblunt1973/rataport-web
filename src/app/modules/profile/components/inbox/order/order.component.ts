import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';
import { OrderPopupComponent } from '../order-popup/order-popup.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  step = 0;
  image_url;
  public loading = true;
  public loadingTable = false;
  public loadingTable2 = false;
  public cols: any[];
  public orderSentLists: any[];
  public orderReceivedLists: any[];
  public recieveProduct = false;

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
      { field: 'productName', header: 'productName' },
      { field: 'brand', header: 'brand' },
      { field: 'count', header: 'count' },
      { field: 'createdOn', header: 'createdOn' },
      { field: 'productID', header: 'productID' },
      { field: 'priceReceived', header: 'priceReceived' },
      { field: 'price', header: 'price' },
      { field: 'answer', header: 'answer' },
    ];
    this.getOrderSentList();
    this.getOrderReceivedList();
  }

  getOrderSentList() {
    this._profile.getOrderSentList().subscribe(
      data => {
        console.log('orderSentLists');
        console.log(data);
        this.orderSentLists = data;
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => { }
    );
  }

  getOrderReceivedList() {
    this._profile.getOrderReceivedList().subscribe(
      data => {
        console.log('orderReceivedLists');
        console.log(data);
        this.orderReceivedLists = data;
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => { }
    );
  }

  public openModal(name: string, id: number) {
    this.dialog.open(OrderPopupComponent, { data: { name: name, id: id } });
  }

  isReadSeller(id) {
    this._profile.orderSellerRead(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.getOrderReceivedList();
      }
    );
  }

  isReadApplicant(id) {
    this._profile.orderApplicantRead(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.getOrderSentList();
      }
    );
  }
}
