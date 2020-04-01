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
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};

@Injectable()
export class ProfileService {
  private _url = 'seller/SellerInfo';
  // Product
  private _urladdproduct = 'product/Create';
  private _urleditproduct = 'product/Update';
  private _urlmyproducts = 'product/MyList';
  private _urldeleteproduct = 'product/Delete';
  private _urlbindeproduct = 'product/bind/';
  private _urlProductImages = 'product/ProductImages/';
  private _urlDeleteImage = 'product/DeleteImage/';
  private _urlbasedata = 'product/ProductBaseData/';
  private _urlLowestPrice = 'product/LowestPrice/';
  // Certificate
  private _urlcertificate = 'Certificate/Create';
  private _urlcertificatelist = 'Certificate/MyList';
  private _urldelcertificate = 'Certificate/Delete';
  private _urlinmenu = 'seller/GetInMenu';
  private _urlupdatelogo = 'seller/updateLogo';
  private _urladdabout = 'seller/updateAboutUs';
  private _urladdoutlook = 'seller/UpdateOutlook';
  private _urladdgoals = 'seller/UpdateGoals';
  private _urladdstrategy = 'seller/UpdateStrategy';
  private _urlgetBankInfo = 'bank/GetBankInfo';
  private _urlupdateBankInfo = 'bank/UpdateBankInfo';
  private _urlLast24Hour = 'Last24Hour/Last24/';
  private _urlAddPerson = 'person/create/';
  private _urlGetContactInfo = 'seller/GetContactInfo/';
  private _urlMessengers = 'Messenger/get/';
  // PriceInquery
  private _urlPriceInqueryCreate = 'PriceInquery/create/';
  private _urlPriceInquerySentList = 'PriceInquery/SentList/';
  private _urlPriceInqueryReceivedList = 'PriceInquery/ReceivedList/';
  private _urlPriceInqueryAnswer = 'PriceInquery/Answer/';
  private _urlPriceInqueryApplicantRead = 'PriceInquery/ApplicantRead/';
  private _urlPriceInquerySellerRead = 'PriceInquery/SellerRead/';
  // Purchase Request
  private _urlPurchaseRequestSentList = 'PurchaseRequest/SentList/';
  private _urlPurchaseRequestReceivedList = 'PurchaseRequest/ReceivedList/';
  private _urlPurchaseRequestReplylist = 'PurchaseRequest/replylist/';
  private _urlPurchaseRequestAnswer = 'PurchaseRequest/Answer/';
  private _urlPurchaseRequestApplicantRead = 'PurchaseRequest/ApplicantRead/';
  private _urlSentUserMessages = 'MessageToSeller/MyMessages/';
  private _urlReceiveUserMessages = 'MessageToSeller/SellerMessages/';
  private _urlSellerRead = 'MessageToSeller/SellerRead/';
  private _urlReportAbuse = 'ReportAbuse/create/';
  private _urlchangestatus = 'product/ChangeStatus/';
  private _urlUpdateLegalInfo = 'seller/UpdateLegalInfo/';
  private _urlRemoveLogo = 'seller/RemoveLogo/';
  private _urlUpdateNonLegalInfo = 'seller/UpdateNonLegalInfo/';
  private _urlSecureOrderMylist = 'SecureOrder/mylist/';
  private _urlcreateBrand = 'Brand/Create/';
  private _urlGetBrands = 'Brand/MyList/';
  private _urlDeleteBrands = 'Brand/Delete/';
  private _urlUpdateCantactInfo = 'seller/UpdateCantactInfo/';
  private _urlMessengerUpdate = 'Messenger/Update/';
  private _urlSocialsUpdate = 'Socials/Update/';
  private _urldeleteperson = 'person/Delete/';
  // Order api
  private _urlOrderSentList = 'order/SentList/';
  private _urlOrderReceivedList = 'order/receivedList/';
  private _urlOrderCancelAfterShipping = 'Order/CancelAfterShipping/';
  private _urlOrderCancelBeforeShipping = 'Order/CancelBeforeShipping/';
  private _urlOrderReceiveGoodsByBuyer = 'Order/ReceiveGoodsByBuyer/';
  private _urlOrderReceiveGoodsBySeller = 'Order/ReceiveGoodsBySeller/';
  private _urlOrderShippingBySeller = 'Order/ShippingBySeller/';
  private _urlOrderApplicantRead = 'order/ApplicantRead/';
  private _urlOrderSellerRead = 'order/SellerRead/';
  // Secure Order api
  private _urlSecureOrderSentList = 'SecureOrder/SentList/';
  private _urlSecureOrderReceivedList = 'SecureOrder/receivedList/';
  private _urlSecureOrderCancelAfterShipping = 'SecureOrder/CancelAfterShipping/';
  private _urlSecureOrderCancelBeforeShipping = 'SecureOrder/CancelBeforeShipping/';
  private _urlSecureOrderReceiveGoodsByBuyer = 'SecureOrder/ReceiveGoodsByBuyer/';
  private _urlSecureOrderReceiveGoodsBySeller = 'SecureOrder/ReceiveGoodsBySeller/';
  private _urlSecureOrderShippingBySeller = 'SecureOrder/ShippingBySeller/';
  private _urlSecureOrderApplicantRead = 'SecureOrder/ApplicantRead/';
  private _urlSecureOrderSellerRead = 'SecureOrder/SellerRead/';
  // My notify api
  private _urlNotifyMeCreate = 'NotifyMe/Create/';
  private _urlNotifyMeDelete = 'NotifyMe/Delete/';
  private _urlNotifyMeMyList = 'NotifyMe/MyList/';
  // ProductQuestion
  private _urlProductQuestionSentList = 'ProductQuestion/SentList/';
  private _urlProductQuestionReceivedList = 'ProductQuestion/receivedList/';
  private _urlProductQuestionAnswer = 'ProductQuestion/Answer/';
  private _urlProductQuestionApplicantRead = 'productQuestion/ApplicantRead/';
  private _urlProductQuestionSellerRead = 'productQuestion/SellerRead/';
  // Document
  private _urlDocumentCreate = 'Document/Create/';
  private _urlDocumentDelete = 'Document/Delete/';
  private _urlDocumentMyList = 'Document/MyList/';

