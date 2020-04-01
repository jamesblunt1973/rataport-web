import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public image_url;
  products = [];
  sellers = [];

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    // public dialog: MatDialog,
    private _route: Router,
    private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.wishListMyProducts();
  }

  wishListMyProducts() {
    this._profile.wishListMyProducts().subscribe(
      data => {
        console.log(data);
        this.products = data;
      },
      error => { },
      () => { }
    );
  }

  wishListRemoveProduct(id) {
    if (confirm('آیا مطمئن هستید؟')) {
      this._profile.wishListRemoveProduct(id).subscribe(
        data => {
          if (data['success']) {
            this.openSnackBar('محصول از لیست علاقه‌مندی‌های شما حذف شد!', 'بستن');
            this.wishListMyProducts();
          } else {
            this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
          }
          console.log(data);
        },
        error => { },
        () => { }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  productDetail(id: number) {
    this._route.navigateByUrl('/products/detail/' + id);
  }

}
