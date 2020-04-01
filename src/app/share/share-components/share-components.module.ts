import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Libraries
import { MaterialModule } from '../../libraries/material/material.module';
import { PrimengModule } from '../../libraries/primeng/primeng.module';
import { NgxBootstrapModule } from '../../libraries/ngx-bootstrap/ngx-bootstrap.module';
import { OtherModule } from '../../libraries/other/other.module';
// Components
import {
  LogInComponent,
  DialogComponent,
  LoadingComponent,
  PermissionMessagesComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    MaterialModule,
    OtherModule,
    NgxBootstrapModule
  ],
  exports: [
    LogInComponent,
    LoadingComponent,
    DialogComponent,
    PermissionMessagesComponent
  ],
  declarations: [
    LogInComponent,
    LoadingComponent,
    DialogComponent,
    PermissionMessagesComponent
  ]
})
export class ShareComponentsModule { }
