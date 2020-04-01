import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Pipes
import { PipesModule } from '../../pipes/pipes.module';
// Libraries
import { MaterialModule } from '../../libraries/material/material.module';
import { ShareComponentsModule } from '../../share/share-components/share-components.module';
import { PrimengModule } from '../../libraries/primeng/primeng.module';
// Routing
import { MainpageRoutingModule } from './mainpage-routing.module';
// Components
import { MainpageRootComponent } from './components/mainpage-root/mainpage-root.component';
import { HelpComponent } from './components/help/help.component';
import { ProductsSliderComponent } from './components/products-slider/products-slider.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SliderComponent } from './components/slider/slider.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
// Services
import { GlobalService } from '../../services/global.service';
import { SliderService } from './services/slider.service';
import { CategoryService } from './services/category.service';
import { SliderProductsService } from './services/slider-products.service';
import { HelpUserService } from './services/help-user.service';
import { SignComponent } from './components/sign/sign.component';
import { ApplicationSliderComponent } from './components/application-slider/application-slider.component';

@NgModule({
  imports: [
    CommonModule,
    MainpageRoutingModule,
    MaterialModule,
    ShareComponentsModule,
    PipesModule,
    PrimengModule
  ],
  declarations: [
    MainpageRootComponent,
    HelpComponent,
    ProductsSliderComponent,
    CategoriesComponent,
    SliderComponent,
    SpecialOffersComponent,
    SpecialOffersComponent,
    SignComponent,
    ApplicationSliderComponent
  ],
  providers: [
    GlobalService,
    SliderService,
    CategoryService,
    SliderProductsService,
    HelpUserService
  ]
})
export class MainpageModule { }
