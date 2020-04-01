import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Libraries
import { MaterialModule } from './libraries/material/material.module';
import { PrimengModule } from './libraries/primeng/primeng.module';
import { OtherModule } from './libraries/other/other.module';
import { NgxBootstrapModule } from './libraries/ngx-bootstrap/ngx-bootstrap.module';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Modules
import { ModulesModule } from './modules/modules.module';
import { ShareComponentsModule } from './share/share-components/share-components.module';
// Guard
import { AuthGuard } from './guard/auth.guard';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogInComponent, PermissionMessagesComponent } from './share/share-components';
// import { DialogComponent } from './components/dialog/dialog.component';
// Services
import { GlobalService } from './services/global.service';
import { SiteinfoService } from './services/siteinfo.service';
import { AuthService } from './services/auth.service';
import { ProfileService } from './modules/profile/services/profile.service';
// Pipes
import { PipesModule } from './pipes/pipes.module';
import { FeeComponent } from './components/fee/fee.component';
import { FaqComponent } from './components/faq/faq.component';
import { ActivateComponent } from './components/activate/activate.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PaymentResultComponent } from './modules/profile/components/payment-result/payment-result.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    FeeComponent,
    FaqComponent,
    ActivateComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    PaymentResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimengModule,
    AppRoutingModule,
    OtherModule,
    NgxBootstrapModule,
    ShareComponentsModule,
    HttpClientModule,
    PipesModule
  ],
  providers: [
    GlobalService,
    SiteinfoService,
    AuthService,
    AuthGuard,
    ProfileService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LogInComponent,
    PermissionMessagesComponent
  ]
})
export class AppModule { }
