import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
// Components
import { LogInComponent } from '../../../../../share/share-components';
// Services
import { AuthService } from '../../../../../services/auth.service';
import { GlobalService } from '../../../../../services/global.service';
import { ProductService } from '../../../services/product.service';
import { MessagesPopupComponent } from '../../../../../components/messages-popup/messages-popup.component';

@Component({
  selector: 'app-negotiate-seller',
  templateUrl: './negotiate-seller.component.html',
  styleUrls: ['./negotiate-seller.component.scss']
})
export class NegotiateSellerComponent implements OnInit {

  @Input() productDetail;

  public loading = false;
  public uploadurl = 'product/upload';
  public uploadTextBtn = 'انتخاب فایل';
  public progressUpload = 0;
  public file = '';
  public fileUpload = false;

  public message;

  public multiSellerCtrl = new FormControl(false);
  public messageCtrl = new FormControl('', [Validators.required]);

  constructor(private _auth: AuthService,
    public snackBar: MatSnackBar,
    private _global: GlobalService,
    private _product: ProductService,
    public dialog: MatDialog,
    private builder: FormBuilder) {
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
  }

  public registerNegotiateForm: FormGroup = this.builder.group({
    ProductID: 0,
    ApplicantMessage: this.messageCtrl,
    SendToAll: this.multiSellerCtrl,
    ApplicantAttachFile: ''
  });

  ngOnInit() {
    // this.registerNegotiate(this.registerNegotiate);
  }

  public open() {
    this.dialog.open(MessagesPopupComponent, { data: { page: 'negotiate-seller' } });
  }


  registerNegotiate(data) {
    if (this._auth.checkLogin()) {
      if (this.registerNegotiateForm.valid) {
        this.loading = true;
        this.registerNegotiateForm.setValue({
          ProductID: this.productDetail.productDetails.id,
          ApplicantMessage: this.messageCtrl.value,
          SendToAll: this.multiSellerCtrl.value,
          ApplicantAttachFile: this.file
        });

        this._product.registerNegotiate(this.registerNegotiateForm.value).subscribe(
          result => {
            if (result['success']) {
              this.snackBar.open('پیام شما با موفقیت ارسال شد!', 'بستن', {
                duration: 8000
              });
              this.open();
            } else {
              this.snackBar.open('خطا در سمت سرور، لطفا مجددا تست نمایید!', 'بستن', {
                duration: 8000
              });
            }
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
    } else {
      this.openLogin();
    }

  }

  public openLogin() {
    this.dialog.open(LogInComponent);
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
    this.file = result;
    console.log(this.file);
    this.uploadTextBtn = 'فایل آپلود شد';
    this.fileUpload = false;
  }

  onBeforeSend(event) {
    const _token = this._auth.getToken();
    event.xhr.setRequestHeader('Authorization', `bearer ${_token}`);
    console.log(event);
  }

}
