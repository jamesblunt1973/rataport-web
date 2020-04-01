import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageRootComponent } from './components/mainpage-root/mainpage-root.component';

const routes: Routes = [
  { path: '', component: MainpageRootComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainpageRoutingModule { }
