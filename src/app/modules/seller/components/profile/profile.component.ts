import { Component, OnInit } from '@angular/core';
import 'owl.carousel';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../../services/global.service';
import { AuthService } from '../../../../services/auth.service';
import { SellerService } from '../../services/seller.service';
import { LogInComponent, PermissionMessagesComponent } from '../../../../share/share-components';
import { ProductService } from '../../../products/services/product.service';
import { resetFakeAsyncZone } from '@angular/core/testing';
declare const $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public followStatus = false;
  public dataStatus = false;
  public noLoginFollow = true;
  public myProfile = false;
  public followed = false;
  loading = false;
  items: any[] = [1, 2, 3, 4];
  pro: any[] = [1, 2, 3];
  image_url;
  seller = [];
  deals = [];
  slides = [];
  userInfo = [];
  products = [];
  followers = [];
  certificates = [];
  supporters = [];
  team = [];
  collectionInformation = [];
  contactUs = [];
  workSlides = [];

  sellerID = 0;
  favorite = false;
  followPermission = false;
  BadgesPermission = false;

  public block = false;
  loggedIn = false;

  constructor(public dialog: MatDialog,
    private _seller: SellerService,
    private _product: ProductService,
    private _route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private _global: GlobalService,
    private _auth: AuthService,
    private _router: Router) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.sellerID = parseInt(this._route.snapshot.paramMap.get('id'), 10);

    this.getSellerDetails(this.sellerID);

    if (this._auth.checkLogin()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  loginKon() {
    alert('برای نمایش اطلاعات تماس وارد سایت شوید!');
  }

  getSellerDetails(id) {
    this._seller.getSellerDetails(id).subscribe(
      data => {
        if (data === true) {
          this.block = true;
        } else {
          console.log(data);
          this.seller = data;
          this.slides = data['slides'];
          this.userInfo = data['info'];
          this.deals = data['deals'];

          this.products = data['products'];
          this.followers = data['followers'];
          this.certificates = data['certificates'];
          this.supporters = data['supporters'];
          this.team = data['team'];
          this.collectionInformation = data['info'];
          this.workSlides = data['workSlides'];
          this.contactUs = data['contactUs'][0];

          this.favorite = data['favorite'];
          if (this._auth.checkLogin()) {
            this.followPermission = data['followPermission'];
            this.BadgesPermission = data['BadgesPermission'];
          }
        }

      },
      error => { },
      () => {
        if (this._auth.checkLogin()) {
          this.checkFollowStatus(this.sellerID);
          this.noLoginFollow = false;
        } else {
          this.dataStatus = true;
          this.noLoginFollow = true;
        }
        this.loading = true;
      }
    );
  }

  setFollow(data) {
    this.followStatus = true;
    this._seller.setFollow(data).subscribe(
      result => {
        if (result['success'] === false) {
          this.snackBar.open(result['result'], 'بستن', {
            duration: 8000
          });
        }
        this.followStatus = false;
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.checkFollowStatus(this.sellerID);
        // this.follower++;
      }
    );

  }

  getProducts(id) {
    this._seller.filterProducts(this.sellerID, id).subscribe(
      result => {
        this.products = result;
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => { }
    );

  }

  unFollow(data) {
    this.followStatus = true;
    this._seller.unFollow(data).subscribe(
      result => {
        // console.log(result);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.checkFollowStatus(this.sellerID);
        // this.follower--;
        this.followStatus = false;
      }
    );
  }

  checkFollowStatus(data) {
    this._seller.followStatus(data).subscribe(
      result => {
        // console.log(result);
        this.myProfile = result['myProfile'];
        this.followed = result['result'];
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.dataStatus = true;
      }
    );
  }

  public openLogin() {
    this.dialog.open(LogInComponent);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  permissionMessageModal(page, message, status) {
    const dialogRef = this.dialog.open(PermissionMessagesComponent, { data: { page: page, message: message, status: status } });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

  carouselSimilarProducts() {
    $('.members').owlCarousel({
      rtl: true,
      items: 4,
      stagePadding: 10,
      dots: true,
      responsiveClass: true,
      loop: true,
      margin: 15,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      // nav: true,
      // navText: ["<i class='fa fa-angle-left'></id>", "<i class='fa fa-angle-right'></id>"],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 3,
        },
        1300: {
          items: 3,
        },
        1440: {
          items: 3,
        }
      }
    });
  }


  carouselActivity() {
    $('.activity').owlCarousel({
      rtl: true,
      items: 4,
      stagePadding: 10,
      dots: true,
      responsiveClass: true,
      loop: true,
      margin: 15,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      // nav: true,
      // navText: ["<i class='fa fa-angle-left'></id>", "<i class='fa fa-angle-right'></id>"],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1024: {
          items: 1,
        },
        1300: {
          items: 1,
        },
        1440: {
          items: 1,
        }
      }
    });
  }

}
