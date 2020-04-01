import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { AuthService } from '../../../../services/auth.service';
import { BuyProtectionService } from '../../buy-protection.service';
import { GlobalService } from '../../../../services/global.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-buy-protection',
  templateUrl: './buy-protection.component.html',
  styleUrls: ['./buy-protection.component.scss']
})
export class BuyProtectionComponent implements OnInit {

  public uploadurl = 'product/upload';
  public uploadTextBtn = 'انتخاب فایل';
  public progressUpload = 0;
  public uploadActive = false;
  public file = '';

  orderid;

  public loading = false;
  public infoLoaded = false;
  public productCode = '';
  public transactionSize = '';
  public contractCost = '';
  public transportationCosts = '';
  public insuranceCosts = '';
  public deliveryTime = '';
  public prePaymentValue = '';
  public DeliveryTimePeriod = 'روز کاری';
  public info = [];
  public units = [];
  public destination = [];
  public shippingMethod = ['ریلی', 'دریایی', 'زمینی', 'هوایی'];
  public isComplete = true;

  public productCodeCtrl = new FormControl('', [Validators.required]);
  public transactionSizeCtrl = new FormControl('', [Validators.required]);
  public transactionSizeUnitCtrl = new FormControl('', [Validators.required]);
  public contractCostCtrl = new FormControl('', [Validators.required]);
  public shippingMethodCtrl = new FormControl('', [Validators.required]);
  public transportationCostsCtrl = new FormControl('', [Validators.required]);
  public insuranceCostsCtrl = new FormControl('', [Validators.required]);
  public destinationCtrl = new FormControl('', [Validators.required]);
  public deliveryTimeControl = new FormControl('', [Validators.required]);
  public descriptionCtrl = new FormControl('');
  public prepaymentCtrl = new FormControl(false);
  // public prePaymentValueCtrl = new FormControl('', [Validators.required]);
  public prePaymentValueCtrl = new FormControl('');
  public DeliveryTimePeriodControl = new FormControl('');

  constructor(private _route: Router,
    private _auth: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private builder: FormBuilder,
    private _buy: BuyProtectionService,
    private _global: GlobalService) {
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
  }

  public registerProductCodeForm: FormGroup = this.builder.group({
    id: this.productCodeCtrl
  });

  public registerSecureOrderForm: FormGroup = this.builder.group({
    productID: this.productCode,
    Count: this.transactionSizeCtrl,
    Unit: this.transactionSizeUnitCtrl,
    PaidMoney: this.contractCostCtrl,
    PrePayment: this.prePaymentValueCtrl,
    ShippingMethod: this.shippingMethodCtrl,
    CostOfShipping: this.transportationCostsCtrl,
    CostOfInsurance: this.insuranceCostsCtrl,
    Destination: this.destinationCtrl,
    DeliveryTime: this.deliveryTimeControl,
    DeliveryTimePeriod: this.DeliveryTimePeriodControl,
    ContractFile: '',
    Description: this.descriptionCtrl,
  });

  ngOnInit() {
    if (!this._auth.checkLogin()) {
      this._route.navigateByUrl('/');
    } else {
      this._buy.IsComplete().subscribe(
        data => {

          this.isComplete = data;
        },
        error => { },
        () => { }
      );
    }
    this.getUnits();
    this.getRegions();
  }

  public open() {
    this.dialog.open(ConfirmComponent, { data: { orderid: this.orderid } });
  }

  getUnits() {
    this._buy.getUnits().subscribe(
      data => {
        this.units = data;
      },
      error => { },
      () => { }
    );
  }

  getRegions() {
    this._buy.getRegions().subscribe(
      data => {
        this.destination = data;
      },
      error => { },
      () => { }
    );
  }

  loadData(id) {
    if (this.registerProductCodeForm.valid) {
      this.loading = true;
      this._buy.productFindbyID(this.productCode).subscribe(
        data => {
          this.info = data;
        },
        error => {
          alert('محصولی پیدا نشد.');
          this.loading = false;
        },
        () => {
          this.infoLoaded = true;
          this.loading = false;
        }
      );
    }
  }

  registerSecureOrder(data) {
    if (this.file =='') {
      this.snackBar.open('آپلود فایل پیوست اجباری است!', 'بستن', {
        duration: 8000
      });

      return;
    }
    if (this.registerSecureOrderForm.valid) {
      this.loading = true;
      this.registerSecureOrderForm.setValue({
        productID: this.productCode,
        Count: this.transactionSizeCtrl.value,
        Unit: this.transactionSizeUnitCtrl.value,
        PaidMoney: this.contractCostCtrl.value,
        PrePayment: this.prePaymentValueCtrl.value,
        ShippingMethod: this.shippingMethodCtrl.value,
        CostOfShipping: this.transportationCostsCtrl.value,
        CostOfInsurance: this.insuranceCostsCtrl.value,
        Destination: this.destinationCtrl.value,
        DeliveryTime: this.deliveryTimeControl.value,
        DeliveryTimePeriod: this.DeliveryTimePeriodControl.value,
        ContractFile: this.file,
        Description: this.descriptionCtrl.value,
      });

      this._buy.registerPurchaseRequest(this.registerSecureOrderForm.value).subscribe(
        result => {
          console.log(result);
          if (result['success']) {
            this.info = result;
            this.orderid = result['result'];
            this.open();
          }
        },
        error => {
          // alert('محصولی پیدا نشد.');
          this.loading = false;
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.infoLoaded = true;
          this.loading = false;
        }
      );
    }
  }

  // File uplaod functions
  onSelect(event) {
    this.uploadActive = true;
    this.uploadTextBtn = 'در حال آپلود ...';
  }

  onProgress(event) {
    this.progressUpload = event.progress;
    console.log(this.progressUpload);
  }

  onBasicUploadAuto(event) {
    const result = JSON.parse(event.xhr.response);
    this.file = result;
    // console.log(this.file);
    // console.log(this.registerSecureOrderForm.value);
    this.uploadTextBtn = 'فایل آپلود شد';
    this.uploadActive = false;
  }

  priceChange() {
    if (this.contractCost !== '') {
      if (this.prePaymentValue > this.contractCost) {
        this.snackBar.open('مبلغ پیش پرداخت نمی‌تواند از مبلغ قرارداد بزرگتر باشد!', 'بستن', {
          duration: 8000
        });
        this.prePaymentValue = this.contractCost;
      }
    } else {
      this.snackBar.open('ابتدا فیلد مبلغ قرارداد را پر کنید!', 'بستن', {
        duration: 8000
      });
      this.prePaymentValue = '';
    }

  }

  prepaymentCtrlChange(event) {
    // console.log(event);
    if (!event.checked) {
      this.prePaymentValue = '';
    }
  }
}
