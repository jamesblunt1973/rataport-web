import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatDialog, transformMenu } from '@angular/material';
// Components
import { AddSupporterComponent } from '../add-supporter/add-supporter.component';
// Services
import { ProfileService } from '../../../services/profile.service';
import { GlobalService } from '../../../../../services/global.service';
import { AuthService } from '../../../../../services/auth.service';
import { PermissionMessagesComponent } from '../../../../../share/share-components';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  public membership = { id: 0, type: '', persianName: '' };
  public allowAdd = true;
  public disableButton = true;
  public socialPermission = false;
  public messengerPermission = false;
  public supporterMaxCount = 0;
  public supportLength = 0;

  public contactInfo: any;
  public supporters: any;
  public messengers: any;
  public socials: any;

  public image_url;

  public tell1 = '';
  public areacode = '';
  public tell2 = '';
  public mobile1 = '';
  public mobile2 = '';
  public fax1 = '';
  public fax2 = '';
  public email = '';
  public website = '';
  public postalCode = '';
  public address = '';
  public sendAdd = false;
  public sendAdd2 = false;
  public sendAdd3 = false;
  public loadingContactInfo = false;
  public status = true;
  disable = false;
  // Messenger
  public gap = '';
  public igap = '';
  public soroush = '';
  public bisphoun = '';
  public telegram = '';
  // Social
  public facebook = '';
  public twitter = '';
  public googlePlus = '';
  public linkedin = '';
  public instagram = '';
  public youtube = '';
  public aparat = '';

  public gapCtrl = new FormControl('');
  public igapCtrl = new FormControl('');
  public soroushCtrl = new FormControl('');
  public bisphounCtrl = new FormControl('');
  public telegramCtrl = new FormControl('');

  public facebookCtrl = new FormControl('');
  public twitterCtrl = new FormControl('');
  public googlePlusCtrl = new FormControl('');
  public linkedinCtrl = new FormControl('');
  public instagramCtrl = new FormControl('');
  public youtubeCtrl = new FormControl('');
  public aparatCtrl = new FormControl('');

  public tell1Ctrl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  public areaCodeCtrl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public tell2Ctrl = new FormControl('', [Validators.minLength(11)]);
  public mobile1Ctrl = new FormControl('', [Validators.required, Validators.minLength(11)]);
  public mobile2Ctrl = new FormControl('', [Validators.minLength(11)]);
  public fax1Ctrl = new FormControl('');
  public fax2Ctrl = new FormControl('');
  public emailCtrl = new FormControl({ value: '', disabled: true });
  public websiteCtrl = new FormControl('');
  public postalCodeCtrl = new FormControl('');
  public addressCtrl = new FormControl('');

  constructor(private _profile: ProfileService,
    public snackBar: MatSnackBar,
    private _global: GlobalService,
    public dialog: MatDialog,
    private builder: FormBuilder,
    private _auth: AuthService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  public updateContactInfoForm: FormGroup = this.builder.group({
    Address: this.addressCtrl,
    ZipCode: this.postalCodeCtrl,
    Tel1: this.tell1Ctrl,
    AreaCode: this.areaCodeCtrl,
    tel2: this.tell2Ctrl,
    fax1: this.fax1Ctrl,
    fax2: this.fax2Ctrl,
    mobile1: this.mobile1Ctrl,
    mobile2: this.mobile2Ctrl,
    email: this.emailCtrl,
    website: this.websiteCtrl,
  });

  public updateMessengersForm: FormGroup = this.builder.group({
    telegram: this.telegramCtrl,
    gap: this.gapCtrl,
    iGap: this.igapCtrl,
    bisphone: this.bisphounCtrl,
    Soroosh: this.soroushCtrl,
  });

  public updateSocialForm: FormGroup = this.builder.group({
    Facebook: this.facebookCtrl,
    Twitter: this.twitterCtrl,
    Instagram: this.instagramCtrl,
    Linkedin: this.linkedinCtrl,
    Youtube: this.youtubeCtrl,
    GooglePlus: this.googlePlusCtrl,
    Aparat: this.aparatCtrl
  });

  ngOnInit() {
    this.loadContactInfo();
    this.getPermission();
  }

  getPermission() {
    this.membership = this._auth.getPermission();
    console.log(this.membership);


    // if (this.membership['id'] === 1) {
    //  this.disableButton = true;
    // } else if (this.membership['id'] === 2) {
    //  this.disableButton = false;
    // }
  }

  updateContactInfo(data) {
    if (this.updateContactInfoForm.valid) {
      this.sendAdd = true;
      this._profile.updateContactInfo(data).subscribe(
        result => {

          if (result.success) {
            this.snackBar.open('اطلاعات شما با موفقیت بروزرسانی شد.', 'بستن', {
              duration: 8000
            });
          } else {
            this.snackBar.open('خطا در سمت سرور، لطفا دوباره امتحان کنید.', 'بستن', {
              duration: 8000
            });
          }
        },
        error => { },
        () => {
          this.sendAdd = false;
        }
      );
    }
  }

  updateMessengers(data) {
    if (this.updateMessengersForm.valid) {
      this.sendAdd2 = true;
      this._profile.updateMessengers(data).subscribe(
        result => {
          if (result.success) {
            this.snackBar.open('اطلاعات شما با موفقیت بروزرسانی شد.', 'بستن', {
              duration: 8000
            });
          } else {
            this.snackBar.open('خطا در سمت سرور، لطفا دوباره امتحان کنید.', 'بستن', {
              duration: 8000
            });
          }
        },
        error => { },
        () => {
          this.sendAdd2 = false;
        }
      );
    }
  }

  updateSocial(data) {
    if (this.updateSocialForm.valid) {
      this.sendAdd3 = true;
      this._profile.socialsUpdate(data).subscribe(
        result => {
          if (result.success) {
            this.snackBar.open('اطلاعات شما با موفقیت بروزرسانی شد.', 'بستن', {
              duration: 8000
            });
          } else {
            this.snackBar.open('خطا در سمت سرور، لطفا دوباره امتحان کنید.', 'بستن', {
              duration: 8000
            });
          }
        },
        error => { },
        () => {
          this.sendAdd3 = false;
        }
      );
    }
  }

  loadContactInfo() {
    this._profile.getContactInfo().subscribe(
      data => {
        this.contactInfo = data['contanctInfo'];
        this.supporters = data['supporters'];
        this.messengers = data['messengers'];
        this.socials = data['socials'];
        this.supporterMaxCount = data['supporterMaxCount'];
        if (data['supporters'] !== null) {
          this.supportLength = data['supporters'].length;
        } else {
          this.supportLength = 0;
        }

        this.messengerPermission = data['messengerPermission'];
        this.socialPermission = data['socialPermission'];

        console.log(data);
      },
      error => { },
      () => {
        this.loadingContactInfo = true;
        this.tell1 = this.contactInfo['tel1'];
        this.areacode = this.contactInfo['areaCode'];
        this.tell2 = this.contactInfo['tel2'];
        this.fax1 = this.contactInfo['fax1'];
        this.fax2 = this.contactInfo['fax2'];
        this.mobile1 = this.contactInfo['mobile1'];
        this.mobile2 = this.contactInfo['mobile2'];
        this.email = this.contactInfo['email'];
        this.website = this.contactInfo['website'];
        this.postalCode = this.contactInfo['zipcode'];
        this.address = this.contactInfo['address'];

        if (this.messengers) {
          this.telegram = this.messengers['telegram'];
          this.gap = this.messengers['gap'];
          this.igap = this.messengers['iGap'];
          this.bisphoun = this.messengers['bisphone'];
          this.soroush = this.messengers['soroosh'];
        }

        if (this.socials) {
          this.facebook = this.socials['facebook'];
          this.twitter = this.socials['twitter'];
          this.instagram = this.socials['instagram'];
          this.googlePlus = this.socials['googlePlus'];
          this.youtube = this.socials['youtube'];
          this.aparat = this.socials['aparat'];
          this.linkedin = this.socials['linkedin'];
        }

        if (this.supportLength >= this.supporterMaxCount) {
          this.allowAdd = false;
          this.disableButton = true;
        } else {
          this.allowAdd = true;
          this.disableButton = false;
        }
      }
    );
  }

  loadMessenger() {
    this._profile.getMessengers().subscribe(
      data => {
        // this.contactInfo = data;
        // console.log(data);
      },
      error => { },
      () => {

      }
    );
  }

  deleteSupporter(id) {
    if (confirm('آیا از حذف این پشتیبان مطمئن هستید؟')) {
      this._profile.deletePerson(id).subscribe(
        data => {
          // console.log(data);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.loadContactInfo();
        }
      );
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(AddSupporterComponent, { data: { name: 'addSupporter' } });
    dialogRef.componentInstance.updateUserData.subscribe(() => {
      this.loadContactInfo();
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

  run(event) {
    // console.log(event);
    console.log(this.mobile1Ctrl.errors.minlength);
    console.log(this.mobile1Ctrl.hasError);
  }

  permissionMessageModal(page, message, status) {
    const dialogRef = this.dialog.open(PermissionMessagesComponent, { data: { page: page, message: message, status: status } });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

}
