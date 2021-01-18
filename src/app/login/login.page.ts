/** @format */

import { Component, OnInit ,ViewChild} from "@angular/core";
import { NavController, ToastController, LoadingController, AlertController, Platform, MenuController, ModalController } from "@ionic/angular";
import { ServiceService } from "src/services/service.service";
import { HttpClient } from "@angular/common/http";
import { SettingPage } from "../setting/setting.page";
import * as xml2js from "xml2js"
import { Storage } from "@ionic/storage";
import { Network } from "@ionic-native/network/ngx";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  @ViewChild('focusInputUsername') InputName;
  @ViewChild('focusInputPassword') InputPass;
  loader: any;
  oDate:any;
  img:string="";
  data_logins: any;
  data_warehouse:any;
  oUsername: string = '';
  oPassword: string = '';
  url: string;
  versionNumber: any = "1.0.0";
  checkVersion: boolean = false;
  constructor(private alertCtrl: AlertController,private loadingCtrl:LoadingController,private network: Network,private storage: Storage,private toastCtrl: ToastController,public setting : SettingPage,public navCtrl: NavController,public service: ServiceService, public http: HttpClient,private modalCtrl: ModalController) {}

  ngOnInit() {}

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
  async doLogin(oUsername, oPassword) {
    this.storage.get('_url').then((res) => {
      this.url = res;
      console.log(res);
      
    // alert(this.url)
      if (this.url != null) {
        console.log(this.url);
        this.network.onDisconnect().subscribe(() => {
        });
        this.network.onConnect().subscribe(() => {
        });
        if (this.network.type !== 'none') {
          if (oUsername == "" || oUsername == undefined) {
            this.Alert('Error', 'กรุณากรอกชื่อผู้ใช้อีกครั้ง');
          } else if (oPassword == "" || oPassword == undefined) {
            this.Alert('Error', 'กรุณากรอกรหัสผ่านอีกครั้ง');
          } else {
            oUsername = oUsername.toUpperCase();
            oPassword = oPassword.toUpperCase();
            this.presentLoading()
            this.service.get_login(oUsername, oPassword).then((res) => {
              this.data_logins = res;
              console.log(this.data_logins);
              if (this.data_logins['sqlstatus'] != '0') {
                this.Alert('Error', 'กรุณากรอกชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง');
              } else {
                this.service.get_WarehouseByUser(oUsername).then((res) =>{
                  this.data_warehouse = res;
                  console.log(this.data_warehouse);
                  // window.localStorage.setItem('_LOGIN', "IN");
                  // window.localStorage.setItem('_USER', oUsername);
                  this.storage.ready().then(() => {
                  this.storage.set('_warehouse', res["0"].Warehouse["0"])
                })
                })
                this.service.get_client(oUsername).then((res)=>{
                this.storage.set('_client', res["0"].client["0"]);
                this.storage.set('_clientname', res["0"].client_name["0"]);
                  console.log("client",res);
                  
                })
                this.storage.ready().then(() => {
                  this.storage.set('_user', oUsername)
                })
                //this.finishLoding();
                this.navCtrl.navigateRoot("home");
              }
            }).catch(err => {
              this.Alert("Error",JSON.stringify(err));
          });;
          }
        } else if (this.network.type === 'none') {
          this.presentToast('Please Check your network and try again', false, 'bottom');
        } else {
          this.presentToast('Please Check your network and try again', false, 'bottom');
        }
      } 
      else {
        this.Alert("Error","You Not Set Web Service")
        // let alert = await this.alertCtrl.create({
        //   header: 'Error',
        //   message: 'You Not Set Web Service',
        //   buttons: [{
        //     text: 'ตกลง',
        //     handler: data => {

        //     }
        //   }]
        // });
        // alert.present();
      }
    })
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
  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: "Loading...",
      duration: 2000
    });
    await this.loader.present();
  };
  async presentToast(key, showCloseButton, position: string) {
    const toast = await this.toastCtrl.create({
      message: key,
      // showCloseButton: showCloseButton,
      //closeButtonText: 'Ok',
       duration: 2000,
      //position: position
    });
    toast.present();
  }
  async Alert(title, subTitle) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: subTitle,
      buttons: [{
        text: 'ตกลง',
        handler: data => {

        }
      }]
    });
    alert.present();
  }
  finishLoding() {
    this.loader.dismiss();
  }
  reload() {
    window.location.href = './'
  }
}
