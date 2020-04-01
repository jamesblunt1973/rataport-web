import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Services
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};

@Injectable()
export class OffersService {

  private _urlSuggestionList = 'product/SuggestionList';
  private _urlSuggestionList2 = 'product/SuggestionList2';
  private _urlProductOfferList = 'product/OfferList/';
  private _urlProductDiscountList = 'product/DiscountList/';
  private _urlPurchaseRequestList = 'PurchaseRequest/list/';

  constructor(private _http: HttpClient,
    private _global: GlobalService,
    private _auth: AuthService) {
    this._urlSuggestionList = _global.BASE_API_URL + this._urlSuggestionList;
    this._urlSuggestionList2 = _global.BASE_API_URL + this._urlSuggestionList2;
    this._urlProductOfferList = _global.BASE_API_URL + this._urlProductOfferList;
    this._urlProductDiscountList = _global.BASE_API_URL + this._urlProductDiscountList;
    this._urlPurchaseRequestList = _global.BASE_API_URL + this._urlPurchaseRequestList;
  }

  getSuggestionList(): Observable<any> {

    if (this._auth.checkLogin()) {

      const _token = this._auth.getToken();
      httpOptions.headers =
        httpOptions.headers.set('Authorization', `bearer ${_token}`);
     
      return this._http.get(this._urlSuggestionList2, httpOptions)
        .catch(this.errorHandler);
    }
    else {
      return this._http.get(this._urlSuggestionList)
        .catch(this.errorHandler);
    }
   
  }

  getDiscountList(text): Observable<any> {
    return this._http.get(this._urlProductDiscountList + text)
      .catch(this.errorHandler);
  }

  getOfferList(text): Observable<any> {
    return this._http.get(this._urlProductOfferList + text)
      .catch(this.errorHandler);
  }

  getPurchaseRequestList(text): Observable<any> {
    return this._http.get(this._urlPurchaseRequestList + text)
      .catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

}
