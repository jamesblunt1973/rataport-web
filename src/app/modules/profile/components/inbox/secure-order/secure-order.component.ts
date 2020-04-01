import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';
import { SecureOrderPopupComponent } from '../secure-order-popup/secure-order-popup.component';

@Component({
  selector: 'app-secure-order',
  templateUrl: './secure-order.component.html',
  styleUrls: ['./secure-order.component.scss']
})
export class SecureOrderComponent implements OnInit {

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
    this.getSecureOrderSentList();
    this.getSecureOrderReceivedList();
  }

  getSecureOrderSentList() {
    this._profile.getSecureOrderSentList().subscribe(
      data => {
        console.log('secureOrderSentLists');
        console.log(data);
        this.orderSentLists = data;
      },
      error => { },
      () => { }
    );
  }

  getSecureOrderReceivedList() {
    this._profile.getSecureOrderReceivedList().subscribe(
      data => {
        console.log('secureOrderReceivedLists');
        console.log(data);
        this.orderReceivedLists = data;
      },
      error => { },
      () => { }
    );
  }

  public openModal(name: string, id: number) {
    this.dialog.open(SecureOrderPopupComponent, { data: { name: name, id: id } });
  }

}
