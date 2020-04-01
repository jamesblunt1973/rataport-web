import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { AddSupporterComponent } from '../add-supporter/add-supporter.component';
import { Router } from '@angular/router';
// Services
import { ProfileService } from '../../../services/profile.service';
import { GlobalService } from '../../../../../services/global.service';
import { AuthService } from '../../../../../services/auth.service';
import { PermissionMessagesComponent } from '../../../../../share/share-components';
import { SiteinfoService } from '../../../../../services/siteinfo.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() placeholderLabel = 'جستجو';
  @Input() noEntriesFoundLabel = 'موردی پیدا نشد!';

  public uploadurl = 'seller/updateLogo';
  public uploadTextBtn = 'انتخاب لوگو';
  public progressUpload = 0;

  step = 0;
  selectedValue: string;
  panelOpenState = false;
  public sendData = false;
  public sendregAbout = false;
  public sendregOutlook = false;
  public sendregGoals = false;
  public sendregStrategy = false;
  public userData;
  public sendreg = false;
  public image_url;
  public loading = false;
  public uploadedFiles = [];
  public name = '';
  public tejariName = '';
  public tejariNameEn = '';
  public activityType = '';
  public saleTasis = 0;
  public assistNum = 0;
  public nationalcode = '';
  public econimiccode = '';
  public typeUser = 1;
  public registerNum = '';
  public shenaseMelli = '';
  public codeEqtesadi = '';
  public zarfiat = '';
  public zarfiatUnit = '';
  public aboutText = '';
  public cheshmandazText = '';
  public goalText = '';
  public strategyText = '';
  public coWorker = '';
  public activityImages = [];
  public sellerImages = [];
  public activityData = [];
  public sellerData = [];
  public units = [];

  public membership = {};
  public disableAboutTab = true;
  public disableStrategyTab = true;
  public disableOutlookTab = true;
  public disableGoalsTab = true;

  public workSlidesMax = 0;
  public adsSlidesMax = 0;

  public config = {
    maxFiles: 5
  };

  public config2 = {
    maxFiles: 5
  };

  public regions: any;

  public typeUserControl = new FormControl('', [Validators.required]);
  public nameControl = new FormControl('', [Validators.required]);
  public tejariNameControl = new FormControl('', [Validators.required]);
  public tejariNameEnControl = new FormControl('', [Validators.required]);
  //public activityControl = new FormControl('' , [Validators.required]);
  //public kasbokarControl = new FormControl({ value: ''}, [Validators.required]);
  public saleTasisControl = new FormControl('');
  public assistNumControl = new FormControl('');
  public nationalcodeControl = new FormControl('');
  public econimiccodeControl = new FormControl('');
  //public malekiatControl = new FormControl('', [Validators.required]);
  public registerNumControl = new FormControl('', [Validators.required]);
  public shenaseMelliControl = new FormControl('');
  public codeEqtesadiControl = new FormControl('');
  public zarfiatControl = new FormControl('');
  public zarfiatUnitControl = new FormControl('');
  public descriptionControl = new FormControl('');
  public descriptionOutlookControl = new FormControl('');
  public descriptionGoalsControl = new FormControl('');
  public descriptionStrategyControl = new FormControl('');
  public coWorkerCtrl = new FormControl('');
  public shoarControl = new FormControl('');
  public provinceControl = new FormControl('');

  public vahedSellOldControl = new FormControl('', []);
  public vahedMinOrderFilterControl: FormControl = new FormControl();
  public filteredUnits: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  private _onDestroy = new Subject<void>();
//----------------

public membership_contact = { id: 0, type: '', persianName: '' };
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

public image_url_contact;

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
public user;
public membersMax = 0;
public membersCount = 0;
public userStatus = false;

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

public tell1Ctrl = new FormControl('', [Validators.minLength(8)]);
public areaCodeCtrl = new FormControl('', [Validators.minLength(3)]);
public tell2Ctrl = new FormControl('', [Validators.minLength(11)]);
public mobile1Ctrl = new FormControl('',[Validators.minLength(11)]);
public mobile2Ctrl = new FormControl('', [Validators.minLength(11)]);
public fax1Ctrl = new FormControl('');
public fax2Ctrl = new FormControl('');
public emailCtrl = new FormControl({ value: '', disabled: false });
public websiteCtrl = new FormControl('');
public postalCodeCtrl = new FormControl('');
public addressCtrl = new FormControl('');
//-------------

public bankName = '';
public NameOfAccountHolder = '';
public accountNumber = '';
public cardNumber = '';
public shebaNumber = '';


