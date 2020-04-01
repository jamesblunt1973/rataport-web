import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
// Services
import { AuthService } from '../../services/auth.service';
import { SiteinfoService } from '../../services/siteinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  msgs: any[] = [];
  public captchaLogin = false;
  public captchaRegister = false;
  public captchaForget = false;
  public sendLogin = false;
  public sendreg = false;
  public sendreset = false;
  public userInfo: any;
  public indexSelected = 0;
  public legal = '';
  public managementName = '';
  public Brand = '';
  public BrandInEnglish = '';
  public hide = true;
  public hidepass = true;
  public confirmhide = true;
  public regionsStatus = false;
  // User status
  public loggedIn = false;
  public regions: any;
  public account = {
    password: <string>null
  };
  public barLabel = 'امنیت رمز عبور : ';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  public emailRegControl = new FormControl('', [Validators.required, Validators.email]);
  //public adminNameControl = new FormControl('', [Validators.required]);
  //public BrandControl = new FormControl('', [Validators.required]);
  //public BrandEnglishControl = new FormControl('', [Validators.required]);
  //public activityControl = new FormControl('', [Validators.required]);
  public kasbokarControl = new FormControl('', [Validators.required]);
  public cellphoneControl = new FormControl('', [Validators.required, Validators.minLength(11)]);
  public passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public rePasswordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public emailLoginControl = new FormControl('', [Validators.required, Validators.email]);
  public loginPasswordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public emailForgotControl = new FormControl('', [Validators.required, Validators.email]);
  public remembermeControl = new FormControl(false);
  public legalControl = new FormControl('', [Validators.required]);
  //public provinceControl = new FormControl('', [Validators.required]);
  //public prephoneControl = new FormControl('', []);
  //public phoneControl = new FormControl('', []);
  public emailNewLetterControl = new FormControl(false);
  public agreeCtrl = new FormControl(false);

  kasbokar = [
    { value: 'فروشنده', viewValue: 'فروشنده' },
    { value: 'خریدار', viewValue: 'خریدار' },
  ];

  activities = [
    { value: 'تولید کننده', viewValue: 'تولید کننده' },
    { value: 'واردکننده', viewValue: 'واردکننده' },
    { value: 'عمده فروش', viewValue: 'عمده فروش' },
    { value: 'خرده فروش', viewValue: 'خرده فروش' },
  ];

  provinces = [];

  constructor(public snackBar: MatSnackBar,
    private builder: FormBuilder,
    private _siteinfo: SiteinfoService,
    private _auth: AuthService,
    private _router: Router,
    public dialogRef: MatDialogRef<LogInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }


  public loginForm: FormGroup = this.builder.group({
    email: this.cellphoneControl,
    password: this.loginPasswordControl,
    rememberMe: this.remembermeControl
  });

  public registerForm: FormGroup = this.builder.group({
    Legal: this.legalControl,
    //BusinessType: this.kasbokarControl,
    //ActivityType: this.activityControl,
    //CEO: this.adminNameControl,
    //Brand: this.BrandControl,
    //BrandInEnglish: this.BrandEnglishControl,
    //CityID: this.provinceControl,
    Mobile1: this.cellphoneControl,
    //areaCode: this.prephoneControl,
    //Tel1: this.phoneControl,
    //email: this.emailRegControl,
    password: this.passwordControl,
    ConfirmPassword: this.rePasswordControl,
   // EmailNewLetter: this.emailNewLetterControl
  });

  public forgetPasswordForm: FormGroup = this.builder.group({
    email: this.cellphoneControl
  });

  ngOnInit() {
    if (this.data) {
      const tab = this.data.tab;
      if (tab === 'register') {
        this.indexSelected = 1;
      }
    }
    this.loadRegion();
  }

  login(data: any) {
    if (this.loginForm.valid) {
      if (true) {
        // if (this.captchaLogin) {
        // if (!this.captchaLogin) {
        this.sendLogin = true;
        this._auth.login(data).subscribe(
          (res: any) => {
            if (res.success === true) {
              this.userInfo = res.userInfo;
              this._auth.setUser(res.auth_token);
              this._auth.setMembership(res.userInfo.membershipKind);

              // if user found
              this.snackBar.open('شما با موفقیت وارد شدید!', 'بستن', {
                duration: 8000
              });
              this.onNoClick();
              this.loggedIn = true;
              location.reload();
            } else if (res.success === false) {
              // if user not found
              this.snackBar.open(res.result, 'بستن', {
                duration: 8000
              });
            }
          },
          error => {
            this.sendLogin = false;
            // this.loginForm.reset();
          },
          () => {
            this.sendLogin = false;
          }
        );
      } else {
        this.snackBar.open('لطفا تیک من ربات نیستم را علامت دار کنید!', 'بستن', {
          duration: 8000
        });
      }

    }
  } // end login

  registerUser(data: any) {
    if (this.registerForm.valid) {
      // if (this.captchaRegister) {
        //  if (!this.captchaRegister) {
        if (this.agreeCtrl.value) {
          this.sendreg = true;
          this._auth.register(data).subscribe(
            res => {
              if (res.success === true) {
                this.snackBar.open('ثبت نام شما با موفقیت انجام شد، لطفا کد فعال سازی را وارد نمایید!', 'بستن', {
                  duration: 8000
                });
                this.onNoClick();
                console.log(res);
                this._router.navigateByUrl(res.result);
              } 
              else if (res.succeeded === false && res['errors'][0].code === 'DuplicateUserName') {
                this.snackBar.open('با این تلفن قبلا در سایت ثبت نام شده است!', 'بستن', {
                  duration: 8000
                });
              }
            },
            error => { },
            () => {
              this.sendreg = false;
            }
          );
        // // } else {
        // //   this.snackBar.open('لطفا تیک توافق نامه را علامت دار کنید!', 'بستن', {
        // //     duration: 8000
        // //   });
        // }
      } else {
        this.snackBar.open('لطفا توافق نامه کاربری سایت را علامت دار کنید!', 'بستن', {
          duration: 8000
        });
      }
    } else {
      //   this.openSnackBar('Please agree terms and conditions!', 'Close');
    }
  } // end register

  forgetPasswordUser(data: any) {
    if (this.forgetPasswordForm.valid) {
      console.log(data);
      // if (this.captchaForget) {
        this.sendreset = true;
        this._auth.forgotPassword(data).subscribe(
          res => {
            console.log(res);
            if (res['success']) {
              this.onNoClick();
              this._router.navigateByUrl(res.result);
              this.snackBar.open('پیامک فعال سازی و فراموشی رمز عبور به تلفن همراه شما ارسال شد!', 'بستن', {
                duration: 8000
              });
            } else {
              this.snackBar.open(res['result'], 'بستن', {
                duration: 8000
              });
            }
          },
          error => { },
          () => {
            this.sendreset = false;
          }
        );
      // }
      // else {
      //   this.snackBar.open('لطفا تیک من ربات نیستم را علامت دار کنید!', 'بستن', {
      //     duration: 8000
      //   });
      // }
    }
  }

  loadRegion() {
    this._siteinfo.getRegion().subscribe(
      data => {
        this.regions = data;
      },
      error => { },
      () => {
        this.regionsStatus = true;
      }
    );
  }

  showResponseLogin(event) {
    // this.msgs = [];
    // this.msgs.push({ severity: 'info', summary: 'Succees', detail: 'User Responded' });
    this.captchaLogin = true;
  }

  showResponseRegister(event) {
    this.captchaRegister = true;
  }

  showResponseForget(event) {
    this.captchaForget = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  gotologin() {
    this.indexSelected = 0;
  }

  gotoregister() {
    this.indexSelected = 1;
  }

  forgetPass() {
    this.indexSelected = 2;
  }

  tabChanged(event) {
    if (event.index === 0) {
      this.indexSelected = 0;
    } else if (event.index === 1) {
      this.indexSelected = 1;
    } else if (event.index === 2) {
      this.indexSelected = 2;
    }
  }

}
