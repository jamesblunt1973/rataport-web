import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';

import { Payment } from '../../../payment';

@Component({
  selector: 'app-special-badge',
  templateUrl: './special-badge.component.html',
  styleUrls: ['./special-badge.component.scss']
})
export class SpecialBadgeComponent implements OnInit {

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog,
    private _global: GlobalService) { }

  ngOnInit() {
    this.sellerBadgesStatus();
   
  }

  
  public refId: any;
  public data1: any;

  sellerBadgesStatus() {
    this._profile.sellerBadgesStatus().subscribe(
      data => {
        this.data1 = data;
        console.log(this.data1);
      },
      error => {
        //if (error.status === 401) {
        //  this._auth.logout();
        //}
      },
      () => {
       
      }
    );
  }

  specialBadgeCreate() {
    this._profile.specialBadgeCreate("").subscribe(data => {

      this.refId = data;
    },
      error => {

      },
      () => {
        this._profile.specialBadgePayment(this.refId.result);
      });
  }

  fee() {
    this._router.navigateByUrl('/fee');
  }
  pay() {
    this.specialBadgeCreate();
    
    //this._profile.specialBadgePayment(this.refId.result).subscribe(data => {

    //  console.log(data) ;
    //},
    //  error => {

    //  },
    //  () => {

    //  });
  }
}
