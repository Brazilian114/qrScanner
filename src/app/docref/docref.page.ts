import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from '@ionic/angular';
import { ServiceService } from 'src/services/service.service';

@Component({
  selector: 'app-docref',
  templateUrl: './docref.page.html',
  styleUrls: ['./docref.page.scss'],
})
export class DocrefPage implements OnInit {
  data_docref: any;
  data_order_docref: any;
  data_docref_return: any;
  oClient: any;
  oCustomer: any;
  oDocref: string;
  loader: any;
  items: any;
  flag: string = "";
  datatranferorder: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ServiceService,
    private loadingCtrl: LoadingController,public modalCtrl: ModalController) { 
      this.oClient = navParams.get('oClient');
    this.oCustomer = navParams.get('oCustomer_Header');
    this.oDocref = navParams.get('oDocref');
    this.flag = navParams.get('flag');
    console.log(this.flag);
    if(this.flag != undefined){
      console.log(1);
      
      this.doGetHanelOrderRef("","");
    }else{
      console.log(2);
      this.doGetHanelRef(this.oClient);
    }
    }

  ngOnInit() {
  }
  initializeItems() {
    if(this.flag != undefined){
      this.items = this.data_order_docref;
    }else{
      this.items = this.data_docref;
    }
  
  }
  onInput(ev: any) {
    this.initializeItems();
    console.log(this.items);
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.order_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  doSelectDocrefReturn(order_no,status,reference_no,department,description) {
    let data = { 'order_no': order_no, 'status': status,'reference_no':reference_no, 'department':department,'description':description};
    this.modalCtrl.dismiss(data);
  }
  doSelectDocref(order_no, status, department_code, description, oWh, oZone) {
    let data = { 'order_no': order_no, 'status': status,'department_code':department_code, 'description':description, 'oWh':oWh, 'oZone':oZone};
    this.modalCtrl.dismiss(data);
  }
  
  doGetHanelOrderRef(oWarehouse, oZone) {
    this.service.Get_Hanel_Order_Ref(oWarehouse, oZone).then((res) => {
      console.log(res);
      this.data_order_docref = res;
      this.initializeItems();
    })
  }

  doGetHanelRef(oClient) {
    this.service.Get_Hanel_Ref(oClient).then((res) => {
      console.log(res);
      this.data_docref = res;
      this.initializeItems();
    })
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      message: "Loading...", duration: 3000
    });
    // this.loader.present();
    this.loader.present().then(() => { });
  };
  finishLoding() {
    this.loader.dismiss();
  }
  dismiss() {
    this.modalCtrl.dismiss();

  }
}
