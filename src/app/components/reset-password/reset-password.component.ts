import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestPasswordValidation } from '../../libraries/resetPasswordValidation';
import { MatSnackBar } from '@angular/material';
// Services
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  param1: string;
  param2: string;
  public hide = true;
  public hideConfirm = true;
  public send = false;

  constructor(private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private builder: FormBuilder,
    private _route: Router,
    private _reset: AuthService) {
    this.route.queryParams.subscribe(params => {
      this.param1 = params['userEmail'];
      this.param2 = params['code'];
    });
  }

  public newPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public confirmNewPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

  public resetForm: FormGroup = this.builder.group({
    Password: this.newPassword,
    ConfirmPassword: this.confirmNewPassword,
    email: this.param1,
    code: this.param2
  }, {
      validator: RestPasswordValidation.MatchPassword
    });

  ngOnInit() {
    this.resetForm.setValue({
      Password: this.newPassword.value,
      ConfirmPassword: this.confirmNewPassword.value,
      email: this.param1,
      code: this.param2
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  resetPassword(data: any) {
    console.log(data);
    if (this.resetForm.valid) {
      this.send = true;
      this._reset.resetPass(data).subscribe(
        result => {
          if (result) {
            this.openSnackBar('رمز عبور شما تغییر یافت !', 'بستن');
            alert('رمز عبور شما تغییر یافت');
            this._route.navigateByUrl('');
          } else {
            this.openSnackBar('خطا در سرور، لطفا دوباره امتحان کنید!.', 'بستن');
          }
        },
        error => { },
        () => {
          this.send = false;
        }
      );
    }
  }
}
