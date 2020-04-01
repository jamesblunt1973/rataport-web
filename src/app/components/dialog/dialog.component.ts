import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
// Services
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public requestType = '';

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    private _global: GlobalService,
    private _auth: AuthService,
    private _route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.requestType = this.data.name;
    // if (this.requestType === 'addSupporter') {
    //   this.title = 'ثبت پشتیبان جدید';
    //   this.status = true;
    // } else if (this.requestType === 'addMember') {
    //   this.title = 'ثبت عضو جدید';
    //   this.status = false;
    // }
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmAddProduct() {
    this.close();
    this._route.navigateByUrl('/profile/manage-products');
  }

}
