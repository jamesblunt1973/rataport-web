import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { BrandsService } from '../../brands.service';
import { ProductService } from '../../../products/services/product.service';

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

  cities: any[];
  temp = [];
  public productFilters = {
    categoryID: 0,
    properties: [],
    sign: [],
    innerPackage: [],
    externalPackage: [],
    productKind: [],
    region: [],
    Country: [],
    sendSample: [],
    orderBy: 0
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

  constructor(private _product: ProductService) { }

  ngOnInit() {
    // load the initial levels list
    this.filteredOneLevel.next(this.levels.slice());

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

  emptyArray() {

    // for (const city of this.cityOptionFilter) {
    //   city.event.source.checked = false;
    // }

    // for (const attraction of this.attractionOptionFilter) {
    //   attraction.event.source.checked = false;
    // }

    for (const sign of this.signOptionFilter) {
      sign.event.source.checked = false;
    }

    // for (const tag of this.tagOptionFilter) {
    //   tag.event.source.checked = false;
    // }

    // this.filterItems.cities.length = 0;
    // this.filterItems.attractions.length = 0;
    // this.filterItems.tags.length = 0;
    // this.filterItems.regions.length = 0;

    // this.cityOptionFilter.length = 0;
    // this.attractionOptionFilter.length = 0;
    // this.tagOptionFilter.length = 0;
    this.signOptionFilter.length = 0;

    // this.sendFilters();
  }

  deleteSign(id) {

    const index = this.productFilters.sign.findIndex(x => x.id === id);
    this.productFilters.sign.splice(index, 1);

    const i = this.signOptionFilter.findIndex(x => x.id === id);
    this.signOptionFilter[i].event.source.checked = false;
    this.signOptionFilter.splice(i, 1);

    // this.sendFilters();
  }

  signFilter(event, name) {
    if (name === 'نشان ویژه') {
      if (event.checked) {
        this.productFilters.sign.push({ id: 1, title: name });
        this.signOptionFilter.push({ event: event, title: name, id: 1 });
      } else {
        const index = this.productFilters.sign.findIndex(x => x.id === 1);
        this.productFilters.sign.splice(index, 1);
        // reset btn
        const i = this.signOptionFilter.findIndex(x => x.id === 1);
        this.signOptionFilter.splice(i, 1);
      }
      console.log(this.signOptionFilter);
    } else if (name === 'نشان تضمین') {
      if (event.checked) {
        this.productFilters.sign.push({ id: 2, title: name });
        this.signOptionFilter.push({ event: event, title: name, id: 2 });
      } else {
        const index = this.productFilters.sign.findIndex(x => x.id === 2);
        this.productFilters.sign.splice(index, 1);
        // reset btn
        const i = this.signOptionFilter.findIndex(x => x.id === 2);
        this.signOptionFilter.splice(i, 1);
      }
      console.log(this.signOptionFilter);
    } else if (name === 'نشان اعتماد') {
      if (event.checked) {
        this.productFilters.sign.push({ id: 3, title: name });
        this.signOptionFilter.push({ event: event, title: name, id: 3 });
      } else {
        const index = this.productFilters.sign.findIndex(x => x.id === 3);
        this.productFilters.sign.splice(index, 1);
        // reset btn
        const i = this.signOptionFilter.findIndex(x => x.id === 3);
        this.signOptionFilter.splice(i, 1);
      }
      console.log(this.signOptionFilter);

    }
  }

  selectInnerPackage(event) {
    // console.log(event);
    // this.innerPackageOptionFilter.length = 0;
    // this.innerPackageOptionFilter = event.value;
    this.productFilters.innerPackage = event.value;
    // console.log(this.innerPackageOptionFilter);
  }

  deleteInnerPackage(id) {
    // console.log(this.productFilters.innerPackage);
    const index = this.productFilters.innerPackage.findIndex(x => x.id === id);
    this.productFilters.innerPackage.splice(index, 1);

    this.innerArray.length = 0;
    for (let i = 0; i <= this.innerPackage.length; i++) {
      const items = this.productFilters.innerPackage.filter(x => x === this.innerPackage[i]);
      if (items.length > 0) {
        this.innerArray.push(i);
        // console.log(items);
      }
    }

    // this.resLoc.splice(i, 1); // my ngModel
    // mulLoc.writeValue(this.resLoc); // reference variable of mat-select

    // console.log(this.innerArray);
    // for (const item of this.innerArray) {
    //   this.innerPackageCtrl.setValue(this.innerPackage[item]);
    // }

    // console.log(this.productFilters.innerPackage);
    console.log(this.resLoc);
    this.resLoc = this.productFilters.innerPackage;
  }

  deleteExternalPackage(id) {
    alert(id);
  }

  selectExternalPackage(event) {
    console.log(event);
    this.externalPackageOptionFilter.length = 0;
    this.externalPackageOptionFilter = event.value;
    console.log(this.externalPackageOptionFilter);
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
    console.log(event);
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
  }

  twoLevelSelected(event) {
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
  }

  fourLevelSelected(event) {
    console.log(event);
  }

  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  loadProperty(category: any) {
    this.loadingProperty = true;
    this._product.getProperty(category).subscribe(
      data => {
        this.property = data;
        console.log(data);
      },
      error => { },
      () => {
        if (this.property.length > 0) {
          this.typeResult = this.property.filter(x => x.name === 'شکل');
          if (this.typeResult.length > 0) {
            this.typeStatus = true;
            this.type = this.typeResult[0]['items'];
            console.log();
          }
          this.kindResult = this.property.filter(x => x.name === 'نوع');
          if (this.kindResult.length > 0) {
            this.kindStatus = true;
            this.kind = this.kindResult[0]['items'];
            // console.log(this.kindResult);
          }
          this.shapeResult = this.property.filter(x => x.name === 'جنس');
          if (this.shapeResult.length > 0) {
            this.shapeStatus = true;
            this.shape = this.shapeResult[0]['items'];
          }

          this.loadingProperty = false;
        }

      }
    );
  }

}
