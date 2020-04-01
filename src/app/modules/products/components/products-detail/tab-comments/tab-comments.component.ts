import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
// Components
import { LogInComponent } from '../../../../../share/share-components';
// Services
import { AuthService } from '../../../../../services/auth.service';
import { GlobalService } from '../../../../../services/global.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-comments',
  templateUrl: './tab-comments.component.html',
  styleUrls: ['./tab-comments.component.scss']
})
export class TabCommentsComponent implements OnInit {

  sendreg = false;
  rate = 0;
  id = 0;
  @Input() comments;
  @Input() rateIn;
  @Input() productId;
  public commentCtrl = new FormControl('', [Validators.required]);

  @ViewChild(FormGroupDirective, { static: true }) messageForm;

  constructor(private _auth: AuthService,
    private _global: GlobalService,
    private _product: ProductService,
    private _route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private builder: FormBuilder) { }

  public registerCommentForm: FormGroup = this.builder.group({
    ProductID: 0,
    description: this.commentCtrl,
    Title: '',
    Rate: ''
  });

  ngOnInit() {
    this.id = parseInt(this._route.snapshot.paramMap.get('id'), 10);
    this.rate = this.rateIn['value'];
    // if (this._auth.checkLogin()) {
    // } else {
    //   this.rate = 0;
    //   this.rateIn.status = false;
    //   this.rateIn.value = 0;
    // }
  }

  registerProductComment(data) {
    if (this._auth.checkLogin()) {
      if (this.registerCommentForm.valid) {
        this.registerCommentForm.setValue({
          ProductID: this.productId,
          description: this.commentCtrl.value,
          Title: '',
          Rate: ''
        });

        this.sendreg = true;
        this._product.registerProductComment(this.registerCommentForm.value).subscribe(
          result => {
            console.log(result);
            if (result['success'] === true) {
              this.snackBar.open('نظر شما با موفقیت ثبت شد، منتظر تایید مدیریت باشید!', 'بستن', {
                duration: 8000
              });
              this.messageForm.resetForm();
            }
          },
          error => { },
          () => {
            this.sendreg = false;
          }
        );
      }
    } else {
      this.openLogin();
    }
  }

  rateProduct() {
    if (this._auth.checkLogin()) {
      if (this.rate !== 0) {
        const params = {
          TargetID: this.id,
          RateNo: this.rate
        };
        this._product.rateProduct(params).subscribe(
          data => {
            console.log(data);
            if (data) {
              this.snackBar.open('امتیاز شما با موفقیت ثبت شد!', 'بستن', {
                duration: 8000
              });
              location.reload();
            }
          },
          error => { },
          () => { }
        );
      } else {
        this.snackBar.open('شما هنوز امتیازی انتخاب نکرده‌اید!', 'بستن', {
          duration: 8000
        });
      }
    } else {
      this.openLogin();
    }
  }

  public openLogin() {
    this.dialog.open(LogInComponent);
  }

}
