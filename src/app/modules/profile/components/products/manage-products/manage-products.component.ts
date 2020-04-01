import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
// Services
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { GlobalService } from '../../../../../services/global.service';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';
import { PermissionMessagesComponent } from '../../../../../share/share-components';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  public loading: boolean;
  public cols: any[];
  public products: any[];
  public discountPermission = false;
  public offerPermission = false;

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog,
    private _global: GlobalService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this._profile.getProducts().subscribe(
      data => {
        this.products = data['myList'];
        this.discountPermission = data['discountPermission'];
        this.offerPermission = data['offerPermission'];
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.loading = false;
      }
    );
  }


  deleteProduct(id) {
    if (confirm('آیا از حذف این محصول مطمئن هستید؟')) {
      this._profile.deleteProduct(id).subscribe(
        data => {
          if (data===true) {
            this.openSnackBar('محصول با موفقیت حذف شد', 'بستن');
          }
          else if (data === false) {
            this.openSnackBar('حذف با خطا مواجه شد. لطفا مجدد تلاش نمایید', 'بستن');
          }
          else {
            this.openSnackBar(data, 'بستن');
          }
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.loadProducts();
        }
      );
    }
  }

  displayStatus(status, id) {
    const data = {
      ProductID: id,
      active: status.checked
    };

    this._profile.changeStatus(data).subscribe(
      res => {
        if (res['success']) {
          if (res['result'] === 'active') {
            this.openSnackBar('محصول در سایت موجود شد', 'بستن');
          } else if (res['result'] === 'inactive') {
            this.openSnackBar('محصول در سایت ناموجود شد', 'بستن');
           
          } 
        }
        else {
          this.openSnackBar(res['result'], 'بستن');
          this.loadProducts();
        }
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => { }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  editProduct(id) {
    this._router.navigateByUrl('profile/edit-product/' + id);
  }

  registerSuggest(page, id) {
    this.openModal(page, id);
  }

  showDiscount(page, id) {
    this.openModal(page, id);
  }

  openModal(name: string, id: number) {
    const dialogRef = this.dialog.open(PopupComponent, { data: { name: name, id: id } });
    dialogRef.componentInstance.updateTable.subscribe(() => {
      this.loadProducts();
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

  permissionMessageModal(page, message, status) {
    const dialogRef = this.dialog.open(PermissionMessagesComponent, { data: { page: page, message: message, status: status } });
    // dialogRef.componentInstance.updateTable.subscribe(() => {
    //   this.loadProducts();
    // });
    dialogRef.afterClosed().subscribe(() => {

    });
  }


}
