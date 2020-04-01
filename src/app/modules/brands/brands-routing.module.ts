import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsRootComponent } from './components/brands-root/brands-root.component';

const routes: Routes = [
  { path: '', component: BrandsRootComponent },
  // { path: 'detail/:id', component: ProductsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
