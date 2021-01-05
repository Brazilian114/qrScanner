import { Component, OnInit ,ViewChild} from '@angular/core';
import { NavController, LoadingController,ToastController, ModalController, Platform, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServiceService } from 'src/services/service.service';
import { DocrefPage } from '../docref/docref.page';
import { ReceiptmodalPage } from '../receiptmodal/receiptmodal.page';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-warehousetask',
  templateUrl: './warehousetask.page.html',
  styleUrls: ['./warehousetask.page.scss'],
})
export class WarehousetaskPage implements OnInit {
  @ViewChild('focusInputLocation') focusInputLocation;
  @ViewChild('focusInputSerial') focusInputSerial;
  oSerial: any;
  oLocation: any
  data_serial: any;
  oClient: any;
  oWarehouse: any;
  oReceipt_date: any;
  oZone: any;
  oLocation_to: any;
  oLocation_con: any;
  oOne: any;
  oTwo: any;
  oItem_no: any;
  oLocation_from: any;
  oDescription: any;
  oWork: any;
  oRef: any;
  oStatus: any;
  oType: any;
  oType2: any;
  oPallet: any;
  oQty_pick: any;
  constructor(public datepipe: DatePipe, public navCtrl: NavController, private service: ServiceService, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private storage: Storage, public platform: Platform, private alertCtrl: AlertController) { 
    this.storage.get('_client').then((res) => {
      this.oClient = res;
      console.log(this.oClient);

    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WarehousetaskPage');
    setTimeout(() => {
      this.focusInputSerial.setFocus();
    }, 1000);

  }
  ngOnInit() {
  }
  doLocation() {
    this.focusInputLocation.setFocus();
  }
  async presentToast(key, showCloseButton, position: string) {
    const toast = await this.toastCtrl.create({
      message: key,
      //showCloseButton: showCloseButton,
      //closeButtonText: 'Ok',
      duration: 2000,
     // position: position
    });
    await toast.present();
  }
  async doGetSerial(oSerial) {
    if (oSerial == "" || oSerial == undefined) {
      this.Alert("Error", "กรุณากรอก serial")
    }else{

    this.service.Outstanding_Serial_hh(this.oClient, oSerial, "").then((res) => {
      console.log(res);
      this.data_serial = res;
      if (this.data_serial.length > 0) {
        this.oOne = this.data_serial["0"].task_no;
        this.oTwo = this.data_serial["0"].activity;
        this.oItem_no = this.data_serial["0"].item_no;
        this.oWarehouse = this.data_serial["0"].warehouse_to;
        this.oLocation_to = this.data_serial["0"].location_to;
        this.oPallet = this.data_serial["0"].pallet_from;
        this.oQty_pick = this.data_serial["0"].loose_qty;
        if (this.data_serial["0"].movement_type == "S") {
          this.oLocation_from = this.oLocation_to
          this.oZone = this.data_serial["0"].area_from;
          this.oRef = this.data_serial["0"].order_no;
        } else if (this.data_serial["0"].movement_type == "TZ") {

          this.oLocation_from = this.data_serial["0"].location_from
          this.oZone = this.data_serial["0"].area_from;
          this.oRef = this.data_serial["0"].sales_order
        } else if (this.data_serial["0"].movement_type == "P") {

          //this.oLocation_from = this.oLocation_to
          this.oLocation_from = this.data_serial["0"].location_from
          this.oZone = this.data_serial["0"].area_from;
          this.oRef = this.data_serial["0"].sales_order;
          this.oLocation_to = "";
        }

        this.oDescription = this.data_serial["0"].description1;
        this.oWork = this.data_serial["0"].works_order;
        this.oStatus = this.data_serial["0"].status;

        this.oType = this.data_serial["0"].movement_type;
        this.oReceipt_date = this.datepipe.transform(this.data_serial["0"].receipt_date, 'yyyy-MM-dd');
        setTimeout(() => {
          this.focusInputLocation.setFocus();
        }, 500);
      } else {
        this.service.Outstanding_Serial_hh(this.oClient, "", oSerial).then(async(res) => {
          console.log(res);
          if(res.length <= 0){
            this.Alert("Error","serial ไม่พอรายการ");
          }else if (res.length == 1) {
            this.oOne = res["0"].task_no;
            this.oTwo = res["0"].activity;
            this.oItem_no = res["0"].item_no;
            this.oWarehouse = res["0"].warehouse_to;
            this.oLocation_to = res["0"].location_to;
            this.oPallet = res["0"].pallet_from;
            this.oQty_pick = this.data_serial["0"].loose_qty;
            if (res["0"].movement_type == "S") {
              this.oLocation_from = this.oLocation_to
              this.oZone = res["0"].area_from;
              this.oRef = res["0"].order_no;
            } else if (res["0"].movement_type == "TZ") {

              this.oLocation_from = res["0"].location_from
              this.oZone = res["0"].area_from;
              this.oRef = res["0"].sales_order
            } else if (res["0"].movement_type == "P") {

              //this.oLocation_from = this.oLocation_to
              this.oLocation_from = res["0"].location_from
              this.oZone = res["0"].area_from;
              this.oRef = res["0"].sales_order;
              this.oLocation_to = "";
            }

            this.oDescription = res["0"].description1;
            this.oWork = res["0"].works_order;
            this.oStatus = res["0"].status;

            this.oType = res["0"].movement_type;
            this.oReceipt_date = this.datepipe.transform(res["0"].receipt_date, 'yyyy-MM-dd');
            setTimeout(() => {
              this.focusInputLocation.setFocus();
            }, 500);
          }else if(res.length > 1){
            const modal = await this.modalCtrl.create({
              component: "SettingPage",
              componentProps: { 'oClient': this.oClient, 'oSerial_no': oSerial }
            });
            await modal.present();
            const modalData = await modal.onWillDismiss();
      
            // let profileModal = this.modalCtrl.create("ItemNomodalPage", { 'oClient': this.oClient, 'oSerial_no': oSerial });
            // profileModal.present();
            // profileModal.onDidDismiss(data => {
              console.log(modalData);

              this.oOne = modalData.data.task_no;
              this.oTwo =  modalData.data.activity;
              this.oItem_no =  modalData.data.item_no;
              this.oWarehouse =  modalData.data.warehouse_to;
              this.oLocation_to =  modalData.data.location_to;
              this.oPallet =  modalData.data.pallet_from;

              this.oQty_pick =  modalData.data.qty_picked;
              if ( modalData.data.movement_type == "S") {
                this.oLocation_from = this.oLocation_to
                this.oZone =  modalData.data.area_from;
                this.oRef =  modalData.data.reference_no;
              } else if ( modalData.data.movement_type == "TZ") {

                this.oLocation_from =  modalData.data.location_from
                this.oZone =  modalData.data.area_from;
                this.oRef =  modalData.data.sales_order
              } else if ( modalData.data.movement_type == "P") {

                //this.oLocation_from = this.oLocation_to
                this.oLocation_from =  modalData.data.location_from
                this.oZone =  modalData.data.area_from;
                this.oRef = modalData. data.sales_order;
                this.oLocation_to = "";
              }

              this.oDescription =  modalData.data.description1;
              this.oWork =  modalData.data.works_order;
              this.oStatus =  modalData.data.status;

              this.oType =  modalData.data.movement_type;
              this.oReceipt_date = this.datepipe.transform( modalData.data.receipt_date, 'yyyy-MM-dd');
              setTimeout(() => {
                this.focusInputLocation.setFocus();
              }, 500);
              
              // })
          }else{
            this.Alert("Error","Serial ไม่พอรายการ");
          }
        }).catch((error)=>{
          this.Alert("Error","Serial ไม่พอรายการ");
        })

      }
    })
  }
  }

  async doConfirm(oLocation_con) {
    console.log(oLocation_con);
    console.log(this.oLocation);
    if (oLocation_con == "" || oLocation_con == undefined) {
      this.Alert("Error", "กรุณากรอกข้อมูล ยืนยันโลเคชั่น")
      return false;
    } else {
      this.service.Check_Serial_Number(this.oWork, this.oSerial, this.oPallet, this.oItem_no).then(async(res) => {
        console.log(res);
        if (res["0"].sql_status != 0) {
          this.Alert("Error", res["0"].sql_message);
        } 
        else {
          if (this.oType == "S") {
            if (oLocation_con != this.oLocation_from || oLocation_con != this.oLocation_to) {
              this.Alert("Error", "location ไม่ตรง")
              return false;
            } else {
              this.service.Check_Pallet_Location(this.oPallet, this.oWarehouse, this.oLocation_from, "S").then(async(res) => {
                console.log(res);

                if (res["0"].sqlstatus == 0) {
                  this.service.Close_Putaway_Task_New(this.oWork, this.oOne, this.oTwo, "", "", this.oLocation_to, "", this.oSerial).then((res) => {
                    console.log(res);
                    if (res["0"].sqlstatus == 0){
                      this.Alert("Success", res["0"].sqlmsg);
                      this.doClear();
                    }else{
                      this.Alert("Error", res["0"].sqlmsg);
                    }
                  })
                } else {
                  const  alert = await this.alertCtrl.create({
                    header: "Warning",
                    message: "คุณต้องการที่จะยืนยัน Location นี้?",
                    buttons: [{
                      text: 'ยกเลิก',
                      handler: data => {
                      }
                    },
                    {
                      text: 'ตกลง',
                      handler: data => {

                        this.service.Close_Putaway_Task_New(this.oWork, this.oOne, this.oTwo, "", "", this.oLocation_to, "", this.oSerial).then((res) => {
                          console.log(res);
                          if (res["0"].sqlstatus == 0){
                            this.Alert("Success", res["0"].sqlmsg);
                            this.doClear();
                          }else{
                            this.Alert("Error", res["0"].sqlmsg);
                          }
                        })
                      }
                    }]
                  });
                  await alert.present();
                }

              })
            }
          } else if (this.oType == "TZ") {

            this.service.Get_Type_Order(this.oRef).then((res) => {
              console.log(res);
              this.oType2 = res["0"].type_transfer;
            }).then(() => {
              if (this.oType2 == "TZ") {
                if (oLocation_con != this.oLocation_from) {
                  this.Alert("Error", "location ไม่ตรง")
                  return false;
                } else {
                  this.close_task();
                }
              }
              else if (this.oType2 == "HM") {
                if (oLocation_con != this.oLocation_to) {
                  this.Alert("Error", "location ไม่ตรง")
                  return false;
                } else {
                  this.close_task();
                }
              }
            })
          }
          else if (this.oType == "P") {

            if (oLocation_con != this.oLocation_from) {
              this.Alert("Error", "location ไม่ตรง")
              return false;
            } else {
              this.service.Close_Pick_Task(this.oWork, this.oOne, this.oTwo, this.oQty_pick, "", "", "", this.oLocation_to).then((res) => {
                console.log(res);
                if (res["0"].sqlstatus == 0) {
                  this.Alert("Success", res["0"].sqlmsg);
                  this.doClear();
                } else {
                  this.Alert("Error", res["0"].sqlmsg);
                }
              })
            }
          }
        }
      })
    }
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
  doClear() {
    this.oOne = "";
    this.oTwo = "";
    this.oItem_no = "";
    this.oWarehouse = "";
    this.oLocation_to = "";
    this.oPallet = "";

    this.oSerial = "";
    this.oLocation_con = "";
    //this.oLocation_from = this.oLocation_to
    this.oLocation_from = "";
    this.oZone = "";
    this.oRef = "";
    this.oLocation_to = "";


    this.oDescription = "";
    this.oWork = "";
    this.oStatus = "";

    this.oType = "";
    this.oReceipt_date = "";
    setTimeout(() => {
      this.focusInputSerial.setFocus();
    }, 500);
  }
  close_task() {

    this.service.Close_Pick_Task(this.oWork, this.oOne, this.oTwo, this.oQty_pick, "", "", "", this.oLocation_to).then((res) => {
      console.log(res);
      if (res["0"].sqlstatus == 0) {
        this.Alert("Success", res["0"].sqlmsg);
        this.doClear();
      } else {
        this.Alert("Error", res["0"].sqlmsg);
      }
    })
  }
}