  // trust badge
  private _urlTrustBadgeCreate = 'TrustBadge/Create/';
  private _urlTrustBadgeDelete = 'TrustBadge/Delete/';
  private _urlTrustBadgeMyList = 'TrustBadge/MyList/';

  // Favorite
  private _urlWishListMyProducts = 'wishList/MyProducts/';
  private _urlWishListMySellers = 'wishList/MySellers/';
  private _urlWishListRemoveProduct = 'wishList/RemoveProduct/';
  private _urlWishListRemoveSeller = 'wishList/RemoveSeller/';
  // OfferList
  private _urlOfferList = 'NotifyMe/OfferList/';
  // DiscountList
  private _urlDiscountList = 'NotifyMe/DiscountList/';
  // SellerWorkPlace
  private _urlSellerWorkPlaceCreate = 'SellerWorkPlace/Create/';
  private _urlSellerWorkPlaceList = 'SellerWorkPlace/List/';
  private _urlSellerWorkPlacDeleteOne = 'SellerWorkPlace/DeleteOne/';
  private _urlSellerWorkPlacDeleteAll = 'SellerWorkPlace/DeleteAll/';
  // SellerPersonalPage
  private _urlSellerPersonalPageCreate = 'SellerPersonalPage/Create/';
  private _urlSellerPersonalPageList = 'SellerPersonalPage/List/';
  private _urlSellerPersonalPageDeleteOne = 'SellerPersonalPage/DeleteOne/';
  private _urlSellerPersonalPageDeleteAll = 'SellerPersonalPage/DeleteAll/';
  // Notification
  private _urlNotificationMyList = 'Notification/MyList/';
  private _urlNotificationReadMessage = 'Notification/ReadMessage/';
  private _urlNotificationDelete = 'Notification/delete/';
  private _urlNotificationDeleteAll = 'Notification/deleteAll/';
  private _urlNotificationUnreadMessages = 'Notification/UnreadMessages/';
  private _urlNotificationReadAllMessage = 'Notification/ReadAllMessage/';
  // Negotiate
  private _urlNegotiateSentList = 'Negotiate/SentList/';
  private _urlNegotiateReceivedList = 'Negotiate/ReceivedList/';
  private _urlNegotiateAnswer = 'Negotiate/Answer/';
  private _urlNegotiateApplicantRead = 'Negotiate/ApplicantRead/';
  private _urlNegotiateSellerRead = 'Negotiate/SellerRead/';
  // Discount
  private _urlSetDiscount = 'product/SetDiscount/';
  private _urlGetDiscount = 'product/GetDiscount/';
  private _urlsetOffer = 'product/SetOffer/';
  private _urlGetOffer = 'product/GetOffer/';
  // Sign
  private _urlSellerBadgesStatus = 'Seller/BadgesStatus/';
  // payment
  private _urlSpecialBadgeCreate = 'Payment/SpecialBadgeCreate/';
  private _urlPaymentList = 'Payment/MyPayments/';
  private _urlPaymentDetails = 'Payment/Details/';
  // BaseDataForSearch
  private _urlBaseDataForSearch = 'product/BaseDataForSearch/';

