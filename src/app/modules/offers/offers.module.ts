import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { OffersRoutingModule } from './offers-routing.module';
// Libraries
import { MaterialModule } from '../../libraries/material/material.module';
import { ShareComponentsModule } from '../../share/share-components/share-components.module';
import { PrimengModule } from '../../libraries/primeng/primeng.module';
import { OtherModule } from '../../libraries/other/other.module';
// Pipes
import { PipesModule } from '../../pipes/pipes.module';
// Components
import { OffersComponent } from './components/offers/offers.component';
// Services
import { OffersService } from './offers.service';

@NgModule({
  imports: [
    CommonModule,
    OffersRoutingModule,
    MaterialModule,
    ShareComponentsModule,
    PrimengModule,
    OtherModule,
    PipesModule
  ],
  declarations: [
    OffersComponent
  ],
  providers: [
    OffersService
  ]
})
export class OffersModule { }
