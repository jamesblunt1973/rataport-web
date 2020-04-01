import { Component, OnInit } from '@angular/core';
import { CompareService } from '../../compare.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../../services/global.service';
import { ProfileService } from '../../../profile/services/profile.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  products_id = {
    id1: 0,
    id2: 0,
    id3: 0,
    id4: 0
  };
  conditionShow = true;
  product: any[] = [];
  products;
  product_with_id;
  image_url = '';
  statusLoad = false;

  searchItems: string[] = [];
  filteredSearchItem: any[];
  item: string;
  totalSearchItems: any[] = [{ list: [], kind: '' }];

  constructor(
    public snackBar: MatSnackBar,
    private _compare: CompareService,
    private _router: ActivatedRoute,
    private _route: Router,
    private _profile: ProfileService,
    private _global: GlobalService) {
    this.image_url = this._global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    const id = parseInt(this._router.snapshot.paramMap.get('id'), 10);
    this.products_id.id1 = id;
    this.getBaseDataForSearch();
    this.getCompareProductList(this.products_id);
  }

  getBaseDataForSearch() {
    this._profile.LoadBaseDataForSearch().subscribe(
      data => {
        this.totalSearchItems = data;
      },
      error => { },
      () => {
        let product: any = this.totalSearchItems.filter(x => x.kind === 'product');
        product = product[0].list;
        this.product_with_id = product;
        this.product.length = 0;
        for (const item of product) {
          this.product.push(item.name);
        }
        product = this.product;
        this.product = product;
        // console.log(this.product);
        console.log(this.product_with_id);
        this.searchItems = product;
      }
    );
  }

  getCompareProductList(params) {
    this._compare.getCompareProductList(params).subscribe(
      data => {
        this.products = data;
      },
      error => { },
      () => {
        this.statusLoad = true;
      }
    );
  }

  seller(id) {
    this._route.navigateByUrl('/seller/' + id);
  }

  filterSearchItem(event) {
    this.filteredSearchItem = [];
    for (let i = 0; i < this.searchItems.length; i++) {
      const item = this.searchItems[i];
      if (item.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredSearchItem.push(item);
      }
    }
  }

  search() {
    const result = this.product_with_id.filter(x => x.name === this.item);
    const temp = new Array;
    temp.length = 0;
    temp.push(this.products_id);

    if (this.products_id.id2 === result[0].id) {
      this.snackBar.open('این محصول را قبلا اضافه کرده‌اید!', 'بستن', {
        duration: 8000
      });
    } else if (this.products_id.id3 === result[0].id) {
      this.snackBar.open('این محصول را قبلا اضافه کرده‌اید!', 'بستن', {
        duration: 8000
      });
    } else if (this.products_id.id4 === result[0].id) {
      this.snackBar.open('این محصول را قبلا اضافه کرده‌اید!', 'بستن', {
        duration: 8000
      });
    } else if (this.products_id.id1 === result[0].id) {
      this.snackBar.open('این محصول را قبلا اضافه کرده‌اید!', 'بستن', {
        duration: 8000
      });
    } else {
      if (this.products_id.id2 === 0) {
        this.products_id.id2 = result[0].id;
      } else if (this.products_id.id3 === 0) {
        this.products_id.id3 = result[0].id;
      } else if (this.products_id.id4 === 0) {
        this.products_id.id4 = result[0].id;
        this.conditionShow = false;
      }
    }

    this.getCompareProductList(this.products_id);
    this.item = '';
  }

}
