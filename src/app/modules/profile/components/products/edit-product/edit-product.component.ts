import { Component, OnInit, Input, ViewChild } from '@angular/core';
import 'owl.carousel';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSelect, MatDialog } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
// Services
import { ProfileService } from '../../../services/profile.service';
import { ProductService } from '../../../../products/services/product.service';
import { GlobalService } from '../../../../../services/global.service';
import { DialogComponent } from '../../../../../share/share-components';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input() placeholderLabel = 'جستجو';
  @Input() noEntriesFoundLabel = 'موردی پیدا نشد!';
  @ViewChild('levelOneTag', { static: false }) levelOneTag: MatSelect;
  @ViewChild('levelTwoTag', { static: false }) levelTwoTag: MatSelect;
  @ViewChild('levelThreeTag', { static: false }) levelThreeTag: MatSelect;
  @ViewChild('levelFourTag', { static: false }) levelFourTag: MatSelect;

  public propertiesList: any[];
  public filters: any[];
  public properties: any[];
  public lowestProducts: any[];
  public levels: any[];
  public levelTwo;
  public levelThree;
  public levelFour;
  public levelTwoStatus = false;
  public levelThreeStatus = false;
  public levelFourStatus = false;
  public UsefulLifeStatus = false;
  public uploadurl = 'product/upload';
  public uploadAnalyzeurl = 'product/uploadAnalyze';

  public uploadTextBtn = 'انتخاب فایل';
  public uploadTextBtn2 = 'انتخاب فایل';
  public uploadAnalyzeTextBtn = 'انتخاب فایل آنالیز';

  public progressUpload = 0;
  public progressUploadCatalog = 0;
  public progressUploadAnalyze = 0;

  public catalogFile = '';
  public AnalyzeFile = '';
  public images = [];
  public uploadActive = false;
  public uploadAnalyzeActive = false;

  public property = [];
  public propertyList = [];
  public propertyStatus = false;
  public finalPropertiesItems = [];
  public propertiesItems = [];
  public maxProductImage = 0;
  public image_url;
  public config = {
    maxFiles: 3,
    addRemoveLinks: true,
    maxFilesize: 0.2,
    acceptedFiles: 'image/*',
    dictRemoveFile: 'حذف تصویر',
    dictCancelUpload: 'انصراف از آپلود'
  };
  public productName = '';
  public brandName = '';
  public price = '';
  public minOrder = '';
  public minOrderDepo = '';

  public supplyAbility = '';
  public Weight = '';
  public DefiniteSaveWeight = '';
  public PossibleStorageWeight = '';
  public productSize = '';
  public guaranty = '';
  public productAfterSell = '';
  public benefitOld = '';
  public deliveryTime = '';
  public belqove = '';
  public belfel = '';
  public sellOld = '';
  public productTypeAfterSell = '';
  public sendAdd = false;
  public id = 0;
  public supplyAbilityPeriod = 'روز';
  public warrantyPeriod = 'روز';
  public AfterSaleServicePeriod = 'روز';
  public UsefulLifePeriod = 'روز';
  public DeliveryTimePeriod = 'روز';
  public MarketAccessValue = [];
  public MarketAccessValueTemp = [];
  public size = [];
  public DefiniteSave = [];
  public PossibleStorage = [];
  public productWeight = [];
  public guarantyProduct = [];
  public AfterSaleServiceProduct = [];
  public loading = false;
  public selectProvince = '';
  public selectProvincePercent = '';
  public bigPercent = true;
  public percentValue = 0;
  public units = [];
  public unitsDepo = [];
  public unitsDefiniteSave = [];
  public unitsPossibleStorage = [];
  public externalPackage: any = [];
  public innerPackage: any = [];
  public country: any = [];
  public region: any = [];
  public colors: any = [];
  public myCertificates: any = [];
  public myLicenses: any = [];
  public myConfirmation: any = [];
  public myBrands: any = [];
  public bindData = [];
  public uploadActive2 = false;
  public knowledgeBaseFile = '';
  public currentPostCount = 0;
  public maxCount = 0;
  public uploadCatalog = false;
  public uploadAnalyze = false;
  // One level
  public oneLevelCtrl: FormControl = new FormControl('', [Validators.required]);
  public oneLevelFilterCtrl: FormControl = new FormControl();
  // Two level
  public twoLevelCtrl: FormControl = new FormControl('', [Validators.required]);
  public twoLevelFilterCtrl: FormControl = new FormControl();
  // Three level
  public threeLevelCtrl: FormControl = new FormControl('', [Validators.required]);
  public threeLevelFilterCtrl: FormControl = new FormControl();
  // Four level
  public fourLevelCtrl: FormControl = new FormControl('', [Validators.required]);
  public fourLevelFilterCtrl: FormControl = new FormControl();

  /** list of levels filtered by search keyword */
  public filteredOneLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredTwoLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredThreeLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredFourLevel: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();


  public productNameControl = new FormControl('', [Validators.required]);
  public productPlaceControl = new FormControl('', [Validators.required]);
  public deliveryControl = new FormControl('', [Validators.required]);
  public internalPackControl = new FormControl('', [Validators.required]);
  public supplyAbilityControl = new FormControl('', [Validators.required]);
  public vahedSupplyAbilityControl = new FormControl('', [Validators.required]);
  public supplyAbilityPeriodControl = new FormControl('', [Validators.required]);
  public deliveryTimeControl = new FormControl('', [Validators.required]);
  public DeliveryTimePeriodControl = new FormControl('', [Validators.required]);
  public depoControl = new FormControl('', [Validators.required]);
  public minOrderDepoControl = new FormControl('', []);
  public vahedMinOrderDepoControl = new FormControl('', []);
  public priceControl = new FormControl('', [Validators.required]);
  public minOrderControl = new FormControl('', [Validators.required]);
  public vahedMinOrderControl = new FormControl('', [Validators.required]);
  public brandNameControl = new FormControl('', []);
  public countryControl = new FormControl('', []);
  public productColorControl = new FormControl('', []);
  public hamlControl = new FormControl('', []);
  public shapeControl = new FormControl('', []);
  public daneshBonyanControl = new FormControl('', []);
  public iraniKalaControl = new FormControl('', []);
  public vahedArzeControl = new FormControl('', []);
  public WeightControl = new FormControl('', []);
  public vahedWeightControl = new FormControl('', []);
  public productSizeControl = new FormControl('', []);
  public vahedProductSizeControl = new FormControl('', []);
  public DefiniteSaveControl = new FormControl('', []);
  public vahedDefiniteSaveControl = new FormControl('', []);
  public vahedDefiniteSaveWeightControl = new FormControl('', []);
  public PossibleStorageWeightControl = new FormControl('', []);
  public PossibleStoragevahedWeightControl = new FormControl('', []);
  public PossibleStoragevahedMinOrderFilterControl = new FormControl('', []);
  public guarantyControl = new FormControl('', []);
  public vahedGuarantyControl = new FormControl('', []);
  public warrantyPeriodControl = new FormControl('', []);
  public sendSampleControl = new FormControl('', []);
  public productTypeAfterSellControl = new FormControl('', []);
  public productAfterSellControl = new FormControl('', []);
  public AfterSaleServicePeriodControl = new FormControl('', []);
  public benefitOldControl = new FormControl('', []);
  public UsefulLifePeriodControl = new FormControl('', []);
  public foreignPackControl = new FormControl('', []);
  public belqoveControl = new FormControl('', []);
  public vahedBelqoveControl = new FormControl('', []);
  public belfelControl = new FormControl('', []);
  public vahedBelfelControl = new FormControl('', []);
  public sellOldControl = new FormControl('', []);
  public vahedSellOldControl = new FormControl('', []);
  public selectProvinceControl = new FormControl();
  public selectProvincePercentControl = new FormControl();
  public certificateControl = new FormControl('', []);
  public licensesControl = new FormControl('', []);
  public confirmationControl = new FormControl('', []);
  public descriptionControl = new FormControl('', []);
  public propertyCtrl = new FormControl('',[]);
  public vahedMinOrderFilterControl: FormControl = new FormControl();
  public vahedMinOrderDepoFilterControl: FormControl = new FormControl();
  public vahedDefiniteSaveMinOrderFilterControl: FormControl = new FormControl();

  
  public filteredUnits: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredUnitsDepo: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredUnitsDefiniteSave: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public filteredUnitsPossibleStorage: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public productID = new FormControl('');

  public registerProductForm: FormGroup = this.builder.group({
    productID: this.id,
    categoryID: this.fourLevelCtrl,
    Properties: this.property,
    KnowledgeBaseFile: this.knowledgeBaseFile,
    name: this.productNameControl,
    brand: this.brandNameControl,
    country: this.countryControl,
    city: this.productPlaceControl,
    color: this.productColorControl,
    price: this.priceControl,
    ShippingMethod: this.hamlControl,
    ShappingMethod: this.shapeControl,
    DeliveryMethod : this.deliveryControl,
    SendSample: this.sendSampleControl,
    KnowledgeBase: this.daneshBonyanControl,
    persian: this.iraniKalaControl,
    InnerPackaging: this.internalPackControl,
    // ExternalPackaging: this.foreignPackControl,
    MinOrder: this.minOrderControl,
    MinOrderUnit: this.vahedMinOrderControl,
    MinOrderDepo: this.minOrderDepoControl,
    VahedMinOrderDepo: this.vahedMinOrderDepoControl,
    DepoBase:this.depoControl,
    SupplyAbility: this.supplyAbilityControl,
    SupplyAbilityUnit: this.vahedSupplyAbilityControl,
    SupplyAbilityPeriod: this.supplyAbilityPeriodControl,
    Weight: this.WeightControl,
    Size: this.productSizeControl,
    DefiniteSave:this.DefiniteSaveControl,
    PossibleStorage:this.PossibleStorage,
    Warranty: this.guarantyControl,
    AfterSaleService: this.productAfterSellControl,
    UsefulLife: this.benefitOldControl,
    UsefulLifePeriod: this.UsefulLifePeriodControl,
    DeliveryTime: this.deliveryTimeControl,
    DeliveryTimePeriod: this.DeliveryTimePeriodControl,
    AnnualSales: this.sellOldControl,
    AnnualSalesUnit: this.vahedSellOldControl,
    PotentialSupply: this.belqoveControl,
    PotentialSupplyUnit: this.vahedBelqoveControl,
    ActualSupply: this.belfelControl,
    ActualSupplyUnit: this.vahedBelfelControl,
    MarketAccess: this.MarketAccessValue,
    Certificates: this.certificateControl,
    Licenses: this.licensesControl,
    Confirmation: this.confirmationControl,
    Brands: this.brandNameControl,
    Catalog: this.catalogFile,
    Description: this.descriptionControl,
    images: this.images,
    Analyze: this.AnalyzeFile

  });

  sendSample = [
    { value: '1', viewValue: 'پولی' },
    { value: '1', viewValue: 'رایگان' },
    { value: '2', viewValue: 'ندارد' }
  ];

  haml = [
    { value: '1', viewValue: 'دریایی' },
    { value: '2', viewValue: 'هوایی' },
    { value: '3', viewValue: 'زمینی' },
    { value: '4', viewValue: 'ریلی' },
  ];
  delivery = [
    { value: '1', viewValue: 'معدن' },
    { value: '2', viewValue: 'کارخانه' },
    { value: '3', viewValue: 'FOB' }
  ];
  shapes = [
    { value: '1', viewValue: 'کپ' },
    { value: '2', viewValue: 'اسلوپ' },
    { value: '3', viewValue: 'کلوخه' },
    { value: '4', viewValue: 'دانه بندی' },
    { value: '5', viewValue: 'میکرونیزه' },
  ];
  daneshBonyan = [
    { value: false, viewValue: 'دانش بنیان نیست' },
    { value: true, viewValue: 'دانش بنیان است' }
  ];
  depo = [
    { value: false, viewValue: 'ندارد' },
    { value: true, viewValue: 'دارد' }
  ];
  iranianKala = [
    { value: false, viewValue: 'کالای ایرانی نیست' },
    { value: true, viewValue: 'کالای ایرانی است' }
  ];


  constructor(private builder: FormBuilder,
    public dialog: MatDialog,
    private _profile: ProfileService,
    private _product: ProductService,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _global: GlobalService) {
    this.uploadurl = _global.BASE_API_URL + this.uploadurl;
    this.uploadAnalyzeurl = _global.BASE_API_URL + this.uploadAnalyzeurl;
    this.image_url = _global.BASE_IMAGE_API_URL;
  }

  ngOnInit() {
    this.id = parseInt(this._route.snapshot.paramMap.get('id'), 10);
    this.loadBaseData();
    

  }

  bindeProduct(id) {
    this._profile.bindeProduct(id).subscribe(
      data => {
        this.bindData = data;
        console.log(data);
      },
      error => { },
      () => {
        this.levelTwoStatus = true;
        this.levelThreeStatus = true;
        this.levelFourStatus = true;
        this.oneLevelCtrl.setValue(this.bindData['category1']);
        this.oneLevelSelected({ value: this.bindData['category1'] });
        this.twoLevelCtrl.setValue(this.bindData['category2']);
        this.twoLevelSelected({ value: this.bindData['category2'] });
        this.threeLevelCtrl.setValue(this.bindData['category3']);
        this.threeLevelSelected({ value: this.bindData['category3'] });
        this.fourLevelCtrl.setValue(this.bindData['category4']);

        this.LowestProducts(this.bindData['category4']);

        //  this.loadParentCategories(this.bindData['category4']);
        this.propertiesList = this.bindData['properties'];
        this.propertyCtrl.setValue(this.propertiesList);
        console.log(this.propertiesList);
        this.productName = this.bindData['name'];
        this.brandName = this.bindData['brand'];
        this.countryControl.setValue(this.bindData['country']);
        this.productPlaceControl.setValue(this.bindData['city']);
        this.productColorControl.setValue(this.bindData['color']);
        this.hamlControl.setValue(this.bindData['shippingMethod']);
        this.shapeControl.setValue(this.bindData['shappingMethod']);
        this.licensesControl.setValue(this.bindData['licenses']);

        this.deliveryControl.setValue(this.bindData['deliveryMethod']);
        this.sendSampleControl.setValue(this.bindData['sendSample']);
        this.daneshBonyanControl.setValue(this.bindData['knowledgeBase']);
        this.iraniKalaControl.setValue(this.bindData['persian']);
        this.internalPackControl.setValue(this.bindData['innerPackaging']);

        // this.foreignPackControl.setValue(this.bindData['externalPackaging']);
        this.price = this.bindData['price'];
        this.minOrder = this.bindData['minOrder'];
        this.vahedMinOrderControl.setValue(this.bindData['minOrderUnit']);
        this.depoControl.setValue(this.bindData['depoBase']);
        this.minOrderDepo = this.bindData['minOrderDepo'];
        this.vahedMinOrderDepoControl.setValue(this.bindData['vahedMinOrderDepo']);
        this.supplyAbility = this.bindData['supplyAbility'];
        this.vahedSupplyAbilityControl.setValue(this.bindData['supplyAbilityUnit']);
        this.supplyAbilityPeriodControl.setValue(this.bindData['supplyAbilityPeriod']);
        this.productWeight = this.bindData['weight'];
        this.size = this.bindData['size'];
        this.PossibleStorage = this.bindData['possibleStorage'];
        this.DefiniteSave = this.bindData['definiteSave'];
        this.guarantyProduct = this.bindData['warranty'];
        this.AfterSaleServiceProduct = this.bindData['afterSaleService'];
        this.benefitOld = this.bindData['usefulLife'];
        this.UsefulLifePeriod = this.bindData['usefulLifePeriod'];
        this.UsefulLifePeriodControl.setValue(this.bindData['usefulLifePeriod']);
        this.deliveryTime = this.bindData['deliveryTime'];
        this.DeliveryTimePeriodControl.setValue(this.bindData['deliveryTimePeriod']);
        this.sellOld = this.bindData['annualSales'];
        this.vahedSellOldControl.setValue(this.bindData['annualSalesUnit']);
        this.belqove = this.bindData['potentialSupply'];
        this.vahedBelqoveControl.setValue(this.bindData['potentialSupplyUnit']);
        this.belfel = this.bindData['potentialSupply'];
        this.vahedBelfelControl.setValue(this.bindData['potentialSupplyUnit']);
        this.MarketAccessValueTemp = this.bindData['marketAccess'];

        if (this.UsefulLifePeriod === 'بدون محدودیت') {
          this.UsefulLifeStatus = true;
        }

        this.percentValue = 0;

        for (const item of this.MarketAccessValueTemp) {
          this.percentValue += parseInt(item.percent, 10);

          this.MarketAccessValue.push({
            'name': item.province,
            'percent': item.percent
          });
        }

        this.descriptionControl.setValue(this.bindData['description']);

        const certificateArr = new Array();

        for (let i = 0; i < this.bindData['certificates'].length; i++) {
          certificateArr.push(Number.parseInt(this.bindData['certificates'][i]));
        }

        this.certificateControl.setValue(certificateArr);
        const licensesArr = new Array();
        for (let i = 0; i < this.bindData['licenses'].length; i++) {
          licensesArr.push(Number.parseInt(this.bindData['licenses'][i]));
        }
        this.licensesControl.setValue(licensesArr);
        const confirmationArr = new Array();
        for (let i = 0; i < this.bindData['confirmation'].length; i++) {
          confirmationArr.push(Number.parseInt(this.bindData['confirmation'][i]));
        }
        this.confirmationControl.setValue(confirmationArr);
        const brandArr = new Array();

        for (let i = 0; i < this.bindData['brand'].length; i++) {
          brandArr.push(Number.parseInt(this.bindData['brand'][i]));
        }

        this.brandNameControl.setValue(brandArr);

        this.images = this.bindData['images'];
        this.catalogFile = this.bindData['catalog'];
        this.AnalyzeFile = this.bindData['analyze'];

        this.knowledgeBaseFile = this.bindData['knowledgeBaseFile'];

        this.properties = this.bindData['properties'];
        this.config.maxFiles = this.maxProductImage - this.images.length;

      }
    );
  }

  private filterOneLevel() {
    if (!this.levels) {
      return;
    }
    // get the search keyword
    let search = this.oneLevelFilterCtrl.value;
    if (!search) {
      this.filteredOneLevel.next(this.levels.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the onle levels
    this.filteredOneLevel.next(
      this.levels.filter(level => level.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterTwoLevel() {
    if (!this.levelTwo) {
      return;
    }
    // get the search keyword
    let search = this.twoLevelFilterCtrl.value;
    if (!search) {
      this.filteredTwoLevel.next(this.levelTwo.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the onle levelTwo
    this.filteredTwoLevel.next(
      this.levelTwo.filter(level => level.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterThreeLevel() {
    if (!this.levelThree) {
      return;
    }
    // get the search keyword
    let search = this.threeLevelFilterCtrl.value;
    if (!search) {
      this.filteredThreeLevel.next(this.levelThree.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the onle levelTwo
    this.filteredThreeLevel.next(
      this.levelThree.filter(level => level.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterFourLevel() {
    if (!this.levelFour) {
      return;
    }
    // get the search keyword
    let search = this.fourLevelFilterCtrl.value;
    if (!search) {
      this.filteredFourLevel.next(this.levelFour.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the onle levelTwo
    this.filteredFourLevel.next(
      this.levelFour.filter(level => level.name.toLowerCase().indexOf(search) > -1)
    );
  }

  oneLevelSelected(event) {
    this.levelTwoStatus = true;
    this.levelThreeStatus = false;
    this.levelFourStatus = false;
    this.propertyStatus = false;

    const currentCategory: any = this.levels.filter(x => x.id === event.value);
    this.levelTwo = currentCategory[0].children;

    this.filteredTwoLevel.next(this.levelTwo.slice());
    // listen for search field value changes
    this.twoLevelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTwoLevel();
      });
  }

  twoLevelSelected(event) {
    this.levelThreeStatus = true;
    this.levelFourStatus = false;
    this.propertyStatus = false;

    const currentCategory: any = this.levelTwo.filter(x => x.id === event.value);
    this.levelThree = currentCategory[0].children;

    this.filteredThreeLevel.next(this.levelThree.slice());
    // listen for search field value changes
    this.threeLevelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterThreeLevel();
      });
  }

  threeLevelSelected(event) {
    const currentCategory: any = this.levelThree.filter(x => x.id === event.value);
    this.levelFour = currentCategory[0].children;

    if (this.levelFour.length > 0) {
      this.levelFourStatus = true;
      this.filteredFourLevel.next(this.levelFour.slice());
      // listen for search field value changes
      this.fourLevelFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterFourLevel();
        });
    }

    this.loadProperty(event.value);
  }

  fourLevelSelected(event) {

    this.LowestProducts(event.value);
  }

  LowestProducts(categoryID) {
    this._profile.lowestProducts(categoryID).subscribe(
      data => {
        this.lowestProducts = data;

        console.log();
      },
      error => { },
      () => { }
    );
  }

  // When upload success
  onUploadSuccess(event) {
    this.images.push({ 'name': event[1] });
  }

  // When upload error
  onUploadError(event) { }

  loadParentCategories(categoryId: any) {
    this._product.loadParentCategories(categoryId).subscribe(
      data => {
        this.oneLevelCtrl.setValue(data['catLevel1']);
        this.oneLevelSelected({ value: data['catLevel1'] });
        this.twoLevelCtrl.setValue(data['catLevel2']);
        this.twoLevelSelected({ value: data['catLevel2'] });
        this.threeLevelCtrl.setValue(data['catLevel3']);
        this.threeLevelSelected({ value: data['catLevel3'] });
        // this.loadProperty(data['catLevel3']);
        // this.productFilters.categoryID = data['catLevel3'];
        // this.productFilters.categoryLevel = 3;
        // this.sendFilters();

        this.levelTwoStatus = true;
        this.levelThreeStatus = true;
        this.levelFourStatus = true;
      },
      error => { },
      () => { }
    );
  }

  editProduct(data: any) {
    if (this.registerProductForm.valid) {

      if (this.images.length > 0) {
        this.sendAdd = true;
        this.registerProductForm.setValue({
          categoryID: this.fourLevelCtrl.value,
          name: this.productNameControl.value,
          Properties: this.propertyCtrl.value,
          brand: this.brandNameControl.value,
          country: this.countryControl.value,
          city: this.productPlaceControl.value,
          color: this.productColorControl.value,
          price: this.priceControl.value,
          ShippingMethod: this.hamlControl.value,
          ShappingMethod:this.shapeControl.value,
          DeliveryMethod : this.deliveryControl.value,
          SendSample: this.sendSampleControl.value,
          KnowledgeBase: this.daneshBonyanControl.value,
          persian: this.iraniKalaControl.value,
          InnerPackaging: this.internalPackControl.value,
          // ExternalPackaging: this.foreignPackControl.value,
          MinOrder: this.minOrderControl.value,
          MinOrderUnit: this.vahedMinOrderControl.value,
          DepoBase: this.depoControl.value,
          MinOrderDepo : this.minOrderDepoControl.value,
          VahedMinOrderDepo: this.vahedMinOrderDepoControl.value,
          //depo: this.depo,
          Weight: this.productWeight,
          SupplyAbility: this.supplyAbilityControl.value,
          SupplyAbilityUnit: this.vahedSupplyAbilityControl.value,
          SupplyAbilityPeriod: this.supplyAbilityPeriodControl.value,
          Size: this.size,
          DefiniteSave:this.DefiniteSave,
          PossibleStorage:this.PossibleStorage,
          Warranty: this.guarantyProduct,
          AfterSaleService: this.AfterSaleServiceProduct,
          UsefulLife: this.benefitOldControl.value,
          UsefulLifePeriod: this.UsefulLifePeriodControl.value,
          DeliveryTime: this.deliveryTimeControl.value,
          DeliveryTimePeriod: this.DeliveryTimePeriodControl.value,
          AnnualSales: this.sellOldControl.value,
          AnnualSalesUnit: this.vahedSellOldControl.value,
          PotentialSupply: this.belqoveControl.value,
          PotentialSupplyUnit: this.vahedBelqoveControl.value,
          ActualSupply: this.belfelControl.value,
          ActualSupplyUnit: this.vahedBelfelControl.value,
          MarketAccess: this.MarketAccessValue,
          Certificates: this.certificateControl.value,
          //Analyze: this.AnalyzeFile,
          Licenses: this.licensesControl.value,
          Confirmation: this.confirmationControl.value,
          Brands: this.brandNameControl.value,
          Catalog: this.catalogFile,
          Description: this.descriptionControl.value,
          images: this.images,
          productID: this.id,
          Analyze: this.AnalyzeFile,
          KnowledgeBaseFile: this.knowledgeBaseFile
          

        });
        const result = this.registerProductForm.value;

        this._profile.editProduct(result).subscribe(
          (res: any) => {
            // console.log(res);
            this.openModal();
            this.snackBar.open('محصول شما با موفقیت ویرایش شد.', 'بستن', {
              duration: 8000
            });
          },
          error => {
            this.sendAdd = false;
          },
          () => {
            this.sendAdd = false;
          }
        );
      } else {
        this.snackBar.open('حداقل یک تصویر برای محصول خود آپلود کنید.', 'بستن', {
          duration: 8000
        });
      }

    }
  }

  loadBaseData() {
    this._profile.baseData().subscribe(
      data => {
        this.filters = data;

        this.currentPostCount = data['currentCount'];
        this.maxCount = data['maxCount'];
        this.uploadCatalog = data['uploadCatalog'];
        this.uploadAnalyze= true;//data['uploadAnalyze'];
        this.maxProductImage = data['imageUpload'];
        this.loadLevels();
      },
      error => { },
      () => { }
    );
  }

  loadLevels() {
    this._product.getLevels().subscribe(
      data => {
        this.levels = data;
      },
      error => { },
      () => {
        // load the initial levels list
        this.filteredOneLevel.next(this.levels.slice());

        // listen for search field value changes
        this.oneLevelFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterOneLevel();
          });
        // this.externalPackage = this.filters['externalPackaging'];
        this.innerPackage = this.filters['innerPackaging'];
        this.country = this.filters['countries'];
        this.region = this.filters['regions'];
        this.colors = this.filters['colors'];
        this.units = this.filters['units'];
        this.myCertificates = this.filters['myCertificates'];
        this.myLicenses = this.filters['myLicenses'];
        this.myConfirmation = this.filters['myConfirmation'];
        this.myBrands = this.filters['myBrands'];
        this.loading = true;

        // load the initial levels list
        this.filteredUnits.next(this.units.slice());
        this.filteredUnitsDepo.next(this.units.slice());
        this.filteredUnitsDefiniteSave.next(this.units.slice());
        this.filteredUnitsPossibleStorage.next(this.units.slice());
        // listen for search field value changes
        this.vahedMinOrderFilterControl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterUnits();
          });
          this.vahedDefiniteSaveMinOrderFilterControl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterUnitsDefiniteSave();
          });
          this.vahedMinOrderDepoFilterControl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterUnitsDepo();
          });

        this.bindeProduct(this.id);
      }
    );
  }

  addWeight() {
    console.log(this.productWeight);
    if (this.WeightControl.value !== null &&
      this.vahedWeightControl.value !== null &&
      this.WeightControl.value !== '' &&
      this.vahedWeightControl.value !== '') {

      this.snackBar.dismiss();
      this.productWeight.push({
        'weight': this.WeightControl.value,
        'weightUnit': this.vahedWeightControl.value
      });
      this.WeightControl.setValue('');
      this.vahedWeightControl.setValue('');
    } else {
      this.snackBar.open('هر دو فیلد باید کامل پر شوند!', 'بستن', {
        duration: 8000
      });
    }
  }

  deleteWeight(Weight, unit) {
    this.productWeight = this.productWeight.filter(x => x.weight !== Weight);
  }

  addSize() {
    if (this.productSizeControl.value !== null &&
      this.vahedProductSizeControl.value !== null &&
      this.productSizeControl.value !== '' &&
      this.vahedProductSizeControl.value !== '') {
      this.snackBar.dismiss();
      this.size.push({
        'size': this.productSizeControl.value,
        'sizeUnit': this.vahedProductSizeControl.value
      });
      this.productSizeControl.setValue('');
      this.vahedProductSizeControl.setValue('');
    } else {
      this.snackBar.open('هر دو فیلد باید کامل پر شوند!', 'بستن', {
        duration: 8000
      });
    }
  }

  deleteSize(size, unit) {
    this.size = this.size.filter(x => x.size !== size);
  }

  addWeightDefiniteSave() {
    if (this.DefiniteSaveControl.value !== null &&
      this.vahedDefiniteSaveControl.value !== null &&
      this.DefiniteSaveControl.value !== '' &&
      this.vahedDefiniteSaveControl.value !== '') {
      this.snackBar.dismiss();
      this.DefiniteSave.push({
        'definiteSave': this.DefiniteSaveControl.value,
        'definiteSaveUnit': this.vahedDefiniteSaveControl.value
      });
      this.DefiniteSaveControl.setValue('');
      this.vahedDefiniteSaveControl.setValue('');
    } else {
      this.snackBar.open('هر دو فیلد باید کامل پر شوند!', 'بستن', {
        duration: 8000
      });
    }
  }

  deleteDefiniteSaveWeight(DefiniteSave, unit) {
    this.DefiniteSave = this.DefiniteSave.filter(x => x.DefiniteSave !== DefiniteSave);
  }
  addPossibleStorageWeight() {
    if (this.PossibleStorageWeightControl.value !== null &&
      this.PossibleStoragevahedWeightControl.value !== null &&
      this.PossibleStorageWeightControl.value !== '' &&
      this.PossibleStoragevahedWeightControl.value !== '') {
      this.snackBar.dismiss();
      this.PossibleStorage.push({
        'possibleStorage': this.PossibleStorageWeightControl.value,
        'possibleStorageUnit': this.PossibleStoragevahedWeightControl.value
      });
      this.PossibleStorageWeightControl.setValue('');
      this.PossibleStoragevahedWeightControl.setValue('');
    } else {
      this.snackBar.open('هر دو فیلد باید کامل پر شوند!', 'بستن', {
        duration: 8000
      });
    }
  }

  deletePossibleStorageWeight(PossibleStorage, unit) {
    this.PossibleStorage = this.PossibleStorage.filter(x => x.PossibleStorage !== PossibleStorage);
  }
  addGuaranty() {
    if (((this.guarantyControl.value !== null && this.guarantyControl.value !== '') ||
      this.warrantyPeriodControl.value === 'مادام العمر') &&
      this.vahedGuarantyControl.value !== null &&
      this.vahedGuarantyControl.value !== '') {
      this.snackBar.dismiss();
      this.guarantyProduct.push({
        'warranty': this.guarantyControl.value,
        'warrantyKind': this.vahedGuarantyControl.value,
        'warrantyPeriod': this.warrantyPeriodControl.value
      });
      this.guarantyControl.setValue('');
      this.vahedGuarantyControl.setValue('');
    } else {
      this.snackBar.open('هر دو فیلد باید کامل پر شوند!', 'بستن', {
        duration: 8000
      });
    }
  }

  deleteGuaranty(WarrantyKind, unit) {
    this.guarantyProduct = this.guarantyProduct.filter(x => x.warrantyKind !== WarrantyKind);
  }

  addAfterSaleService() {
    if (this.productTypeAfterSellControl.value !== null &&
      this.productAfterSellControl.value !== null &&
      this.productTypeAfterSellControl.value !== '' &&
      this.productAfterSellControl.value !== '') {
      this.snackBar.dismiss();
      this.AfterSaleServiceProduct.push({
        'afterSaleService': this.productAfterSellControl.value,
        'afterSaleServiceKind': this.productTypeAfterSellControl.value,
        'afterSaleServicePeriod': this.AfterSaleServicePeriodControl.value
      });
      this.productTypeAfterSellControl.setValue('');
      this.productAfterSellControl.setValue('');
    } else {
      this.snackBar.open('هر دو فیلد باید کامل پر شوند!', 'بستن', {
        duration: 8000
      });
    }
  }

  deleteAfterSaleService(AfterSaleService, unit) {
    this.AfterSaleServiceProduct = this.AfterSaleServiceProduct.filter(x => x.afterSaleService !== AfterSaleService);
  }

  deleteCity(name, percent) {

    this.MarketAccessValue = this.MarketAccessValue.filter(x => x.name !== name);
    this.percentValue = this.percentValue - percent;
    if (this.percentValue < 100) {
      this.bigPercent = true;
    }
  }

  addCityToMarketAccess() {
    // let percent = 0;
    if (this.selectProvinceControl.value !== null &&
      this.selectProvincePercentControl.value !== null &&
      this.selectProvinceControl.value !== '' &&
      this.selectProvincePercentControl.value !== '') {
      this.snackBar.dismiss();
      this.percentValue = 0;
      for (const item of this.MarketAccessValue) {
        this.percentValue += item.percent;
      }

      const status = this.MarketAccessValue.filter(x => x.name === this.selectProvinceControl.value);

      if (status.length) {
        this.snackBar.open('شما این استان را قبلا انتخاب کرده‌اید!', 'بستن', {
          duration: 8000
        });
      } else {
        if ((this.percentValue + this.selectProvincePercentControl.value > 100)) {
          this.snackBar.open('مجموع درصد شهرها نباید از ۱۰۰ بیشتر باشد!', 'بستن', {
            duration: 8000
          });
        } else if (this.percentValue + this.selectProvincePercentControl.value === 100) {
          this.bigPercent = false;
          this.MarketAccessValue.push({
            'name': this.selectProvinceControl.value,
            'percent': this.selectProvincePercentControl.value
          });
          this.selectProvince = '';
          this.selectProvincePercent = '';

          this.percentValue = 0;
          for (const item of this.MarketAccessValue) {
            this.percentValue += item.percent;
          }

        } else {
          this.MarketAccessValue.push({
            'name': this.selectProvinceControl.value,
            'percent': this.selectProvincePercentControl.value
          });
          this.selectProvince = '';
          this.selectProvincePercent = '';

          this.percentValue = 0;
          for (const item of this.MarketAccessValue) {
            this.percentValue += item.percent;
          }
        }
      }

    } else {
      this.snackBar.open('هر دو فیلد باید کامل پر شوند!', 'بستن', {
        duration: 8000
      });
    }

  }

  // File uplaod functions
  onSelect(event) {
    this.uploadActive = true;
    this.uploadTextBtn = 'در حال آپلود ...';
  }

  onProgress(event) {
    this.progressUpload = event.progress;
    console.log(this.progressUpload);
  }
  onSelectAnalyze(event) {
    this.uploadAnalyzeActive = true;
    this.uploadAnalyzeTextBtn = 'در حال آپلود ...';
  }

  onProgressAnalyze(event) {
    this.progressUploadAnalyze = event.progress;
  }

  onBasicUploadAnalyzeAuto(event) {
    const result = JSON.parse(event.xhr.response);
    this.AnalyzeFile = result;
    this.uploadAnalyzeTextBtn = 'فایل آپلود شد';
    this.uploadAnalyzeActive = false;
  }

  onBasicUploadAuto(event) {
    const result = JSON.parse(event.xhr.response);
    this.catalogFile = result;
    this.uploadTextBtn = 'فایل آپلود شد';
    this.uploadActive = false;
  }

  // File uplaod functions
  onSelect2(event) {
    this.uploadActive2 = true;
    this.uploadTextBtn2 = 'در حال آپلود ...';
  }

  onProgress2(event) {
    this.progressUpload = event.progress;
    console.log(this.progressUpload);
  }

  onBasicUploadAuto2(event) {
    const result = JSON.parse(event.xhr.response);
    this.knowledgeBaseFile = result;
    this.uploadTextBtn2 = 'فایل آپلود شد';
    this.uploadActive2 = false;
  }

  UsefulLifeChange(event) {
    if (event.value === 'بدون محدودیت') {
      this.benefitOldControl.setValue('');
      this.UsefulLifeStatus = true;
      // console.log(this.UsefulLifeStatus);
      return;
    }

    // else if (event.value !== 'بدون محدودیت') {
    this.UsefulLifeStatus = false;
    //   console.log(this.UsefulLifeStatus);
    // }
  }

  public openModal() {
    this.dialog.open(DialogComponent, { data: { name: 'editProduct' } });
  }

  deleteProductImage(id) {
    if (confirm('آیا شما مطمئن هستید؟')) {
      this._profile.productDeleteImage(id).subscribe(
        data => {

          this.LoadImages(this.id);
        },
        error => { },
        () => {
          // this.sellerWorkPlaceList();
        }
      );
    }
  }

  loadProperty(category: any) {
    this.property.length = 0;
    this.propertyStatus = true;
    this._product.getProperty(category).subscribe(
      data => {
        this.property = data;
        for (const iterator of this.property) {
          for (const i of iterator.items) {
            this.propertiesItems.push(i);
          }
        }
        for (const iterator of this.propertiesList) {
          // const temp = this.propertiesItems.filter(x => x.id === iterator);
          for (const item of this.propertiesItems) {
            if (parseInt(iterator, 10) === item.id) {
              this.finalPropertiesItems.push(item);
            }
          }
        }
      },
      error => { },
      () => {

        let index = 0, Jindex = 0;

        for (let i = 0; i < this.property.length; i++) {
          for (let j = 0; j < this.property[i]['items'].length; j++) {
            for (let k = 0; k < this.properties.length; k++) {
              if (this.property[i]['items'][j].id === this.properties[k]) {
                index = i;
                Jindex = j;
                break;
              }
            }
          }
        }
      }
    );
  }

  propertSelected(event) {
    console.log(event);
  }

  delProp(item) {
    this.finalPropertiesItems = this.finalPropertiesItems.filter(x => x.id !== item);
  }

  carouselSimilarProducts() {
    $('.similar-products').owlCarousel({
      rtl: true,
      items: 3,
      stagePadding: 10,
      dots: true,
      responsiveClass: true,
      loop: false,
      margin: 15,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      // nav: true,
      // navText: ["<i class='fa fa-angle-left'></id>", "<i class='fa fa-angle-right'></id>"],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 3,
        }
      }
    });
  }

  deleteknowledge() {

    this.knowledgeBaseFile = '';
  }

  deleteCatalog() {

    this.catalogFile = '';
  }

  LoadImages(id) {
    this._profile.LoadImages(id).subscribe(
      data => {
        this.images = data;


        this.config.maxFiles = this.maxProductImage - this.images.length;
      });
  }

  filterUnits() {
    if (!this.units) {
      return;
    }
    let search = this.vahedMinOrderFilterControl.value;
    if (!search) {
      this.filteredUnits.next(this.units.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUnits.next(this.units.filter(level => level.name.toLowerCase().indexOf(search) > -1));
  }
  filterUnitsDefiniteSave() {
    if (!this.unitsDefiniteSave) {
      return;
    }
    let search = this.vahedDefiniteSaveWeightControl.value;
    if (!search) {
      this.filteredUnitsDefiniteSave.next(this.unitsDefiniteSave.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUnitsDefiniteSave.next(this.unitsDefiniteSave.filter(level => level.name.toLowerCase().indexOf(search) > -1));
  }
  filterUnitsPossibleStorage() {
    if (!this.unitsPossibleStorage) {
      return;
    }
    let search = this.vahedDefiniteSaveWeightControl.value;
    if (!search) {
      this.filteredUnitsPossibleStorage.next(this.unitsPossibleStorage.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUnitsPossibleStorage.next(this.unitsPossibleStorage.filter(level => level.name.toLowerCase().indexOf(search) > -1));
  }
  filterUnitsDepo() {
    if (!this.units) {
      return;
    }
    let search = this.vahedMinOrderDepoFilterControl.value;
    if (!search) {
      this.filteredUnitsDepo.next(this.units.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUnitsDepo.next(this.units.filter(level => level.name.toLowerCase().indexOf(search) > -1));
  }

  uploadCatalogFile(files) {
    let formData = new FormData();
    for (var file of files) {
      if (file.size > 512000) {
        this.snackBar.open('فایل انتخاب شده باید کمتر از 500 کیلوبایت باشد', 'بستن', {
          duration: 4000
        });
        return;
      }
      formData.append('files', file, file.name);
    }
    this.uploadActive = true;
    this.uploadTextBtn = 'در حال آپلود ...';
    this._profile.uploadFile(formData, this.uploadurl).subscribe(res => {
      this.uploadActive = false;
      this.uploadTextBtn = 'فایل آپلود شد';
      this.catalogFile = res;
    }, error => {
      this.uploadActive = false;
      this.uploadTextBtn = 'خطا';
      console.log(error);
    });
  }
  uploadAnalyzFile(files) {
    let formData = new FormData();
    for (var file of files) {
      if (file.size > 512000) {
        this.snackBar.open('فایل انتخاب شده باید کمتر از 500 کیلوبایت باشد', 'بستن', {
          duration: 4000
        });
        return;
      }
      formData.append('files', file, file.name);
    }
    this.uploadAnalyzeActive = true;
    this.uploadAnalyzeTextBtn = 'در حال آپلود ...';
    this._profile.uploadFile(formData, this.uploadurl).subscribe(res => {
      this.uploadAnalyzeActive = false;
      this.uploadAnalyzeTextBtn = 'فایل آپلود شد';
      this.AnalyzeFile = res;
    }, error => {
      this.uploadAnalyzeActive = false;
      this.uploadAnalyzeTextBtn = 'خطا';
      console.log(error);
    });
  }
  uploadDaneshFile(files) {
    let formData = new FormData();
    for (var file of files) {
      if (file.size > 512000) {
        this.snackBar.open('فایل انتخاب شده باید کمتر از 500 کیلوبایت باشد', 'بستن', {
          duration: 4000
        });
        return;
      }
      formData.append('files', file, file.name);
    }
    this.uploadActive2 = true;
    this.uploadTextBtn2 = 'در حال آپلود ...';
    this._profile.uploadFile(formData, this.uploadurl).subscribe(res => {
      this.uploadActive2 = false;
      this.uploadTextBtn2 = 'فایل آپلود شد';
      this.knowledgeBaseFile = res;
    }, error => {
      this.uploadActive2 = false;
      this.uploadTextBtn2 = 'خطا';
      console.log(error);
    });
  }

  addFiles(event) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    let formData = new FormData();

    for (let file of files) {
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.snackBar.open('تنها فایل تصویری (jpg, png) مجاز است', 'بستن', {
          duration: 4000
        });
        return;
      }

      if (file.size > 204800) {
        this.snackBar.open('تصویر انتخاب شده باید کمتر از 200 کیلوبایت باشد', 'بستن', {
          duration: 4000
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => this.selectedImages.push({
        base64: reader.result,
        file: file
      });

      reader.readAsDataURL(file);

      formData.append('files', file, file.name);
    }

    this._profile.uploadFile(formData, this.uploadurl).subscribe(res => {

      this.images.push({ 'name': res });
    }, error => {
      this.uploadActive = false;
      this.uploadTextBtn = 'خطا';
      console.log(error);
    });

    event.target.files = null;
  }

  selectedImages = [];

  removeFile(file) {
    let index = this.selectedImages.indexOf(file);
    if (index > -1)
      this.selectedImages.splice(index, 1);
  }

}
