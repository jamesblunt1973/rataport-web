import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from '../../../../services/auth.service';
import { GlobalService } from '../../../../services/global.service';
import { OffersService } from '../../offers.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  searchItem = '';
  step = 0;
  image_url;
  public loading = true;
  public indexSelected = 0;
  public cols: any[];
  public requests: any[];
  public offers: any[];
  public discounts: any[];
  public specialMember =false;

  constructor(
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _offer: OffersService,
    private router: Router,
    private _route: ActivatedRoute,
    private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {

    this.getSuggestionList();
   
  }

  getDiscountList(text) {
    this._offer.getDiscountList(text).subscribe(
      data => {
        this.discounts = data;
        console.log(this.discounts);
      },
      error => { },
      () => {
        this.loading = false;
      }
    );
  }

  getOfferList(text) {
    this._offer.getOfferList(text).subscribe(
      data => {
        this.offers = data;
        console.log(this.offers);
      },
      error => { },
      () => {
        this.loading = false;
      }
    );
  }

  getPurchaseRequestList(text) {
    this._offer.getPurchaseRequestList(text).subscribe(
      data => {
        this.requests = data;
        console.log(this.requests);
      },
      error => { },
      () => {
        this.loading = false;
      }
    );
  }

  getSuggestionList() {
    this._offer.getSuggestionList().subscribe(
      data => {
        console.log(data);
        this.requests = data['requests'];
        this.offers = data['offers'];
        this.discounts = data['discounts'];

        this.specialMember = data['specialMember'];
      },
      error => { },
      () => {
        this.searchItem = JSON.parse(sessionStorage.getItem('searchItem'));
        sessionStorage.removeItem('searchItem');

        if (this.searchItem !== null) {
          switch (this.searchItem['type']) {
            case 'discount': {
              this.getDiscountList(this.searchItem['data']);
              this.indexSelected = 2;
              break;
            }
            case 'offer': {
              this.getOfferList(this.searchItem['data']);
              this.indexSelected = 1;
              break;
            }
            case 'requsetBuy': {
              this.getPurchaseRequestList(this.searchItem['data']);
              this.indexSelected = 0;
              break;
            }
            default: {
              break;
            }
          }
        }
        this.loading = false;
      }
    );
  }

}
