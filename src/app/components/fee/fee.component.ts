import { Component, OnInit } from '@angular/core';
import { SiteinfoService } from '../../services/siteinfo.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material';
import { LogInComponent } from '../log-in/log-in.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  step = 0;
  public loading = false;
  items;
  special;
  general;
  regStatus = true;

  constructor(private _siteinfo: SiteinfoService,
    private _auth: AuthService,
    public dialog: MatDialog,
    private _router: Router) { }

  ngOnInit() {
    this.getFAQs();

    if (this._auth.checkLogin()) {
      this.regStatus = false;
    }
  }

  getFAQs() {
    this._siteinfo.getFAQs().subscribe(
      data => {
        this.items = data;
        this.general = data[0];
        this.special = data[1];
        console.log(data);
      },
      error => { },
      () => {
        this.loading = true;
      }
    );
  }

  specialRegister() {
    if (this._auth.checkLogin()) {
      this._router.navigateByUrl('/profile/sign/special');
    } else {
      this.openLogin();
    }
  }

  generalRegister() {
    if (this._auth.checkLogin()) {
      this.regStatus = false;
    } else {
      this.openLoginReg();
    }
  }

  public openLogin() {
    this.dialog.open(LogInComponent, { data: { } });
  }

  public openLoginReg() {
    this.dialog.open(LogInComponent, { data: { tab: 'register' } });
  }

}
