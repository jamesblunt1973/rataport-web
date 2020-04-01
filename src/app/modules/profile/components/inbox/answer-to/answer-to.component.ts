import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
// Services
import { GlobalService } from '../../../../../services/global.service';
import { AuthService } from '../../../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-answer-to',
  templateUrl: './answer-to.component.html',
  styleUrls: ['./answer-to.component.scss']
})
export class AnswerToComponent implements OnInit {

  public uploadurl = 'AttachFile/Upload';
  public uploadTextBtn = 'انتخاب فایل';
  public progressUpload = 0;
  public finalFile = '';

  public price = '';
  public answer = '';
  public status = '';
  public sendAdd = false;
  public id;

  public priceCtrl = new FormControl('', [Validators.required]);
  public answerCtrl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<AnswerToComponent>,
    private _global: GlobalService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    private _profile: ProfileService,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
  }

  public registerPriceInqueryForm: FormGroup = this.builder.group({
    Id: this.id,
    Price: this.priceCtrl,
    Answer: this.answerCtrl
  });

  public registerNegotiateForm: FormGroup = this.builder.group({
    NegotiateID: this.id,
    SellerMessage: this.answerCtrl,
    SellerAttachFile: this.finalFile
  });

  ngOnInit() {
    this.id = this.data.id;
    console.log(this.data);
    this.status = this.data.name;
  }

  registerPriceInquery(form) {
    this.registerPriceInqueryForm.setValue({
      Id: this.id,
      Price: this.priceCtrl.value,
      Answer: this.answerCtrl.value
    });
    if (this.registerPriceInqueryForm.valid) {
      this.sendAdd = true;
      this._profile.registerPriceInquery(this.registerPriceInqueryForm.value).subscribe(
        data => {
          console.log(data);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
          this.sendAdd = false;
        },
        () => {
          this.sendAdd = false;
          this.close();
          this.openSnackBar('استعلام با موفقیت پاسخ داده شد', 'بستن');
          location.reload();
        }
      );

    }
  }

  registerNegotiate(form) {
    this.registerNegotiateForm.setValue({
      NegotiateID: this.id,
      SellerMessage: this.answerCtrl.value,
      SellerAttachFile: this.finalFile
    });
    if (this.registerNegotiateForm.valid) {
      this.sendAdd = true;
      this._profile.registerNegotiate(this.registerNegotiateForm.value).subscribe(
        data => {
          console.log(data);
          if (data['success']) {
            this.close();
            this.openSnackBar('مذاکره با موفقیت پاسخ داده شد', 'بستن');

            location.reload();

          } else if (data['result'] !== '') {
            this.openSnackBar(data['result'], 'بستن');
          } else {
            this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
          }
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
    // setTimeout(() => this.dialogRef.close(), 3000);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  // File uplaod functions
  onSelect(event) {
    this.uploadTextBtn = 'در حال آپلود ...';
  }

  onProgress(event) {
    this.progressUpload = event.progress;
    console.log(this.progressUpload);
  }

  onBasicUploadAuto(event) {
    const result = JSON.parse(event.xhr.response);
    this.finalFile = result;
    console.log(result);
    this.uploadTextBtn = 'فایل آپلود شد';
  }

  onBeforeSend(event) {
    const _token = this._auth.getToken();
    event.xhr.setRequestHeader('Authorization', `bearer ${_token}`);
    console.log(event);
  }

}
