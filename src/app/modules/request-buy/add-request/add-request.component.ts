import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSelect, MatDialog } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
// Services
import { AuthService } from '../../../services/auth.service';
import { ProductService } from '../../products/services/product.service';
import { ProfileService } from '../../profile/services/profile.service';
import { GlobalService } from '../../../services/global.service';

import * as moment from 'jalali-moment';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {

  dateObject = '';
  datePickerConfig = {
    format: 'YYYY/MM/DD'
  };

  public config = { maxFiles: 4, addRemoveLinks: true, dictRemoveFile: 'حذف تصویر', dictCancelUpload: 'انصراف از آپلود' };
  public productName = '';
  public mizanKharid = '';
  public price = '';
  public loading = false;
  public sendData = false;

  @Input() placeholderLabel = 'جستجو';
  @Input() noEntriesFoundLabel = 'موردی پیدا نشد!';
  @ViewChild('levelOneTag', { static: false }) levelOneTag: MatSelect;
  @ViewChild('levelTwoTag', { static: false }) levelTwoTag: MatSelect;
  @ViewChild('levelThreeTag', { static: false }) levelThreeTag: MatSelect;
  @ViewChild('levelFourTag', { static: false }) levelFourTag: MatSelect;

  public uploadurl = 'product/upload';
  public uploadTextBtn = 'انتخاب فایل';
  public progressUpload = 0;
  public uploadActive = false;
  public file = '';
  public images = [];
  public filters: any[];
  public levels: any[];
  public levelTwo;
  public levelThree;
  public levelFour;
  public levelTwoStatus = false;
  public levelThreeStatus = false;
  public levelFourStatus = false;
  public dateError = false;

  ostan = [];
  vahed = [];
  haml = [
    { value: 'دریایی', viewValue: 'دریایی' },
    { value: 'هوایی', viewValue: 'هوایی' },
    { value: 'زمینی', viewValue: 'زمینی' },
    { value: 'ریلی', viewValue: 'ریلی' },
  ];
  pardakht = [
    { value: 'نقدی', viewValue: 'نقدی' },
    { value: 'اقساط', viewValue: 'اقساط' },
    { value: 'چکی', viewValue: 'چکی' },
    { value: 'آنلاین از طریق رتاپورت', viewValue: 'آنلاین از طریق رتاپورت' },
  ];

  public dateCtrl: FormControl = new FormControl('', [Validators.required]);
  public productNameControl = new FormControl('', [Validators.required]);
  public mizanKharidControl = new FormControl('', [Validators.required]);
  public vahedKharidControl = new FormControl('', [Validators.required]);
  public priceControl = new FormControl('', [Validators.required]);
  public maqsadControl = new FormControl('', [Validators.required]);
  //public hamlControl = new FormControl('', [Validators.required]);
  //public shivePardakhtControl = new FormControl('', [Validators.required]);
  public descriptionCtrl = new FormControl('');
  // One level
  public oneLevelCtrl: FormControl = new FormControl('', [Validators.required]);
  public oneLevelFilterCtrl: FormControl = new FormControl();
  // Two level
  public twoLevelCtrl: FormControl = new FormControl('', [Validators.required]);
  public twoLevelFilterCtrl: FormControl = new FormControl();
  // Three level
  public threeLevelCtrl: FormControl = new FormControl('', [Validators.required]);
  public threeLevelFilterCtrl: FormControl = new FormControl();
  // Four level
  public fourLevelCtrl: FormControl = new FormControl('', [Validators.required]);
  public fourLevelFilterCtrl: FormControl = new FormControl();

  public vahedKharidFilterControl: FormControl = new FormControl();

  /** list of levels filtered by search keyword */
  public filteredOneLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredTwoLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredThreeLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredFourLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredUnits: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(private _route: Router,
    private builder: FormBuilder,
    public dialog: MatDialog,
    private _auth: AuthService,
    private _profile: ProfileService,
    private _product: ProductService,
    public snackBar: MatSnackBar,
    private _global: GlobalService) {
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
  }

  public registerPurchaseRequestForm: FormGroup = this.builder.group({
    CategoryID: this.fourLevelCtrl,
    ProductName: this.productNameControl,
    CountNeed: this.mizanKharidControl,
    ProposedPrice: this.priceControl,
    Unit: this.vahedKharidControl,
    AttachedFile: this.file,
    ExpireDate: this.dateObject,
    Destination: this.maqsadControl,
    //ShippingMethod: this.hamlControl,
    //PaymentMethod: this.shivePardakhtControl,
    ApplicantDescription: this.descriptionCtrl,
    Images: this.images
  });

  registerPurchaseRequest() {
    if (this.registerPurchaseRequestForm.valid) {
      this.registerPurchaseRequestForm.setValue({
        CategoryID: this.fourLevelCtrl.value,
        ProductName: this.productNameControl.value,
        CountNeed: this.mizanKharidControl.value,
        ProposedPrice: this.priceControl.value,
        Unit: this.vahedKharidControl.value,
        AttachedFile: this.file,
        ExpireDate: this.dateObject,
        Destination: this.maqsadControl.value,
        //ShippingMethod: this.hamlControl.value,
        //PaymentMethod: this.shivePardakhtControl.value,
        ApplicantDescription: this.descriptionCtrl.value,
        Images: this.images
      });

      if (this.dateObject !== '') {
        this.sendData = true;
        this._product.registerPurchaseRequest(this.registerPurchaseRequestForm.value).subscribe(
          data => {
            console.log(data);
          },
          error => {
            if (error.status === 401) {
              this._auth.logout();
            }
          },
          () => {
            this.uploadActive = false;
            this.sendData = false;
            this._route.navigateByUrl('/profile/inbox/purchase-request');
          }
        );
      } else {
        this.dateError = true;
      }
    } else {
      this.dateError = true;
    }
  }

  ngOnInit() {
    if (!this._auth.checkLogin()) {
      this._route.navigateByUrl('/');
    }

    this.loadBaseData();
    this.loadLevels();
  }

  private filterOneLevel() {
    if (!this.levels) {
      return;
    }
    // get the search keyword
    let search = this.oneLevelFilterCtrl.value;
    if (!search) {
      this.filteredOneLevel.next(this.levels.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the onle levels
    this.filteredOneLevel.next(
      this.levels.filter(level => level.name.toLowerCase().indexOf(search) > -1)
    );
  }


  private filterTwoLevel() {
    if (!this.levelTwo) {
      return;
    }
    // get the search keyword
    let search = this.twoLevelFilterCtrl.value;
    if (!search) {
      this.filteredTwoLevel.next(this.levelTwo.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the onle levelTwo
    this.filteredTwoLevel.next(
      this.levelTwo.filter(level => level.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterThreeLevel() {
    if (!this.levelThree) {
      return;
    }
    // get the search keyword
    let search = this.threeLevelFilterCtrl.value;
    if (!search) {
      this.filteredThreeLevel.next(this.levelThree.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the onle levelTwo
    this.filteredThreeLevel.next(
      this.levelThree.filter(level => level.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterFourLevel() {
    if (!this.levelFour) {
      return;
    }
    // get the search keyword
    let search = this.fourLevelFilterCtrl.value;
    if (!search) {
      this.filteredFourLevel.next(this.levelFour.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the onle levelTwo
    this.filteredFourLevel.next(
      this.levelFour.filter(level => level.name.toLowerCase().indexOf(search) > -1)
    );
  }

  filterUnits() {
    if (!this.vahed) {
      return;
    }
    let search = this.vahedKharidFilterControl.value;
    if (!search) {
      this.filteredUnits.next(this.vahed.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUnits.next(this.vahed.filter(level => level.name.toLowerCase().indexOf(search) > -1));
  }


  oneLevelSelected(event) {
    this.levelTwoStatus = true;
    this.levelThreeStatus = false;
    this.levelFourStatus = false;

    const currentCategory: any = this.levels.filter(x => x.id === event.value);
    this.levelTwo = currentCategory[0].children;

    this.filteredTwoLevel.next(this.levelTwo.slice());
    // listen for search field value changes
    this.twoLevelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTwoLevel();
      });
  }

  twoLevelSelected(event) {
    this.levelThreeStatus = true;
    this.levelFourStatus = false;

    const currentCategory: any = this.levelTwo.filter(x => x.id === event.value);
    this.levelThree = currentCategory[0].children;

    this.filteredThreeLevel.next(this.levelThree.slice());
    // listen for search field value changes
    this.threeLevelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterThreeLevel();
      });
  }

  threeLevelSelected(event) {
    const currentCategory: any = this.levelThree.filter(x => x.id === event.value);
    this.levelFour = currentCategory[0].children;

    if (this.levelFour.length > 0) {
      this.levelFourStatus = true;
      this.filteredFourLevel.next(this.levelFour.slice());
      // listen for search field value changes
      this.fourLevelFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterFourLevel();
        });
    }
  }

  fourLevelSelected(event) {
    console.log(event);
  }

  // When upload success
  onUploadSuccess(event) {
    this.images.push(event[1]);
  }

  // When upload error
  onUploadError(event) { }

  onChange(event) {
    console.log(event);
  }

  loadBaseData() {
    this._product.getPurchaseRequestBaseData().subscribe(
      data => {
        console.log(data);
        this.vahed = data.units;
        this.ostan = data.regions;
      },
      error => { },
      () => {

        // load the initial levels list
        this.filteredUnits.next(this.vahed.slice());

        // listen for search field value changes
        this.vahedKharidFilterControl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterUnits();
          });

      }
    );
  }

  loadLevels() {
    this._product.getLevels().subscribe(
      data => {
        this.levels = data;
      },
      error => { },
      () => {
        // load the initial levels list
        this.filteredOneLevel.next(this.levels.slice());

        // listen for search field value changes
        this.oneLevelFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterOneLevel();
          });
        this.loading = true;
      }
    );
  }

  // File uplaod functions
  onSelect(event) {
    this.uploadActive = true;
    this.uploadTextBtn = 'در حال آپلود ...';
  }

  onProgress(event) {
    this.progressUpload = event.progress;
    console.log(this.progressUpload);
  }

  onBasicUploadAuto(event) {
    const result = JSON.parse(event.xhr.response);
    this.file = result;
    this.uploadTextBtn = 'فایل آپلود شد';
    this.uploadActive = false;
  }

}
