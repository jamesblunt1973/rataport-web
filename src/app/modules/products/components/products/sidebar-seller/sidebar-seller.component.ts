import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
// Services
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-seller',
  templateUrl: './sidebar-seller.component.html',
  styleUrls: ['./sidebar-seller.component.scss']
})
export class SidebarSellerComponent implements OnInit, AfterViewInit, OnDestroy {

  public property: any = [];

  @Output() public filterOptions: EventEmitter<any> = new EventEmitter<any>();
  // @Output() public filter: EventEmitter<any> = new EventEmitter<any>();

  @Input() filters: any[];
  @Input() levels: any[];
  @Input() placeholderLabel = 'جستجو';
  @Input() noEntriesFoundLabel = 'موردی پیدا نشد!';
  @ViewChild('levelOneTag', { static: true }) levelOneTag: MatSelect;
  @ViewChild('levelTwoTag', { static: false }) levelTwoTag: MatSelect;
  @ViewChild('levelThreeTag', { static: false }) levelThreeTag: MatSelect;
  @ViewChild('levelFourTag', { static: false }) levelFourTag: MatSelect;
  @ViewChild('multiSelect', { static: false }) multiSelect: MatSelect;

  public levelTwo;
  public levelThree;
  public levelFour;
  public levelTwoStatus = false;
  public levelThreeStatus = false;
  public levelFourStatus = false;

  // One level
  public oneLevelCtrl: FormControl = new FormControl();
  public oneLevelFilterCtrl: FormControl = new FormControl();
  // Two level
  public twoLevelCtrl: FormControl = new FormControl();
  public twoLevelFilterCtrl: FormControl = new FormControl();
  // Three level
  public threeLevelCtrl: FormControl = new FormControl();
  public threeLevelFilterCtrl: FormControl = new FormControl();
  // Four level
  public fourLevelCtrl: FormControl = new FormControl();
  public fourLevelFilterCtrl: FormControl = new FormControl();

  public regionCtrl: FormControl = new FormControl();

  /** list of levels filtered by search keyword */
  public filteredOneLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredTwoLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredThreeLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredFourLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  public region: any = [];
  public sellerFilters = {
    categoryID: 0,
    categoryLevel: 0,
    TrustBadge: false,
    SpecialBadge: false,
    GuaranteeBadge: false,
    region: [],
    orderBy: 0,
    search: ''
  };

  constructor(private _product: ProductService, private _route: ActivatedRoute) { }

  ngOnInit() {

    const catid = parseInt(this._route.snapshot.paramMap.get('catid'), 10);
    if (catid) {
      this.loadParentCategories(catid);
    }

    const catid1 = parseInt(this._route.snapshot.paramMap.get('catid1'), 10);
    if (catid1) {
      this.findCat1(catid1);
    }

    // load the initial levels list
    this.filteredOneLevel.next(this.levels.slice());

    // listen for search field value changes
    this.oneLevelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOneLevel();
      });

    this.region = this.filters['region'];

  }

  loadParentCategories(categoryId: any) {
    this._product.loadParentCategories(categoryId).subscribe(
      data => {
        this.oneLevelCtrl.setValue(data['catLevel1']);
        this.oneLevelSelected({ value: data['catLevel1'] }, 'filter');
        this.twoLevelCtrl.setValue(data['catLevel2']);
        this.twoLevelSelected({ value: data['catLevel2'] }, 'filter');
        this.threeLevelCtrl.setValue(data['catLevel3']);
        this.threeLevelSelected({ value: data['catLevel3'] });
        // this.loadProperty(data['catLevel3']);
        // this.productFilters.categoryID = data['catLevel3'];
        // this.productFilters.categoryLevel = 3;
        // this.sendFilters();

        this.levelTwoStatus = true;
        this.levelThreeStatus = true;
        this.levelFourStatus = true;
      },
      error => { },
      () => { }
    );
  }

  findCat1(categoryId: any) {
    this._product.findCat1(categoryId).subscribe(
      data => {
        this.oneLevelCtrl.setValue(data['catLevel1']);
        this.oneLevelSelected({ value: data['catLevel1'] }, 'filter');
        this.twoLevelCtrl.setValue(data['catLevel2']);
        // this.twoLevelSelected({ value: data['catLevel2'] }, 'filter');


        this.levelTwoStatus = true;
        this.levelThreeStatus = true;
        this.levelFourStatus = false;
      },
      error => { },
      () => { }
    );
  }

  sendFilters() {
    this.filterOptions.emit(this.sellerFilters);
  }

  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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

  oneLevelSelected(event, name) {
    this.levelTwoStatus = true;
    this.levelThreeStatus = false;
    this.levelFourStatus = false;

    this.property.length = 0;

    const currentCategory: any = this.levels.filter(x => x.id === event.value);
    this.levelTwo = currentCategory[0].children;

    this.filteredTwoLevel.next(this.levelTwo.slice());
    // listen for search field value changes
    this.twoLevelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTwoLevel();
      });

    if (name === 'nofilter') {
      this.sellerFilters.categoryID = event.value;
      this.sellerFilters.categoryLevel = 1;
      this.sendFilters();
    } else {

    }
    // this.sellerFilters.categoryID = event.value;
    // this.sellerFilters.categoryLevel = 1;
    // this.sendFilters();
  }

  twoLevelSelected(event, name) {
    this.levelThreeStatus = true;
    this.levelFourStatus = false;
    this.property.length = 0;

    const currentCategory: any = this.levelTwo.filter(x => x.id === event.value);
    this.levelThree = currentCategory[0].children;

    this.filteredThreeLevel.next(this.levelThree.slice());
    // listen for search field value changes
    this.threeLevelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterThreeLevel();
      });

    this.threeLevelCtrl.setValue(0);

    if (name === 'nofilter') {
      this.sellerFilters.categoryID = event.value;
      this.sellerFilters.categoryLevel = 2;
      this.sendFilters();
    } else {

    }

    // this.sellerFilters.categoryID = event.value;
    // this.sellerFilters.categoryLevel = 2;
    // this.sendFilters();
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

    this.sellerFilters.categoryID = event.value;
    this.sellerFilters.categoryLevel = 3;
    this.sendFilters();
  }

  signFilter(event, name) {
    if (name === 'نشان ویژه') {
      this.sellerFilters.SpecialBadge = event.checked;
      this.sendFilters();
    } else if (name === 'نشان تضمین') {
      this.sellerFilters.GuaranteeBadge = event.checked;
      this.sendFilters();
    } else if (name === 'نشان اعتماد') {
      this.sellerFilters.TrustBadge = event.checked;
      this.sendFilters();
    }
  }

  selectRegion(event) {
    this.sellerFilters.region = event.value;
    this.sendFilters();
  }

  fourLevelSelected(event) {
    this.sellerFilters.categoryID = event.value;
    this.sellerFilters.categoryLevel = 4;
    this.sendFilters();
  }

}
