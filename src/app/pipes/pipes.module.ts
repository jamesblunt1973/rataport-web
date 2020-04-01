import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Pipes
import { PersianToEnglishPipe } from './persian-to-english.pipe';
import { EnglishToPersianPipe } from './english-to-persian.pipe';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

// Pipes
// import { NumberToCollectionPipe } from './pipes/number-to-collection.pipe';
// import { SortByPriorityPipe } from './pipes/sort-by-priority.pipe';
// import { StringToIntegerPipe } from './pipes/string-to-integer.pipe';
// import { GetMonthNamePipe } from './pipes/get-month-name.pipe';
// import { GetDayPipe } from './pipes/get-day.pipe';
// import { StringToFloatPipe } from './pipes/string-to-float.pipe';
// import { SplitCommaPipe } from './pipes/split-comma.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    PersianToEnglishPipe,
    EnglishToPersianPipe,
    SanitizeHtmlPipe
    // NumberToCollectionPipe,
    // SortByPriorityPipe,
    // StringToIntegerPipe,
    // GetMonthNamePipe,
    // GetDayPipe,
    // StringToFloatPipe,
    // SplitCommaPipe
  ],
  declarations: [
    PersianToEnglishPipe,
    EnglishToPersianPipe,
    SanitizeHtmlPipe
    // NumberToCollectionPipe,
    // SortByPriorityPipe,
    // StringToIntegerPipe,
    // GetMonthNamePipe,
    // GetDayPipe,
    // StringToFloatPipe,
    // SplitCommaPipe
  ]
})
export class PipesModule { }
