import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-permission-messages',
  templateUrl: './permission-messages.component.html',
  styleUrls: ['./permission-messages.component.scss']
})
export class PermissionMessagesComponent implements OnInit {

  public page = '';
  public message = '';
  public status = '';

  constructor(public snackBar: MatSnackBar,
    private _auth: AuthService,
    public dialogRef: MatDialogRef<PermissionMessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.page = this.data.page;
    this.message = this.data.message;
    this.status = this.data.status;
  }

  close(): void {
    this.dialogRef.close();
  }

}
