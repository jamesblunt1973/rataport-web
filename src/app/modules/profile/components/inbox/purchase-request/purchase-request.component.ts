import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProfileService } from '../../../services/profile.service';
import { GlobalService } from '../../../../../services/global.service';
import { OrderPopupComponent } from '../order-popup/order-popup.component';
import { PopupListProfileComponent } from '../../popup-list-profile/popup-list-profile.component';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.scss']
})
export class PurchaseRequestComponent implements OnInit {

  step = 0;
  image_url;
  public loading = true;
  public loadingTable = false;
  public loadingTable2 = false;
  public cols: any[];
  public products: any[];
  public products2: any[];

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.getPurchaseRequestSentList();
    this.getPurchaseRequestReceivedList();
  }

  getPurchaseRequestSentList() {
    this.loadingTable = true;
    this._profile.getPurchaseRequestSentList().subscribe(
      data => {
        this.products = data;
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.loadingTable = false;
      }
    );
  }


  getPurchaseRequestReceivedList() {
    this.loadingTable2 = true;
    this._profile.getPurchaseRequestReceivedList().subscribe(
      data => {
        this.products2 = data;
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.loadingTable2 = false;
      }
    );
  }

  public openModal(name: string, id: number) {
    this.dialog.open(PopupListProfileComponent, { data: { name: name, id: id } });
  }

  public openModalAnswer(name: string, id: number) {
    this.dialog.open(OrderPopupComponent, { data: { name: name, id: id } });
  }

}
