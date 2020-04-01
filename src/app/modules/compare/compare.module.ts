import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Libraries
import { MaterialModule } from '../../libraries/material/material.module';
import { ShareComponentsModule } from '../../share/share-components/share-components.module';
import { PrimengModule } from '../../libraries/primeng/primeng.module';
import { OtherModule } from '../../libraries/other/other.module';
// Pipes
import { PipesModule } from '../../pipes/pipes.module';
// Routing
import { CompareRoutingModule } from './compare-routing.module';
// Components
import { CompareComponent } from './components/compare/compare.component';
// Services
import { CompareService } from './compare.service';
import { ProfileService } from '../profile/services/profile.service';

@NgModule({
  imports: [
    CommonModule,
    CompareRoutingModule,
    MaterialModule,
    ShareComponentsModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    OtherModule,
    PipesModule
  ],
  declarations: [
    CompareComponent
  ],
  providers: [
    CompareService,
    ProfileService
  ]
})
export class CompareModule { }
