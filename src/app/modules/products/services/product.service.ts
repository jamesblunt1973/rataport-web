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
export class ProductService {

  private _url = 'product/list/';
  private _urlFilter = 'product/filter/';
  private _urlLevels = 'category/Get4Level/';
  private _urlSeller = 'seller/list/';
  private _urlProductDetail = 'product/details/';
  private _urlProductDetail2 = 'product/details2/';
  private _urlUserLocation = 'category/ChildToParentCategory/';
  private _urlProperty = 'CategoryProperty/filter/';
  private _urlorder = 'order/BaseData/';
  private _urlregorder = 'order/Create/';
  private _urlNegotiate = 'Negotiate/Create/';
  private _urlProductQuestion = 'ProductQuestion/Create/';
  private _urlPurchaseRequestBaseData = 'PurchaseRequest/BaseData/';
  private _urlPurchaseRequest = 'PurchaseRequest/Create/';
  private _urlSimilarProducts = 'Product/SimilarProducts/';
  private _urlComments = 'productComment/ProductComments/';
  private _urlRegisterProductComment = 'ProductComment/Create/';
  private _urlPreFactor = 'order/SelectOne/';
  private _urlWishListAddProduct = 'wishList/AddProduct/';
  private _urlWishListAddSeller = 'wishList/AddSeller/';
  private _urlRate = 'rate/rate/';
  private _urlBrandsList = 'Brand/List/';
  private _urlParentCategories = 'category/FindCat1Cat2/';
  private _urlFindCat1 = 'category/FindCat1/';
  private _urlOrderCreate = 'Payment/OrderCreate/';
  private _urlSecureOrderCreate = 'Payment/SecureOrderCreate/';
  private _urlcategoryChildToParent = 'category/ChildToParent/';

  constructor(private _http: HttpClient,
    private _global: GlobalService,
    private _auth: AuthService) {
    this._url = _global.BASE_API_URL + this._url;
    this._urlSeller = _global.BASE_API_URL + this._urlSeller;
    this._urlUserLocation = _global.BASE_API_URL + this._urlUserLocation;
    this._urlFilter = _global.BASE_API_URL + this._urlFilter + _global.LANGUAGE;
    this._urlLevels = _global.BASE_API_URL + this._urlLevels + _global.LANGUAGE;
    this._urlProductDetail = _global.BASE_API_URL + this._urlProductDetail;
    this._urlProductDetail2 = _global.BASE_API_URL + this._urlProductDetail2;
    this._urlProperty = _global.BASE_API_URL + this._urlProperty;
    this._urlorder = _global.BASE_API_URL + this._urlorder;
    this._urlregorder = _global.BASE_API_URL + this._urlregorder;
    this._urlNegotiate = _global.BASE_API_URL + this._urlNegotiate;
    this._urlProductQuestion = _global.BASE_API_URL + this._urlProductQuestion;
    this._urlPurchaseRequestBaseData = _global.BASE_API_URL + this._urlPurchaseRequestBaseData + _global.LANGUAGE;
    this._urlPurchaseRequest = _global.BASE_API_URL + this._urlPurchaseRequest;
    this._urlSimilarProducts = _global.BASE_API_URL + this._urlSimilarProducts;
    this._urlComments = _global.BASE_API_URL + this._urlComments;
    this._urlRegisterProductComment = _global.BASE_API_URL + this._urlRegisterProductComment;
    this._urlPreFactor = _global.BASE_API_URL + this._urlPreFactor;
    this._urlWishListAddProduct = _global.BASE_API_URL + this._urlWishListAddProduct;
    this._urlWishListAddSeller = _global.BASE_API_URL + this._urlWishListAddSeller;
    this._urlRate = _global.BASE_API_URL + this._urlRate;
    this._urlBrandsList = _global.BASE_API_URL + this._urlBrandsList;
    this._urlParentCategories = _global.BASE_API_URL + this._urlParentCategories;
    this._urlFindCat1 = _global.BASE_API_URL + this._urlFindCat1;
    this._urlOrderCreate = _global.BASE_API_URL + this._urlOrderCreate;
    this._urlSecureOrderCreate = _global.BASE_API_URL + this._urlSecureOrderCreate;
    this._urlcategoryChildToParent = _global.BASE_API_URL + this._urlcategoryChildToParent;
  }

