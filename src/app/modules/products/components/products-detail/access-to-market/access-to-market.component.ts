import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-access-to-market',
  templateUrl: './access-to-market.component.html',
  styleUrls: ['./access-to-market.component.scss']
})
export class AccessToMarketComponent implements OnInit {
  status = false;
  @Input() marketAccess;
  public cities = [];
  public citiesLength = 0;
  public firstLoad = true;
  public citiesMin = [];
  public citiesMax = [];
  westAzerbaijan = false;
  eastAzerbaijan = false;
  ardabil = false;
  gilan = false;
  zanjan = false;
  kurdistan = false;
  kermanshah = false;
  ilam = false;
  lorestan = false;
  hamedan = false;
  qazvin = false;
  mazandaran = false;
  alborz = false;
  tehran = false;
  markazi = false;
  qom = false;
  golestan = false;
  norhKhorasan = false;
  razaviKhorasan = false;
  southKhorasan = false;
  semnan = false;
  yazd = false;
  kerman = false;
  sistanAndBaluchestan = false;
  hormozgan = false;
  fars = false;
  bushehr = false;
  esfahan = false;
  khuzestan = false;
  chAndB = false;
  kAndB = false;

  constructor() { }

  ngOnInit() {
    this.citiesMax = this.marketAccess['marketAccess'];
    this.citiesLength = this.marketAccess['marketAccess'].length;
    if (this.citiesLength < 5) {
      this.cities = this.marketAccess['marketAccess'];
      this.firstLoad = false;
    } else {
      this.cities.length = 0;
      for (let i = 0; i < 5; i++) {
        this.cities[i] = this.marketAccess['marketAccess'][i];
      }
      this.citiesMin = this.cities;
      console.log(this.cities);
    }
    this.esfahan = this.findProvince('اصفهان');
    this.westAzerbaijan = this.findProvince('آذربایجان غربی');
    this.eastAzerbaijan = this.findProvince('آذربایجان شرقی');
    this.ardabil = this.findProvince('اردبیل');
    this.gilan = this.findProvince('گیلان');
    this.zanjan = this.findProvince('زنجان');
    this.kurdistan = this.findProvince('كردستان');
    this.kermanshah = this.findProvince('كرمانشاه');
    this.ilam = this.findProvince('ایلام');
    this.lorestan = this.findProvince('لرستان');
    this.hamedan = this.findProvince('همدان');
    this.qazvin = this.findProvince('قزوین');
    this.mazandaran = this.findProvince('مازندران');
    this.alborz = this.findProvince('البرز');
    this.tehran = this.findProvince('تهران');
    this.markazi = this.findProvince('مركزی');
    this.qom = this.findProvince('قم');
    this.golestan = this.findProvince('گلستان');
    this.norhKhorasan = this.findProvince('خراسان شمالی');
    this.razaviKhorasan = this.findProvince('خراسان رضوی');
    this.southKhorasan = this.findProvince('خراسان جنوبی');
    this.semnan = this.findProvince('سمنان');
    this.yazd = this.findProvince('یزد');
    this.kerman = this.findProvince('كرمان');
    this.sistanAndBaluchestan = this.findProvince('سیستان و بلوچستان');
    this.hormozgan = this.findProvince('هرمزگان');
    this.fars = this.findProvince('فارس');
    this.bushehr = this.findProvince('بوشهر');
    this.khuzestan = this.findProvince('خوزستان');
    this.chAndB = this.findProvince('چهارمحال و بختیاری');
    this.kAndB = this.findProvince('کهگیلویه و بویراحمد');
    this.status = true;
  }

  lessMore(status) {
    if (status === 'more') {
      this.cities = this.citiesMax;
      this.citiesLength = 4;
    } else {
      this.cities = this.citiesMin;
      this.citiesLength = this.marketAccess['marketAccess'].length;
    }
  }

  findProvince(persianName: string) {
    const result = this.citiesMax.filter(x => x.province === persianName);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
