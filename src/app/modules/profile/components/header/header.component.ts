import { Component, OnInit, Input } from '@angular/core';
import 'owl.carousel';
import { GlobalService } from '../../../../services/global.service';
import { AuthService } from '../../../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title;
  public loading = false;
  public info = [];
  public notifyNum = [];
  public messageStatus = false;

  constructor(private _profile: ProfileService,
    private _global: GlobalService,
    private _router: Router,
    private _auth: AuthService) {
  }

  ngOnInit() {
    this.get24();
    this.getUnreadMessages();
  }

  get24() {
    this._profile.getLast24Hour().subscribe(
      data => {
        // console.log(data);
        this.info = data;
      },
      error => { },
      () => {
        this.loading = true;
      }
    );
  }

  callOwlCarousel() {
    $('.products-wrap').owlCarousel({
      items: 1,
      nav: false,
      dots: false,
      dot: false,
      rtl: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: false,
      loop: true,
      margin: 10,
    });
  }

  notify() {
    this._router.navigateByUrl('/profile/admin-notify');
  }

  getUnreadMessages() {
    this._profile.getUnreadMessages().subscribe(
      data => {
        this.notifyNum = data;
        // console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.messageStatus = true;
      }
    );
  }

}
