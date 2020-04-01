import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Global variables
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class BuyProtectionService {

  private _urlFindbyID = 'product/findbyID/';
  private _urlSecureOrder = 'SecureOrder/Create/';
  private _urlUnits = 'units/get/';
  private _urlRegions = 'regions/getregion/';
  private _urlIsComplete = 'seller/IsComplete/';

  constructor(private _http: HttpClient,
    private _global: GlobalService,
    private _auth: AuthService) {
    this._urlFindbyID = _global.BASE_API_URL + this._urlFindbyID;
    this._urlSecureOrder = _global.BASE_API_URL + this._urlSecureOrder;
    this._urlUnits = _global.BASE_API_URL + this._urlUnits + _global.LANGUAGE;
    this._urlRegions = _global.BASE_API_URL + this._urlRegions + _global.LANGUAGE;
    this._urlIsComplete = _global.BASE_API_URL + this._urlIsComplete;
  }

  productFindbyID(id) {
    return this._http.get<any>(this._urlFindbyID + id).catch(this.errorHandler);
  }
   
  getUnits() {
    return this._http.get<any>(this._urlUnits).catch(this.errorHandler);
  }

  getRegions() {
    return this._http.get<any>(this._urlRegions).catch(this.errorHandler);
  }

  registerPurchaseRequest(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlSecureOrder, data, httpOptions)
      .catch(this.errorHandler);
  }

  IsComplete() {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get<any>(this._urlIsComplete, httpOptions)
      .catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }


}
