import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, ToastController } from "@ionic/angular";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(public navCtrl: NavController,public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss();
    // this.navCtrl.navigateForward('login');
  }
}
