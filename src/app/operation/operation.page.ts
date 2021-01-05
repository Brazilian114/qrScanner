import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-operation',
  templateUrl: './operation.page.html',
  styleUrls: ['./operation.page.scss'],
})
export class OperationPage implements OnInit {

  constructor(public navCtrl:NavController, private router: Router) { }

  ngOnInit() {
  }
  doUsabillity() {
    this.router.navigate(['/usabillity']);
  }
  doFactory() {
    this.navCtrl.navigateForward('factory');
  }
  doWarehouseTask() {
    this.navCtrl.navigateForward('warehousetask');
  }
}
