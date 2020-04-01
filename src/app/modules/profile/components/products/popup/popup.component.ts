import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';
import { AuthService } from '../../../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  updateTable = new EventEmitter();

  public inventoryAmount = '';
  public percent = '';
  public status = '';
  public dateObject = '';
  public description = '';
  public sendData = false;
  public discountStatus = false;
  public offerStatus = false;
  public discount = [];
  public offer = [];

  dateConfig: any = {
    disableKeypress: true,
    format: 'YYYY/MM/DD',
    opens: 'left',
    mode: 'dayTime',
    showTwentyFourHours: true
  };

  public dateError = false;

  public inventoryAmountCtrl: FormControl = new FormControl('', [Validators.required]);
  public percentCtrl: FormControl = new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)]);
  public descriptionDiscountCtrl: FormControl = new FormControl('');
  public descriptionCtrl: FormControl = new FormControl('');
  public dateCtrl: FormControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<PopupComponent>,
    private _global: GlobalService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    private _profile: ProfileService,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public discountForm: FormGroup = this.builder.group({
    ProductID: this.data.id,
    Percent: this.percentCtrl,
    Expire: this.dateCtrl,
    description: this.descriptionDiscountCtrl
  });

  public offerForm: FormGroup = this.builder.group({
    ProductID: this.data.id,
    Count: this.inventoryAmountCtrl,
    description: this.descriptionCtrl
  });

  ngOnInit() {
    this.status = this.data.name;

    this.getOffer(this.data.id);

    if (this.status === 'productDiscountBind') {
      this.getDiscount(this.data.id);
    } else if (this.status === 'productOfferBind') {
      this.getOffer(this.data.id);
    }
  }

  updateParentDiscountTable() {
    this.updateTable.emit();
  }

  close(): void {
    this.dialogRef.close();
  }

  getDiscount(data) {
    this._profile.getDiscount(data).subscribe(
      result => {
        console.log(result);
        this.discount = result;
      },
      error => { },
      () => {
        this.discountStatus = true;
      }
    );
  }

  getOffer(data) {
    this._profile.getOffer(data).subscribe(
      result => {
        console.log(result);
        this.offer = result;
      },
      error => { },
      () => {
        this.offerStatus = true;
      }
    );
  }

  resetDiscount() {
    this.discountForm.setValue({
      ProductID: this.data.id,
      Percent: 0,
      Expire: '1397/01/01',
      description: ''
    });
    this.sendData = true;
    this._profile.setDiscount(this.discountForm.value).subscribe(
      result => {
        console.log(result);
        if (result['success']) {
          this.openSnackBar('تخفیف با موفقیت حذف شد!', 'بستن');
          this.close();
        } else {
          this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
        }
      },
      error => { },
      () => {
        this.updateParentDiscountTable();
        this.sendData = false;
      }
    );
  }

  resetOffer() {
    this.offerForm.setValue({
      ProductID: this.data.id,
      Count: 0,
      description: ''
    });
    this.sendData = true;
    this._profile.setOffer(this.offerForm.value).subscribe(
      result => {
        console.log(result);
        if (result['success']) {
          this.openSnackBar('پیشنهاد فروش با موفقیت حذف شد!', 'بستن');
          this.close();
        } else {
          this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
        }
      },
      error => { },
      () => {
        this.updateParentDiscountTable();
        this.sendData = false;
      }
    );
  }

  setDiscount(data) {
    console.log(data);
    if (this.discountForm.valid) {
      this.sendData = true;
      this._profile.setDiscount(data).subscribe(
        result => {
          console.log(result);
          if (result['success']) {
            this.openSnackBar('تخفیف با موفقیت ثبت شد!', 'بستن');
            this.close();
          } else {
            this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
          }
        },
        error => { },
        () => {
          this.updateParentDiscountTable();
          this.sendData = false;
        }
      );
    } else {
      this.dateError = true;
    }
  }

  setOffer(data) {
    if (this.offerForm.valid) {
      console.log(data);
      this.sendData = true;
      this._profile.setOffer(data).subscribe(
        result => {
          console.log(result);
          if (result['success']) {
            this.openSnackBar('پیشنهاد فروش با موفقیت ثبت شد!', 'بستن');
            this.close();
          } else {
            this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
          }
        },
        error => { },
        () => {
          this.updateParentDiscountTable();
          this.sendData = false;
        }
      );
    } else {
      this.dateError = true;
    }
  }

  // dateOpen(event) {
  //   console.log(event);
  // }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

}
