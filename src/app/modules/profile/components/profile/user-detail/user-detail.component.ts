import { Component, OnInit } from '@angular/core';
import { MatDialog, fadeInContent, transformMenu } from '@angular/material';
// Services
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { GlobalService } from '../../../../../services/global.service';
import { AddSupporterComponent } from '../add-supporter/add-supporter.component';
import { Router } from '@angular/router';
import { PermissionMessagesComponent } from '../../../../../share/share-components';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public user;
  public userStatus = false;
  public image_url;
  public membersMax = 0;
  public membersCount = 0;
  public allowAdd = true;
  public disableButton = true;
  public membership = { id: 0, type: '', persianName: '' };

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    public dialog: MatDialog,
    private _router: Router,
    private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.getUserData();
    this.getPermission();
  }

  getPermission() {
    this.membership = this._auth.getPermission();
    console.log(this.membership);
    //if (this.membership['id'] === 1) {
    //  this.disableButton = true;
    //} else if (this.membership['id'] === 2) {
    //  this.disableButton = false;
    //}
  }

  getUserData() {
    this._profile.currentUser().subscribe(
      data => {
        this.user = data;
        console.log(data);
        this.membersMax = data['membersMax'];
        this.membersCount = data['membersCount'];
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        if (this.membersCount >= this.membersMax) {
          this.allowAdd = false;
          this.disableButton = true;
        } else {
          this.allowAdd = true;
          this.disableButton = false;
        }
        this.userStatus = true;
      }
    );
  }

  openModal() {
    const dialogRef = this.dialog.open(AddSupporterComponent, { data: { name: 'addMember' } });
    dialogRef.componentInstance.updateUserData.subscribe(() => {
      this.getUserData();
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }


  deleteSupporter(id) {
    if (confirm('آیا از حذف این عضو مطمئن هستید؟')) {
      this._profile.deletePerson(id).subscribe(
        data => {
          console.log(data);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.getUserData();
        }
      );
    }
  }

  sellerPage(id) {
    this._router.navigateByUrl('/seller/' + id);
  }

  permissionMessageModal(page, message, status) {
    const dialogRef = this.dialog.open(PermissionMessagesComponent, { data: { page: page, message: message, status: status } });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

}
