import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { GlobalService } from '../../../../services/global.service';
import { AuthService } from '../../../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
// Services
// import { GlobalService } from '../../../../../services/global.service';
// import { AuthService } from '../../../../../services/auth.service';
// import { ProfileService } from '../../../../profile/services/profile.service';

@Component({
  selector: 'app-popup-list-profile',
  templateUrl: './popup-list-profile.component.html',
  styleUrls: ['./popup-list-profile.component.scss']
})
export class PopupListProfileComponent implements OnInit {

  image_url;
  public loading = true;
  public loadingTable = false;
  public cols: any[];
  public products: any[];

  public id = 0;
  public name = '';
  public answer = '';

  constructor(public dialogRef: MatDialogRef<PopupListProfileComponent>,
    private _global: GlobalService,
    private _auth: AuthService,
    private _profile: ProfileService,
    public snackBar: MatSnackBar,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.image_url = this._global.BASE_IMAGE_API_URL;
    this.id = this.data.id;
    this.name = this.data.name;
  }

  ngOnInit() {
    this.getPurchaseRequestReplylist(this.id);
  }

  getPurchaseRequestReplylist(id) {
    this.loadingTable = true;
    this._profile.getPurchaseRequestReplylist(id).subscribe(
      data => {
        console.log(data);
        this.products = data;
      },
      error => { },
      () => {
        this.loadingTable = false;
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  isReadApplicant(id) {
    this.loadingTable = true;
    this._profile.purchaseRequestApplicantRead(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.getPurchaseRequestReplylist(this.id);
      }
    );
  }

}
