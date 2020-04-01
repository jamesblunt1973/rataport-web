import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

// Services
import { AuthService } from '../../services/auth.service';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'forgotpassword',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, DoCheck {
  public account = {
    password: <string>null
  };
  public CodeControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public rePasswordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  param1: string;
  param2: string;
  Code:string;
  loginStatus = false;

  loading = false;

  confirmData = {
    userId: '',
    code: '',
    password:'',
    confirmPassword:''
  };

  constructor(private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private builder: FormBuilder,
    public _route: Router,
    private _auth: AuthService,
    public dialog: MatDialog,
    private _activate: AuthService) {
    this.route.queryParams.subscribe(params => {
      this.param1 = params['userId'];
      this.param2 = params['code'];

      this.confirmData.userId = this.param1;
      this.confirmData.code = this.param2;
    });
  }
  public ConfirmCodeForm: FormGroup = this.builder.group({
    Code: this.CodeControl,
    password:this.passwordControl,
    confirmPassword:this.rePasswordControl
  });
  ngOnInit() {
    this.confirm(this.confirmData);
  }

  ngDoCheck() {
    if (this._auth.checkLogin()) {
      this.loginStatus = true;
      //this._route.navigateByUrl('/');
    } else {
      this.loginStatus = false;
    }
  }

openModal(data: any) {
    if(this.ConfirmCodeForm.valid){
      console.log(data);
    this.confirmData.userId = this.param1;
    this.confirmData.code = data.Code;
    this.confirmData.password=data.password;
    this.confirmData.confirmPassword= data.confirmPassword
    this._activate.resetForgotPassword(this.confirmData).subscribe(
      result => {
        if (result) {
          this.loading = true;
          this._route.navigateByUrl('/');
          this.snackBar.open('اکانت شما با موفقیت فعال شد شما میتوانید وارد شوید!', 'فعال سازی', {
            duration: 8000
          });
        } else {
          this.openSnackBar('کد فعال سازی اشتباه می باشد یا خطایی در سرور اتفاق افتاده است مجدد امتحان نمایید', 'بستن');
        }
      },
      error => { },
      () => { }
    );
  }
    //this.dialog.open(LogInComponent);
  }

  confirm(data) {
    this.loading = true;
    // this._activate.confirmEmail(data).subscribe(
    //   result => {
    //     console.log(result);
    //     if (result) {
    //       this.loading = true;
    //     } else {
    //       this.openSnackBar('خطا در سرور, لطفا مجددا امتحان کنید!', 'بستن');
    //     }
    //   },
    //   error => { },
    //   () => { }
    // );
  }

  mainpage() {
    this._route.navigateByUrl('/');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


}
