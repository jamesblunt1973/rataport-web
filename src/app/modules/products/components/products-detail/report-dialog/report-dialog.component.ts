import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthService } from '../../../../../services/auth.service';
import { ProfileService } from '../../../../profile/services/profile.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  public groupName = '';
  public mobile = '';
  public namePerson = '';
  public email = '';
  public sendAdd = false;
  public mobileError = false;

  public groupNameCtrl = new FormControl('', [Validators.required]);
  public nameCtrl = new FormControl('', [Validators.required]);
  public mobileCtrl = new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
  public emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  public messageCtrl = new FormControl('', [Validators.required]);

  constructor(public snackBar: MatSnackBar,
    private builder: FormBuilder,
    private _auth: AuthService,
    private _profile: ProfileService,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public registerReportForm: FormGroup = this.builder.group({
    ProductID: this.data.id,
    Name: this.nameCtrl,
    Email: this.emailCtrl,
    Mobile: this.mobileCtrl,
    GroupName: this.groupNameCtrl,
    Description: this.messageCtrl
  });

  ngOnInit() {
    console.log(this.data.id);
  }

  registerReport(data) {
    if (this.groupNameCtrl.valid) {
      if (this.registerReportForm.valid) {
        this.sendAdd = true;
        this._profile.registerReport(data).subscribe(
          result => {
            if (result['success']) {
              this.close();
              this.openSnackBar('گزارش با موفقیت ارسال شد', 'بستن');
            } else {
              this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
            }
            console.log(result);
          },
          error => {
            // if (error.status === 401) {
            //   this._auth.logout();
            // }
            this.sendAdd = false;
          },
          () => {
            this.sendAdd = false;
          }
        );
      }
    } else {
      this.openSnackBar('یکی از دسته‌بندی‌ها را انتخاب کنید!', 'بستن');
    }
  }

  mobileValidate() {
    // if (this.mobile !== null && this.mobile !== '') {
    //   const mobile = this.mobile.toString();
    //   if (mobile.length < 11 || mobile.length > 11) {
    //     this.mobileCtrl.setErrors({
    //       minLength: true
    //     });
    //     console.log(this.mobileCtrl.errors);
    //   } else {
    //     this.mobileCtrl.setErrors({
    //       minLength: false
    //     });
    //   }
    // }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
