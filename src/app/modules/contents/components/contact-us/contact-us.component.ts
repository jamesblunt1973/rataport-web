import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule, NgForm, FormGroupDirective } from '@angular/forms';
import { SiteinfoService } from '../../../../services/siteinfo.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  public info;
  public status = false;
  public your_name = '';
  public your_email = '';
  public your_tel = '';
  public your_mobile = '';
  public your_subject = '';
  public your_message = '';
  public lat = 35.67514743608468;
  public lng = 51.39404296875;
  public zoom = 12;
  public units: any[];
  public sendMessage = false;
  public mapStyle = [
    {
      featureType: 'administrative',
      elementType: 'all',
      stylers: [
        { saturation: -100 }
      ]
    }, {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        { saturation: -100 }
      ]
    }, {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        { saturation: -100 }
      ]
    }, {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        { saturation: -100 }
      ]
    }, {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        { saturation: -100 }
      ]
    }, {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        { saturation: -50 }
      ]
    }
  ];

  @ViewChild(FormGroupDirective, { static: false }) messageForm;


  public nameControl = new FormControl('', [Validators.required]);
  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public unitControl = new FormControl('', [Validators.required]);
  public TelControl = new FormControl('');
  public mobileControl = new FormControl('', [Validators.required]);
  public subjectControl = new FormControl('', [Validators.required]);
  public messageControl = new FormControl('', [Validators.required]);

  constructor(private _contactus: SiteinfoService,
    private _route: Router,
    private builder: FormBuilder,
    public snackBar: MatSnackBar) { }

  public sendMessageForm: FormGroup = this.builder.group({
    name: this.nameControl,
    email: this.emailControl,
    departmentID: this.unitControl,
    title: this.subjectControl,
    description: this.messageControl,
    tel: this.TelControl,
    mobile : this.mobileControl
  });

  ngOnInit() {
    this.loadUnit();
  }

  loadUnit() {
    this._contactus.getUnit().subscribe(
      data => {
        this.units = data['departments'];
        this.info = data['siteInfo'];
        // console.log(data);
      },
      error => { },
      () => {
        this.lat = parseFloat(this.info.lat);
        this.lng = parseFloat(this.info.long);
        this.unitControl.setValue(1);
        this.status = true;
      }
    );
  }

  sendMsg(data: any) {
    if (this.sendMessageForm.valid) {
      this.sendMessage = true;
      this._contactus.sendMessage(data).subscribe(
        res => {
          console.log(res);
          if (res) {
            this.openSnackBar('پیام ارسال شد', 'بستن');
            this.messageForm.resetForm();

          } else {
            this.openSnackBar('خطا در سرور, لطفا مجددا امتحان کنید!', 'بستن');
          }
        },
        error => {
          this.sendMessage = false;
        },
        () => {
          this.sendMessage = false;
        }
      );
    } else {
      this.openSnackBar('لطفا همه فیلدها را پر کنید!', 'بستن');
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  mainpage() {
    // this.modalRef.hide();
    this._route.navigateByUrl('/');
  }


}
