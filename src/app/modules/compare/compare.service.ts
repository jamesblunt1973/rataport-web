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
export class CompareService {

  private _urlCompareProductList = 'compare/ProductList/';
  private _urlCompareList = 'compare/List/';

  constructor(private _http: HttpClient,
    private _global: GlobalService,
    private _auth: AuthService) {
    this._urlCompareProductList = _global.BASE_API_URL + this._urlCompareProductList;
    this._urlCompareList = _global.BASE_API_URL + this._urlCompareList;
    // this._urlFilter = _global.BASE_API_URL + this._urlFilter + _global.LANGUAGE;
  }

  // getCompareProductList(id1, id2, id3, id4) {
  //   return this._http.get<any>(this._urlCompareList + id1 + '/' + id2 + '/' + id3 + '/' + id4, httpOptions).catch(this.errorHandler);
  // }

  getCompareProductList(data: any): Observable<any> {
    // const _token = this._auth.getToken();
    // httpOptions.headers =
    //   httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlCompareList, data)
      .catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }


}
