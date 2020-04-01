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
import { BrandsRoutingModule } from './brands-routing.module';
// Components
import { BrandsRootComponent } from './components/brands-root/brands-root.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LogInComponent } from '../../share/share-components';
// Services
import { BrandsService } from './brands.service';
import { ProductService } from '../products/services/product.service';

@NgModule({
  imports: [
    CommonModule,
    BrandsRoutingModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    ShareComponentsModule,
    PipesModule,
    OtherModule
  ],
  declarations: [
    BrandsRootComponent,
    SidebarComponent,
    BrandsComponent
  ],
  providers: [
    BrandsService,
    ProductService
  ],
  entryComponents: [
    LogInComponent
  ]
})
export class BrandsModule { }
