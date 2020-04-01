import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Libraries
import { MaterialModule } from '../../libraries/material/material.module';
import { ShareComponentsModule } from '../../share/share-components/share-components.module';
import { PrimengModule } from '../../libraries/primeng/primeng.module';
import { OtherModule } from '../../libraries/other/other.module';
// Pipes
import { PipesModule } from '../../pipes/pipes.module';
// Routing
import { SellerRoutingModule } from './seller-routing.module';
// Components
import { ProfileComponent } from './components/profile/profile.component';
import { SliderComponent } from './components/slider/slider.component';
import { FollowersSliderComponent } from './components/followers-slider/followers-slider.component';
import { TransactionsSellerComponent } from './components/transactions-seller/transactions-seller.component';
import { ProductsComponent } from './components/products/products.component';
import { TabMembersComponent } from './components/tab-members/tab-members.component';
import { TabCollectionInformationComponent } from './components/tab-collection-information/tab-collection-information.component';
import { TabContactSupplierComponent } from './components/tab-contact-supplier/tab-contact-supplier.component';
import { TabSupportersComponent } from './components/tab-supporters/tab-supporters.component';
import { TabContactInfoComponent } from './components/tab-contact-info/tab-contact-info.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { TabMessengersComponent } from './components/tab-messengers/tab-messengers.component';
import { SellerService } from './services/seller.service';
import { LogInComponent, PermissionMessagesComponent } from '../../share/share-components';
import { ProductService } from '../products/services/product.service';

@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    ShareComponentsModule,
    OtherModule,
    PipesModule
  ],
  declarations: [
    ProfileComponent,
    SliderComponent,
    FollowersSliderComponent,
    TransactionsSellerComponent,
    ProductsComponent,
    TabMembersComponent,
    TabCollectionInformationComponent,
    TabContactSupplierComponent,
    TabSupportersComponent,
    TabContactInfoComponent,
    CertificatesComponent,
    TabMessengersComponent
  ],
  providers: [
    SellerService,
    ProductService
    // ProfileService
  ],
  entryComponents: [
    // ReportDialogComponent,
    // CallForPriceComponent,
    LogInComponent,
    PermissionMessagesComponent
  ]
})
export class SellerModule { }
