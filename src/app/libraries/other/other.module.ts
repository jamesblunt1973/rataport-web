import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { AgmCoreModule } from '@agm/core';
import { ShareButtonsModule } from '@ngx-share/buttons';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://admin.rataport.com:444/api/product/upload',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCBw7GfBrt2-0kCFvS4u317J4ANwd76kX8',
      libraries: ['places']
    }),
    LoadingBarRouterModule,
    PasswordStrengthBarModule,
    DropzoneModule,
    DpDatePickerModule,
    ShareButtonsModule.forRoot()
  ],
  exports: [
    LoadingBarRouterModule,
    PasswordStrengthBarModule,
    DropzoneModule,
    DpDatePickerModule,
    AgmCoreModule,
    ShareButtonsModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  declarations: []
})
export class OtherModule { }
