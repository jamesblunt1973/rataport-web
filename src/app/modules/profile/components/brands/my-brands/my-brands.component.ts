import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';

@Component({
  selector: 'app-my-brands',
  templateUrl: './my-brands.component.html',
  styleUrls: ['./my-brands.component.scss']
})
export class MyBrandsComponent implements OnInit {

  step = 0;
  image_url;
  public loading = true;
  public loadingTable = false;
  public cols: any[];
  public brands: any[];

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
    this.getBrands();
  }

  getBrands() {
    this._profile.getBrands().subscribe(
      data => {
        // console.log(data);
        this.brands = data;
      },
      error => { },
      () => { }
    );
  }


  deleteBrand(id) {
    if (confirm('آیا از حذف این برند مطمئن هستید؟')) {
      this._profile.deleteBrand(id).subscribe(
        data => {
          // console.log(data);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.getBrands();
        }
      );
    }
  }

}
