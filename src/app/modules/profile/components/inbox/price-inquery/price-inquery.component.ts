import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';
import { AnswerToComponent } from '../answer-to/answer-to.component';

@Component({
  selector: 'app-price-inquery',
  templateUrl: './price-inquery.component.html',
  styleUrls: ['./price-inquery.component.scss']
})
export class PriceInqueryComponent implements OnInit {

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

    this.getPriceInquerySentList();
    this.getPriceInqueryReceivedList();
  }

  getPriceInquerySentList() {
    this.loadingTable = true;
    this._profile.getPriceInquerySentList().subscribe(
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

  getPriceInqueryReceivedList() {
    this.loadingTable2 = true;
    this._profile.getPriceInqueryReceivedList().subscribe(
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

  isReadSeller(id) {
    this._profile.PriceInquerySellerRead(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.getPriceInquerySentList();
        this.getPriceInqueryReceivedList();
      }
    );
  }

  isReadApplicant(id) {
    this._profile.PriceInqueryApplicantRead(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.getPriceInquerySentList();
        this.getPriceInqueryReceivedList();
      }
    );
  }

  public openModal(id) {
    this.dialog.open(AnswerToComponent, { data: { name: 'priceInquery', id: id } });
  }

  displayStatus(event) {

  }

  editProduct() {

  }

}
