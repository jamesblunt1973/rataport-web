import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
// Services
import { ProfileService } from '../../../services/profile.service';
import { GlobalService } from '../../../../../services/global.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss']
})
export class BankInfoComponent implements OnInit {

  public sendData = false;
  public bankName = '';
  public NameOfAccountHolder = '';
  public accountNumber = '';
  public cardNumber = '';
  public shebaNumber = '';

  status = false;

  public bankNameCtrl = new FormControl('', [Validators.required]);
  public NameOfAccountHolderCtrl = new FormControl('', [Validators.required]);
  public accountNumberCtrl = new FormControl('', [Validators.required]);
  public cardNumberCtrl = new FormControl('');
  public shebaNumberCtrl = new FormControl('', [Validators.required]);

  constructor(private _profile: ProfileService,
    public snackBar: MatSnackBar,
    private _global: GlobalService,
    public dialog: MatDialog,
    private builder: FormBuilder,
    private _auth: AuthService) {
  }

  public bankInfoForm: FormGroup = this.builder.group({
    BankName: this.bankNameCtrl,
    Name: this.NameOfAccountHolderCtrl,
    Account: this.accountNumberCtrl,
    Card: this.cardNumberCtrl,
    Shaba: this.shebaNumberCtrl
  });

  ngOnInit() {
    this.loadBankInfoo();
  }

  loadBankInfoo() {
    this._profile.getBankInfo().subscribe(
      data => {
        // console.log(data);
        if (data) {
          this.bankName = data['bankName'];
          this.NameOfAccountHolder = data['name'];
          this.accountNumber = data['account'];
          this.cardNumber = data['card'];
          this.shebaNumber = data['shaba'];
        }
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.status = true;
      }
    );
  }

  updateBankInfo(data) {
    this.bankInfoForm.setValue({
      BankName: this.bankNameCtrl.value,
      Name: this.NameOfAccountHolderCtrl.value,
      Account: (this.accountNumberCtrl.value).toString(),
      Card: this.cardNumber,
      Shaba: (this.shebaNumberCtrl.value)
    });
    // console.log(this.bankInfoForm.value);

    if (this.bankInfoForm.valid) {
      this.sendData = true;
      this._profile.updateBankInfo(this.bankInfoForm.value).subscribe(
        result => {
          // console.log(result);
          if (result.success) {
            this.snackBar.open('اطلاعات بانکی شما با موفقیت بروزرسانی شد.', 'بستن', {
              duration: 8000
            });
          } else {
            this.snackBar.open('خطا در سمت سرور، لطفا دوباره امتحان کنید.', 'بستن', {
              duration: 8000
            });
          }
        },
        error => {
          this.sendData = false;
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

}
