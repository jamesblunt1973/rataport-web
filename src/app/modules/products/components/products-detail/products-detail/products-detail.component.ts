import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
// Components
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { CallForPriceComponent } from '../call-for-price/call-for-price.component';
// Services
import { ProductService } from '../../../services/product.service';
import { GlobalService } from '../../../../../services/global.service';
import { LogInComponent, PermissionMessagesComponent } from '../../../../../share/share-components';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {
  productName = '';
  rate = {
    status: false,
    value: 0
  };
  loading = false;
  loadingSimilarProducts = false;
  loadingComments = false;
  images: any[] = [];
  productDetails: any;
  sellerInfo: any;
  messengers: any = [];
  marketAccess: any;
  image_url: string;
  pics: any[];
  productId: number;
  siteMap: any[] = [];
  product = [];
  similarProducts = [];
  similarProductsLength = 0;
  comments = [];
  status = false;
  favorite = false;
  inqueryPermission = false;
  order = false;
  public isComplete;
  public block = false;

  constructor(public dialog: MatDialog,
    private _product: ProductService,
    private router: Router,
    private _route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private _global: GlobalService,
    private _auth: AuthService,
    private _router: Router) {
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

  public openModal() {
    this.dialog.open(ReportDialogComponent, { data: { name: 'hossein', id: this.productId } });
  }

  public openCallForPrice() {

    if (this._auth.checkLogin()) {

      this.dialog.open(CallForPriceComponent, { data: { name: this.productName, id: this.productId, page: 'callForPrice' } });

    } else {
      this.openLogin();
    }
  }

  permissionMessageModal(page, message, status) {
    const dialogRef = this.dialog.open(PermissionMessagesComponent, { data: { page: page, message: message, status: status } });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

  public openShareButtons() {
    this.dialog.open(CallForPriceComponent, { data: { name: this.productName, id: this.productId, page: 'share' } });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    const id = parseInt(this._route.snapshot.paramMap.get('id'), 10);
    this.productId = id;
    this.loadProductDetail(id);
    this.loadUserLocation(id);
    this.getSimilarProducts(id);
    this.getComments(id);
  }

  public openLogin() {
    this.dialog.open(LogInComponent);
  }

  public addFavorite(id) {
    if (this._auth.checkLogin()) {
      console.log(id);
      this._product.wishListAddProduct(id).subscribe(
        result => {
          console.log(result);
          if (result['success'] && result['result'] !== '') {
            this.openSnackBar('محصول به لیست علاقه‌مندی‌های شما اضافه شد!', 'بستن');
            this.favorite = true;
          } else if (result['success'] && result['result'] === '') {
            this.openSnackBar('محصول از لیست علاقه‌مندی‌های شما حذف شد!', 'بستن');
            this.favorite = false;
          } else {
            this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
          }
        },
        error => { },
        () => {
          // this.status = true;
          // this.loading = false;
        }
      );
    } else {
      this.openLogin();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  loadProductDetail(id: number) {
    this.loading = true;
    this._product.getProductDetail(id).subscribe(
      data => {
        console.log(data['productDetails']);
        if (data === true) {
          this.block = true;
        } else {
            this.pics = data['pics'];
            this.productDetails = data['productDetails'];
            this.sellerInfo = data['sellerInfo'];
            this.messengers = this.sellerInfo['messengers'][0];
            this.marketAccess = data['marketAccess'];
            this.productName = this.productDetails.name;
              if (data['rate'] !== null) {
                this.rate = data['rate'];
              }
            this.inqueryPermission = data['inqueryPermission'];
            this.order = data['order'];
            this.product = data;
            this.favorite = this.product['favorite'];
            this.isComplete = this.product['isComplete'];
        }
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        if (this.block === false) {

          for (const item of this.pics) {
            this.images.push({ source: this.image_url + item.name, alt: item.alt, title: item.alt });
          }
        }

        this.loading = false;
        this.status = true;
      }
    );
  }

  loadUserLocation(id: number) {
    this._product.getUserLocation(id).subscribe(
      data => {
        this.siteMap = data;
        console.log(this.siteMap);
      },
      error => { },
      () => {
        // this.loading = false;
      }
    );
  }

  payment(id) {
    if (this.isComplete === false) {
      this.openSnackBar(
        'برای دسترسی به این قسمت لطفا اطلاعات الزامی پروفایل کاربری (اطلاعات کاربری، اطلاعات تماس، اطلاعات بانکی) را تکمیل نمایید!',
        'بستن');
    } else if (this.isComplete === true) {
      if (this._auth.checkLogin()) {
        this._router.navigateByUrl('products/payment/' + id);
      } else {
        this.openLogin();
      }
    }

  }

  getSimilarProducts(id) {
    this._product.getSimilarProducts(id).subscribe(
      data => {
        this.similarProducts = data;
        this.similarProductsLength = this.similarProducts.length;
      },
      error => { },
      () => {
        this.loadingSimilarProducts = true;
      }
    );
  }

  getComments(id) {
    this._product.getComments(id).subscribe(
      data => {
        this.comments = data;
        // console.log(data);
        // this.similarProductsLength = this.similarProducts.length;
      },
      error => { },
      () => {
        this.loadingComments = true;
      }
    );
  }

  sellerProfile(id) {
    this._router.navigateByUrl('/seller/' + id);
  }

  printPage() {
    window.print();
  }

}
