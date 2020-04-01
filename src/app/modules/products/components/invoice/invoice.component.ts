import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
// Services
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  public sendAdd = false;
  public postalCode;
  public address;
  public totalPrice = 0;
  public loadOrderStatus = false;
  public order: any = [];
  public productid;
  public count = '';

  public agreeCtrl = new FormControl(false, [Validators.required]);
  public shippingMethodCtrl = new FormControl('', [Validators.required]);
  public internalPackControl = new FormControl('', [Validators.required]);
  public foreignPackControl = new FormControl('', [Validators.required]);
  public minOrderCtrl = new FormControl('', [Validators.required]);
  public postalCodCtrl = new FormControl('', [Validators.required]);
  public addressCtrl = new FormControl('', [Validators.required]);
  public descriptionCtrl = new FormControl('');

  constructor(private _order: ProductService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    private builder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute) { }

  public orderForm: FormGroup = this.builder.group({
    ProductID: this.productid,
    Count: this.minOrderCtrl,
    ShippingMethod: this.shippingMethodCtrl,
    InnerPackage: this.internalPackControl,
    ExternalPackage: this.foreignPackControl,
    Description: this.descriptionCtrl,
    ZipCOde: this.postalCodCtrl,
    address: this.addressCtrl
  });

  ngOnInit() {
    window.scrollTo(0, 0);
    this.productid = parseInt(this._route.snapshot.paramMap.get('productid'), 10);
    console.log(this.productid);
    this.getOrder(this.productid);
  }

  getOrder(id: number) {
    this._order.getOrder(id).subscribe(
      data => {
        this.order = data;
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        if (this.order['address'] !== null) {
          this.addressCtrl.setValue(this.order['address']);
        }
        if (this.order['zipCOde'] !== null) {
          this.postalCodCtrl.setValue(this.order['zipCOde']);
        }
        this.loadOrderStatus = true;
      }
    );
  }

  registerOrder(data: any) {
    if (this.orderForm.valid) {
      if (this.agreeCtrl.value) {
        console.log(this.agreeCtrl);
        this.sendAdd = true;
        this.orderForm.setValue({
          ProductID: this.productid,
          Count: this.minOrderCtrl.value,
          ShippingMethod: this.shippingMethodCtrl.value,
          InnerPackage: this.internalPackControl.value,
          ExternalPackage: this.foreignPackControl.value,
          Description: this.descriptionCtrl.value,
          ZipCOde: this.postalCodCtrl.value,
          address: this.addressCtrl.value
        });
        console.log(this.orderForm.value);

        this._order.registerOrder(this.orderForm.value).subscribe(
          result => {
            const orderId = result['result'];
            this._router.navigateByUrl('/products/prefactor/' + orderId);
            console.log(result);
          },
          error => {
            this.sendAdd = false;
          },
          () => {
            this.sendAdd = false;
          }
        );
      } else {
        this.openSnackBar('لطفا تیک تایید اطلاعات را علامت‌دار کنید!', 'بستن');
      }

    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }


  calculateTotalPrice(event) {
    this.totalPrice = event * this.order['price'];
  }

  countChange() {

    if (this.count !== '') {
      if (this.order['minOrder'] > this.count) {
        this.snackBar.open('حداقل تعداد سفارش ' + this.order['minOrder'] + ' ' + this.order['minOrderUnit'] + ' می باشد !', 'بستن', {
          duration: 8000
        });
        this.count = this.order['minOrder'];
      }
    }

  }
}
