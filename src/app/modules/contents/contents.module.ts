import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Libraries
import { MaterialModule } from '../../libraries/material/material.module';
import { ShareComponentsModule } from '../../share/share-components/share-components.module';
import { PrimengModule } from '../../libraries/primeng/primeng.module';
import { OtherModule } from '../../libraries/other/other.module';
// Pipes
import { PipesModule } from '../../pipes/pipes.module';

import { ContentsRoutingModule } from './contents-routing.module';
import { RootComponent } from './components/root/root.component';
import { ContentComponent } from './components/content/content.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RootContentsComponent } from './components/root-contents/root-contents.component';

@NgModule({
  imports: [
    CommonModule,
    ContentsRoutingModule,
    MaterialModule,
    ShareComponentsModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    OtherModule,
    PipesModule
  ],
  declarations: [RootComponent, ContentComponent, ContactUsComponent, RootContentsComponent]
})
export class ContentsModule { }
