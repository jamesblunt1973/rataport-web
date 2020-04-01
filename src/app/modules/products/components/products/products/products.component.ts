import { Component, OnInit } from '@angular/core';
// Services
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  searchItem = '';
  public showProductsStatus = false;
  public brandStatus = true;
  public productLenght = 0;
  public filters;
  public levels;
  public catid: number;
  public catid1: number;
  public levelTwoStatus = false;
  public loadFiltersStatus = false;
  public loading = false;
  public sidebarStatus = false;
  public products = [];
  public sellers = [];
  public brandsList = [];
  public indexSelected = 0;
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

  public brandsFilters = {
    categoryID: 0,
    TrustBadge: false,
    categoryLevel: 0,
    SpecialBadge: false,
    GuaranteeBadge: false,
    region: [],
    orderBy: 0,
    search: ''
  };
  routLevel = [];
  display: boolean;

  listBtn = false;
  gridBtn = true;
  listSellBtn = false;
  gridSellBtn = true;

  productIndex = true;
  sellerIndex: boolean;
  brandIndex: boolean;

  sort = [
    { value: '1', viewValue: 'جدیدترین محصولات' },
    { value: '2', viewValue: 'پر بازدیدترین محصولات' },
    { value: '3', viewValue: 'محصولات فعال' },
    { value: '4', viewValue: 'محصولات محبوب' }
  ];

  sort2 = [
    { value: '1', viewValue: 'جدیدترین فروشندگان' },
    { value: '2', viewValue: 'پر بازدیدترین فروشندگان' },
    { value: '3', viewValue: 'فروشندگان فعال' },
    { value: '4', viewValue: 'فروشندگان محبوب' }
  ];

  brands = [
    { value: '4', viewValue: 'کالای ایرانی' },
    { value: '5', viewValue: 'کالای دانش بنیان' },
    { value: '7', viewValue: 'دارای تخفیف' },
  ];

  siteMap: any[] = [
    { level: 1, name: 'خانه', link: '/' },
    { level: 2, name: 'نمایش همه مجموعه‌ها', link: '/products/' }
  ];

  constructor(private _product: ProductService,
    private router: Router,
    private _route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    const catid = parseInt(this._route.snapshot.paramMap.get('catid'), 10);
    const catid1 = parseInt(this._route.snapshot.paramMap.get('catid1'), 10);
    const brand = this._route.snapshot.paramMap.get('brand');
    const catLevelTwo = parseInt(this._route.snapshot.paramMap.get('catLevelTwo'), 10);

    if (brand) {
      this.indexSelected = 2;
      this.brandIndex = true;
      this.sellerIndex = false;
      this.productIndex = false;
    }

    this.searchItem = JSON.parse(sessionStorage.getItem('searchItem'));
    sessionStorage.removeItem('searchItem');

    if (this.searchItem !== null) {
      switch (this.searchItem['type']) {
        case 'product': {
          this.productFilters.search = this.searchItem['data'];
          this.loadProduct(this.productFilters);
          break;
        }
        case 'seller': {
          this.sellerFilters.search = this.searchItem['data'];
          this.loadSeller(this.sellerFilters);
          this.indexSelected = 1;
          break;
        }
        default: {
          break;
        }
      }
    }

    if (catLevelTwo) {
      this.productFilters.categoryID = catLevelTwo;
      this.productFilters.categoryLevel = 1;
      this.findCats(catLevelTwo);
    }

    if (catid) {
      this.catid = catid;
      this.productFilters.categoryID = this.catid;
      this.productFilters.categoryLevel = 3;
      this.findCats(catid);
    } else { }

    if (catid1) {
      this.catid1 = catid1;
      this.productFilters.categoryID = this.catid1;
      this.productFilters.categoryLevel = 2;
      this.findCats(catid1);
    }

   
    this.loadLevels();
    this.loadProduct(this.productFilters);
    this.loadSeller(this.sellerFilters);
    this.loadBrands(this.brandsFilters);
  }

  findCats(cat) {
    this._product.getCats(cat).subscribe(
      data => {
        this.routLevel = data;
       
        console.log(this.routLevel);
      },
      error => { },
      () => { }
    );
  }

  grid() {
    this.gridBtn = true;
    this.listBtn = false;
  }

  list() {
    this.listBtn = true;
    this.gridBtn = false;
  }

  gridSell() {
    this.gridSellBtn = true;
    this.listSellBtn = false;
  }

  listSell() {
    this.listSellBtn = true;
    this.gridSellBtn = false;
  }

  nothing() {
    this.productFilters.orderBy = 0;
    this.loadProduct(this.productFilters);
  }

  orderBy(event) {
    this.productFilters.orderBy = event.value;
    this.loadProduct(this.productFilters);
  }

  nothingSeller() {
    this.sellerFilters.orderBy = 0;
    this.loadSeller(this.sellerFilters);
  }

  orderBySeller(event) {
    this.sellerFilters.orderBy = event.value;
    this.loadSeller(this.sellerFilters);
  }

  options(event) {
    this.productFilters.KnowledgeBase = false;
    this.productFilters.Persian = false;
    this.productFilters.Discount = false;
    for (const item in event.value) {
      if (event.value.hasOwnProperty(item)) {
        const element = event.value[item];
        switch (element) {
          case 'کالای دانش بنیان': {
            this.productFilters.KnowledgeBase = true;
            break;
          }
          case 'کالای ایرانی': {
            this.productFilters.Persian = true;
            break;
          }
          case 'دارای تخفیف': {
            this.productFilters.Discount = true;
            break;
          }
          default: {
            break;
          }
        }
      }
    }

    this.loadProduct(this.productFilters);
  }

  tabChanged(event) {
    if (event.index === 0) {
      this.sellerIndex = false;
      this.brandIndex = false;
      this.productIndex = true;
    } else if (event.index === 1) {
      this.sellerIndex = true;
      this.brandIndex = false;
      this.productIndex = false;
    } else if (event.index === 2) {
      this.brandIndex = true;
      this.sellerIndex = false;
      this.productIndex = false;
    }
  }

  loadFilters() {
    if (sessionStorage.getItem('_sidebarFilters') !== null) {
     
      this.filters = JSON.parse(sessionStorage.getItem('_sidebarFilters'));
     
    } else {
      this.sidebarStatus = true;
     
      this._product.getFilters().subscribe(
        data => {
          this.filters = data;
         
          sessionStorage.setItem('_sidebarFilters', JSON.stringify(this.filters));
        },
        error => { },
        () => {
          this.sidebarStatus = false;
        }
      );
    }


  }

  loadLevels() {

    if (sessionStorage.getItem('_levels') !== null) {
      this.levels = JSON.parse(sessionStorage.getItem('_levels'));
   

      this.loadFilters();
    } else {

      this._product.getLevels().subscribe(
        data => {
          this.levels = data;
         
          sessionStorage.setItem('_levels', JSON.stringify(this.levels));

          this.loadFilters();
        },
        error => { },
        () => { }
      );

    }
    this.loadFiltersStatus = true;
  }

  loadProduct(filters: any) {
    this.loading = true;
    this.showProductsStatus = false;
    this._product.getProducts(filters).subscribe(
      data => {
        this.products = data;
        this.productLenght = this.products.length;
      },
      error => { },
      () => {
        this.showProductsStatus = true;
        this.loading = false;
      }
    );
  }

  loadSeller(filtersSeller: any) {
    this.loading = true;
    this._product.getSellers(filtersSeller).subscribe(
      data => {
        this.sellers = data;
      },
      error => { },
      () => {
        this.loading = false;
      }
    );
  }

  loadBrands(filtersBrands: any) {
    this._product.getBrands(filtersBrands).subscribe(
      data => {
        this.brandsList = data;
      },
      error => { },
      () => {
        this.brandStatus = true;
      }
    );
  }

  getFilters(event) {
    this.productFilters.categoryID = event.categoryID;
    this.productFilters.sendSample = event.sendSample;
    this.productFilters.Country = event.Country;
    this.productFilters.GuaranteeBadge = event.GuaranteeBadge;
    this.productFilters.SpecialBadge = event.SpecialBadge;
    this.productFilters.TrustBadge = event.TrustBadge;
    this.productFilters.externalPackage = event.externalPackage;
    this.productFilters.innerPackage = event.innerPackage;
    this.productFilters.region = event.region;
    this.productFilters.categoryLevel = event.categoryLevel;
    this.productFilters.properties = event.properties;

    this.loadProduct(this.productFilters);
  }

  getLevelsName(event) {
    this.routLevel = event;
  }

  getFilterOptions(event) {
    this.sellerFilters.categoryID = event.categoryID;
    this.sellerFilters.categoryLevel = event.categoryLevel;
    this.sellerFilters.GuaranteeBadge = event.GuaranteeBadge;
    this.sellerFilters.SpecialBadge = event.SpecialBadge;
    this.sellerFilters.TrustBadge = event.TrustBadge;
    this.sellerFilters.region = event.region;

    this.loadSeller(this.sellerFilters);
  }

  filterOptionsBrands(event) {
    this.brandsFilters.categoryID = event.categoryID;
    this.brandsFilters.categoryLevel = event.categoryLevel;
    this.brandsFilters.GuaranteeBadge = event.GuaranteeBadge;
    this.brandsFilters.SpecialBadge = event.SpecialBadge;
    this.brandsFilters.TrustBadge = event.TrustBadge;
    this.brandsFilters.region = event.region;

    this.loadBrands(this.brandsFilters);
  }

}
