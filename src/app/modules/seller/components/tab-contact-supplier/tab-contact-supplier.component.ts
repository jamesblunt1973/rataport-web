import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from '../../../../services/auth.service';
import { LogInComponent } from '../../../../share/share-components';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-tab-contact-supplier',
  templateUrl: './tab-contact-supplier.component.html',
  styleUrls: ['./tab-contact-supplier.component.scss']
})
export class TabContactSupplierComponent implements OnInit {

  // public tell = '';
  // public mobile = '';
  // public namePerson = '';
  // public email = '';
  public subject = '';
  public sendAdd = false;
  @Input() sellerID;

  // public tellCtrl = new FormControl('', [Validators.required]);
  // public nameCtrl = new FormControl('', [Validators.required]);
  // public mobileCtrl = new FormControl('', [Validators.required]);
  // public emailCtrl = new FormControl('', [Validators.required]);
  public subjectCtrl = new FormControl('', [Validators.required]);
  public messageCtrl = new FormControl('', [Validators.required]);

  @ViewChild(FormGroupDirective, { static: true }) messageForm;

  constructor(public snackBar: MatSnackBar,
    private builder: FormBuilder,
    public dialog: MatDialog,
    private _seller: SellerService,
    private _auth: AuthService) { }

  public registerForm: FormGroup = this.builder.group({
    SellerID: this.sellerID,
    Title: this.subjectCtrl,
    Description: this.messageCtrl,
  });

  ngOnInit() {
    // console.log();
  }

  registerMessage(data) {
    if (this._auth.checkLogin()) {
      if (this.registerForm.valid) {
        this.sendAdd = true;
        this.registerForm.setValue({
          SellerID: this.sellerID,
          Title: this.subjectCtrl.value,
          Description: this.messageCtrl.value,
        });
        // console.log(data);
        this._seller.registerMessage(this.registerForm.value).subscribe(
          result => {
            if (result['success']) {
              this.openSnackBar('پیام شما ارسال شد', 'بستن');
              this.messageForm.resetForm();
            } else {
              this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
            }
            console.log(result);
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
    } else {
      this.openLogin();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  public openLogin() {
    this.dialog.open(LogInComponent);
  }

}
