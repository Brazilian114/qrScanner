import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, ToastController } from "@ionic/angular";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  oURL:any;
  constructor(public storage: Storage,public navCtrl: NavController,public modalCtrl: ModalController) { 
    this.storage.get('_url').then((res)=>{
      console.log(res);
      this.oURL = res;
    })
  }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss();
    // this.navCtrl.navigateForward('login');
  }
  doURL(oURL){
    this.storage.set('_url', oURL);
    this.storage.get('_url').then((res)=>{
      console.log(res);
    })
    this.dismiss();
  }
  doClearURL(){
    this.storage.remove('_url')
    this.storage.get('_url').then((res)=>{
      console.log(res);
    })
    this.dismiss();
  }
  reload(){
    window.location.reload();
  }  
}
