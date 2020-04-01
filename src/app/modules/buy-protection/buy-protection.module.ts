import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Libraries
import { MaterialModule } from '../../libraries/material/material.module';
import { PrimengModule } from '../../libraries/primeng/primeng.module';
import { OtherModule } from '../../libraries/other/other.module';
// Routing
import { BuyProtectionRoutingModule } from './buy-protection-routing.module';
// Components
import { BuyProtectionComponent } from './components/buy-protection/buy-protection.component';
// Service
import { BuyProtectionService } from './buy-protection.service';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ProductService } from '../products/services/product.service';

@NgModule({
  imports: [
    CommonModule,
    BuyProtectionRoutingModule,
    MaterialModule,
    PrimengModule,
    OtherModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BuyProtectionComponent, ConfirmComponent],
  providers: [
    BuyProtectionService,
    ProductService
  ],
  entryComponents: [
    ConfirmComponent
  ]
})
export class BuyProtectionModule { }
