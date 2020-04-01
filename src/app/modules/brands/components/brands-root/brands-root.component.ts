import { Component, OnInit } from '@angular/core';
import { BrandsModule } from '../../brands.module';
import { BrandsService } from '../../brands.service';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-brands-root',
  templateUrl: './brands-root.component.html',
  styleUrls: ['./brands-root.component.scss']
})
export class BrandsRootComponent implements OnInit {

  public productLenght = 0;
  public filters;
  public levels;
  public levelTwoStatus = false;
  public loadFiltersStatus = false;
  public loading = false;
  public sidebarStatus = false;
  public products: any[];
  public sellers: any[];
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
  public sellerFilters = {
    categoryID: 0,
    sign: [],
    region: [],
    orderBy: 0
  };

  listBtn = false;
  gridBtn = true;
  listSellBtn = false;
  gridSellBtn = true;

  productIndex = true;
  sellerIndex: boolean;

  sort = [
    { value: '1', viewValue: 'جدیدترین محصولات' },
    { value: '1', viewValue: 'پر بازدیدترین محصولات' },
    { value: '2', viewValue: 'محصولات فعال' },
    { value: '2', viewValue: 'محصولات محبوب' }
  ];

  sort2 = [
    { value: '1', viewValue: 'جدیدترین فروشندگان' },
    { value: '1', viewValue: 'پر بازدیدترین فروشندگان' },
    { value: '2', viewValue: 'فروشندگان فعال' },
    { value: '2', viewValue: 'فروشندگان محبوب' }
  ];

  brands = [
    { value: '4', viewValue: 'کالای ایرانی' },
    { value: '5', viewValue: 'کالای دانش بنیان' },
    { value: '7', viewValue: 'دارای تخفیف' },
  ];

  siteMap: any[] = [
    { level: 1, name: 'خانه', link: '/' },
    { level: 2, name: 'نمایش همه مجموعه‌ها', link: '/' }
  ];

  constructor(private _brands: BrandsService, private _product: ProductService) { }

  ngOnInit() {
    this.loadFilters();
    this.loadLevels();
    // this.loadProduct(this.productFilters);
    // this.loadSeller(this.sellerFilters);
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

  tabChanged(event) {
    if (event.index === 0) {
      this.sellerIndex = false;
      this.productIndex = true;
    } else if (event.index === 1) {
      this.sellerIndex = true;
      this.productIndex = false;
    }
  }

  loadFilters() {
    this.sidebarStatus = true;
    this._product.getFilters().subscribe(
      data => {
        this.filters = data;
      },
      error => { },
      () => {
        this.sidebarStatus = false;
      }
    );
  }

  loadLevels() {
    this._product.getLevels().subscribe(
      data => {
        this.levels = data;
        console.log(this.levels);
      },
      error => { },
      () => {
        this.loadFiltersStatus = true;
      }
    );
  }

  loadProduct(filters: any) {
    this.loading = true;
    this._product.getProducts(filters).subscribe(
      data => {
        this.products = data;
        console.log(this.products);
        this.productLenght = this.products.length;
      },
      error => { },
      () => {
        this.loading = false;
      }
    );
  }

  // loadSeller(filtersSeller: any) {
  //   // this.loading = true;
  //   this._product.getSellers(filtersSeller).subscribe(
  //     data => {
  //       this.sellers = data;
  //       // console.log(this.sellers);
  //     },
  //     error => { },
  //     () => {
  //       // this.loading = false;
  //     }
  //   );
  // }

  // getFilterOptions(event) {
  //   console.log(event);
  // }

}
