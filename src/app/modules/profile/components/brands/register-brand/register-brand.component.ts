import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSelect, MatDialog } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
// Services
import { ProfileService } from '../../../services/profile.service';
import { ProductService } from '../../../../products/services/product.service';
import { GlobalService } from '../../../../../services/global.service';
import { DialogComponent } from '../../../../../share/share-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.scss']
})
export class RegisterBrandComponent implements OnInit {

  @Input() placeholderLabel = 'جستجو';
  @Input() noEntriesFoundLabel = 'موردی پیدا نشد!';
  @ViewChild('levelOneTag', { static: false }) levelOneTag: MatSelect;
  @ViewChild('levelTwoTag', { static: false }) levelTwoTag: MatSelect;
  @ViewChild('levelThreeTag', { static: false }) levelThreeTag: MatSelect;
  @ViewChild('levelFourTag', { static: false }) levelFourTag: MatSelect;

  public filters: any[];
  public levels: any[];
  public levelTwo;
  public levelThree;
  public levelFour;
  public levelTwoStatus = false;
  public levelThreeStatus = false;
  public levelFourStatus = false;

  public UsefulLifeStatus = false;

  public uploadurl = 'product/upload';
  public uploadTextBtnLogo = 'انتخاب فایل';
  public uploadTextBtnFile = 'انتخاب فایل';
  public uploadActiveLogo = false;
  public uploadActiveFile = false;
  public progressUpload = 0;
  public AttachFile = '';
  public Logo = '';
  public images = [];
  public title = '';
  public website = '';

  public sendAdd = false;

  public supplyAbilityPeriod = 'روز';
  public warrantyPeriod = 'روز';
  public AfterSaleServicePeriod = 'روز';
  public UsefulLifePeriod = 'روز';
  public DeliveryTimePeriod = 'روز';
  public MarketAccessValue = [];

  public size = [];
  public productWeight = [];
  public guarantyProduct = [];
  public AfterSaleServiceProduct = [];

  public loading = false;
  public selectProvince = '';
  public selectProvincePercent = '';
  public bigPercent = true;
  public percentValue = 0;

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

  /** list of levels filtered by search keyword */
  public filteredOneLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredTwoLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredThreeLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredFourLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  public titleCtrl = new FormControl('', [Validators.required]);
  public websiteCtrl = new FormControl('');
  public descriptionCtrl = new FormControl('');

  public registerBrandForm: FormGroup = this.builder.group({
    CategoryLevel3: this.threeLevelCtrl,
    Title: this.titleCtrl,
    Website: this.websiteCtrl,
    Description: this.descriptionCtrl,
    AttachFile: this.AttachFile,
    Logo: this.Logo
  });

  constructor(private builder: FormBuilder,
    public dialog: MatDialog,
    private _profile: ProfileService,
    private _product: ProductService,
    public snackBar: MatSnackBar,
    private _router: Router,
    private _global: GlobalService) {
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
  }

  ngOnInit() {
    this.loadLevels();
  }

  addBrand(data) {
    if (this.AttachFile !== '' && this.Logo !== '') {
      this.registerBrandForm.setValue({
        CategoryLevel3: this.threeLevelCtrl.value,
        Title: this.titleCtrl.value,
        Website: this.websiteCtrl.value,
        Description: this.descriptionCtrl.value,
        AttachFile: this.AttachFile,
        Logo: this.Logo
      });

      if (this.registerBrandForm.valid) {
        this.sendAdd = true;
        this._profile.registerBrand(this.registerBrandForm.value).subscribe(
          result => {
            console.log(result);
          },
          error => { },
          () => {
            this.sendAdd = false;
            this._router.navigateByUrl('/profile/brands');
            this.snackBar.open('ثبت برند با موفقیت انجام شد!', 'بستن', {
              duration: 8000
            });
          }
        );
      }
    } else {
      this.snackBar.open('آپلود لوگو و مدارک از موارد ضروری هستند!', 'بستن', {
        duration: 8000
      });
    }
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

    console.log(event);

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
    this.images.push({ 'name': event[1] });
  }

  // When upload error
  onUploadError(event) { }

  loadLevels() {
    this._product.getLevels().subscribe(
      data => {
        this.levels = data;
        console.log(this.levels);
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
  onSelectFile(event) {
    this.uploadActiveFile = true;
    this.uploadTextBtnFile = 'در حال آپلود ...';
  }

  onProgressFile(event) {
    this.progressUpload = event.progress;
    console.log(this.progressUpload);
  }

  onBasicUploadAutoFile(event) {
    const result = JSON.parse(event.xhr.response);
    this.AttachFile = result;
    this.uploadTextBtnFile = 'فایل آپلود شد';
    this.uploadActiveFile = false;
  }

  // File uplaod functions
  onSelectLogo(event) {
    this.uploadActiveLogo = true;
    this.uploadTextBtnLogo = 'در حال آپلود ...';
  }

  onProgressLogo(event) {
    this.progressUpload = event.progress;
    console.log(this.progressUpload);
  }

  onBasicUploadAutoLogo(event) {
    const result = JSON.parse(event.xhr.response);
    this.Logo = result;
    this.uploadTextBtnLogo = 'فایل آپلود شد';
    this.uploadActiveLogo = false;
  }


}
