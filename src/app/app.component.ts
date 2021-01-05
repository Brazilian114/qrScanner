import { Component } from '@angular/core';

import { AlertController, Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from  '@angular/common/http';
import { Storage } from '@ionic/storage';
// import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage: any = "LoginPage";
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    private navCtrl: NavController ,
    public storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 
  openHomePage(){
    this.navCtrl.navigateRoot("home")
  }
  openOperationPage(){
    this.navCtrl.navigateRoot("operation")
  }
  async doLogout(){
    const alert = await this.alertCtrl.create({
      header: 'ออกจากระบบ',
      message: "คุณต้องการออกจากระบบหรือไม่",
      buttons: [ {
          text: 'ยกเลิก',
          handler: data => {
console.log("cancle");

          }
        },
        {
          text: 'ตกลง',
          handler: data => {
            console.log("ok");
            this.storage.ready().then(() => {
              this.storage.remove('_user');
              this.storage.remove('_RecNum');
              this.storage.remove('_oReversePallet');
              this.storage.remove('_Qty');
              this.storage.remove('_oLine');
              this.storage.remove('_oItem');
              this.storage.remove('_oReceipt');
              this.storage.remove('_Wh');
              this.storage.remove('_PalleNO');
              this.storage.remove('_user_Group');
              this.storage.remove('_user_Cus_name');
              // window.localStorage.setItem('_LOGIN', "OUT");
              // window.localStorage.removeItem('_USER')
            });
            // this.data_logins = "";
            // this.reload();
            this.navCtrl.navigateRoot("login")
          }
        }
      ]
    });
    await alert.present();
  }
  reload(){
    window.location.reload();
  }
}
