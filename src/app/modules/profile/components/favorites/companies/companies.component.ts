import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  public image_url;
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
    this.wishListMySellers();
  }

  wishListMySellers() {
    this._profile.wishListMySellers().subscribe(
      data => {
        console.log(data);
        this.sellers = data;
      },
      error => { },
      () => { }
    );
  }

  wishListRemoveSeller(id) {
    if (confirm('آیا مطمئن هستید؟')) {
      this._profile.wishListRemoveSeller(id).subscribe(
        data => {
          if (data['success']) {
            this.openSnackBar('فروشنده از لیست علاقه‌مندی‌های شما حذف شد!', 'بستن');
            this.wishListMySellers();
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

  sellerDetail(id: number) {
    this._route.navigateByUrl('/seller/' + id);
  }

}
