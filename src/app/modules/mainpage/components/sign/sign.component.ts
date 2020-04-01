import { Component, OnInit } from '@angular/core';
import { LogInComponent } from '../../../../share/share-components';
import { AuthService } from '../../../../services/auth.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(private _auth: AuthService,
    private _route: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openModal() {
    this.dialog.open(LogInComponent);
  }

  sign(name) {
    switch (name) {
      case 'SPECIAL': {
        if (this._auth.checkLogin()) {
          this._route.navigateByUrl('/profile/sign/special');
        } else {
          this.openModal();
        }
        break;
      }
      case 'TRUST': {
        if (this._auth.checkLogin()) {
          this._route.navigateByUrl('/profile/sign/trust');
        } else {
          this.openModal();
        }
        break;
      }
      case 'GUARANTEE': {
        if (this._auth.checkLogin()) {
          this._route.navigateByUrl('/profile/sign/guarantee');
        } else {
          this.openModal();
        }
        break;
      }
      default: {
        break;
      }
    }
  }

}
