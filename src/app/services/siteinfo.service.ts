import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Services
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SiteinfoService {

  private _url = 'siteinfoes/get/';
  private _urlMenu = 'menu/get/';
  private _urlSitemap = 'menu/sitemap/';
  private _urlRegion = 'regions/getregion/';
  private _urlcontents = '/pages/get/';
  private _urlgetunitcontactus = '/department/get/';
  private _urlsave = 'contactus/post';
  private _urlfaq = 'faq/selectAll';
  private _urlfee = 'package/get';
  private _urlSearchProduct = 'product/Search';
  private _urlSearchseller = 'seller/search';
  private _urlSearchOfferList = 'product/OfferList';
  private _urlSearchSeller = 'seller/search';

  constructor(private http: HttpClient, private _global: GlobalService) {
    this._url = _global.BASE_API_URL + this._url + _global.LANGUAGE;
    this._urlMenu = _global.BASE_API_URL + this._urlMenu + _global.LANGUAGE;
    this._urlSitemap = _global.BASE_API_URL + this._urlSitemap + _global.LANGUAGE;
    this._urlRegion = _global.BASE_API_URL + this._urlRegion + _global.LANGUAGE;
    this._urlcontents = _global.BASE_API_URL + this._urlcontents;
    this._urlgetunitcontactus = _global.BASE_API_URL + this._urlgetunitcontactus + _global.LANGUAGE;
    this._urlfaq = _global.BASE_API_URL + this._urlfaq;
    this._urlfee = _global.BASE_API_URL + this._urlfee;
    this._urlsave = _global.BASE_API_URL + this._urlsave;
  }

  getInfo(): Observable<any[]> {
    return this.http.get<any[]>(this._url)
      .catch(this.errorHandler);
  }

  getFAQs(): Observable<any[]> {
    return this.http.get<any[]>(this._urlfee)
      .catch(this.errorHandler);
  }

  getFees(): Observable<any[]> {
    return this.http.get<any[]>(this._urlfaq)
      .catch(this.errorHandler);
  }

  getRegion(): Observable<any[]> {
    return this.http.get<any[]>(this._urlRegion)
      .catch(this.errorHandler);
  }

  getHeaderInfo(): Observable<any[]> {
    return this.http.get<any[]>(this._urlMenu + '/' + this._global.HEADER_GROUP_ID)
      .catch(this.errorHandler);
  }

  getFooterInfo(): Observable<any[]> {
    return this.http.get<any[]>(this._urlMenu + '/' + this._global.FOOTER_GROUP_ID)
      .catch(this.errorHandler);
  }

  getSitemapInfo(): Observable<any[]> {
    return this.http.get<any[]>(this._urlSitemap + '/' + this._global.SITEMAP_GROUP_ID)
      .catch(this.errorHandler);
  }

  getPage(id): Observable<any> {
    return this.http.get<any>(this._urlcontents + id)
      .catch(this.errorHandler);
  }

  getUnit(): Observable<any[]> {
    return this.http.get<any[]>(this._urlgetunitcontactus)
      .catch(this.errorHandler);
  }

  sendMessage(data: any): Observable<any> {
    return this.http.post(this._urlsave, data, httpOptions)
      .catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

}