public bankNameCtrl = new FormControl('');
public NameOfAccountHolderCtrl = new FormControl('');
public accountNumberCtrl = new FormControl('');
public cardNumberCtrl = new FormControl('');
public shebaNumberCtrl = new FormControl('');



  malekiats = [
    { value: 'دولتی', viewValue: 'دولتی' },
    { value: 'خصوصی', viewValue: 'خصوصی' },
    { value: 'خصوصی _ دولتی', viewValue: 'خصوصی _ دولتی' }
  ];

  kasbokar = [
    { value: 'فروشنده', viewValue: 'فروشنده' },
    { value: 'خریدار', viewValue: 'خریدار' },
  ];

  activities = [
    { value: 'تولید کننده', viewValue: 'تولید کننده' },
    { value: 'واردکننده', viewValue: 'واردکننده' },
    { value: 'عمده فروش', viewValue: 'عمده فروش' },
    { value: 'خرده فروش', viewValue: 'خرده فروش' },
  ];

  constructor(private _profile: ProfileService,
    public snackBar: MatSnackBar,
    private _global: GlobalService,
    public dialog: MatDialog,
    private builder: FormBuilder,
    private _auth: AuthService,
    private _siteinfo: SiteinfoService,
    private _router: Router
    ) {
    this.image_url = _global.BASE_IMAGE_API_URL;
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
    
  }
  public bankInfoForm: FormGroup = this.builder.group({
    BankName: this.bankNameCtrl,
    Name: this.NameOfAccountHolderCtrl,
    Account: this.accountNumberCtrl,
    Card: this.cardNumberCtrl,
    Shaba: this.shebaNumberCtrl
  });
  public editUserHaqiqiForm: FormGroup = this.builder.group({
    CEO: this.nameControl,
    Brand: this.tejariNameControl,
    BrandInEnglish: this.tejariNameEnControl,
    //Slogan: this.shoarControl,
    //ActivityType: this.activityControl,
    //EstablishedYear: this.saleTasisControl,
    //EmployeesNO: this.assistNumControl,
    NationalID: this.nationalcodeControl,
    EconimicCode: this.econimiccodeControl,
    CityID: this.provinceControl,
  });

  public editUserHoquqiForm: FormGroup = this.builder.group({
    CEO: this.nameControl,
    Brand: this.tejariNameControl,
    BrandInEnglish: this.tejariNameEnControl,
    Slogan: this.shoarControl,
    //ActivityType: this.activityControl,
    //OwnershipType: this.malekiatControl,
    RegisterationNO: this.registerNumControl,
    NationalID: this.shenaseMelliControl,
    EconimicCode: this.codeEqtesadiControl,
    EstablishedYear: this.saleTasisControl,
    ProductionCapacity: this.zarfiatControl,
    ProductionCapacityUnit: this.vahedSellOldControl,
    BusinessParters: this.coWorkerCtrl,
    EmployeesNO: this.assistNumControl,
    CityID: this.provinceControl,
  });

  public aboutForm: FormGroup = this.builder.group({ AboutName: this.descriptionControl,
    OutlookName:this.descriptionOutlookControl,
    GoalsName: this.descriptionGoalsControl ,
    StrategyName: this.descriptionStrategyControl,
    ShoarName:this.shoarControl});
  // public outlookForm: FormGroup = this.builder.group({ name: this.descriptionOutlookControl });
  // public goalsForm: FormGroup = this.builder.group({ name: this.descriptionGoalsControl });
  // public strategyForm: FormGroup = this.builder.group({ name: this.descriptionStrategyControl });

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
    this.getPermission();
    this.loadUserData();
    this.sellerPersonalPageList();
    this.sellerWorkPlaceList();
    this.loadRegion();
    // this.getUnits();
    this.loadLevels();
    this.loadContactInfo();
    this.loadBankInfoo();
    this.MembersgetUserData();

  }

  loadBankInfoo() {
    this._profile.getBankInfo().subscribe(
      data => {
        // console.log(data);
        if (data) {
          this.bankName = data['bankName'];
          this.NameOfAccountHolder = data['name'];
          this.accountNumber = data['account'];
          this.cardNumber = data['card'];
          this.shebaNumber = data['shaba'];
        }
      },
      error => {
        if (error.status === 401) {
          this._auth.logout();
        }
      },
      () => {
        this.status = true;
      }
    );
  }

  updateBankInfo(data) {
    this.bankInfoForm.setValue({
      BankName: this.bankNameCtrl.value,
      Name: this.NameOfAccountHolderCtrl.value,
      Account: (this.accountNumberCtrl.value).toString(),
      Card: this.cardNumber,
      Shaba: (this.shebaNumberCtrl.value)
    });
    // console.log(this.bankInfoForm.value);

    if (this.bankInfoForm.valid) {
      this.sendData = true;
      this._profile.updateBankInfo(this.bankInfoForm.value).subscribe(
        result => {
          // console.log(result);
          if (result.success) {
            this.snackBar.open('اطلاعات بانکی شما با موفقیت بروزرسانی شد.', 'بستن', {
              duration: 8000
            });
          } else {
            this.snackBar.open('خطا در سمت سرور، لطفا دوباره امتحان کنید.', 'بستن', {
              duration: 8000
            });
          }
        },
        error => {
          this.sendData = false;
          if (error.status === 401) {
            this._auth.logout();
          }
        },
        () => {
          this.sendData = false;
        }
      );
    }
  }

  getPermission() {
    this.membership = this._auth.getPermission();

  }

  filterUnits() {
    if (!this.units) {
      return;
    }
    let search = this.vahedMinOrderFilterControl.value;
    if (!search) {
      this.filteredUnits.next(this.units.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUnits.next(this.units.filter(level => level.name.toLowerCase().indexOf(search) > -1));
  }

  loadLevels() {
    this._profile.getUnits().subscribe(
      data => {
        this.units = data;
      },
      error => { },
      () => {
        // load the initial levels list
        this.filteredUnits.next(this.units.slice());

        // listen for search field value changes
        this.vahedMinOrderFilterControl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterUnits();
          });
        this.loading = true;
      }
    );
  }

  getUnits() {
    this._profile.getUnits().subscribe(data => {
      this.units = data;
    },
      error => {

      },
      () => {

      });
  }

  loadRegion() {
    this._siteinfo.getRegion().subscribe(data => {
      this.regions = data;
    },
      error => {

      },
      () => {

      });
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
  loadUserData() {
    this._profile.currentUser().subscribe(
      data => {
        this.userData = data;

        this.disableAboutTab = data['aboutUsPermission'];
        this.disableGoalsTab = data['goalsPermission'];
        this.disableOutlookTab = data['outlookPermission'];
        this.disableStrategyTab = data['strategyPermission'];



        this.workSlidesMax = data['workSlidesMax'];
        this.adsSlidesMax = data['adsSlidesMax'];

        if (data['workPlace'] !== null) {
          const lenWorkPlace = data['workPlace'].length;

          this.config.maxFiles = this.workSlidesMax - lenWorkPlace;

        }

        if (data['personalPage'] !== null) {
          const lenPersonalPage = data['personalPage'].length;

          this.config2.maxFiles = this.adsSlidesMax - lenPersonalPage;
        }

      },
      error => { },
      () => {
        this.typeUser = this.userData.legal;

        this.name = this.userData.ceo;
        this.tejariName = this.userData.brand;
        this.tejariNameEn = this.userData.brandInEnglish;
        this.shoarControl.setValue(this.userData.slogan);
        //this.kasbokarControl.setValue(this.userData.businessType);
        //this.activityControl.setValue(this.userData.activityType);
        this.saleTasis = parseInt(this.userData.establishedYear, 10);
        this.assistNum = parseInt(this.userData.employeesNO, 10);
        this.nationalcode = this.userData.nationalID;
        this.econimiccode = this.userData.econimicCode;
        //this.malekiatControl.setValue(this.userData.ownershipType);
        this.zarfiat = this.userData.productionCapacity;
        this.zarfiatUnit = this.userData.productionCapacityUnit;
        this.shenaseMelli = this.userData.nationalID;
        this.registerNum = this.userData.registerationNO;
        this.codeEqtesadi = this.userData.econimicCode;
        this.coWorker = this.userData.businessParters;
        this.descriptionControl.setValue(this.userData.aboutUs);
        this.descriptionOutlookControl.setValue(this.userData.outlook);
        this.descriptionGoalsControl.setValue(this.userData.goals);
        this.descriptionStrategyControl.setValue(this.userData.strategy);
        this.provinceControl.setValue(this.userData.cityID);
        this.loading = true;
      }
    );
  }

  updateNonLegalInfo(data: any) {
    console.log(data);

    if (this.saleTasisControl.value == null || this.saleTasisControl.value === '') {
      this.saleTasisControl.setValue(0);
    }

    if (this.assistNumControl.value == null || this.assistNumControl.value === '') {
      this.saleTasisControl.setValue(0);
    }

    this.editUserHaqiqiForm.setValue({
      CEO: this.nameControl.value,
      Brand: this.tejariNameControl.value,
      BrandInEnglish: this.tejariNameEnControl.value,
      //Slogan: this.shoarControl.value,
      //EstablishedYear: (this.saleTasisControl.value).toString(),
      //EmployeesNO: (this.assistNumControl.value).toString(),
      NationalID: this.nationalcodeControl.value,
      EconimicCode: this.econimiccodeControl.value,
      CityID: this.provinceControl.value,
      //ActivityType: this.activityControl.value,
    });

    if (this.editUserHaqiqiForm.valid) {
      this.sendData = true;
      this._profile.updateNonLegalInfo(this.editUserHaqiqiForm.value).subscribe(
        res => {
          console.log(res);
          if (res.success === true) {
            this.snackBar.open('اطلاعات بروزرسانی شد!', 'بستن', {
              duration: 8000
            });
          }
        },
        error => { },
        () => {
          this.sendData = false;
        }
      );
    } else {
      console.log('not valid');
    }
  } // end register

  updateLegalInfo(data: any) {

    if (this.saleTasisControl.value == null || this.saleTasisControl.value === '') {
      this.saleTasisControl.setValue(0);
    }

    if (this.assistNumControl.value == null || this.assistNumControl.value === '') {
      this.saleTasisControl.setValue(0);
    }

    console.log(data);
    if (this.editUserHoquqiForm.valid) {
      this.sendData = true;
      this._profile.updateLegalInfo(data).subscribe(
        res => {
          console.log(res);
          if (res.success === true) {
            this.snackBar.open('اطلاعات بروزرسانی شد!', 'بستن', {
              duration: 8000
            });
          }
        },
        error => { },
        () => {
          this.sendData = false;
        }
      );
    } else { }
  } // end register

  registerAbout(data: any) {
    console.log(data);
    if (this.aboutForm.valid) {
      this.sendregAbout = true;
      this._profile.addAbout(data).subscribe(
        res => {
          // console.log(res);
          if (res.success === true) {
            this.snackBar.open('اطلاعات بروزرسانی شد!', 'بستن', {
              duration: 8000
            });
          }
        },
        error => { },
        () => {
          this.sendregAbout = false;
        }
      );
    } else { }
  } // end register

  // registerOutlook(data: any) {
  //   if (this.outlookForm.valid) {
  //     this.sendregOutlook = true;
  //     this._profile.addOutlook(data).subscribe(
  //       res => {
  //         // console.log(res);
  //         if (res.success === true) {
  //           this.snackBar.open('اطلاعات بروزرسانی شد!', 'بستن', {
  //             duration: 8000
  //           });
  //         }
  //       },
  //       error => { },
  //       () => {
  //         this.sendregOutlook = false;
  //         this.loadUserData();
  //       }
  //     );
  //   } else { }
  // } // end register

  // registerGoals(data: any) {
  //   console.log(data);
  //   if (this.outlookForm.valid) {
  //     this.sendregGoals = true;
  //     this._profile.addGoals(data).subscribe(
  //       res => {
  //         console.log(res);
  //         if (res.success === true) {
  //           this.snackBar.open('اطلاعات بروزرسانی شد!', 'بستن', {
  //             duration: 8000
  //           });
  //         }
  //       },
  //       error => {
  //         this.sendregGoals = false;
  //       },
  //       () => {
  //         this.sendregGoals = false;
  //         this.loadUserData();
  //       }
  //     );
  //   } else { }
  // } // end register

  // registerStrategy(data: any) {
  //   console.log(data);
  //   if (this.outlookForm.valid) {
  //     this.sendregStrategy = true;
  //     this._profile.addStrategy(data).subscribe(
  //       res => {
  //         console.log(res);
  //         if (res.success === true) {
  //           this.snackBar.open('اطلاعات بروزرسانی شد!', 'بستن', {
  //             duration: 8000
  //           });
  //         }
  //       },
  //       error => {
  //         this.sendregStrategy = false;
  //       },
  //       () => {
  //         this.sendregStrategy = false;
  //       }
  //     );
  //   } else { }
  // } // end register

  // Placement silder
  onUpload(event) {
    console.log(event);
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  // File uplaod functions
  onSelect(event) {
    this.uploadTextBtn = 'در حال آپلود ...';
  }

  onProgress(event) {
    this.progressUpload = event.progress;
    console.log(this.progressUpload);
  }

  onBasicUploadAuto(event) {
    const result = JSON.parse(event.xhr.response);
    console.log(result);
    this.uploadTextBtn = 'لوگو آپلود شد';
    this.loadUserData();
  }

  onBeforeSend(event) {
    const _token = this._auth.getToken();
    event.xhr.setRequestHeader('Authorization', `bearer ${_token}`);
    console.log(event);
    // event.xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("AccessToken"));
  }

  // DropZone
  // When upload success
  onUploadSuccess1(event) {
    console.log(event);
    this.activityImages.push({ name: event[1] });
  }

  onUploadSuccess2(event) {
    console.log(event);
    this.sellerImages.push({ name: event[1] });
  }

  // When upload error
  onUploadError(event) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  sellerPageImages() {
    if (this.sellerImages.length > 0) {
      this.sendreg = true;
      this._profile.sellerPersonalPageCreate(this.sellerImages).subscribe(
        data => {

        },
        error => { },
        () => {
          this.sendreg = false;
          this.sellerImages.length = 0;
          this.sellerPersonalPageList();
        }
      );
    } else {
      this.snackBar.open('تصویری آپلود نشده است!', 'بستن', {
        duration: 8000
      });
    }
    console.log(this.sellerImages);
  }

  activitySliderImages() {
    console.log(this.activityImages);
    if (this.activityImages.length > 0) {
      this.sendreg = true;
      this._profile.sellerWorkPlaceCreate(this.activityImages).subscribe(
        data => {
          console.log(data);
        },
        error => { },
        () => {
          this.sendreg = false;
          this.activityImages.length = 0;
          this.sellerWorkPlaceList();
        }
      );
    } else {
      this.snackBar.open('تصویری آپلود نشده است!', 'بستن', {
        duration: 8000
      });
    }
    console.log(this.activityImages);
  }

  sellerWorkPlaceList() {
    this._profile.sellerWorkPlaceList().subscribe(
      data => {
        this.activityData = data;

        const lenWorkPlace = data.length;

        this.config.maxFiles = this.workSlidesMax - lenWorkPlace;

      },
      error => { },
      () => { }
    );
  }

  sellerPersonalPageList() {
    this._profile.sellerPersonalPageList().subscribe(
      data => {
        this.sellerData = data;

        const lenWorkPlace = data.length;

        this.config2.maxFiles = this.adsSlidesMax - lenWorkPlace;

      },
      error => { },
      () => { }
    );
  }

  sellerWorkPlaceDeleteOne(id) {
    if (confirm('آیا شما مطمئن هستید؟')) {
      this._profile.sellerWorkPlaceDeleteOne(id).subscribe(
        data => {
          console.log(data);
        },
        error => { },
        () => {
          this.sellerWorkPlaceList();
        }
      );
    }
  }

  sellerPersonalPageDeleteOne(id) {
    if (confirm('آیا شما مطمئن هستید؟')) {
      this._profile.sellerPersonalPageDeleteOne(id).subscribe(
        data => {
          console.log(data);
        },
        error => { },
        () => {
          this.sellerPersonalPageList();
        }
      );
    }
  }

  sellerWorkPlaceDeleteAll() {
    if (confirm('آیا شما مطمئن هستید؟')) {
      this._profile.sellerWorkPlaceDeleteAll().subscribe(
        data => {
          console.log(data);
        },
        error => { },
        () => {
          this.sellerWorkPlaceList();
        }
      );
    }
  }

  sellerPersonalPageDeleteAll() {
    if (confirm('آیا شما مطمئن هستید؟')) {
      this._profile.sellerPersonalPageDeleteAll().subscribe(
        data => {
          console.log(data);
        },
        error => { },
        () => {
          this.sellerPersonalPageList();
        }
      );
    }
  }

  removeLogo() {
    if (confirm('آیا شما مطمئن هستید؟')) {
      this._profile.removeLogo().subscribe(
        data => {
          console.log(data);
        },
        error => { },
        () => {
          this.loadUserData();
        }
      );
    }
  }

  permissionMessageModal(page, message, status) {
    const dialogRef = this.dialog.open(PermissionMessagesComponent, { data: { page: page, message: message, status: status } });
    dialogRef.afterClosed().subscribe(() => {

    });
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

  MembersopenModal() {
    const dialogRef = this.dialog.open(AddSupporterComponent, { data: { name: 'addMember' } });
    dialogRef.componentInstance.updateUserData.subscribe(() => {
      this.MembersgetUserData();
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
  
  MembersgetUserData() {
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



  MembersdeleteSupporter(id) {
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
          this.MembersgetUserData();
        }
      );
    }
  }

  sellerPage(id) {
    this._router.navigateByUrl('/seller/' + id);
  }

}
