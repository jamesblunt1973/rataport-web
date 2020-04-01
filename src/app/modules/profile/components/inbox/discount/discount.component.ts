import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';
import { OrderPopupComponent } from '../order-popup/order-popup.component';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  step = 0;
  image_url;
  public loading = true;
  public loadingTable = false;
  public cols: any[];
  public discounts: any[];

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
    this.getDiscountList();
  }

  getDiscountList() {
    this._profile.getDiscountList().subscribe(
      data => {
        console.log(data);
        this.discounts = data;
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => { }
    );
  }

}
