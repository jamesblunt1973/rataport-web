import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
// Services
import { ProfileService } from '../../services/profile.service';
import { GlobalService } from '../../../../services/global.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  public image_url;
  public user;
  public loading = false;
  public loadingData = false;
  public display: boolean;

  constructor(private _profile: ProfileService,
    private _global: GlobalService,
    private _router: Router,
    private _auth: AuthService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  items: MenuItem[];

  ngOnInit() {
    this.loadInMenu();
    this.getLast24Hour();
    this.items = [
      {
        label: 'پروفایل کاربری',
        icon: 'fa-user',
        items: [
          //{ label: 'اطلاعات کاربری', routerLink: 'dashboard', command: (onclick) => { this.display = false; }, icon: 'fa-mail-reply' },
          { label: 'ویرایش اطلاعات کاربری', routerLink: 'edituser', command: (onclick) => { this.display = false; }, icon: 'fa-mail-reply' },
          // { label: 'اطلاعات تماس', routerLink: 'contactinfo', command: (onclick) => { this.display = false; }, icon: 'fa-mail-reply' },
          // { label: 'اطلاعات بانکی', routerLink: 'bankinfo', command: (onclick) => { this.display = false; }, icon: 'fa-mail-reply' },
          { label: 'تغییر رمز عبور', routerLink: 'changepassword', command: (onclick) => { this.display = false; }, icon: 'fa-mail-reply' },
        ]
      },
      {
        label: 'محصولات',
        icon: 'fa-product-hunt',
        items: [
          { label: 'افزودن محصول', routerLink: 'add-product', icon: 'fa-mail-reply' },
          { label: 'مدیریت محصولات', routerLink: 'manage-products', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'گواهینامه ها و فعالیت ها',
        icon: 'fa-certificate',
        items: [
          { label: 'لیست گواهینامه‌ها‌', routerLink: 'certificates', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'پیام مدیریت',
        icon: 'fa-bell',
        items: [
          { label: 'اطلاعیه‌ها', routerLink: 'admin-notify', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'برندهای من',
        icon: 'fa-clone',
        items: [
          { label: 'ثبت برند', routerLink: 'brand/register', icon: 'fa-mail-reply' },
          { label: 'لیست برندها', routerLink: 'brands', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'معاملات تجاری',
        icon: 'fa-dollar',
        items: [
          { label: 'ثبت سفارش', routerLink: 'inbox/order', icon: 'fa-mail-reply' },
          { label: 'حفاظت از خرید', routerLink: 'inbox/secure-order', icon: 'fa-mail-reply' },
        ]
      },
      {
        label: 'صندوق پیام‌ها',
        icon: 'fa-envelope',
        items: [
          { label: 'درخواست های خرید', routerLink: 'inbox/purchase-request', icon: 'fa-mail-reply' },
          { label: 'تخفیفات فروشندگان', routerLink: 'inbox/discount', icon: 'fa-mail-reply' },
          { label: 'پیشنهادات فروش', routerLink: 'inbox/offer', icon: 'fa-mail-reply' },
          { label: 'استعلام قیمت', routerLink: 'inbox/price-inquery', icon: 'fa-mail-reply' },
          { label: 'پرسش و پاسخ', routerLink: 'inbox/question', icon: 'fa-mail-reply' },
          { label: 'مذاکرات', routerLink: 'inbox/negotiate', icon: 'fa-mail-reply' },
          //{ label: 'پیام‌های من', routerLink: 'inbox/messages', icon: 'fa-mail-reply' },
        ]
      },
      {
        label: 'به من اطلاع بده',
        icon: 'fa-bullhorn',
        items: [
          { label: 'ثبت اطلاعیه جدید', routerLink: 'notifications/register', icon: 'fa-mail-reply' },
          { label: 'لیست اطلاعیه‌ها', routerLink: 'notifications/show-list', icon: 'fa-mail-reply' },
        ]
      },
      {
        label: 'علاقه‌مندی‌ها',
        icon: 'fa-heart',
        items: [
          { label: 'محصولات', routerLink: 'favorite/products', icon: 'fa-mail-reply' },
          { label: 'فروشندگان ', routerLink: 'favorite/companies', icon: 'fa-mail-reply' },
        ]
      },
      {
        label: 'نشان ها',
        icon: 'fa-flag',
        items: [
          { label: 'نشان ویژه', routerLink: 'sign/special', icon: 'fa-mail-reply' },
          { label: 'نشان تضمین', routerLink: 'sign/guarantee', icon: 'fa-mail-reply' },
          { label: 'نشان اعتماد', routerLink: 'sign/trust', icon: 'fa-mail-reply' },
        ]
      },
      {
        label: 'پرداخت ها',
        icon: 'fa-credit-card',
        items: [
          { label: 'لیست پرداخت ها', routerLink: 'payment', icon: 'fa-mail-reply' },

        ]
      },
      {
        label: 'ارسال مدارک',
        icon: 'fa-file',
        items: [
          { label: 'ارسال مدارک', routerLink: 'documents', icon: 'fa-mail-reply' }
        ]
      }

    ];
  }

  loadInMenu() {
    this._profile.getInMenu().subscribe(
      data => {
        this.user = data;
        // console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.loadingData = true;
      }
    );
  }

  getLast24Hour() {
    this._profile.getLast24Hour().subscribe(
      data => {
        // console.log(data);
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.loading = true;
      }
    );
  }

  sellerPage(id) {
    this._router.navigateByUrl('/seller/' + id);
  }


}
