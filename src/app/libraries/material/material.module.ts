import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatRadioModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
    NgxMatSelectSearchModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule,
    MatChipsModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatRadioModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
    NgxMatSelectSearchModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule,
    MatChipsModule
  ],
  declarations: []
})
export class MaterialModule { }
