import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'englishToPersian'
})
export class EnglishToPersianPipe implements PipeTransform {

  numerals = {
    persian: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
    // arabic: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  };

  transform(value: any, args?: any): any {
    if (value !== null && value !== '') {
      value = value.toString();
      value = value.split(' ').join('');
      const result = this.fromEnglish(value, 'persian');
      return result;
    } else {
      return '';
    }
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
