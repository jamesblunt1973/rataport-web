import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
// Services
import { GlobalService } from '../../../../../services/global.service';
import { AuthService } from '../../../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-supporter',
  templateUrl: './add-supporter.component.html',
  styleUrls: ['./add-supporter.component.scss']
})
export class AddSupporterComponent implements OnInit {

  public uploadurl = 'AttachFile/Upload';
  public uploadTextBtn = 'انتخاب تصویر';
  public progressUpload = 0;
  public finalImage = '';

  updateUserData = new EventEmitter();

  public requestType = '';
  public name = '';
  public phone = '';
  public title = '';
  public status: boolean;
  public post = '';
  public sendAdd = false;
  public kindStatus = 0;

  public nameCtrl = new FormControl('', [Validators.required]);
  public phoneCtrl = new FormControl('', [Validators.required]);
  public postCtrl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<AddSupporterComponent>,
    private _global: GlobalService,
    public snackBar: MatSnackBar,
    private _auth: AuthService,
    private _router: Router,
    private _profile: ProfileService,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
  }

  public registerForm: FormGroup = this.builder.group({
    Avatar: this.finalImage,
    Name: this.nameCtrl,
    JobPosition: this.postCtrl,
    phone: this.phoneCtrl,
    kind: this.kindStatus
  });

  ngOnInit() {
    this.requestType = this.data.name;
    if (this.requestType === 'addSupporter') {
      this.title = 'ثبت پشتیبان جدید';
      this.kindStatus = 2;
      this.status = true;
    } else if (this.requestType === 'addMember') {
      this.title = 'ثبت عضو جدید';
      this.kindStatus = 1;
      this.status = false;
    }
  }

  updateUserInfo() {
    this.updateUserData.emit();
  }

  register(form) {
    this.registerForm.setValue({
      Avatar: this.finalImage,
      Name: this.nameCtrl.value,
      JobPosition: this.postCtrl.value,
      phone: this.phoneCtrl.value,
      kind: this.kindStatus
    });

    if (this.requestType === 'addMember') {
      if (this.finalImage !== '' &&
        this.name !== '' &&
        this.post !== '') {
        this.registerQuery();
      } else {
        this.openSnackBar('لطفا همه فیلدها را پرکنید', 'بستن');
      }
    } else if (this.requestType === 'addSupporter') {
      if (this.finalImage !== '' &&
        this.name !== '' &&
        this.phone !== '') {
        this.registerQuery();
      } else {
        this.openSnackBar('لطفا همه فیلدها را پرکنید', 'بستن');
      }
    }
  }

  registerQuery() {
    this.sendAdd = true;
    this._profile.registerMember(this.registerForm.value).subscribe(
      data => {
        console.log(data);
        if (data['success']) {
          this.close();
          this.openSnackBar('با موفقیت ثبت شد', 'بستن');
          this.updateUserInfo();
        } else if (data['success'] === false) {
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
        this.finalImage = '';
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  // File uplaod functions
  onSelect(event) {
    this.uploadTextBtn = 'در حال آپلود ...';
  }

  onProgress(event) {
    this.progressUpload = event.progress;
    // console.log(this.progressUpload);
  }

  onBasicUploadAuto(event) {
    const result = JSON.parse(event.xhr.response);
    this.finalImage = result;
    // console.log(result);
    this.uploadTextBtn = 'تصویر آپلود شد';
  }

  onBeforeSend(event) {
    const _token = this._auth.getToken();
    event.xhr.setRequestHeader('Authorization', `bearer ${_token}`);
    // console.log(event);
  }
}
