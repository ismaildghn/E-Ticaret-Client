import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { delay } from 'rxjs';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private alertify: AlertifyService){

    super(spinner);
  }
  ngOnInit(): void{
   this.showSpinner(SpinnerType.BallScaleMultiple);
  }
  m(){
    this.alertify.message("Merhaba", {
      messageType: MessageType.Success,
      position: Position.TopCenter,
      delay: 5,
      dismissOthers: false
    });
    
  }
  d(){
    this.alertify.dismiss();
  }
}
