import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';
import { AnswerToComponent } from '../answer-to/answer-to.component';

@Component({
  selector: 'app-negotiate',
  templateUrl: './negotiate.component.html',
  styleUrls: ['./negotiate.component.scss']
})
export class NegotiateComponent implements OnInit {

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

    this.getNegotiateSentList();
    this.getNegotiateReceivedList();
  }

  public openModal(id) {
    this.dialog.open(AnswerToComponent, { data: { name: 'negotiate', id: id } });
  }

  getNegotiateSentList() {
    this.loadingTable = true;
    this._profile.getNegotiateSentList().subscribe(
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

  getNegotiateReceivedList() {
    this.loadingTable2 = true;
    this._profile.getNegotiateReceivedList().subscribe(
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
    this._profile.negotiateSellerRead(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.getNegotiateReceivedList();
        this.getNegotiateSentList();
      }
    );
  }

  isReadApplicant(id) {
    this._profile.negotiateApplicantRead(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.getNegotiateReceivedList();
        this.getNegotiateSentList();
      }
    );
  }

}