  getCats(cat3) {
    return this._http.get<any>(this._urlcategoryChildToParent + '/' + cat3).catch(this.errorHandler);
  }

  getProducts(data: any): Observable<any> {
    return this._http.post(this._url, data, httpOptions)
      .catch(this.errorHandler);
  }

  getSellers(data: any): Observable<any> {
    return this._http.post(this._urlSeller, data, httpOptions)
      .catch(this.errorHandler);
  }

  getBrands(data: any): Observable<any> {
    return this._http.post(this._urlBrandsList, data, httpOptions)
      .catch(this.errorHandler);
  }

  getFilters() {
    return this._http.get<any>(this._urlFilter).catch(this.errorHandler);
  }

  getProductDetail(id: number) {
    if (this._auth.checkLogin()) {
      const _token = this._auth.getToken();
      httpOptions.headers =
        httpOptions.headers.set('Authorization', `bearer ${_token}`);

      return this._http.get<any>(this._urlProductDetail2 + id, httpOptions).catch(this.errorHandler);
    } else {
      return this._http.get<any>(this._urlProductDetail + id).catch(this.errorHandler);
    }
  }

  getLevels() {
    return this._http.get<any>(this._urlLevels).catch(this.errorHandler);
  }

  getUserLocation(id: number) {
    return this._http.get<any>(this._urlUserLocation + id).catch(this.errorHandler);
  }

  getProperty(category: number) {
    return this._http.get<any>(this._urlProperty + category).catch(this.errorHandler);
  }

  loadParentCategories(category: number) {
    return this._http.get<any>(this._urlParentCategories + category).catch(this.errorHandler);
  }

  findCat1(category: number) {
    return this._http.get<any>(this._urlFindCat1 + category).catch(this.errorHandler);
  }

  getOrder(productId: number) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get<any>(this._urlorder + productId, httpOptions)
      .catch(this.errorHandler);
  }

  orderPaymentCreate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlOrderCreate, data, httpOptions)
      .catch(this.errorHandler);
  }

  secureOrderPaymentCreate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSecureOrderCreate, data, httpOptions)
      .catch(this.errorHandler);
  }

  orderPayment(data: any) {
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', 'https://bpm.shaparak.ir/pgwchannel/startpay.mellat');
    form.setAttribute('target', '_self');
    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('name', 'RefId');
    hiddenField.setAttribute('value', data);
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

  }

  getPreFactor(orderId: number) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get<any>(this._urlPreFactor + orderId, httpOptions)
      .catch(this.errorHandler);
  }

  registerOrder(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlregorder, data, httpOptions)
      .catch(this.errorHandler);
  }

  registerNegotiate(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlNegotiate, data, httpOptions)
      .catch(this.errorHandler);
  }

  registerProductQuestion(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlProductQuestion, data, httpOptions)
      .catch(this.errorHandler);
  }

  registerProductComment(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlRegisterProductComment, data, httpOptions)
      .catch(this.errorHandler);
  }

  getPurchaseRequestBaseData() {
    return this._http.get<any>(this._urlPurchaseRequestBaseData).catch(this.errorHandler);
  }

  registerPurchaseRequest(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlPurchaseRequest, data, httpOptions)
      .catch(this.errorHandler);
  }

  getSimilarProducts(id) {
    return this._http.get<any>(this._urlSimilarProducts + id).catch(this.errorHandler);
  }

  getComments(id) {
    return this._http.get<any>(this._urlComments + id).catch(this.errorHandler);
  }

  wishListAddProduct(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlWishListAddProduct, data, httpOptions)
      .catch(this.errorHandler);
  }

  wishListAddSeller(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlWishListAddSeller, data, httpOptions)
      .catch(this.errorHandler);
  }

  rateProduct(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlRate, data, httpOptions)
      .catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

}


