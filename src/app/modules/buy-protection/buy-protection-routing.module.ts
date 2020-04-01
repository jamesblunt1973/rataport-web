import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { BuyProtectionComponent } from './components/buy-protection/buy-protection.component';

const routes: Routes = [
  { path: '', component: BuyProtectionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyProtectionRoutingModule { }
