import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Services
import { GlobalService } from '../../../services/global.service';

@Injectable()
export class HelpUserService {

  private _url = 'OurServices/get/';

  constructor(private http: HttpClient, private _global: GlobalService) {
    this._url = _global.BASE_API_URL + this._url + _global.LANGUAGE;
  }

  getHelpData(): Observable<any[]> {
    return this.http.get<any[]>(this._url)
      .catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

}
