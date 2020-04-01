import { Component, OnInit, Input } from '@angular/core';
// Services
import { GlobalService } from '../../../../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-brands',
  templateUrl: './grid-brands.component.html',
  styleUrls: ['./grid-brands.component.scss']
})
export class GridBrandsComponent implements OnInit {

  public image_url: string;
  @Input() brands: any;

  constructor(private _global: GlobalService,
    private _route: Router) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
  }

}
