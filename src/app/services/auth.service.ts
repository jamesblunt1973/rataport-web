import { Injectable, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Global variables
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {

  private _url = 'users/';
  private _urlforgot = 'users/ForgotPassword';
  private _urlConfirmEmail = 'users/ConfirmEmail';
  private _urlResetForgotPassword = 'users/ResetForgotPassword';
  private _urlreset = 'users/ResetPassword';
  private _urlChangePassword = 'users/ChangePassword';
  private _urlpackagePermissions = 'package/Permissions';

  public redirectUrl: string;
  public currentUser = new BehaviorSubject(false);
  public curUser: any;

  constructor(private http: HttpClient,
    private _route: Router,
    private _global: GlobalService) {
    this._url = _global.BASE_API_URL + this._url;
    this._urlforgot = _global.BASE_API_URL + this._urlforgot;
    this._urlConfirmEmail = _global.BASE_API_URL + this._urlConfirmEmail;
    this._urlResetForgotPassword = _global.BASE_API_URL + this._urlResetForgotPassword;

    this._urlreset = _global.BASE_API_URL + this._urlreset;
    this._urlChangePassword = _global.BASE_API_URL + this._urlChangePassword;
    this._urlpackagePermissions = _global.BASE_API_URL + this._urlpackagePermissions;
    this.currentUser.next(this.getUser());
  }

  packagePermissions(): Observable<any> {
    const _token = this.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this.http.get(this._urlpackagePermissions, httpOptions)
      .catch(this.errorHandler);
  }


  changePass(data: any): Observable<any> {
    const _token = this.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this.http.post(this._urlChangePassword, data, httpOptions)
      .catch(this.errorHandler);
  }

  register(data: any): Observable<any> {
    return this.http.post(this._url + 'register', data)
      .catch(this.errorHandler);
  }

  login(data: any) {
    return this.http.post(this._url + 'login', data, httpOptions)
      .catch(this.errorHandler);
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(this._urlforgot, data, httpOptions)
      .catch(this.errorHandler);
  }

  resetPass(data: any): Observable<any> {
    return this.http.post(this._urlreset, data, httpOptions)
      .catch(this.errorHandler);
  }

  confirmEmail(data: any): Observable<any> {
    return this.http.post(this._urlConfirmEmail, data, httpOptions)
      .catch(this.errorHandler);
  }
  resetForgotPassword(data: any): Observable<any> {
    return this.http.post(this._urlResetForgotPassword, data, httpOptions)
      .catch(this.errorHandler);
  }
  
  getUser() {
    const token = localStorage.getItem('_token');
    return token ? true : false;
  }

  getPermission() {
    const permission = localStorage.getItem('_mmk');
    const type = JSON.parse(permission);
    if (type === 2) {
      return { id: type, type: 'special', persianName: 'ویژه' };
    } else if (type === 1) {
      return { id: type, type: 'general', persianName: 'عادی' };
    }
  }

  getToken() {
    const token = localStorage.getItem('_token');
    return JSON.parse(token);
  }

  logout() {
    localStorage.removeItem('_token');
    localStorage.removeItem('_mmk');
    this.currentUser.next(false);
    this._route.navigateByUrl('');
    location.reload();
  }

  checkLogin(): boolean {
    return this.getUser();
  }

  setUser(token) {
    localStorage.setItem('_token', JSON.stringify(token));
    this.currentUser.next(true);
  }

  setMembership(kind) {
    localStorage.setItem('_mmk', JSON.stringify(kind));
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.logout();
      return Observable.throw(error.message || 'Server Error');
    } else {
      return Observable.throw(error.message || 'Server Error');
    }
  }

}
