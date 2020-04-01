import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';
import { OrderPopupComponent } from '../order-popup/order-popup.component';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  step = 0;
  image_url;
  public loading = true;
  public loadingTable = false;
  public cols: any[];
  public sentQuestions: any[];
  public receivedQuestions: any[];

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'answer', header: 'answer' },
      { field: 'createdDate', header: 'createdDate' },
      { field: 'image', header: 'image' },
      { field: 'productID', header: 'productID' },
      { field: 'productName', header: 'productName' },
      { field: 'question', header: 'question' },
      { field: 'questionConfirm', header: 'questionConfirm' }
    ];
    this.getProductQuestionSentList();
    this.getProductQuestionReceivedList();
  }

  getProductQuestionSentList() {
    this._profile.getProductQuestionSentList().subscribe(
      data => {
        console.log('se');
        console.log(data);
        this.sentQuestions = data;
      },
      error => { },
      () => { }
    );
  }

  getProductQuestionReceivedList() {
    this._profile.getProductQuestionReceivedList().subscribe(
      data => {
        console.log('re');
        console.log(data);
        this.receivedQuestions = data;
      },
      error => { },
      () => { }
    );
  }

  isReadSeller(id) {
    this._profile.productQuestionSellerRead(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.getProductQuestionSentList();
        this.getProductQuestionReceivedList();
      }
    );
  }

  isReadApplicant(id) {
    this._profile.productQuestionApplicantRead(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.getProductQuestionSentList();
        this.getProductQuestionReceivedList();
      }
    );
  }

  public openModal(name: string, id: number) {
    this.dialog.open(OrderPopupComponent, { data: { name: name, id: id } });
  }

}
