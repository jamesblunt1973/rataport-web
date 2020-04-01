import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, fadeInContent } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
// Services
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {

  public loading = false;
  /** list of tags filtered by search keyword for multi-selection */
  public filteredCountryMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @Output() public filterOptions: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public filter: EventEmitter<any> = new EventEmitter<any>();
  @Output() public levelsName: EventEmitter<any> = new EventEmitter<any>();

  @Input() filters: any[];
  @Input() levels: any[];
  @Input() placeholderLabel = 'جستجو';
  @Input() noEntriesFoundLabel = 'موردی پیدا نشد!';
  @ViewChild('levelOneTag', { static: true }) levelOneTag: MatSelect;
  @ViewChild('levelTwoTag', { static: false }) levelTwoTag: MatSelect;
  @ViewChild('levelThreeTag', { static: false }) levelThreeTag: MatSelect;
  @ViewChild('levelFourTag', { static: false }) levelFourTag: MatSelect;
  @ViewChild('multiSelect', { static: false }) multiSelect: MatSelect;

  public levelsNameVar = [];
  public levelTwo;
  public levelThree;
  public levelFour;
  public levelTwoStatus = false;
  public levelThreeStatus = false;
  public levelFourStatus = false;

  cities: any[];
  propertyList = [];
  propertyListFinal = [];
  temp = [];
  public productFilters = {
    categoryID: 0,
    properties: [],
    innerPackage: [],
    externalPackage: [],
    region: [],
    Country: [],
    sendSample: [],
    TrustBadge: false,
    SpecialBadge: false,
    GuaranteeBadge: false,
    Persian: false,
    KnowledgeBase: false,
    Discount: false,
    productKind: [],
    orderBy: 0,
    categoryLevel: 0,
    search: ''
  };

  public signOptionFilter = [];
  public innerPackageOptionFilter = [];
  public externalPackageOptionFilter = [];
  public loadingProperty = true;

  public innerArray = [];
  public resLoc;

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

  public innerPackageCtrl: FormControl = new FormControl();
  public externalPackageCtrl: FormControl = new FormControl();
  public sendSampleCtrl: FormControl = new FormControl();
  public regionCtrl: FormControl = new FormControl();

  /** control for the selected bank for multi-selection */
  public countryCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword multi-selection */
  public countryFilterCtrl: FormControl = new FormControl();

  /** list of levels filtered by search keyword */
  public filteredOneLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredTwoLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredThreeLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredFourLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  public externalPackage: any = [];
  public innerPackage: any = [];
  public sendSample: any = [];
  public country: any = [];
  public region: any = [];
  public property: any = [];

  public typeStatus = false;
  public shapeStatus = false;
  public kindStatus = false;

  public typeResult = [];
  public shapeResult = [];
  public kindResult = [];

  public type = [];
  public shape = [];
  public kind = [];

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

    const cat1 = parseInt(this._route.snapshot.paramMap.get('cat1'), 10);
    const cat2 = parseInt(this._route.snapshot.paramMap.get('cat2'), 10);
    const cat3 = parseInt(this._route.snapshot.paramMap.get('cat3'), 10);
    if (cat1 && cat2 && cat3) {
      this.findCat2(cat1, cat2, cat3);

    }

    const catLevelTwo = parseInt(this._route.snapshot.paramMap.get('catLevelTwo'), 10);
    if (catLevelTwo) {
      this.findCat0(catLevelTwo);
    }

    // load the initial levels list
   
    if (this.levels !== undefined) {
     
      this.filteredOneLevel.next(this.levels.slice());
    }
   

    // listen for search field value changes
    this.oneLevelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOneLevel();
      });

    this.externalPackage = this.filters['externalPackage'];
    this.innerPackage = this.filters['innerPackage'];
    this.sendSample = this.filters['sendSample'];
    this.country = this.filters['country'];
    this.region = this.filters['region'];

    // load the initial tags list
    this.filteredCountryMulti.next(this.country.slice());

    // listen for search field value changes
    this.countryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCounriesMulti();
      });

    this.loading = true;

    this.property.length = 0;
  }

  findCats(cat) {
    this._product.getCats(cat).subscribe(
      data => {
        this.levelsNameVar = data;
      },
      error => { },
      () => {
        this.levelsName.emit(this.levelsNameVar);
      }
    );
  }

  propertySelected(event, name) {
    this.propertyList.push({ name: name, value: event.value });
    this.propertyList.forEach(element => {

      if (element.name === name) {
        this.propertyList = this.propertyList.filter(x => x.name !== name);
        this.propertyList.push({ name: name, value: event.value });
      } else {
        this.propertyList.push({ name: name, value: event.value });
      }

    });

    this.propertyListFinal.length = 0;
    for (const iterator of this.propertyList) {
      for (const item of iterator.value) {
        this.propertyListFinal.push(item);
      }
    }

    this.productFilters.properties = this.propertyListFinal;
    this.sendFilters();
  }

  sendFilters() {
    this.filter.emit(this.productFilters);
  }

  emptyArray() {
    for (const sign of this.signOptionFilter) {
      sign.event.source.checked = false;
    }

    this.signOptionFilter.length = 0;
  }

  deleteSign(id) { }

  signFilter(event, name) {
    if (name === 'نشان ویژه') {
      this.productFilters.SpecialBadge = event.checked;
      this.sendFilters();
    } else if (name === 'نشان تضمین') {
      this.productFilters.GuaranteeBadge = event.checked;
      this.sendFilters();
    } else if (name === 'نشان اعتماد') {
      this.productFilters.TrustBadge = event.checked;
      this.sendFilters();
    }
  }

  selectInnerPackage(event) {
    this.productFilters.innerPackage = event.value;
    this.sendFilters();
  }

  deleteInnerPackage(id) {
    const index = this.productFilters.innerPackage.findIndex(x => x.id === id);
    this.productFilters.innerPackage.splice(index, 1);

    this.innerArray.length = 0;
    for (let i = 0; i <= this.innerPackage.length; i++) {
      const items = this.productFilters.innerPackage.filter(x => x === this.innerPackage[i]);
      if (items.length > 0) {
        this.innerArray.push(i);
      }
    }
    this.resLoc = this.productFilters.innerPackage;
  }

  deleteExternalPackage(id) {
   
  }

  selectExternalPackage(event) {
    this.productFilters.externalPackage = event.value;
    this.sendFilters();
  }

  private filterCounriesMulti() {
    if (!this.country) {
      return;
    }
    // get the search keyword
    let search = this.countryFilterCtrl.value;
    if (!search) {
      this.filteredCountryMulti.next(this.country.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCountryMulti.next(
      this.country.filter(tag => tag.name.toLowerCase().indexOf(search) > -1)
    );
  }

  selectCountry(event) {
    this.productFilters.Country = event.value;
    this.sendFilters();
  }

  selectRegion(event) {
    this.productFilters.region = event.value;
    this.sendFilters();
  }

  sendSampleFunc(event) {
    this.productFilters.sendSample = event.value;
    this.sendFilters();
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
      this.productFilters.categoryID = event.value;
      this.productFilters.categoryLevel = 1;
      this.sendFilters();
    } else {

    }
    this.findCats(event.value);
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
    this.findCats(event.value);

    if (name === 'nofilter') {
      this.productFilters.categoryID = event.value;
      this.productFilters.categoryLevel = 2;
      this.sendFilters();
    } else {

    }
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

    this.loadProperty(event.value);

    this.productFilters.categoryID = event.value;
    this.productFilters.categoryLevel = 3;
    this.findCats(event.value);
    this.sendFilters();
  }

  fourLevelSelected(event) {
    this.productFilters.categoryID = event.value;
    this.productFilters.categoryLevel = 4;
    this.findCats(event.value);
    this.sendFilters();
  }

  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  loadProperty(category: any) {
    this.propertyList.length = 0;
    this.loadingProperty = true;
    this._product.getProperty(category).subscribe(
      data => {
        this.property = data;
      },
      error => { },
      () => { }
    );
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

  findCat0(categoryId: any) {

    this.oneLevelCtrl.setValue(categoryId);
    this.oneLevelSelected({ value: categoryId }, 'filter');

    this.levelTwoStatus = true;
    this.levelThreeStatus = false;
    this.levelFourStatus = false;
  }


  findCat1(categoryId: any) {
    this._product.findCat1(categoryId).subscribe(
      data => {
        console.log(data);
        this.oneLevelCtrl.setValue(data['catLevel1']);
        this.oneLevelSelected({ value: data['catLevel1'] }, 'filter');
        this.twoLevelCtrl.setValue(data['catLevel2']);
        this.twoLevelSelected({ value: data['catLevel2'] }, 'filter');

        this.levelTwoStatus = true;
        this.levelThreeStatus = true;
        this.levelFourStatus = false;
      },
      error => { },
      () => { }
    );
  }

  findCat2(categoryId0: any, categoryId1: any, categoryId2: any, ) {
    this.oneLevelCtrl.setValue(categoryId0);
    this.oneLevelSelected({ value: categoryId0 }, 'filter');

    this.twoLevelCtrl.setValue(categoryId1);
    this.twoLevelSelected({ value: categoryId1 }, 'filter');

    this.threeLevelCtrl.setValue(categoryId2);
    this.threeLevelSelected({ value: categoryId2 });

    this.levelTwoStatus = true;
    this.levelThreeStatus = true;
    this.levelFourStatus = true;
  }


}
