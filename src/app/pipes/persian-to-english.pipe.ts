import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianToEnglish'
})
export class PersianToEnglishPipe implements PipeTransform {

  numerals = {
    persian: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
    // arabic: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  };

  transform(value: number, args?: any): any {
    const result = this.fromEnglish(value.toString(), 'persian');
    return result;
  }

  fromEnglish(str, lang) {
    const len = str.length;
    let result = '';

    for (let i = 0; i < len; i++) {
      result += this.numerals[lang][str[i]];
    }

    return result;
  }





}
