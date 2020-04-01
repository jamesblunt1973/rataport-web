import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
// Services
import { ProfileService } from '../../services/profile.service';
import { GlobalService } from '../../../../services/global.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {

  public step = 0;
  public openStatus = true;
  public image_url;
  public loading: boolean;
  public cols: any[];
  public posts: any[];
  public subject = '';
  public type = '';
  public certificates = [];
  public sendreg = false;
  public typeOption = [
    { name: 'گواهینامه' },
    { name: 'دستاورد' },
    { name: 'تاییدیه' },
    { name: 'مجوز' },
    { name: 'فعالیت' }
  ];

  public uploadurl = 'product/upload';
  public uploadTextBtn = 'انتخاب فایل';
  public progressUpload = 0;
  public fileUpload = '';

  public dateObject = '';
  public finalData = [{
    kind: '',
    title: '',
    name: '',
    regDate: ''
  }];

  public typeControl = new FormControl('', [Validators.required]);
  public subjectControl = new FormControl('', [Validators.required]);
  public dateControl = new FormControl('', [Validators.required]);

  constructor(private _profile: ProfileService,
    private builder: FormBuilder,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    private _global: GlobalService) {
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.loadCertificate();
    this.cols = [
      { field: 'createdOn', header: 'createdOn' },
      { field: 'description', header: 'description' },
      { field: 'name', header: 'name' },
      { field: 'regDate', header: 'regDate' },
      { field: 'subject', header: 'subject' },
      { field: 'title', header: 'title' },
      { field: 'id', header: 'id' }
    ];
  }

  addCertificate() {
    this.finalData[0].kind = this.type;
    this.finalData[0].title = this.subject;
    this.finalData[0].name = this.fileUpload;
    this.finalData[0].regDate = this.dateObject;

    if (this.finalData[0].kind !== '' &&
      this.finalData[0].title !== '' &&
      this.finalData[0].name !== '' &&
      this.finalData[0].regDate !== ''
    ) {
      this.sendreg = true;
      this._profile.addCertificate(this.finalData[0]).subscribe(
        (res: any) => {
          console.log(res);
          if (res.success === true) {
            this.snackBar.open(' با موفقیت ثبت شد.', 'بستن', {
              duration: 8000
            });
            this.openStatus = false;
          } else if (res.success === false) {
            this.snackBar.open(res['result'], 'بستن', {
              duration: 8000
            });
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
          this.loadCertificate();
          this.sendreg = false;
        }
      );
    } else {
      this.snackBar.open('همه فیلدها را پرکنید.', 'بستن', {
        duration: 8000
      });
    }



  }

  loadCertificate() {
    this.loading = true;
    this._profile.getCertificates().subscribe(
      data => {
        this.certificates = data['myList'];
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


  deleteCertificate(id) {

    if (confirm('آیا مطمئن هستید؟')) {
      this._profile.deleteCertificate(id).subscribe(
        data => {
          console.log(data);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.loadCertificate();
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
