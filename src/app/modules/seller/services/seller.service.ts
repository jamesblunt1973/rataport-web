import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Global variables
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SellerService {

  private _urlSellerDetails = 'Seller/SellerDetails/';
  private _urlSellerDetails2 = 'Seller/SellerDetails2/';
  private _urlMessageToSeller = 'MessageToSeller/Create/';
  private _urlsetfollow = 'Follow/SetFollow';
  private _urlunfollow = 'Follow/UnFollow';
  private _urlfollowstatus = 'Follow/CheckStatus';
  private _urlFilterProducts = 'Seller/FilterProducts/';
  private _urlSellerCertificates = 'seller/certificates/';

  constructor(private _http: HttpClient,
    private _global: GlobalService,
    private _auth: AuthService) {
    this._urlSellerDetails = _global.BASE_API_URL + this._urlSellerDetails;
    this._urlSellerDetails2 = _global.BASE_API_URL + this._urlSellerDetails2;
    this._urlMessageToSeller = _global.BASE_API_URL + this._urlMessageToSeller;
    this._urlsetfollow = _global.BASE_API_URL + this._urlsetfollow;
    this._urlunfollow = _global.BASE_API_URL + this._urlunfollow;
    this._urlfollowstatus = _global.BASE_API_URL + this._urlfollowstatus;
    this._urlFilterProducts = _global.BASE_API_URL + this._urlFilterProducts;
    this._urlSellerCertificates = _global.BASE_API_URL + this._urlSellerCertificates;

  }

  registerMessage(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlMessageToSeller, data, httpOptions)
      .catch(this.errorHandler);
  }

  setFollow(data): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlsetfollow, data, httpOptions)
      .catch(this.errorHandler);
  }

  unFollow(data): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlunfollow, data, httpOptions)
      .catch(this.errorHandler);
  }

  followStatus(data): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlfollowstatus, data, httpOptions)
      .catch(this.errorHandler);
  }

  getSellerDetails(id: number) {
    if (this._auth.checkLogin()) {
      const _token = this._auth.getToken();
      httpOptions.headers =
        httpOptions.headers.set('Authorization', `bearer ${_token}`);

      return this._http.get<any>(this._urlSellerDetails2 + id, httpOptions).catch(this.errorHandler);
    } else {
      return this._http.get<any>(this._urlSellerDetails + id).catch(this.errorHandler);
    }
  }

  getSellerCertificates(sellerId, subject) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSellerCertificates + '/' + sellerId + '/' + subject, httpOptions)
      .catch(this.errorHandler);
  }

  filterProducts(id: number, cat3: number) {
    if (this._auth.checkLogin()) {
      const _token = this._auth.getToken();
      httpOptions.headers =
        httpOptions.headers.set('Authorization', `bearer ${_token}`);

      return this._http.get<any>(this._urlFilterProducts + id + '/' + cat3, httpOptions).catch(this.errorHandler);
    } else {
      return this._http.get<any>(this._urlFilterProducts + id + '/' + cat3).catch(this.errorHandler);
    }
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

}
