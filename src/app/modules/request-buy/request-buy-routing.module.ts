import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { AddRequestComponent } from './add-request/add-request.component';

const routes: Routes = [
  { path: '', component: AddRequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestBuyRoutingModule { }
