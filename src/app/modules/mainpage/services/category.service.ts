import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Services
import { GlobalService } from '../../../services/global.service';

@Injectable()
export class CategoryService {

  private _url = 'category/Get3Level/';
  private _urlOfferInHome = 'product/ProductInHome/';
  private _urlMobileApp = 'MobileApp/SelectAll/';

  constructor(private http: HttpClient, private _global: GlobalService) {
    this._url = _global.BASE_API_URL + this._url + _global.LANGUAGE;
    this._urlOfferInHome = _global.BASE_API_URL + this._urlOfferInHome;
    this._urlMobileApp = _global.BASE_API_URL + this._urlMobileApp;
  }

  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(this._url)
      .catch(this.errorHandler);
  }

  getApps(): Observable<any[]> {
    return this.http.get<any[]>(this._urlMobileApp)
      .catch(this.errorHandler);
  }

  getProductInHome(): Observable<any> {
    return this.http.get<any>(this._urlOfferInHome)
      .catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

}
