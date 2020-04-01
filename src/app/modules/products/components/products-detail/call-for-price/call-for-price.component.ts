import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
// Services
import { GlobalService } from '../../../../../services/global.service';
import { AuthService } from '../../../../../services/auth.service';
import { ProfileService } from '../../../../profile/services/profile.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-call-for-price',
  templateUrl: './call-for-price.component.html',
  styleUrls: ['./call-for-price.component.scss']
})
export class CallForPriceComponent implements OnInit {

  @Input() placeholderLabel = 'جستجو';
  @Input() noEntriesFoundLabel = 'موردی پیدا نشد!';

  public number = '';
  public unit = '';
  public units = [];
  public title;
  public sendAdd = false;
  public productName = '';
  public filters = [];
  public status = false;
  public page;

  public numberCtrl = new FormControl('', [Validators.required]);
  public unitCtrl = new FormControl('', [Validators.required]);
  public unitDropCtrl = new FormControl('', [Validators.required]);

  public vahedMinOrderFilterControl: FormControl = new FormControl();

  public filteredUnits: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  private _onDestroy = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<CallForPriceComponent>,
    private _global: GlobalService,
    private _auth: AuthService,
    private _profile: ProfileService,
    public snackBar: MatSnackBar,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public callForPriceForm: FormGroup = this.builder.group({
    ProductID: this.data.id,
    Count: this.numberCtrl,
    Unit: this.unitDropCtrl
  });

  ngOnInit() {
    this.productName = this.data.name;
    this.page = this.data.page;
    if (this.page === 'share') {
      this.status = true;
    } else {
      this.loadBaseData();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  loadBaseData() {
    this._profile.baseData().subscribe(
      data => {
        this.filters = data;
        console.log(data);

       
      },
      error => { },
      () => {
        this.units = this.filters['units'];
        this.status = true;

        // load the initial levels list
        this.filteredUnits.next(this.units.slice());

        // listen for search field value changes
        this.vahedMinOrderFilterControl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterUnits();
          });

      }
    );
  }

  callForPrice(data) {
    if (this.callForPriceForm.valid) {
      this.sendAdd = true;
      this._profile.callForPrice(data).subscribe(
        result => {
          if (result['success']) {
            this.close();
            this.openSnackBar('استعلام قیمت با موفقیت ارسال شد', 'بستن');
          } else {
            this.openSnackBar('مشکلی پیش امده، لطفا مجددا امتحان کنید', 'بستن');
          }
          console.log(result);
        },
        error => {
          if (error.status === 401) {
            this._auth.logout();
          }
          this.sendAdd = false;
        },
        () => {
          this.sendAdd = false;
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

  filterUnits() {
    if (!this.units) {
      return
    }
    let search = this.vahedMinOrderFilterControl.value;
    if (!search) {
      this.filteredUnits.next(this.units.slice());
      return
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredUnits.next(this.units.filter(level => level.name.toLowerCase().indexOf(search) > -1));
  }
}
