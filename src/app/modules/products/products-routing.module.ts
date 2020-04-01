import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { ProductsDetailComponent } from './components/products-detail/products-detail/products-detail.component';
import { ProductsComponent } from './components/products/products/products.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { PreFactorComponent } from './components/pre-factor/pre-factor.component';

const routes: Routes = [
  {
    path: '', component: RootComponent, children: [
      { path: '', component: ProductsComponent },
      { path: 'category/:catid', component: ProductsComponent },
      { path: 'category1/:catid1', component: ProductsComponent },
      { path: 'category/:cat1/:cat2/:cat3', component: ProductsComponent },
      { path: 'brands/:brand', component: ProductsComponent },
      { path: ':catLevelTwo', component: ProductsComponent },
      { path: 'detail/:id', component: ProductsDetailComponent },
    ]
  },
  { path: 'payment/:productid', component: InvoiceComponent },
  { path: 'prefactor/:orderid', component: PreFactorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
