import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
// Route
import { Router } from '@angular/router';
import { LogInComponent } from '../../share/share-components';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../modules/profile/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchItem = '';
  searchItemObject = {
    type: 'product',
    data: this.searchItem
  };
  temp: any[] = [];
  discount: any[] = [];
  offer: any[] = [];
  product: any[] = [];
  request: any[] = [];
  seller: any[] = [];

  searchItems: string[] = [];
  filteredSearchItem: any[];
  item: string;
  totalSearchItems: any[] = [{ list: [], kind: '' }];

  @Input() menuItems: any[];
  @Input() siteinfo: any[];
  display: boolean;
  display_right: boolean;
  searchType = 'product';
  // Popup
  popup = false;
  exact: boolean;
  public loggedIn = false;
  public userStatus = false;
  public user = [];
  email = 'info@rataport.com';
  tel = '05832230802';

  public configModal = {
    ignoreBackdropClick: false
  };

  mainmenu: any[];

  constructor(private _route: Router,
    private _auth: AuthService,
    private _profile: ProfileService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getBaseDataForSearch();
    this.loggedIn = this._auth.checkLogin();
    if (this._auth.checkLogin()) {
      this.getUserData();
    }
    // this.email = this.siteinfo['email1'];
    // this.tel = this.siteinfo['tel1'];
  }

  onNotifyClicked(status: boolean): void {
    this.popup = status;
  }

  public openModal() {
    this.dialog.open(LogInComponent);
  }

  public openModal2() {
    this.display_right = false;
    this.dialog.open(LogInComponent);
  }

  public openPopUp() {
    this.popup = true;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('noscroll');   // add the class
  }

  requsetBuy() {
    if (this._auth.checkLogin()) {
      this._route.navigateByUrl('/request');
    } else {
      this.openModal();
    }
  }

  secureOrder() {
    if (this._auth.checkLogin()) {

      this._route.navigateByUrl('/secureOrder');
    } else {
      this.openModal();
    }
  }

  secureOrder2() {
    if (this._auth.checkLogin()) {
      this.display_right = false;
      this._route.navigateByUrl('/secureOrder');
    } else {
      this.display_right = false;
      this.dialog.open(LogInComponent);
     
    }
  }

  getUserData() {
    this._profile.currentUser().subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.userStatus = true;
      }
    );
  }

  getBaseDataForSearch() {
    this._profile.LoadBaseDataForSearch().subscribe(
      data => {
        this.totalSearchItems = data;
        // console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.userStatus = true;
        let discount: any = this.totalSearchItems.filter(x => x.kind === 'discount');
        discount = discount[0].list;
        this.discount.length = 0;
        for (const item of discount) {
          this.discount.push(item.name);
        }
        discount = this.discount;
        this.discount = discount;

        let offer: any = this.totalSearchItems.filter(x => x.kind === 'offer');
        offer = offer[0].list;
        this.offer.length = 0;
        for (const item of offer) {
          this.offer.push(item.name);
        }
        offer = this.offer;
        this.offer = offer;

        let product: any = this.totalSearchItems.filter(x => x.kind === 'product');
        product = product[0].list;
        this.product.length = 0;
        for (const item of product) {
          this.product.push(item.name);
        }
        product = this.product;
        this.product = product;

        let request: any = this.totalSearchItems.filter(x => x.kind === 'request');
        request = request[0].list;
        this.request.length = 0;
        for (const item of request) {
          this.request.push(item.name);
        }
        request = this.request;
        this.request = request;

        let seller: any = this.totalSearchItems.filter(x => x.kind === 'seller');
        seller = seller[0].list;
        this.seller.length = 0;
        for (const item of seller) {
          this.seller.push(item.name);
        }
        seller = this.seller;
        this.seller = seller;

        this.searchItems = product;

      }
    );
  }

  onChangeItem(event) {
    if (this.searchType === 'product') {
      this.searchItems = this.product;
    } else if (this.searchType === 'seller') {
      this.searchItems = this.seller;
    } else if (this.searchType === 'discount') {
      this.searchItems = this.discount;
    } else if (this.searchType === 'offer') {
      this.searchItems = this.offer;
    } else if (this.searchType === 'requsetBuy') {
      this.searchItems = this.request;
    }
  }

  search() {
    this.searchItemObject.data = this.item;

    switch (this.searchType) {
      case 'product': {
        this.searchItemObject.type = 'product';
        sessionStorage.setItem('searchItem', JSON.stringify(this.searchItemObject));
        this._route.navigateByUrl('products');
        this.display = false;
        break;
      }
      case 'seller': {
        this.searchItemObject.type = 'seller';
        sessionStorage.setItem('searchItem', JSON.stringify(this.searchItemObject));
        this._route.navigateByUrl('products');
        this.display = false;
        break;
      }
      case 'discount': {
        this.searchItemObject.type = 'discount';
        sessionStorage.setItem('searchItem', JSON.stringify(this.searchItemObject));
        this._route.navigateByUrl('/offers/products');
        this.display = false;
        break;
      }
      case 'offer': {
        this.searchItemObject.type = 'offer';
        sessionStorage.setItem('searchItem', JSON.stringify(this.searchItemObject));
        this._route.navigateByUrl('/offers/products');
        this.display = false;
        break;
      }
      case 'requsetBuy': {
        this.searchItemObject.type = 'requsetBuy';
        sessionStorage.setItem('searchItem', JSON.stringify(this.searchItemObject));
        this._route.navigateByUrl('/offers/products');
        this.display = false;
        break;
      }
      default: {
        break;
      }
    }
  }

  logout() {
    this._auth.logout();
  }

  searchHeader(event) {
    // console.log(event);
  }

  filterSearchItem(event) {
    this.filteredSearchItem = [];
    for (let i = 0; i < this.searchItems.length; i++) {
      const item = this.searchItems[i];
      if (item.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredSearchItem.push(item);
      }
    }
  }

}


