import { Component, OnInit ,Input,ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from '@ionic/angular';
import { ServiceService } from 'src/services/service.service';
@Component({
  selector: 'app-itemnomodal',
  templateUrl: './itemnomodal.page.html',
  styleUrls: ['./itemnomodal.page.scss'],
})
export class ItemnomodalPage implements OnInit {
  @ViewChild('focusInputItem') InputItem;
  data_item: any;
  // oClient: any;
  oReceipt: any;
  oDocRef: any;
  oItemNo: any;
  oPo: any;
  loader: any;
  items: any;
  myInput: any;
  data_serial:any;
  // oSerial_no:any;
  @Input("oClient") oClient;
  @Input("oSerial_no") oSerial_no;
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ServiceService,
    private loadingCtrl: LoadingController,public modalCtrl: ModalController) { }

  ngOnInit() {
    this.doGetSerial(this.oSerial_no);
  }
  initializeItems() {
    this.items = this.data_serial;

  }
  doGetSerial(oSerial){
    
    this.service.Outstanding_Serial_hh(this.oClient,"",oSerial).then((res)=>{
      console.log(res);
      this.data_serial = res;
      this.initializeItems();
    })

  }
  onInput(ev: any) {
    console.log('ev', this.myInput);
    this.initializeItems();
    console.log(this.items);
    let val = ev.target.value;
    if (val && val.trim() != '') {
      console.log('1');
      this.items = this.items.filter((item) => {
        return (item.item_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
      console.log('11');
    } else {
      // this.doGetItem(this.oClient, this.oReceipt, this.oPo, "");
    }

  }
  doSelectItem(item_no, description1 ,reference_no ,works_order ,lot_no ,activity ,task_no ,warehouse_to, movement_type, status, receipt_date, location_to, area_from, pallet_from, qty_picked) {
    // console.log(item_no, description1 ,reference_no ,works_order ,lot_no ,activity ,task_no ,warehouse_to, movement_type, status, receipt_date);
    console.log(receipt_date);
    
    let data = { 'item_no': item_no, 'description1': description1, 'reference_no': reference_no, 'works_order': works_order
    , 'lot_no': lot_no , 'activity': activity , 'task_no': task_no , 'warehouse_to': warehouse_to,'movement_type': movement_type ,'status': status,'receipt_date': receipt_date,'location_to':location_to,'area_from':area_from,'pallet_from':pallet_from,'qty_picked':qty_picked };
    this.modalCtrl.dismiss(data);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      message: "Loading..."
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
