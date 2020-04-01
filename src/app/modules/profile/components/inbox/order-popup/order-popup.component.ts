import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
// Services
import { GlobalService } from '../../../../../services/global.service';
import { AuthService } from '../../../../../services/auth.service';
import { ProfileService } from '../../../../profile/services/profile.service';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {

  // public uploadurl = 'AttachFile/Upload';
  // public uploadTextBtn = 'انتخاب فایل';
  // public progressUpload = 0;
  // public finalImage = '';
  // public fileUpload = false;

  public loading = false;
  public uploadurl = 'product/upload';
  public uploadTextBtn = 'انتخاب فایل';
  public progressUpload = 0;
  public finalImage = '';
  public fileUpload = false;
  // Multiple

  public config = {
    maxFiles: 4
  };

  dateConfig: any = {
    disableKeypress: true,
    format: 'YYYY/MM/DD',
    opens: 'left',
    mode: 'dayTime',
    showTwentyFourHours: true
  };
  public dateObject = '';
  public productCode = '';
  public price = '';
  public cancelReason = '';
  public cancelReasonCancelAfterShipping = '';
  public cancelAfterShippingImages = [];
  public id = 0;
  public name = '';
  public answer = '';

  public sendAdd = false;

  public dateCtrl: FormControl = new FormControl('');
  public productCodeCtrl = new FormControl('', [Validators.required]);
  public cancelReasonCtrl = new FormControl('', [Validators.required]);
  public cancelReasonCancelAfterShippingCtrl = new FormControl('', [Validators.required]);
  public answerCtrl: FormControl = new FormControl('', [Validators.required]);
  public priceControl: FormControl = new FormControl('', [Validators.required]);
  public agreeCtrl1 = new FormControl(false);
  public agreeCtrl2 = new FormControl(false);

  constructor(public dialogRef: MatDialogRef<OrderPopupComponent>,
    private _global: GlobalService,
    private _auth: AuthService,
    private _profile: ProfileService,
    public snackBar: MatSnackBar,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.uploadurl = this._global.BASE_API_URL + this.uploadurl;
    this.id = this.data.id;
    this.name = this.data.name;
  }

  public productQuestionAnswerForm: FormGroup = this.builder.group({
    QuestionID: this.id,
    Answer: this.answerCtrl
  });

  public orderCancelAfterShippingForm: FormGroup = this.builder.group({
    id: this.id,
    CencelReason: this.cancelReasonCancelAfterShippingCtrl,
    ApplicantPhotoes: this.cancelAfterShippingImages
  });

  public orderCancelBeforShippingForm: FormGroup = this.builder.group({
    id: this.id,
    CencelReason: this.cancelReasonCtrl,
  });

  public orderReceiveGoodsByBuyerForm: FormGroup = this.builder.group({
    id: this.id,
  });

  public orderReceiveGoodsBySellerForm: FormGroup = this.builder.group({
    id: this.id
  });

  public orderShippingBySellerForm: FormGroup = this.builder.group({
    id: this.id,
    WayBillFile: this.finalImage,
    SellerPhotoes: this.cancelAfterShippingImages,

  });

  public purchaseRequestAnswerForm: FormGroup = this.builder.group({
    RequestID: this.id,
    UnitPrice: this.priceControl,
    AttachedFile: this.finalImage,
    SellerDescription: this.answerCtrl,
    Images: this.cancelAfterShippingImages,
  });

  ngOnInit() { }

  productQuestionAnswer() {
    this.productQuestionAnswerForm.setValue({
      QuestionID: this.id,
      Answer: this.answerCtrl.value
    });
    console.log(this.productQuestionAnswerForm.value);
    if (this.productQuestionAnswerForm.valid) {
      this.sendAdd = true;
      this._profile.productQuestionAnswer(this.productQuestionAnswerForm.value).subscribe(
        result => {
          if (result['success']) {
            this.close();
            this.openSnackBar('اطلاعات با موفقیت ثبت شد', 'بستن');

            location.reload();

          } else if (result['result'] !== '') {
            this.openSnackBar(result['result'], 'بستن');
          } else {
            this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
          }
          console.log(result);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
          this.sendAdd = false;
        },
        () => {
          this.sendAdd = false;
        }
      );
    }
  }

  orderCancelAfterShipping() {
    this.orderCancelAfterShippingForm.setValue({
      id: this.id,
      CencelReason: this.cancelReasonCancelAfterShippingCtrl.value,
      ApplicantPhotoes: this.cancelAfterShippingImages
    });
    console.log(this.orderCancelAfterShippingForm.value);
    if (this.orderCancelAfterShippingForm.valid) {

      if (this.cancelAfterShippingImages.length > 0) {
        this.sendAdd = true;
        this._profile.orderCancelAfterShipping(this.orderCancelAfterShippingForm.value).subscribe(
          result => {
            if (result['success']) {
              this.close();
              this.openSnackBar('اطلاعات با موفقیت ارسال شد', 'بستن');

              location.reload();

            } else {
              this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
            }
            console.log(result);
          },
          error => {
            if (error.status === 401) {
              this._auth.logout();
            }
            this.sendAdd = false;
          },
          () => {
            this.sendAdd = false;
          }
        );
      } else {
        this.openSnackBar('لطفا همه فیلدها را پرکنید', 'بستن');
      }
    }
  }

  orderCancelBeforShipping() {
    this.orderCancelBeforShippingForm.setValue({
      id: this.id,
      CencelReason: this.cancelReasonCtrl.value,
    });
    console.log(this.orderCancelBeforShippingForm.value);
    if (this.orderCancelBeforShippingForm.valid) {
      this.sendAdd = true;
      this._profile.orderCancelBeforeShipping(this.orderCancelBeforShippingForm.value).subscribe(
        result => {
          if (result['success']) {
            this.close();
            this.openSnackBar('اطلاعات با موفقیت ارسال شد', 'بستن');

            location.reload();

          } else {
            this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
          }
          console.log(result);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
          this.sendAdd = false;
        },
        () => {
          this.sendAdd = false;
        }
      );
    }
  }

  orderCReceiveGoodsByBuyer() {
    this.orderReceiveGoodsByBuyerForm.setValue({
      id: this.id,
    });
    if (this.agreeCtrl1.value) {
      if (this.orderReceiveGoodsByBuyerForm.valid) {

        this.sendAdd = true;
        this._profile.orderReceiveGoodsByBuyer(this.orderReceiveGoodsByBuyerForm.value).subscribe(
          result => {
            if (result['success']) {
              this.close();
              this.openSnackBar('اطلاعات با موفقیت ارسال شد', 'بستن');

              location.reload();

            } else {
              this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
            }
            console.log(result);
          },
          error => {
            if (error.status === 401) {
              this._auth.logout();
            }
            this.sendAdd = false;
          },
          () => {
            this.sendAdd = false;
          }
        );
      }

    } else {
      this.snackBar.open('لطفا تیک را علامت دار کنید!', 'بستن', {
        duration: 8000
      });
    }
  }

  orderShippingBySeller() {
    this.orderShippingBySellerForm.setValue({
      id: this.id,
      WayBillFile: this.finalImage,
      SellerPhotoes: this.cancelAfterShippingImages,
    });
    console.log(this.orderShippingBySellerForm.value);
    if (this.orderShippingBySellerForm.valid) {

      if (this.finalImage !== '' && this.cancelAfterShippingImages.length > 0) {
        this.sendAdd = true;
        this._profile.orderShippingBySeller(this.orderShippingBySellerForm.value).subscribe(
          result => {
            if (result['success']) {
              this.close();
              this.openSnackBar('اطلاعات با موفقیت ارسال شد', 'بستن');

              location.reload();

            } else {
              this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
            }
            console.log(result);
          },
          error => {
            if (error.status === 401) {
              this._auth.logout();
            }
            this.sendAdd = false;
          },
          () => {
            this.sendAdd = false;
          }
        );
      } else {
        this.openSnackBar('لطفا همه فیلدها را پرکنید', 'بستن');
      }
    } else {
      this.openSnackBar('لطفا همه فیلدها را پرکنید', 'بستن');
    }
  }

  orderReceiveGoodsBySeller() {
    this.orderReceiveGoodsBySellerForm.setValue({
      id: this.id
    });

    if (this.agreeCtrl2.value) {
      if (this.orderReceiveGoodsBySellerForm.valid) {

        this.sendAdd = true;
        this._profile.orderReceiveGoodsBySeller(this.orderReceiveGoodsBySellerForm.value).subscribe(
          result => {
            if (result['success']) {
              this.close();
              this.openSnackBar('اطلاعات با موفقیت ارسال شد', 'بستن');

              location.reload();

            } else {
              this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
            }
            console.log(result);
          },
          error => {
            if (error.status === 401) {
              this._auth.logout();
            }
            this.sendAdd = false;
          },
          () => {
            this.sendAdd = false;
          }
        );
      }

    } else {
      this.snackBar.open('لطفا تیک را علامت دار کنید!', 'بستن', {
        duration: 8000
      });
    }
  }
  purchaseRequestAnswer() {
    this.purchaseRequestAnswerForm.setValue({
      RequestID: this.id,
      UnitPrice: this.priceControl.value,
      AttachedFile: this.finalImage,
      SellerDescription: this.answerCtrl.value,
      Images: this.cancelAfterShippingImages,
    });
    console.log(this.purchaseRequestAnswerForm.value);
    if (this.purchaseRequestAnswerForm.valid) {
      this.sendAdd = true;
      this._profile.purchaseRequestAnswer(this.purchaseRequestAnswerForm.value).subscribe(
        result => {
          if (result['success']) {
            this.close();

            this.openSnackBar('اطلاعات با موفقیت ارسال شد', 'بستن');

            location.reload();
          } else if (result['result'] !== '') {
            this.openSnackBar(result['result'], 'بستن');
          } else {
            this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
          }
          console.log(result);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
          this.sendAdd = false;
        },
        () => {
          this.sendAdd = false;
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  // When upload success
  onUploadSuccess(event) {
    console.log(event);
    this.cancelAfterShippingImages.push({ name: event[1] });
  }

  // When upload error
  onUploadError(event) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  // File uplaod functions
  onSelect(event) {
    this.fileUpload = true;
    this.uploadTextBtn = 'در حال آپلود ...';
  }

  onProgress(event) {
    this.progressUpload = event.progress;
    console.log(this.progressUpload);
  }

  onBasicUploadAuto(event) {
    const result = JSON.parse(event.xhr.response);
    this.finalImage = result;
    console.log(this.finalImage);
    this.uploadTextBtn = 'تصویر آپلود شد';
    this.fileUpload = false;
  }

  onBeforeSend(event) {
    const _token = this._auth.getToken();
    event.xhr.setRequestHeader('Authorization', `bearer ${_token}`);
    console.log(event);
  }


}
