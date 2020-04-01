import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageModule } from './mainpage/mainpage.module';
import { ProductsModule } from './products/products.module';
import { ProfileModule } from './profile/profile.module';
import { ContentsModule } from './contents/contents.module';
import { OffersModule } from './offers/offers.module';
import { CompareModule } from './compare/compare.module';
import { BrandsModule } from './brands/brands.module';

@NgModule({
  imports: [
    CommonModule,
    MainpageModule,
    ProductsModule,
    ProfileModule,
    ContentsModule,
    OffersModule,
    CompareModule,
    BrandsModule
  ],
  exports: [
    MainpageModule,
    ProductsModule,
    ProfileModule,
    ContentsModule,
    OffersModule,
    CompareModule,
    BrandsModule
  ]
  ,
  declarations: []
})
export class ModulesModule { }
