import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Libraries
import { MaterialModule } from '../../libraries/material/material.module';
import { PrimengModule } from '../../libraries/primeng/primeng.module';
import { OtherModule } from '../../libraries/other/other.module';
import { ShareComponentsModule } from '../../share/share-components/share-components.module';
// Routing
import { RequestBuyRoutingModule } from './request-buy-routing.module';
// Components
import { AddRequestComponent } from './add-request/add-request.component';
import { ProductService } from '../products/services/product.service';
import { ProfileService } from '../profile/services/profile.service';
import { AuthService } from '../../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RequestBuyRoutingModule,
    MaterialModule,
    PrimengModule,
    OtherModule,
    FormsModule,
    ReactiveFormsModule,
    ShareComponentsModule
  ],
  declarations: [
    AddRequestComponent
  ],
  providers: [
    ProductService,
    ProfileService,
    AuthService
  ],
  entryComponents: []
})
export class RequestBuyModule { }
