import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  step = 0;
  image_url;
  public loading = true;
  public loadingTable = true;
  public loadingTable2 = true;
  public cols: any[];
  public sentMessages: any[];
  public receiveMessages: any[];

  constructor(private _profile: ProfileService,
    private _auth: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.getSentUserMessages();
    this.getReceiveUserMessages();
  }

  isRead(id) {
    this._profile.SellerReadMessages(id).subscribe(
      data => {
        this.getReceiveUserMessages();
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
      
      }
    );
  }

  getSentUserMessages() {
    this._profile.getSentUserMessages().subscribe(
      data => {
        this.sentMessages = data;
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.loading = true;
        this.loadingTable = false;
      }
    );
  }

  getReceiveUserMessages() {
    this._profile.getReceiveUserMessages().subscribe(
      data => {
        this.receiveMessages = data;
        console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.loading = true;
        this.loadingTable2 = false;
      }
    );
  }

}
