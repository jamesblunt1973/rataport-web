import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-guarantee-badge',
  templateUrl: './guarantee-badge.component.html',
  styleUrls: ['./guarantee-badge.component.scss']
})
export class GuaranteeBadgeComponent implements OnInit {

  constructor(private _route: Router, private _profile: ProfileService) { }

  public data1: any;

  ngOnInit() {
    this.sellerBadgesStatus();
  }

  gotoSpecialPage() {
    this._route.navigateByUrl('/profile/sign/special');
  }

  sellerBadgesStatus() {
    this._profile.sellerBadgesStatus().subscribe(data => {
      this.data1 = data;
    },
      error => {

      },
      () => {

      });
  }
}
