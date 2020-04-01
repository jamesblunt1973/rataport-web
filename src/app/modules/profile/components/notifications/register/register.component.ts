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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
  public loading = false;
  public sendAdd = false;

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

  public kindCtrl = new FormControl('', [Validators.required]);

  kinds = [
    { id: 0, name: 'پیشنهاد فروش' },
    { id: 1, name: 'تخفیف' },
    // { id: 2, name: 'درخواست خرید' },
  ];
  constructor(private builder: FormBuilder,
    public dialog: MatDialog,
    private _profile: ProfileService,
    private _product: ProductService,
    public snackBar: MatSnackBar,
    private _router: Router,
    private _global: GlobalService) {
  }

  public registerForm: FormGroup = this.builder.group({
    CategoryID: this.fourLevelCtrl,
    Kind: this.kindCtrl
  });

  ngOnInit() {
    this.loadLevels();
  }

  addNotify(data) {
    console.log(data);
    this.registerForm.setValue({
      CategoryID: this.fourLevelCtrl.value,
      Kind: this.kindCtrl.value
    });

    if (this.registerForm.valid) {
      this.sendAdd = true;
      this._profile.addNotifyMe(this.registerForm.value).subscribe(
        result => {
          console.log(result);
          if (result['success']) {
            this._router.navigateByUrl('/profile/notifications/show-list');
            this.snackBar.open('ثبت اطلاعیه با موفقیت انجام شد!', 'بستن', {
              duration: 8000
            });
          } else if (result['result'] != "") {
            this.snackBar.open(result['result'], 'بستن');
          }else {
            this.snackBar.open('مشکلی پیش امده، لطفا مجددا امتحان کنید!', 'بستن', {
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
    console.log(this.registerForm.value);
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

}
