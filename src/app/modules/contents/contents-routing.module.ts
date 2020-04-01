import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { ContentComponent } from './components/content/content.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { RootContentsComponent } from './components/root-contents/root-contents.component';

const routes: Routes = [
  {
    path: '', component: RootContentsComponent, children: [
      { path: '', redirectTo: 'contact-us', pathMatch: 'full' },
      { path: 'page/:id', component: ContentComponent },
      { path: 'contact-us', component: ContactUsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule { }
