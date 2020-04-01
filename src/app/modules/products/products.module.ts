import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Libraries
import { OtherModule } from '../../libraries/other/other.module';
import { MaterialModule } from '../../libraries/material/material.module';
import { PrimengModule } from '../../libraries/primeng/primeng.module';
import { ShareComponentsModule } from '../../share/share-components/share-components.module';
// Pipes
import { PipesModule } from '../../pipes/pipes.module';
// Routing
import { ProductsRoutingModule } from './products-routing.module';
import { RootComponent } from './components/root/root.component';
import { ProductsDetailComponent } from './components/products-detail/products-detail/products-detail.component';
import { ProductsComponent } from './components/products/products/products.component';
import { SimilarProductsComponent } from './components/products-detail/similar-products/similar-products.component';
import { TabDetailComponent } from './components/products-detail/tab-detail/tab-detail.component';
import { TabSellerComponent } from './components/products-detail/tab-seller/tab-seller.component';
import { TabQuestionAnswerComponent } from './components/products-detail/tab-question-answer/tab-question-answer.component';
import { TabCommentsComponent } from './components/products-detail/tab-comments/tab-comments.component';
import { ReportDialogComponent } from './components/products-detail/report-dialog/report-dialog.component';
import { CallForPriceComponent } from './components/products-detail/call-for-price/call-for-price.component';
import { NegotiateSellerComponent } from './components/products-detail/negotiate-seller/negotiate-seller.component';
import { AccessToMarketComponent } from './components/products-detail/access-to-market/access-to-market.component';
import { SidebarComponent } from './components/products/sidebar/sidebar.component';
import { ListSellerComponent } from './components/products/list-seller/list-seller.component';
import { GridSellerComponent } from './components/products/grid-seller/grid-seller.component';
import { GridProductsComponent } from './components/products/grid-products/grid-products.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { SidebarSellerComponent } from './components/products/sidebar-seller/sidebar-seller.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
// Services
import { ProductService } from './services/product.service';
import { ProfileService } from '../profile/services/profile.service';
import { LogInComponent } from '../../share/share-components';
import { GridBrandsComponent } from './components/products/grid-brands/grid-brands.component';
import { ListBrandsComponent } from './components/products/list-brands/list-brands.component';
import { SidebarBrandsComponent } from './components/products/sidebar-brands/sidebar-brands.component';
import { PreFactorComponent } from './components/pre-factor/pre-factor.component';
import { MessagesPopupComponent } from '../../components/messages-popup/messages-popup.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    ShareComponentsModule,
    PipesModule,
    OtherModule
  ],
  declarations: [
    RootComponent,
    ProductsDetailComponent,
    ProductsComponent,
    SimilarProductsComponent,
    TabDetailComponent,
    TabSellerComponent,
    TabQuestionAnswerComponent,
    TabCommentsComponent,
    ReportDialogComponent,
    NegotiateSellerComponent,
    AccessToMarketComponent,
    SidebarComponent,
    ListSellerComponent,
    GridSellerComponent,
    GridProductsComponent,
    ListProductsComponent,
    SidebarSellerComponent,
    InvoiceComponent,
    CallForPriceComponent,
    GridBrandsComponent,
    ListBrandsComponent,
    SidebarBrandsComponent,
    PreFactorComponent,
    MessagesPopupComponent
  ],
  providers: [
    ProductService,
    ProfileService
  ],
  entryComponents: [
    ReportDialogComponent,
    CallForPriceComponent,
    LogInComponent,
    MessagesPopupComponent
  ]
})
export class ProductsModule { }
