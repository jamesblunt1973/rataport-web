import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
// Components
import { LogInComponent } from '../../../../../share/share-components';
// Services
import { AuthService } from '../../../../../services/auth.service';
import { GlobalService } from '../../../../../services/global.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-tab-question-answer',
  templateUrl: './tab-question-answer.component.html',
  styleUrls: ['./tab-question-answer.component.scss']
})
export class TabQuestionAnswerComponent implements OnInit {

  @Input() productDetail;
  sendreg = false;
  questions = [];

  public questionCtrl = new FormControl('', [Validators.required]);

  @ViewChild(FormGroupDirective, { static: true }) messageForm;

  constructor(private _auth: AuthService,
    private _global: GlobalService,
    private _product: ProductService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private builder: FormBuilder) { }

  public registerQuestionForm: FormGroup = this.builder.group({
    ProductID: 0,
    Question: this.questionCtrl
  });

  ngOnInit() {
    this.questions = this.productDetail['questions'];
    console.log(this.questions);
  }

  registerProductQuestion(data) {
    if (this._auth.checkLogin()) {
      if (this.registerQuestionForm.valid) {
        this.registerQuestionForm.setValue({
          ProductID: this.productDetail.productDetails.id,
          Question: this.questionCtrl.value
        });
        this.sendreg = true;
        this._product.registerProductQuestion(this.registerQuestionForm.value).subscribe(
          result => {
            if (result['success'] === true) {
              this.snackBar.open('سوال شما با موفقیت ثبت شد، منتظر تایید مدیریت باشید!', 'بستن', {
                duration: 8000
              });
            }
            this.messageForm.resetForm();
          },
          error => {
            if (error.status === 401) {
              this._auth.logout();
            }
          },
          () => {
            this.sendreg = false;
          }
        );
      }
    } else {
      this.openLogin();
    }
  }

  public openLogin() {
    this.dialog.open(LogInComponent);
  }

}
