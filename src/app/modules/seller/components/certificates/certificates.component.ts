import { Component, OnInit, Input, Inject } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from '../../services/seller.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {

  @Input() certificates;
  public image_url: string;
  sellerID = 0;
  allCertificates = [];

  constructor(private _global: GlobalService,
    @Inject(DOCUMENT) document,
    private _route: ActivatedRoute,
    private _seller: SellerService) {
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.allCertificates = this.certificates;
    this.sellerID = parseInt(this._route.snapshot.paramMap.get('id'), 10);
  }

  showPop(id) {
    const element = document.getElementById(id);
    element.classList.add('show-kon');
  }

  hidePop(id) {
    const element = document.getElementById(id);
    element.classList.remove('show-kon');
  }

  getAllContents() {
    this.certificates = this.allCertificates;
  }

  getContents(sellerId, subject) {
    this._seller.getSellerCertificates(sellerId, subject).subscribe(
      result => {
        this.certificates = result;
      },
      error => { },
      () => { }
    );
  }

}