  private _urlUnits = 'units/get/';

  constructor(private _http: HttpClient,
    private _global: GlobalService,
    private _auth: AuthService) {
    this._urlRemoveLogo = _global.BASE_API_URL + this._urlRemoveLogo;
    this._urlbindeproduct = _global.BASE_API_URL + this._urlbindeproduct;
    this._urlProductImages = _global.BASE_API_URL + this._urlProductImages;
    this._urlDeleteImage = _global.BASE_API_URL + this._urlDeleteImage;
    this._urlSocialsUpdate = _global.BASE_API_URL + this._urlSocialsUpdate;
    // BaseDataForSearch
    this._urlBaseDataForSearch = _global.BASE_API_URL + this._urlBaseDataForSearch;
    // Notification
    this._urlNotificationMyList = _global.BASE_API_URL + this._urlNotificationMyList;
    this._urlNotificationReadMessage = _global.BASE_API_URL + this._urlNotificationReadMessage;
    this._urlNotificationDelete = _global.BASE_API_URL + this._urlNotificationDelete;
    this._urlNotificationDeleteAll = _global.BASE_API_URL + this._urlNotificationDeleteAll;
    this._urlNotificationUnreadMessages = _global.BASE_API_URL + this._urlNotificationUnreadMessages;
    this._urlNotificationReadAllMessage = _global.BASE_API_URL + this._urlNotificationReadAllMessage;
    // SellerWorkPlace
    this._urlSellerWorkPlaceCreate = _global.BASE_API_URL + this._urlSellerWorkPlaceCreate;
    this._urlSellerWorkPlaceList = _global.BASE_API_URL + this._urlSellerWorkPlaceList;
    this._urlSellerWorkPlacDeleteOne = _global.BASE_API_URL + this._urlSellerWorkPlacDeleteOne;
    this._urlSellerWorkPlacDeleteAll = _global.BASE_API_URL + this._urlSellerWorkPlacDeleteAll;
    // SellerPersonalPage
    this._urlSellerPersonalPageCreate = _global.BASE_API_URL + this._urlSellerPersonalPageCreate;
    this._urlSellerPersonalPageList = _global.BASE_API_URL + this._urlSellerPersonalPageList;
    this._urlSellerPersonalPageDeleteOne = _global.BASE_API_URL + this._urlSellerPersonalPageDeleteOne;
    this._urlSellerPersonalPageDeleteAll = _global.BASE_API_URL + this._urlSellerPersonalPageDeleteAll;
    this._url = _global.BASE_API_URL + this._url;
    this._urladdproduct = _global.BASE_API_URL + this._urladdproduct;
    this._urleditproduct = _global.BASE_API_URL + this._urleditproduct;
    this._urlbasedata = _global.BASE_API_URL + this._urlbasedata + _global.LANGUAGE;
    this._urlcertificate = _global.BASE_API_URL + this._urlcertificate;
    this._urlcertificatelist = _global.BASE_API_URL + this._urlcertificatelist;
    this._urldelcertificate = _global.BASE_API_URL + this._urldelcertificate;
    this._urlinmenu = _global.BASE_API_URL + this._urlinmenu;
    this._urlupdatelogo = _global.BASE_API_URL + this._urlupdatelogo;
    this._urladdabout = _global.BASE_API_URL + this._urladdabout;
    this._urladdoutlook = _global.BASE_API_URL + this._urladdoutlook;
    this._urladdgoals = _global.BASE_API_URL + this._urladdgoals;
    this._urladdstrategy = _global.BASE_API_URL + this._urladdstrategy;
    this._urlmyproducts = _global.BASE_API_URL + this._urlmyproducts;
    this._urldeleteproduct = _global.BASE_API_URL + this._urldeleteproduct;
    this._urlgetBankInfo = _global.BASE_API_URL + this._urlgetBankInfo;
    this._urlupdateBankInfo = _global.BASE_API_URL + this._urlupdateBankInfo;
    this._urlPriceInqueryCreate = _global.BASE_API_URL + this._urlPriceInqueryCreate;
    this._urlLast24Hour = _global.BASE_API_URL + this._urlLast24Hour;
    this._urlAddPerson = _global.BASE_API_URL + this._urlAddPerson;
    this._urlGetContactInfo = _global.BASE_API_URL + this._urlGetContactInfo;
    this._urlMessengers = _global.BASE_API_URL + this._urlMessengers;
    this._urlSentUserMessages = _global.BASE_API_URL + this._urlSentUserMessages;
    this._urlReceiveUserMessages = _global.BASE_API_URL + this._urlReceiveUserMessages;
    this._urlSellerRead = _global.BASE_API_URL + this._urlSellerRead;
    this._urlReportAbuse = _global.BASE_API_URL + this._urlReportAbuse;
    this._urlchangestatus = _global.BASE_API_URL + this._urlchangestatus;
    this._urlUpdateLegalInfo = _global.BASE_API_URL + this._urlUpdateLegalInfo;
    this._urlUpdateNonLegalInfo = _global.BASE_API_URL + this._urlUpdateNonLegalInfo;
    this._urlSecureOrderMylist = _global.BASE_API_URL + this._urlSecureOrderMylist;
    this._urlcreateBrand = _global.BASE_API_URL + this._urlcreateBrand;
    this._urlGetBrands = _global.BASE_API_URL + this._urlGetBrands;
    this._urlDeleteBrands = _global.BASE_API_URL + this._urlDeleteBrands;
    this._urlUpdateCantactInfo = _global.BASE_API_URL + this._urlUpdateCantactInfo;
    this._urlMessengerUpdate = _global.BASE_API_URL + this._urlMessengerUpdate;
    this._urldeleteperson = _global.BASE_API_URL + this._urldeleteperson;
    // Purchase Request
    this._urlPurchaseRequestSentList = _global.BASE_API_URL + this._urlPurchaseRequestSentList;
    this._urlPurchaseRequestReceivedList = _global.BASE_API_URL + this._urlPurchaseRequestReceivedList;
    this._urlPurchaseRequestReplylist = _global.BASE_API_URL + this._urlPurchaseRequestReplylist;
    this._urlPurchaseRequestAnswer = _global.BASE_API_URL + this._urlPurchaseRequestAnswer;
    this._urlPurchaseRequestApplicantRead = _global.BASE_API_URL + this._urlPurchaseRequestApplicantRead;
    // Order
    this._urlOrderSentList = _global.BASE_API_URL + this._urlOrderSentList;
    this._urlOrderReceivedList = _global.BASE_API_URL + this._urlOrderReceivedList;
    this._urlOrderCancelAfterShipping = _global.BASE_API_URL + this._urlOrderCancelAfterShipping;
    this._urlOrderCancelBeforeShipping = _global.BASE_API_URL + this._urlOrderCancelBeforeShipping;
    this._urlOrderReceiveGoodsByBuyer = _global.BASE_API_URL + this._urlOrderReceiveGoodsByBuyer;
    this._urlOrderReceiveGoodsBySeller = _global.BASE_API_URL + this._urlOrderReceiveGoodsBySeller;
    this._urlOrderShippingBySeller = _global.BASE_API_URL + this._urlOrderShippingBySeller;
    this._urlOrderSellerRead = _global.BASE_API_URL + this._urlOrderSellerRead;
    this._urlOrderApplicantRead = _global.BASE_API_URL + this._urlOrderApplicantRead;
    // Secure Order
    this._urlSecureOrderSentList = _global.BASE_API_URL + this._urlSecureOrderSentList;
    this._urlSecureOrderReceivedList = _global.BASE_API_URL + this._urlSecureOrderReceivedList;
    this._urlSecureOrderCancelAfterShipping = _global.BASE_API_URL + this._urlSecureOrderCancelAfterShipping;
    this._urlSecureOrderCancelBeforeShipping = _global.BASE_API_URL + this._urlSecureOrderCancelBeforeShipping;
    this._urlSecureOrderReceiveGoodsByBuyer = _global.BASE_API_URL + this._urlSecureOrderReceiveGoodsByBuyer;
    this._urlSecureOrderReceiveGoodsBySeller = _global.BASE_API_URL + this._urlSecureOrderReceiveGoodsBySeller;
    this._urlSecureOrderShippingBySeller = _global.BASE_API_URL + this._urlSecureOrderShippingBySeller;
    this._urlSecureOrderSellerRead = _global.BASE_API_URL + this._urlSecureOrderSellerRead;
    this._urlSecureOrderApplicantRead = _global.BASE_API_URL + this._urlSecureOrderApplicantRead;
    // Notification
    this._urlNotifyMeCreate = _global.BASE_API_URL + this._urlNotifyMeCreate;
    this._urlNotifyMeDelete = _global.BASE_API_URL + this._urlNotifyMeDelete;
    this._urlNotifyMeMyList = _global.BASE_API_URL + this._urlNotifyMeMyList;
    // ProductQuestion
    this._urlProductQuestionSentList = _global.BASE_API_URL + this._urlProductQuestionSentList;
    this._urlProductQuestionReceivedList = _global.BASE_API_URL + this._urlProductQuestionReceivedList;
    this._urlProductQuestionAnswer = _global.BASE_API_URL + this._urlProductQuestionAnswer;
    this._urlProductQuestionApplicantRead = _global.BASE_API_URL + this._urlProductQuestionApplicantRead;
    this._urlProductQuestionSellerRead = _global.BASE_API_URL + this._urlProductQuestionSellerRead;
    // Document
    this._urlDocumentCreate = _global.BASE_API_URL + this._urlDocumentCreate;
    this._urlDocumentDelete = _global.BASE_API_URL + this._urlDocumentDelete;
    this._urlDocumentMyList = _global.BASE_API_URL + this._urlDocumentMyList;
    // TrustBadge
    this._urlTrustBadgeCreate = _global.BASE_API_URL + this._urlTrustBadgeCreate;
    this._urlTrustBadgeDelete = _global.BASE_API_URL + this._urlTrustBadgeDelete;
    this._urlTrustBadgeMyList = _global.BASE_API_URL + this._urlTrustBadgeMyList;
    // Favorite
    this._urlWishListMyProducts = _global.BASE_API_URL + this._urlWishListMyProducts;
    this._urlWishListMySellers = _global.BASE_API_URL + this._urlWishListMySellers;
    this._urlWishListRemoveProduct = _global.BASE_API_URL + this._urlWishListRemoveProduct;
    this._urlWishListRemoveSeller = _global.BASE_API_URL + this._urlWishListRemoveSeller;
    // OfferList
    this._urlOfferList = _global.BASE_API_URL + this._urlOfferList;
    // DiscountList
    this._urlDiscountList = _global.BASE_API_URL + this._urlDiscountList;
    // Negotiate
    this._urlNegotiateSentList = _global.BASE_API_URL + this._urlNegotiateSentList;
    this._urlNegotiateReceivedList = _global.BASE_API_URL + this._urlNegotiateReceivedList;
    this._urlNegotiateAnswer = _global.BASE_API_URL + this._urlNegotiateAnswer;
    this._urlNegotiateApplicantRead = _global.BASE_API_URL + this._urlNegotiateApplicantRead;
    this._urlNegotiateSellerRead = _global.BASE_API_URL + this._urlNegotiateSellerRead;
    // Discount
    this._urlSetDiscount = _global.BASE_API_URL + this._urlSetDiscount;
    this._urlGetDiscount = _global.BASE_API_URL + this._urlGetDiscount;
    this._urlsetOffer = _global.BASE_API_URL + this._urlsetOffer;
    this._urlGetOffer = _global.BASE_API_URL + this._urlGetOffer;
    // PriceInquery
    this._urlPriceInquerySentList = _global.BASE_API_URL + this._urlPriceInquerySentList;
    this._urlPriceInqueryReceivedList = _global.BASE_API_URL + this._urlPriceInqueryReceivedList;
    this._urlPriceInqueryAnswer = _global.BASE_API_URL + this._urlPriceInqueryAnswer;
    this._urlPriceInqueryApplicantRead = _global.BASE_API_URL + this._urlPriceInqueryApplicantRead;
    this._urlPriceInquerySellerRead = _global.BASE_API_URL + this._urlPriceInquerySellerRead;
    // Sign
    this._urlSellerBadgesStatus = _global.BASE_API_URL + this._urlSellerBadgesStatus;

    // payment in badge
    this._urlSpecialBadgeCreate = _global.BASE_API_URL + this._urlSpecialBadgeCreate;
    this._urlPaymentList = _global.BASE_API_URL + this._urlPaymentList;
    this._urlPaymentDetails = _global.BASE_API_URL + this._urlPaymentDetails;

    this._urlLowestPrice = _global.BASE_API_URL + this._urlLowestPrice;

    this._urlUnits = _global.BASE_API_URL + this._urlUnits + _global.LANGUAGE;
  }

