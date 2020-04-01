import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Routing
import { ProfileRoutingModule } from './profile-routing.module';
// Libraries
import { MaterialModule } from '../../libraries/material/material.module';
import { ShareComponentsModule } from '../../share/share-components/share-components.module';
import { PrimengModule } from '../../libraries/primeng/primeng.module';
import { OtherModule } from '../../libraries/other/other.module';
// Pipes
import { PipesModule } from '../../pipes/pipes.module';
// Components
import { PanelComponent } from './components/panel/panel.component';
import { HeaderComponent } from './components/header/header.component';
import { UserDetailComponent } from './components/profile/user-detail/user-detail.component';
import { EditUserComponent } from './components/profile/edit-user/edit-user.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { BankInfoComponent } from './components/profile/bank-info/bank-info.component';
import { ContactInfoComponent } from './components/profile/contact-info/contact-info.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { ManageProductsComponent } from './components/products/manage-products/manage-products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductsComponent } from './components/favorites/products/products.component';
import { CompaniesComponent } from './components/favorites/companies/companies.component';
import { RegisterComponent } from './components/notifications/register/register.component';
import { ShowListComponent } from './components/notifications/show-list/show-list.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { AddSupporterComponent } from './components/profile/add-supporter/add-supporter.component';
import { PopupComponent } from './components/products/popup/popup.component';
import { PurchaseRequestComponent } from './components/inbox/purchase-request/purchase-request.component';
import { PriceInqueryComponent } from './components/inbox/price-inquery/price-inquery.component';
import { NegotiateComponent } from './components/inbox/negotiate/negotiate.component';
import { OrderComponent } from './components/inbox/order/order.component';
import { SecureOrderComponent } from './components/inbox/secure-order/secure-order.component';
import { QuestionAnswerComponent } from './components/inbox/question-answer/question-answer.component';
import { OfferComponent } from './components/inbox/offer/offer.component';
import { ContactUsComponent } from './components/inbox/contact-us/contact-us.component';
import { DiscountComponent } from './components/inbox/discount/discount.component';
import { MessagesComponent } from './components/inbox/messages/messages.component';
import { AnswerToComponent } from './components/inbox/answer-to/answer-to.component';
import { SendDocumentsComponent } from './components/documents/send-documents/send-documents.component';
import { SpecialBadgeComponent } from './components/signs/special-badge/special-badge.component';
import { TrustBadgeComponent } from './components/signs/trust-badge/trust-badge.component';
import { GuaranteeBadgeComponent } from './components/signs/guarantee-badge/guarantee-badge.component';
import { PaymentComponent } from './components/payment/payment.component';
// Services
import { ProfileService } from './services/profile.service';
import { ProductService } from '../products/services/product.service';
import { MyBrandsComponent } from './components/brands/my-brands/my-brands.component';
import { RegisterBrandComponent } from './components/brands/register-brand/register-brand.component';
import { OrderPopupComponent } from './components/inbox/order-popup/order-popup.component';
import { PopupListProfileComponent } from './components/popup-list-profile/popup-list-profile.component';
import { AdminNotifyComponent } from './components/admin-notify/admin-notify.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { PermissionMessagesComponent } from '../../share/share-components';
import { SecureOrderPopupComponent } from './components/inbox/secure-order-popup/secure-order-popup.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    OtherModule,
    ShareComponentsModule,
    PipesModule
  ],
  declarations: [
    PanelComponent,
    HeaderComponent,
    UserDetailComponent,
    EditUserComponent,
    ChangePasswordComponent,
    BankInfoComponent,
    ContactInfoComponent,
    CertificatesComponent,
    ManageProductsComponent,
    AddProductComponent,
    ProductsComponent,
    CompaniesComponent,
    RegisterComponent,
    ShowListComponent,
    AddSupporterComponent,
    PopupComponent,
    PurchaseRequestComponent,
    PriceInqueryComponent,
    NegotiateComponent,
    OrderComponent,
    SecureOrderComponent,
    QuestionAnswerComponent,
    OfferComponent,
    ContactUsComponent,
    DiscountComponent,
    MessagesComponent,
    AnswerToComponent,
    SendDocumentsComponent,
    SpecialBadgeComponent,
    TrustBadgeComponent,
    GuaranteeBadgeComponent,
    MyBrandsComponent,
    RegisterBrandComponent,
    OrderPopupComponent,
    PopupListProfileComponent,
    AdminNotifyComponent,
    EditProductComponent,
    PaymentComponent,
    SecureOrderPopupComponent
  ],
  providers: [
    ProfileService,
    ProductService
  ],
  entryComponents: [
    AddSupporterComponent,
    DialogComponent,
    PopupComponent,
    AnswerToComponent,
    OrderPopupComponent,
    SecureOrderPopupComponent,
    PopupListProfileComponent,
    PermissionMessagesComponent
  ]
})
export class ProfileModule { }
