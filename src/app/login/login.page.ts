/** @format */

import { Component, OnInit } from "@angular/core";
import { ModalController, NavController, NavParams, ToastController } from "@ionic/angular";
import { ServiceService } from "src/services/service.service";
import { HttpClient } from "@angular/common/http";
import { SettingPage } from "../setting/setting.page";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(public setting : SettingPage,public navCtrl: NavController,public service: ServiceService, public http: HttpClient,private modalCtrl: ModalController) {}

  ngOnInit() {}
  doLogin() {
    this.http
      .get(
        "http://58.137.91.7/RF-Service_Yasub/RFService.asmx/Get_Client?User=ANON"
      )
      .subscribe((data) => {
        console.log(data);

        //alert(JSON.stringify(data));
        //         return data;
        // },
        //     err => {
        alert(JSON.stringify(data));
        console.log(data);
      });
  }
  getData() {
    console.log(1234);
    this.service.get_client("").then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  doSetting() {
    console.log(456);
    
    this.navCtrl.navigateForward('setting');
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SettingPage,
      componentProps: { value: 123 }
    });

    await modal.present();
    const modalData = await modal.onWillDismiss();
   // console.log(modalData);
    this.reload();

  }
  reload() {
    window.location.reload();
  }
}
