import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalService } from '../../../../../services/global.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {

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
    private _global: GlobalService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'createdOn', header: 'createdOn' },
      { field: 'kind', header: 'kind' },
      { field: 'name', header: 'name' }
    ];
    this.getMyNotify();
  }

  getMyNotify() {
    this._profile.getMyNotify().subscribe(
      data => {
        // console.log(data);
        this.notifications = data;
      },
      error => { },
      () => { }
    );
  }

  deleteNotify(id) {
    if (confirm('آیا از حذف این اطلاعیه مطمئن هستید؟')) {
      this._profile.deleteNotifyMe({ id }).subscribe(
        data => {
          // console.log(data);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.getMyNotify();
        }
      );
    }
  }

}
