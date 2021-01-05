import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServiceService } from 'src/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;
 
  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult = null;
  data_logins:any;
  data_user:any;
  oGroup:any;
  oCus_name:any;
  oCus_code:any;
  oBrance_code:any;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    public storage : Storage,
    public service: ServiceService
  ) {
    this.storage.get('_user').then((res) => {
      this.data_logins = res;
      console.log(this.data_logins);
      this.doGetUser(this.data_logins);
    });
  }

  
  doGetUser(oClient){
    this.service.Get_User(oClient).then((res)=>{
      this.data_user = res;
      console.log(this.data_user);
      this.oGroup = this.data_user["0"].user_group;
      this.oCus_name = this.data_user["0"].customer_name;
      this.oCus_code = this.data_user["0"].customer_code;
      this.oBrance_code = this.data_user["0"].Branch_code;

      this.storage.ready().then(() => {
        this.storage.set('_user_Group', this.oGroup)
      })
      this.storage.ready().then(() => {
        this.storage.set('_user_Cus_name', this.oCus_name)
      })
      this.storage.ready().then(() => {
        this.storage.set('_user_Cus_code', this.oCus_code)
      })
         this.storage.ready().then(() => {
        this.storage.set('_branch_code', this.oBrance_code)
      })
      
    })
  }
  menuOpened() {
    this.storage.get('_user').then((res) => {
      this.data_logins = res;
      console.log(this.data_logins);
    });
  }

  // Helper functions
  
}