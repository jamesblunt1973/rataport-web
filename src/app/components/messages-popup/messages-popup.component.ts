import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
// Services
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-messages-popup',
  templateUrl: './messages-popup.component.html',
  styleUrls: ['./messages-popup.component.scss']
})
export class MessagesPopupComponent implements OnInit {

  public page = '';

  constructor(public dialogRef: MatDialogRef<MessagesPopupComponent>,
    private _global: GlobalService,
    private _auth: AuthService,
    private _route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.page = this.data.page;
  }

  close(): void {
    this.dialogRef.close();
  }

  myNegotiateList() {
    this.close();
    this._route.navigateByUrl('/profile/inbox/negotiate');
  }

}
