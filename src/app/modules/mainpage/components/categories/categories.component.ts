import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
// Services
import { GlobalService } from '../../../../services/global.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public image_url: string;
  public categories: any[];
  public categories2: any[];
  public categories3: any[];
  public categoryStatus = false;

  items: MenuItem[];
  level1Show = true;
  level2Show = false;
  level3Show = false;

  constructor(private _global: GlobalService, private _category: CategoryService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.loadCategory();

    this.items = [
      {
        label: 'کشاورزی، دامپروری و مواد غذایی  و مواد غذای',
        items: [{
          label: 'محصول دوم است',
          icon: 'pi pi-bw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      }
    ];

  }

  loadCategory() {
    if (sessionStorage.getItem('_categories') !== null) {
      this.categoryStatus = true;
      this.categories = JSON.parse(sessionStorage.getItem('_categories'));
    } else {
      this._category.getCategory().subscribe(
        data => {
          this.categories = data;
          sessionStorage.setItem('_categories', JSON.stringify(this.categories));
        },
        error => { },
        () => {
          this.categoryStatus = true;
          this.constructCategories(this.categories);
        }
      );

    }

  }

  breakCategories2(name) {
    console.log(name);
    this.level1Show = false;
    this.level2Show = true;
    this.level3Show = false;
    this.categories2 = name.children;
  }

  breakCategories3(name) {
    console.log(name);
    this.level1Show = false;
    this.level2Show = false;
    this.level3Show = true;
    this.categories3 = name.children;
  }

  backToPerv2() {
    this.level1Show = true;
    this.level2Show = false;
    this.level3Show = false;
  }

  backToPerv3() {
    this.level1Show = false;
    this.level2Show = true;
    this.level3Show = false;
  }

  constructCategories(categories) {
    for (const item1 in categories) {
      if (categories.hasOwnProperty(item1)) {
        const element1 = categories[item1];
        this.items.push({ label: element1['name'], items: [] });
        for (const item2 in element1['children']) {
          if (element1['children'].hasOwnProperty(item2)) {
            const element2 = categories[item1]['children'][item2];
            for (const item3 in element2['children']) {
              if (element2['children'].hasOwnProperty(item3)) {
                const element3 = element2['children'][item3];
              }
            }
          }
        }
      }
    }
  }

}
