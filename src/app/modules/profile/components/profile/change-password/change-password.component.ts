import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
// Services
import { ProfileService } from '../../../services/profile.service';
import { GlobalService } from '../../../../../services/global.service';
import { AuthService } from '../../../../../services/auth.service';
import { PasswordValidation } from '../../../../../libraries/passwordValidation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public sendData = false;
  public hide = true;
  public oldhide = true;
  public confirmhide = true;
  public account = {
    password: <string>''
  };
  public oldpassword = '';
  public repassword = '';
  public barLabel = 'امنیت رمز عبور : ';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  public oldPasswordControl = new FormControl('', [Validators.required]);
  public passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public rePasswordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private _profile: ProfileService,
    public snackBar: MatSnackBar,
    private _global: GlobalService,
    private _router: Router,
    public dialog: MatDialog,
    private builder: FormBuilder,
    private _auth: AuthService) {
  }

  public passwordForm: FormGroup = this.builder.group({
    OldPassword: this.oldPasswordControl,
    NewPassword: this.passwordControl,
    ConfirmPassword: this.rePasswordControl
  }, {
      validator: PasswordValidation.MatchPassword
    });

  ngOnInit() { }

  updatePassword(data: any) {
    if (this.passwordForm.valid) {
      this.sendData = true;
      this._auth.changePass(data).subscribe(
        result => {
          if (result === true) {
            this.openSnackBar('رمز عبور شما با موفقیت تغییر یافت!', 'بستن');
            this._router.navigateByUrl('/profile/dashboard');
          } else if (result[0].description === 'Incorrect password.') {
            this.openSnackBar('رمز عبور فعلی اشتباه است!', 'بستن');
          } else {
            this.openSnackBar('خطا در سمت سرور، لطفا مجددا تست کنید!', 'بستن');
          }
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.sendData = false;
        }
      );
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
