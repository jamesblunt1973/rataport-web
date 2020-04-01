import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FeeComponent } from './components/fee/fee.component';
import { FaqComponent } from './components/faq/faq.component';
import { ActivateComponent } from './components/activate/activate.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PaymentResultComponent } from '../app/modules/profile/components/payment-result/payment-result.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./modules/mainpage/mainpage.module').then(m => m.MainpageModule) },
  { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) },
  { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
  { path: 'contents', loadChildren: () => import('./modules/contents/contents.module').then(m => m.ContentsModule) },
  { path: 'seller', loadChildren: () => import('./modules/seller/seller.module').then(m => m.SellerModule) },
  { path: 'request', loadChildren: () => import('./modules/request-buy/request-buy.module').then(m => m.RequestBuyModule) },
  { path: 'offers', loadChildren: () => import('./modules/offers/offers.module').then(m => m.OffersModule) },
  { path: 'secureOrder', loadChildren: () => import('./modules/buy-protection/buy-protection.module').then(m => m.BuyProtectionModule) },
  { path: 'compare', loadChildren: () => import('./modules/compare/compare.module').then(m => m.CompareModule) },
  { path: 'brands', loadChildren: () => import('./modules/brands/brands.module').then(m => m.BrandsModule) },
  { path: 'fee', component: FeeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'activate', component: ActivateComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'PaymentResult', component: PaymentResultComponent },
  { path: '**', component: PageNotFoundComponent }
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