  getUnits() {
    return this._http.get<any>(this._urlUnits).catch(this.errorHandler);
  }

  LoadBaseDataForSearch(): Observable<any> {

    return this._http.get(this._urlBaseDataForSearch)
      .catch(this.errorHandler);
  }

  currentUser(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._url, httpOptions)
      .catch(this.errorHandler);
  }

  MyPayments(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlPaymentList, httpOptions)
      .catch(this.errorHandler);
  }

  PaymentDetails(paymentID): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlPaymentDetails + '/' + paymentID, httpOptions)
      .catch(this.errorHandler);
  }

  specialBadgeCreate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSpecialBadgeCreate, data, httpOptions)
      .catch(this.errorHandler);
  }

  specialBadgePayment(data: any) {

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

    // window.location.href = "https://bpm.shaparak.ir/pgwchannel/startpay.mellat?refId=" + data;
    // return this._http.post("https://bpm.shaparak.ir/pgwchannel/startpay.mellat", data)
    //  .catch(this.errorHandler);
  }

  specialBadgePaymentResult(data: any) {
    // : Observable<any> {


    return this._http.post('https://bpm.shaparak.ir/pgwchannel/startpay.mellat', data)
      .catch(this.errorHandler);
  }

  sellerBadgesStatus(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSellerBadgesStatus, httpOptions)
      .catch(this.errorHandler);
  }

  productQuestionApplicantRead(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlProductQuestionApplicantRead, data, httpOptions)
      .catch(this.errorHandler);
  }

  PriceInquerySellerRead(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlPriceInquerySellerRead, data, httpOptions)
      .catch(this.errorHandler);
  }

  PriceInqueryApplicantRead(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlPriceInqueryApplicantRead, data, httpOptions)
      .catch(this.errorHandler);
  }

  productQuestionSellerRead(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlProductQuestionSellerRead, data, httpOptions)
      .catch(this.errorHandler);
  }

  purchaseRequestApplicantRead(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlPurchaseRequestApplicantRead, data, httpOptions)
      .catch(this.errorHandler);
  }

  negotiateApplicantRead(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlNegotiateApplicantRead, data, httpOptions)
      .catch(this.errorHandler);
  }

  negotiateSellerRead(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlNegotiateSellerRead, data, httpOptions)
      .catch(this.errorHandler);
  }

  orderApplicantRead(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlOrderApplicantRead, data, httpOptions)
      .catch(this.errorHandler);
  }

  orderSellerRead(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlOrderSellerRead, data, httpOptions)
      .catch(this.errorHandler);
  }

  removeLogo(): Observable<any> {
    const data = { status: true };
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlRemoveLogo, data, httpOptions)
      .catch(this.errorHandler);
  }

  addProduct(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);
    return this._http.post(this._urladdproduct, data, httpOptions)
      .catch(this.errorHandler);
  }

  editProduct(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urleditproduct, data, httpOptions)
      .catch(this.errorHandler);
  }

  baseData(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlbasedata, httpOptions)
      .catch(this.errorHandler);
  }

  lowestProducts(categoryID): Observable<any> {

    return this._http.get(this._urlLowestPrice + categoryID)
      .catch(this.errorHandler);
  }

  addCertificate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlcertificate, data, httpOptions)
      .catch(this.errorHandler);
  }

  getCertificates(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlcertificatelist, httpOptions)
      .catch(this.errorHandler);
  }

  deleteCertificate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urldelcertificate, data, httpOptions)
      .catch(this.errorHandler);
  }

  getInMenu(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlinmenu, httpOptions)
      .catch(this.errorHandler);
  }

  updateLogo(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlupdatelogo, data, httpOptions)
      .catch(this.errorHandler);
  }

  addAbout(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urladdabout, data, httpOptions)
      .catch(this.errorHandler);
  }

  addOutlook(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urladdoutlook, data, httpOptions)
      .catch(this.errorHandler);
  }

  addGoals(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urladdgoals, data, httpOptions)
      .catch(this.errorHandler);
  }

  addStrategy(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urladdstrategy, data, httpOptions)
      .catch(this.errorHandler);
  }

  getProducts(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlmyproducts, httpOptions)
      .catch(this.errorHandler);
  }

  deleteProduct(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urldeleteproduct, data, httpOptions)
      .catch(this.errorHandler);
  }

  deletePerson(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urldeleteperson, data, httpOptions)
      .catch(this.errorHandler);
  }

  getBankInfo(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlgetBankInfo, httpOptions)
      .catch(this.errorHandler);
  }

  updateBankInfo(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlupdateBankInfo, data, httpOptions)
      .catch(this.errorHandler);
  }

  callForPrice(data: any) {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post<any>(this._urlPriceInqueryCreate, data, httpOptions)
      .catch(this.errorHandler);
  }

  getLast24Hour(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlLast24Hour, httpOptions)
      .catch(this.errorHandler);
  }

  registerMember(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlAddPerson, data, httpOptions)
      .catch(this.errorHandler);
  }

  getContactInfo(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlGetContactInfo, httpOptions)
      .catch(this.errorHandler);
  }

  getMessengers(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlMessengers, httpOptions)
      .catch(this.errorHandler);
  }

  getPriceInquerySentList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlPriceInquerySentList, httpOptions)
      .catch(this.errorHandler);
  }

  getPriceInqueryReceivedList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlPriceInqueryReceivedList, httpOptions)
      .catch(this.errorHandler);
  }

  getPurchaseRequestSentList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlPurchaseRequestSentList, httpOptions)
      .catch(this.errorHandler);
  }

  getPurchaseRequestReceivedList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlPurchaseRequestReceivedList, httpOptions)
      .catch(this.errorHandler);
  }

  getNegotiateSentList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlNegotiateSentList, httpOptions)
      .catch(this.errorHandler);
  }

  getNegotiateReceivedList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlNegotiateReceivedList, httpOptions)
      .catch(this.errorHandler);
  }

  registerPriceInquery(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlPriceInqueryAnswer, data, httpOptions)
      .catch(this.errorHandler);
  }

  registerNegotiate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlNegotiateAnswer, data, httpOptions)
      .catch(this.errorHandler);
  }

  getSentUserMessages(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSentUserMessages, httpOptions)
      .catch(this.errorHandler);
  }

  getReceiveUserMessages(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlReceiveUserMessages, httpOptions)
      .catch(this.errorHandler);
  }

  SellerReadMessages(id): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSellerRead, id, httpOptions)
      .catch(this.errorHandler);
  }

  registerReport(data: any) {
    return this._http.post<any>(this._urlReportAbuse, data)
      .catch(this.errorHandler);
  }

  changeStatus(status): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlchangestatus, status, httpOptions)
      .catch(this.errorHandler);
  }

  setDiscount(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSetDiscount, data, httpOptions)
      .catch(this.errorHandler);
  }

  getDiscount(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlGetDiscount + data, httpOptions)
      .catch(this.errorHandler);
  }

  getOffer(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlGetOffer + data, httpOptions)
      .catch(this.errorHandler);
  }

  setOffer(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlsetOffer, data, httpOptions)
      .catch(this.errorHandler);
  }

  updateLegalInfo(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlUpdateLegalInfo, data, httpOptions)
      .catch(this.errorHandler);
  }

  updateNonLegalInfo(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlUpdateNonLegalInfo, data, httpOptions)
      .catch(this.errorHandler);
  }

  getSecureOrderMylist(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSecureOrderMylist, httpOptions)
      .catch(this.errorHandler);
  }

  getBrands(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlGetBrands, httpOptions)
      .catch(this.errorHandler);
  }

  registerBrand(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlcreateBrand, data, httpOptions)
      .catch(this.errorHandler);
  }

  deleteBrand(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlDeleteBrands, data, httpOptions)
      .catch(this.errorHandler);
  }

  updateContactInfo(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlUpdateCantactInfo, data, httpOptions)
      .catch(this.errorHandler);
  }

  updateMessengers(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlMessengerUpdate, data, httpOptions)
      .catch(this.errorHandler);
  }

  socialsUpdate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSocialsUpdate, data, httpOptions)
      .catch(this.errorHandler);
  }

  getSecureOrderSentList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSecureOrderSentList, httpOptions)
      .catch(this.errorHandler);
  }

  getSecureOrderReceivedList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSecureOrderReceivedList, httpOptions)
      .catch(this.errorHandler);
  }

  secureOrderCancelAfterShipping(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSecureOrderCancelAfterShipping, data, httpOptions)
      .catch(this.errorHandler);
  }

  secureOrderCancelBeforeShipping(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSecureOrderCancelBeforeShipping, data, httpOptions)
      .catch(this.errorHandler);
  }

  secureOrderReceiveGoodsByBuyer(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSecureOrderReceiveGoodsByBuyer, data, httpOptions)
      .catch(this.errorHandler);
  }

  secureOrderReceiveGoodsBySeller(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSecureOrderReceiveGoodsBySeller, data, httpOptions)
      .catch(this.errorHandler);
  }

  secureOrderShippingBySeller(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSecureOrderShippingBySeller, data, httpOptions)
      .catch(this.errorHandler);
  }

  getOrderSentList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlOrderSentList, httpOptions)
      .catch(this.errorHandler);
  }

  getOrderReceivedList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlOrderReceivedList, httpOptions)
      .catch(this.errorHandler);
  }

  orderCancelAfterShipping(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlOrderCancelAfterShipping, data, httpOptions)
      .catch(this.errorHandler);
  }

  orderCancelBeforeShipping(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlOrderCancelBeforeShipping, data, httpOptions)
      .catch(this.errorHandler);
  }

  orderReceiveGoodsByBuyer(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlOrderReceiveGoodsByBuyer, data, httpOptions)
      .catch(this.errorHandler);
  }

  orderReceiveGoodsBySeller(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlOrderReceiveGoodsBySeller, data, httpOptions)
      .catch(this.errorHandler);
  }

  orderShippingBySeller(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlOrderShippingBySeller, data, httpOptions)
      .catch(this.errorHandler);
  }

  addNotifyMe(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlNotifyMeCreate, data, httpOptions)
      .catch(this.errorHandler);
  }

  getMyNotify(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlNotifyMeMyList, httpOptions)
      .catch(this.errorHandler);
  }

  deleteNotifyMe(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlNotifyMeDelete, data, httpOptions)
      .catch(this.errorHandler);
  }

  getProductQuestionSentList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlProductQuestionSentList, httpOptions)
      .catch(this.errorHandler);
  }

  getProductQuestionReceivedList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlProductQuestionReceivedList, httpOptions)
      .catch(this.errorHandler);
  }

  productQuestionAnswer(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlProductQuestionAnswer, data, httpOptions)
      .catch(this.errorHandler);
  }

  documentCreate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlDocumentCreate, data, httpOptions)
      .catch(this.errorHandler);
  }

  documentMyList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlDocumentMyList, httpOptions)
      .catch(this.errorHandler);
  }

  documentDelete(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlDocumentDelete + '/' + data, httpOptions)
      .catch(this.errorHandler);
  }

  trustDocCreate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlTrustBadgeCreate, data, httpOptions)
      .catch(this.errorHandler);
  }

  trustDocMyList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlTrustBadgeMyList, httpOptions)
      .catch(this.errorHandler);
  }

  trustDocDelete(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlTrustBadgeDelete + '/' + data, httpOptions)
      .catch(this.errorHandler);
  }

  wishListMyProducts(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlWishListMyProducts, httpOptions)
      .catch(this.errorHandler);
  }

  wishListMySellers(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlWishListMySellers, httpOptions)
      .catch(this.errorHandler);
  }

  wishListRemoveProduct(id): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlWishListRemoveProduct, id, httpOptions)
      .catch(this.errorHandler);
  }

  wishListRemoveSeller(id): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlWishListRemoveSeller, id, httpOptions)
      .catch(this.errorHandler);
  }

  getOfferList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlOfferList, httpOptions)
      .catch(this.errorHandler);
  }

  getDiscountList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlDiscountList, httpOptions)
      .catch(this.errorHandler);
  }

  getPurchaseRequestReplylist(id): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlPurchaseRequestReplylist + id, httpOptions)
      .catch(this.errorHandler);
  }

  purchaseRequestAnswer(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlPurchaseRequestAnswer, data, httpOptions)
      .catch(this.errorHandler);
  }

  sellerWorkPlaceCreate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSellerWorkPlaceCreate, data, httpOptions)
      .catch(this.errorHandler);
  }

  sellerPersonalPageCreate(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlSellerPersonalPageCreate, data, httpOptions)
      .catch(this.errorHandler);
  }

  sellerWorkPlaceList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSellerWorkPlaceList, httpOptions)
      .catch(this.errorHandler);
  }

  sellerPersonalPageList(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSellerPersonalPageList, httpOptions)
      .catch(this.errorHandler);
  }

  sellerPersonalPageDeleteOne(id): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSellerPersonalPageDeleteOne + id, httpOptions)
      .catch(this.errorHandler);
  }

  sellerWorkPlaceDeleteOne(id): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSellerWorkPlacDeleteOne + id, httpOptions)
      .catch(this.errorHandler);
  }

  sellerPersonalPageDeleteAll(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSellerPersonalPageDeleteAll, httpOptions)
      .catch(this.errorHandler);
  }

  sellerWorkPlaceDeleteAll(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlSellerWorkPlacDeleteAll, httpOptions)
      .catch(this.errorHandler);
  }

  getNotifications(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlNotificationMyList, httpOptions)
      .catch(this.errorHandler);
  }

  deleteNotification(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlNotificationDelete, data, httpOptions)
      .catch(this.errorHandler);
  }

  readNotification(data: any): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlNotificationReadMessage, data, httpOptions)
      .catch(this.errorHandler);
  }

  deleteAllNotification(data): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlNotificationDeleteAll, data, httpOptions)
      .catch(this.errorHandler);
  }

  getUnreadMessages(): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlNotificationUnreadMessages, httpOptions)
      .catch(this.errorHandler);
  }

  bindeProduct(id): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.get(this._urlbindeproduct + id, httpOptions)
      .catch(this.errorHandler);
  }

  LoadImages(id): Observable<any> {

    return this._http.get(this._urlProductImages + id)
      .catch(this.errorHandler);
  }

  productDeleteImage(id): Observable<any> {
    const _token = this._auth.getToken();
    httpOptions.headers =
      httpOptions.headers.set('Authorization', `bearer ${_token}`);

    return this._http.post(this._urlDeleteImage, id, httpOptions)
      .catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error);
  }

  uploadFile(model: FormData, url: string) {
    return this._http.post<string>(url, model);
  }

}
