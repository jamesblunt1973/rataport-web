import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
// Services
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { GlobalService } from '../../../../../services/global.service';

@Component({
  selector: 'app-trust-badge',
  templateUrl: './trust-badge.component.html',
  styleUrls: ['./trust-badge.component.scss']
})
export class TrustBadgeComponent implements OnInit {

  public data1: any;

  @ViewChild(FormGroupDirective, { static: false }) sendDocument;

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

 


  public descriptionControl = new FormControl('', [Validators.required]);

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    private builder: FormBuilder,
    public snackBar: MatSnackBar,
    private _global: GlobalService) {
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.sellerBadgesStatus();
    this.documentMyList();
  }

  sellerBadgesStatus() {
    this._profile.sellerBadgesStatus().subscribe(data => {
      this.data1 = data;
    },
      error => {

      },
      () => {

      });
  }



 

  public sendDocumentForm: FormGroup = this.builder.group({
    name: this.fileUpload,
    description: this.descriptionControl
  });

  

  sendDocumentFunc(data) {
    this.sendDocumentForm.setValue({
      name: this.fileUpload,
      description: this.descriptionControl.value
     
    });

    if (this.sendDocumentForm.valid) {
      if (this.fileUpload !== '') {
        this.sendreg = true;
        this._profile.trustDocCreate(this.sendDocumentForm.value).subscribe(
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
    this._profile.trustDocMyList().subscribe(
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
      this._profile.trustDocDelete(id).subscribe(
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
