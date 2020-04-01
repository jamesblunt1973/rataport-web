import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CompareComponent } from './components/compare/compare.component';

const routes: Routes = [
  { path: ':id', component: CompareComponent },
  { path: ':id/:id2', component: CompareComponent },
  { path: ':id/:id2/:id3', component: CompareComponent },
  { path: ':id/:id2/:id3/:id4', component: CompareComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompareRoutingModule { }
