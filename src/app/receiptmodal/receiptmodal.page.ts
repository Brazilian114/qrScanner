import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from '@ionic/angular';
import { ServiceService } from 'src/services/service.service';

@Component({
  selector: 'app-receiptmodal',
  templateUrl: './receiptmodal.page.html',
  styleUrls: ['./receiptmodal.page.scss'],
})
export class ReceiptmodalPage implements OnInit {
  data_receipt:any;
  data_checkinorder:any;
  oClient:any;
  listType:any;
  oReciptNo:any;
  oBook:any;
  loader:any;
  items: any;
  oReceiptType:any;
  oBranch_Code:any;
  oWarehouse:any;
  oFlag:any;
  data_hanel:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ServiceService,
    private loadingCtrl: LoadingController,public modalCtrl: ModalController) { 
      this.oClient = navParams.get('oClient');
      this.oFlag = navParams.get('oFlag');
      console.log(this.oFlag);
      
      if(this.oFlag != undefined){
     this.doGetHanel();
      
      }else{
        this.doGetReceipt();
      }
    }

  ngOnInit() {
  }
  initializeItems() {
    if(this.oFlag != undefined){
      this.items = this.data_hanel;
       
       }else{
        this.items = this.data_receipt;
       }
  }
  onInput(ev: any){
    this.initializeItems();
     console.log(this.items);
   let val = ev.target.value;
   if(val && val.trim() != ''){
     this.items = this.items.filter((item)=>{
       return (item.reference_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1 || item.order_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
     })
   }
}
doSelectReceipt(order_no, reference_no, status,department_code,description, save_type, remark){
let data = { 'order_no': order_no, 'reference_no': reference_no, 'status': status, 'department_code': department_code, 'description': description, 'save_type': save_type, 'remark': remark};
this.modalCtrl.dismiss(data);
}

doSelectHanel(order_no, reference_no, status, ref_no){
let data = { 'order_no': order_no, 'reference_no': reference_no, 'status': status, 'ref_no': ref_no};
this.modalCtrl.dismiss(data);
}

doGetReceipt(){

 this.service.Get_Hanel_master().then((res)=>{
   this.data_receipt = res;
   console.log("test",this.data_receipt);
   this.initializeItems();
 })
}
doGetHanel(){

this.service.Get_Hanel_Order().then((res)=>{
 this.data_hanel = res;
 console.log("test",this.data_hanel);
 this.initializeItems();
})
}

presentLoading(){
this.loader = this.loadingCtrl.create({
  message:"Loading...",duration:3000
});
// this.loader.present();
this.loader.present().then(() => {});
};
finishLoding(){
this.loader.dismiss();
}
dismiss() {
this.modalCtrl.dismiss();

}
}
