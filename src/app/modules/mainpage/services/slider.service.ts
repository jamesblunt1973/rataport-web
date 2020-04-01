import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Services
import { GlobalService } from '../../../services/global.service';

@Injectable()
export class SliderService {

  private _url = 'slideshows/get/';
  private _urlSiteInfo = 'SiteInfoes/get/';

  constructor(private http: HttpClient, private _global: GlobalService) {
    this._url = _global.BASE_API_URL + this._url + _global.LANGUAGE;
    this._urlSiteInfo = _global.BASE_API_URL + this._urlSiteInfo + _global.LANGUAGE;
  }

  getSliders(): Observable<any[]> {
    return this.http.get<any[]>(this._url)
      .catch(this.errorHandler);
  }

  getSiteInfo(): Observable<any[]> {
    return this.http.get<any[]>(this._urlSiteInfo)
      .catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

}
