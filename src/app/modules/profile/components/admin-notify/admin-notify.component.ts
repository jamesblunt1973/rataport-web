import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../../services/auth.service';
import { GlobalService } from '../../../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-notify',
  templateUrl: './admin-notify.component.html',
  styleUrls: ['./admin-notify.component.scss']
})
export class AdminNotifyComponent implements OnInit {

  step = 0;
  image_url;
  public loading = true;
  public loadingTable = false;
  public cols: any[];
  public notifications: any[];

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _global: GlobalService,
    private _router: Router) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.cols = [
      { field: 'createdOn', header: 'createdOn' },
      { field: 'id', header: 'id' },
      { field: 'description', header: 'description' },
      { field: 'isRead', header: 'isRead' },
      { field: 'title', header: 'title' },
      { field: 'userID', header: 'userID' }
    ];
    this.getNotifications();
  }

  getNotifications() {
    this._profile.getNotifications().subscribe(
      data => {
        console.log(data);
        this.notifications = data;
      },
      error => { },
      () => { }
    );
  }

  deleteNotification(id) {
    if (confirm('آیا از حذف این اطلاعیه مطمئن هستید؟')) {
      this._profile.deleteNotification(id).subscribe(
        data => {
          // console.log(data);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.getNotifications();
        }
      );
    }
  }

  ReadAndGo(id, kind) {

    this._profile.readNotification(id).subscribe(
      data => {
        // alert(kind);
        if (kind === 0) {
          this._router.navigateByUrl('/profile/manage-products');
        } else if (kind === 1) {
          this._router.navigateByUrl('/profile/inbox/discount');
        } else if (kind === 2) {
          this._router.navigateByUrl('/profile/inbox/offer');
        } else if (kind === 3) { // Comment
         // this._router.navigateByUrl('/profile/manage-products');
        } else if (kind === 4) { // Certificate
          this._router.navigateByUrl('/profile/certificates');
        } else if (kind === 5) { // AdminMessage
        
        } else if (kind === 6) { // Brand
          this._router.navigateByUrl('/profile/brands');
        } else if (kind === 7) { // Request
          this._router.navigateByUrl('/profile/inbox/purchase-request');
        } else if (kind === 8) { // Notify
          this._router.navigateByUrl('/');
        } else if (kind === 9) { // Inquery
          this._router.navigateByUrl('/profile/inbox/price-inquery');
        } else if (kind === 10) { // Question
          this._router.navigateByUrl('/profile/inbox/question');
        } else if (kind === 11) { // Negotiate
          this._router.navigateByUrl('/profile/inbox/negotiate');
        } else if (kind === 12) { // Message
          this._router.navigateByUrl('/profile/inbox/messages');
        } else if (kind === 13) { // SpecialBadge
          this._router.navigateByUrl('/profile/sign/special');
        } else if (kind === 14) { // TrustBadge
          this._router.navigateByUrl('/profile/sign/trust');
        } else if (kind === 15) { // GuranteeBadge
          this._router.navigateByUrl('/profile/sign/guarantee');
        } else if (kind === 16) { // Order
          this._router.navigateByUrl('/profile/inbox/order');
        } else if (kind === 17) { // SecureOrder
          this._router.navigateByUrl('/profile/inbox/secure-order');
        }

      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.getNotifications();
      }
    );

  }


  deleteAll(name) {
    if (confirm('آیا مطمئن هستید؟')) {
      this._profile.deleteAllNotification({ name: name }).subscribe(
        data => {
          console.log(data);
        },
        error => {
          // if (error.status === 401) {
          //   this._auth.logout();
          // }
        },
        () => {
          this.getNotifications();
        }
      );
    }
  }



}
