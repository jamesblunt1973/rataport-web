import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { CaptchaModule } from 'primeng/captcha';
import { EditorModule } from 'primeng/editor';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { SlideMenuModule } from 'primeng/slidemenu';
import { LightboxModule } from 'primeng/lightbox';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    SidebarModule,
    AutoCompleteModule,
    GalleriaModule,
    RatingModule,
    PanelMenuModule,
    TableModule,
    CaptchaModule,
    EditorModule,
    MenuModule,
    FileUploadModule,
    SlideMenuModule,
    LightboxModule
  ],
  exports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    SidebarModule,
    AutoCompleteModule,
    GalleriaModule,
    RatingModule,
    PanelMenuModule,
    TableModule,
    CaptchaModule,
    EditorModule,
    MenuModule,
    FileUploadModule,
    SlideMenuModule,
    LightboxModule
  ],
  declarations: []
})
export class PrimengModule { }
