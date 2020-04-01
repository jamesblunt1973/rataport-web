import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  orderid;
  refId;

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    private _factor: ProductService,
    private _route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  
    this.orderid = this.data.orderid;
  }

  close(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.close();
    this._route.navigateByUrl('/profile/inbox/secure-order');
  }

  orderPaymentCreate() {
  
    this._factor.secureOrderPaymentCreate(this.orderid).subscribe(
      data1 => {
        
        this.refId = data1;
     
      },
      error => { },
      () => {
      
        this._factor.orderPayment(this.refId.result);
      });
  }

  pay() {
    this.close();
    this.orderPaymentCreate();
  }

}
