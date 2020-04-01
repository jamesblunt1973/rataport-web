import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
// Services
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { GlobalService } from '../../../../../services/global.service';

@Component({
  selector: 'app-send-documents',
  templateUrl: './send-documents.component.html',
  styleUrls: ['./send-documents.component.scss']
})
export class SendDocumentsComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: true }) sendDocument;

  public loading = true;
  public loadingTable = false;
  public cols: any[];

  type = '';
  public step = 0;
  public openStatus = true;
  public image_url;
  public posts: any[];
  public items = [];
  public sendreg = false;

  public uploadurl = 'product/upload';
  public uploadTextBtn = 'انتخاب فایل';
  public progressUpload = 0;
  public fileUpload = '';

  public description = '';
  public finalData = [{
    // description
    title: '',
    // file
    name: ''
  }];

  public typeOption = [

    { name: 'ارسال مدارک جهت پیگیری معامله', id: 1 },
    { name: 'ارسال مدارک جهت بازگشایی حساب کاربری', id: 2 },
    { name: 'سایر', id: 3 }
  ];

  public typeControl = new FormControl('', [Validators.required]);
  public descriptionControl = new FormControl('', [Validators.required]);

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    private builder: FormBuilder,
    public snackBar: MatSnackBar,
    private _global: GlobalService) {
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  public sendDocumentForm: FormGroup = this.builder.group({
    name: this.fileUpload,
    description: this.descriptionControl,
    kind: this.typeControl,
  });

  ngOnInit() {
    this.documentMyList();
  }

  sendDocumentFunc(data) {
    this.sendDocumentForm.setValue({
      name: this.fileUpload,
      description: this.descriptionControl.value,
      kind: this.typeControl.value,
    });

    if (this.sendDocumentForm.valid) {
      if (this.fileUpload !== '') {
        this.sendreg = true;
        this._profile.documentCreate(this.sendDocumentForm.value).subscribe(
          (res: any) => {
            if (res.success === true) {
              this.snackBar.open('مدارک با موفقیت ارسال شد.', 'بستن', {
                duration: 8000
              });
              this.sendDocument.resetForm();
              this.openStatus = false;

            } else {
              this.snackBar.open('خطا در سرور، لطفا دوباره امتحان کنید.', 'بستن', {
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
            this.documentMyList();
            this.sendreg = false;
          }
        );
      } else {
        this.snackBar.open('فایلی انتخاب نکرده‌اید', 'بستن', {
          duration: 8000
        });
      }
    }

  }

  documentMyList() {
    this.loading = true;
    this._profile.documentMyList().subscribe(
      data => {
        // console.log(data);
        this.items = data;
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


  documentDelete(id) {
    if (confirm('آیا از حذف این مدارک مطمئن هستید؟')) {
      this._profile.documentDelete(id).subscribe(
        data => {
          // console.log(data);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.documentMyList();
        }
      );
    }
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
    this.fileUpload = JSON.parse(event.xhr.response);
    this.uploadTextBtn = 'فایل آپلود شد';
  }

}
