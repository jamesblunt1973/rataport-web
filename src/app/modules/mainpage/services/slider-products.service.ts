import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Services
import { GlobalService } from '../../../services/global.service';

@Injectable()
export class SliderProductsService {

  private _urlNewProducts = 'product/NewProducts/';
  private _urlNewPersianProducts = 'product/NewPersianProducts/';
  private _urlNewKnowledgebaseProducts = 'product/NewKnowledgebaseProducts/';

  constructor(private http: HttpClient, private _global: GlobalService) {
    this._urlNewProducts = _global.BASE_API_URL + this._urlNewProducts;
    this._urlNewPersianProducts = _global.BASE_API_URL + this._urlNewPersianProducts;
    this._urlNewKnowledgebaseProducts = _global.BASE_API_URL + this._urlNewKnowledgebaseProducts;
  }

  getNewProducts(): Observable<any[]> {
    return this.http.get<any[]>(this._urlNewProducts)
      .catch(this.errorHandler);
  }

  getNewPersianProducts(): Observable<any[]> {
    return this.http.get<any[]>(this._urlNewPersianProducts)
      .catch(this.errorHandler);
  }

  getNewKnowledgebaseProducts(): Observable<any[]> {
    return this.http.get<any[]>(this._urlNewKnowledgebaseProducts)
      .catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

}
