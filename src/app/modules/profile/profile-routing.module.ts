import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { UserDetailComponent } from './components/profile/user-detail/user-detail.component';
import { EditUserComponent } from './components/profile/edit-user/edit-user.component';
import { ContactInfoComponent } from './components/profile/contact-info/contact-info.component';
import { BankInfoComponent } from './components/profile/bank-info/bank-info.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { ManageProductsComponent } from './components/products/manage-products/manage-products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductsComponent } from './components/favorites/products/products.component';
import { CompaniesComponent } from './components/favorites/companies/companies.component';
import { RegisterComponent } from './components/notifications/register/register.component';
import { ShowListComponent } from './components/notifications/show-list/show-list.component';
import { PurchaseRequestComponent } from './components/inbox/purchase-request/purchase-request.component';
import { PriceInqueryComponent } from './components/inbox/price-inquery/price-inquery.component';
import { NegotiateComponent } from './components/inbox/negotiate/negotiate.component';
import { OrderComponent } from './components/inbox/order/order.component';
import { SecureOrderComponent } from './components/inbox/secure-order/secure-order.component';
import { DiscountComponent } from './components/inbox/discount/discount.component';
import { OfferComponent } from './components/inbox/offer/offer.component';
import { QuestionAnswerComponent } from './components/inbox/question-answer/question-answer.component';
import { ContactUsComponent } from './components/inbox/contact-us/contact-us.component';
import { MessagesComponent } from './components/inbox/messages/messages.component';
import { SendDocumentsComponent } from './components/documents/send-documents/send-documents.component';
import { GuaranteeBadgeComponent } from './components/signs/guarantee-badge/guarantee-badge.component';
import { SpecialBadgeComponent } from './components/signs/special-badge/special-badge.component';
import { TrustBadgeComponent } from './components/signs/trust-badge/trust-badge.component';
import { MyBrandsComponent } from './components/brands/my-brands/my-brands.component';
import { RegisterBrandComponent } from './components/brands/register-brand/register-brand.component';
import { AdminNotifyComponent } from './components/admin-notify/admin-notify.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {
    path: '', component: PanelComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDetailComponent },
      { path: 'edituser', component: EditUserComponent },
      { path: 'contactinfo', component: ContactInfoComponent },
      { path: 'bankinfo', component: BankInfoComponent },
      { path: 'changepassword', component: ChangePasswordComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'documents', component: SendDocumentsComponent },
      { path: 'admin-notify', component: AdminNotifyComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'manage-products', component: ManageProductsComponent },
      { path: 'favorite/products', component: ProductsComponent },
      { path: 'favorite/companies', component: CompaniesComponent },
      { path: 'notifications/register', component: RegisterComponent },
      { path: 'notifications/show-list', component: ShowListComponent },
      { path: 'inbox/purchase-request', component: PurchaseRequestComponent },
      { path: 'inbox/price-inquery', component: PriceInqueryComponent },
      { path: 'inbox/negotiate', component: NegotiateComponent },
      { path: 'inbox/order', component: OrderComponent },
      { path: 'inbox/secure-order', component: SecureOrderComponent },
      { path: 'inbox/discount', component: DiscountComponent },
      { path: 'inbox/offer', component: OfferComponent },
      { path: 'inbox/question', component: QuestionAnswerComponent },
      { path: 'inbox/contact-us', component: ContactUsComponent },
      { path: 'inbox/messages', component: MessagesComponent },
      { path: 'sign/guarantee', component: GuaranteeBadgeComponent },
      { path: 'sign/special', component: SpecialBadgeComponent },
      { path: 'sign/trust', component: TrustBadgeComponent },
      { path: 'brands', component: MyBrandsComponent },
      { path: 'payment', component: PaymentComponent},
      { path: 'brand/register', component: RegisterBrandComponent }
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
