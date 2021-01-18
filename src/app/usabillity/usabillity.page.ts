import { Component, OnInit ,ViewChild} from '@angular/core';
import { NavController, LoadingController,ToastController, ModalController, Platform, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServiceService } from 'src/services/service.service';
import { DocrefPage } from '../docref/docref.page';
import { ReceiptmodalPage } from '../receiptmodal/receiptmodal.page';
import { ScanmodalPage } from '../scanmodal/scanmodal.page';
@Component({
  selector: 'app-usabillity',
  templateUrl: './usabillity.page.html',
  styleUrls: ['./usabillity.page.scss'],
})
export class UsabillityPage{
  @ViewChild('focusInputQty') focusInputQty;
  @ViewChild('focusInputSerial') focusInputSerial;

  oStatus:any = "DATA ENTRY";
  oDate:any = new Date().toISOString();
  isenabled:boolean = false;
  enabled:boolean = false;
  Check : string = 'Header';
  oOrder:any;
  oReferent_no:any;
  data_serial:any;
  oClient:any;
  oDepartment:any;
  oDepartment_name:any;
  listdepart:any;
  data_depart:any;
  datahanel:any;
  oUsername:any;
  oHanel_no:any;
  data_hanel:any;
  data_flag:any;
  oQty_balance:any;
  oQty_original:any;
  oDes:any;
  oQty_flag:any;
  oQty:any;
  oLine_no:any;
  oItem_no:any;
  oSerial_no:any;
  oQty_use:any;
  oType:any = 'N';
  data_engine:any;
  listengine:any;
  oTotal:any;
  oTotal_flag:any;
  oRemark:any;
  oQty_use_head:any;
  constructor(public navCtrl: NavController, private service: ServiceService, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private storage: Storage, public platform: Platform, private alertCtrl: AlertController) {
      this.storage.get('_client').then((res)=>{
        this.oClient = res;
        console.log(this.oClient);
        this.doGetDepartment(this.oClient)
      })
      this.doGetEngine();
      this.storage.get('_user').then((res)=>{
        this.oUsername = res;
        console.log(this.oClient);
      })
     }

    //  async doGetReceipt(){

    //   let profileModal = this.modalCtrl.create("RecipesmodalPage");
    //     profileModal.present();
    //     profileModal.onDidDismiss(data =>{
    //       console.log(data);
    //       if(data == undefined){

    //       }else{
    //        this.listdepart = data.department_code
    //        this.oHanel_no = data.order_no;
    //        this.oStatus = data.status;
    //        this.oDepartment = data.department_code;
    //        this.oDepartment_name = data.description;
    //        this.oReferent_no = data.reference_no;
    //        this.oType = data.save_type;
    //        this.oRemark = data.remark;
    //        this.doGetHanelDetail(this.oClient, this.oHanel_no)
    //        this.Get_Flag_Save(this.oClient, this.oHanel_no);
    //        //this.doClear();
    //       }
    //     });
    // }
    async doGetReceipt() {
      const modal = await this.modalCtrl.create({
        component: ReceiptmodalPage,
      });
  
      await modal.present();
      const data = await modal.onWillDismiss();
     console.log(data);
     if(data.data == undefined){

    }else{
      // this.reload();
      this.listdepart = data.data.department_code
      this.oHanel_no = data.data.order_no;
      this.oStatus = data.data.status;
      this.oDepartment = data.data.department_code;
      this.oDepartment_name = data.data.description;
      this.oReferent_no = data.data.reference_no;
      this.oType = data.data.save_type["0"];
      this.oRemark = data.data.remark;
      this.doGetHanelDetail(this.oClient, this.oHanel_no)
      this.Get_Flag_Save(this.oClient, this.oHanel_no);
    }
    }
    async doCloseHeader(oClient, oOrder_no){
      let alert = await this.alertCtrl.create({
        header: 'Warning',
        message: "คุณยืนยันที่จะปิดเอกสารนี้หรือไม่",
        buttons: [{
          text: 'ยกเลิก',
          handler: data => {
   
          }
        },
        {
          text: 'ตกลง',
          handler: data => { 
            if(oOrder_no == undefined || oOrder_no == ""){
              this.Alert("Error","กรุณาระบุเลข Order")
            }else{
                this.service.Close_Hanel_Master(oClient,oOrder_no,this.oUsername).then((res)=>{
                  console.log(res);
                  if(res["0"].sql_status == 0){
                    this.Alert("Message","Success")
                    this.doClear();
                    this.doClearHeader();
                    this.data_hanel = [];
                  }else{
                    this.Alert("Error", res["0"].sql_msg)
                    }
                })
              }
          }
        }]
      });
      alert.present();
    }
    // doScanner(){
    //   this.barcodeScanner.scan(
    //     function (result) {
    //         alert("We got a barcode\n" +
    //               "Result: " + result.text + "\n" +
    //               "Format: " + result.format + "\n" +
    //               "Cancelled: " + result.cancelled);
    //     },
    //     // function (error) {
    //     //     alert("Scanning failed: " + error);
    //     // },
    //     // {
    //     //     preferFrontCamera : true, // iOS and Android
    //     //     showFlipCameraButton : true, // iOS and Android
    //     //     showTorchButton : true, // iOS and Android
    //     //     torchOn: true, // Android, launch with the torch switched on (if available)
    //     //     saveHistory: true, // Android, save scan history (default false)
    //     //     prompt : "Place a barcode inside the scan area", // Android
    //     //     resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    //     //     formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
    //     //     orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
    //     //     disableAnimations : true, // iOS
    //     //     disableSuccessBeep: false // iOS and Android
    //     // }
    //  );
    //   // this.barcodeScanner.scan().then(barcodeData => {
    //   //   alert(barcodeData);
    //   //  }).catch(err => {
    //   //      alert(err)
    //   //  });
    // }
    doClearHeader(){
      this.oStatus = 'DATA ENTRY';
     this.listdepart = "";
     this.oDepartment_name = "";
     this.oHanel_no = "";
     this.oReferent_no = "";
     this.oOrder = "";
     this.listengine = "";
     this.oRemark = "";
      // this.oCustomer_Header = "";
      if(this.oOrder !== ''){
        //enable the button
        this.isenabled=true;
        }else{
        //disable the button
        this.isenabled=false;
      }
      this.oType = "N"
    }
   async doDocrefPage(){
      const modal = await this.modalCtrl.create({
        component: DocrefPage,
        componentProps: {'oClient':this.oClient}
      });

      await modal.present();
      const modalData = await modal.onWillDismiss();
      console.log(modalData);
      if(modalData.data == undefined){

      }else{
        this.oReferent_no = modalData.data.reference_no;
        //      //this.oStatus = data.status;
             this.oDepartment_name = modalData.data.description;
             this.listdepart = modalData.data.department;
             this.doClear();
      }

        //     }else{
      // let profileModal = this.modalCtrl.create("DocrefPage",{'oClient':this.oClient});
      //   profileModal.present();
      //   profileModal.onDidDismiss(data =>{
      //     console.log(data);
      //     if(data == undefined){

      //     }else{
      //      //this.oOrder = data.order_no;
      //      this.oReferent_no = data.reference_no;
      //      //this.oStatus = data.status;
      //      this.oDepartment_name = data.description;
      //      this.listdepart = data.department;
      //      this.doClear();
      //     }
      //   });
      
    }
    async presentToast(key, showCloseButton, position: string) {
      const toast = await this.toastCtrl.create({
        message: key,
        // showCloseButton: showCloseButton,
        // closeButtonText: 'Ok',
        duration: 2000,
        //position : position
      });
      toast.present();
    }
    doGetDepartment(oClient){
      this.service.Get_Department(oClient).then((res)=>{
        this.data_depart = res;
        console.log(this.data_depart);
        this.listdepart = this.data_depart["0"].description["0"]
      })
    }
    doGetDepart(depart){
      console.log(depart);
    }
    doGetEngine(){
      this.service.Get_Engine().then((res)=>{
        console.log(res);
        this.data_engine = res;
      })
    }
    doSaveHeader(oClient,listdepart,oHanel_no,oReferent_no,oDate, oRemark, oQty){
      if(oReferent_no == undefined || oReferent_no == ""){
        this.Alert("Error","กรุณาระบุเลขเอกสารอ้างอิง");
      }else if(listdepart == undefined || listdepart == ""){
        this.Alert("Error","กรุณาระบุแผนก");
      }else if(oHanel_no == undefined || oHanel_no == ""){
          this.service.Check_Hanel_Status(this.oReferent_no).then((res)=>{
            console.log(res);
            
            if(res.length > 0){
              this.Alert("Error","ไม่มีสามารถสร้างได้ กรุณายืนยันเอกสารที่เหลืออยู่ก่อน");
            }else{
              if(this.oType == undefined || this.oType == ""){
                this.oType = "N";
              }
              this.service.Confirm_Hanel_master(oClient,listdepart,"",oReferent_no,oDate,this.oUsername,this.oType, oRemark).then((res)=>{
                this.datahanel = res;
                console.log(this.datahanel);
                  if(this.datahanel["0"].sql_status == 0){
                    this.Alert("Message","Success");
                    this.oHanel_no = this.datahanel["0"].out_order
                    this.service.Auto_Hanel_Detail(oClient,this.datahanel["0"].out_order,oReferent_no,this.oUsername, oQty).then((res)=>{
                      console.log(res);
                      if(res["0"].sql_status == 0){
                        this.doGetHanelDetail(oClient,this.oHanel_no)
                        this.Get_Flag_Save(oClient,this.oHanel_no)
                      }
                      
                    })
                  }else{
                    //this.alertCtrl("error",res["0"].sql_status);
                  }
              })
            }
          })
      }else{
            if(this.oType == undefined || this.oType == ""){
              this.oType = "N";
            }
            this.service.Confirm_Hanel_master(oClient,listdepart,oHanel_no,oReferent_no,oDate,this.oUsername,this.oType, oRemark).then((res)=>{
              this.datahanel = res;
              console.log(this.datahanel);
                if(this.datahanel["0"].sql_status == 0){
                  this.Alert("Message","Success");
                  this.oHanel_no = this.datahanel["0"].out_order
                  this.service.Auto_Hanel_Detail(oClient,this.datahanel["0"].out_order,oReferent_no,this.oUsername, oQty).then((res)=>{
                    console.log(res);
                    if(res["0"].sql_status == 0){
                      this.doGetHanelDetail(oClient,this.oHanel_no)
                    }
                    
                  })
                }else{
                  //this.alertCtrl("error",res["0"].sql_status);
                }
            })
          
       
      }
    }
    async doScan() {
      const modal = await this.modalCtrl.create({
        component: ScanmodalPage,
      });
  
      await modal.present();
      const modalData = await modal.onWillDismiss();
     console.log(modalData);
     if(modalData.data != undefined){
      this.oSerial_no = modalData.data
      this.doScanSerial(modalData.data);
     }else{
  
     }
  
    }
    doGetHanelDetail(oClient, oOrder_no){
      this.service.Get_Hanel_detail(oClient,oOrder_no).then((res)=>{
        console.log(res);
        this.data_hanel = res;
        this.oTotal = this.data_hanel.length
    })
    this.Get_Flag_Save(this.oClient, this.oHanel_no);
  }
  Get_Flag_Save(oClient, oOrder_no){
    this.service.Get_Flag_Save(oClient,oOrder_no).then((res)=>{
      console.log(res);
     
      if(res.length == 0){
        this.data_flag = 0;
        this.oTotal_flag = this.data_flag + "/" + this.oTotal;
      }else{
        //var qty1 = this.
        this.data_flag = res.length;
        this.oTotal_flag = this.data_flag + "/" + this.oTotal;
        console.log(this.oTotal_flag);
        
      }
  })
}
    doUpdateHanelDetail(oClient, oHanel_no, oReferent_no, oItem_no, oQty_use, qty_balance, oQty, oLine_no, oDate, oQty_original, oSerial_no){
      console.log("qty",oQty_use);
      console.log("user",oQty_original);
      
      if(oSerial_no == undefined || oSerial_no == ""){
        this.Alert("Error","กรุณาระบุ Serial");
      }else{
        let sum_qty_balance
      if(oQty_use == undefined || oQty_use == NaN || oQty_use == ""){
        sum_qty_balance = oQty_original;
        oQty_use = 0;
      }else{
        sum_qty_balance = parseInt(oQty_original) - parseInt(oQty_use)
        console.log(sum_qty_balance);
        
      }
      setTimeout(() => {
        this.service.Insert_Hanel_Detail(oClient, oHanel_no, oReferent_no, oItem_no, "", "", oQty_use, sum_qty_balance, this.oUsername, oQty, this.oSerial_no, oLine_no, oDate).then((res)=>{
          console.log(res);
          if(res["0"].sql_status == 0){
            this.presentToast('Succes', false, 'bottom');
            this.doGetHanelDetail(oClient, oHanel_no);
            this.doClear();
            // setTimeout(() => {
            //   this.focusInputSerial.setFocus();
            // }, 1000);
          }else{
  
          }
        })
      }, 1000);
    }
    } 
    doReturn(line_no, serial_no,item_no, description, grade, qty, uom, status, qty_use, qty_balance, qty_original){
      console.log(line_no, serial_no,item_no, description, grade, qty, uom, status, qty_use, qty_balance, qty_original);
        this.oLine_no = line_no;
        this.oItem_no = item_no;
        this.oDes = description;
        this.oQty_original = qty_original;
        this.oQty_balance = qty_balance;
        this.oQty = qty;
        this.oSerial_no = serial_no;
        //this.oQty_use = qty_use
      setTimeout(() => {
        this.focusInputQty.setFocus();
      }, 1000);
    }
    doScanSerial(oSerial_no){
      this.service.Seial_Save_Job(this.oClient,this.oHanel_no,oSerial_no,this.oReferent_no).then((res)=>{
        this.data_serial = res
        console.log(this.data_serial);
        if(this.data_serial.length == 0){
          this.Alert("Error","ไม่พบเลข Serial นี้")
        }else{
          this.oLine_no = this.data_serial["0"].line_no;
          this.oItem_no = this.data_serial["0"].item_no;
          this.oDes = this.data_serial["0"].description;
          this.oQty_original = this.data_serial["0"].or_qty;
          this.oQty_balance = this.data_serial["0"].print_unit;
          this.oQty = this.data_serial["0"].qty;
          this.oSerial_no = this.data_serial["0"].serial;
          setTimeout(() => {
            this.focusInputQty.setFocus();
          }, 1000);
        }
      })
    }
    doClickHeader(){
      setTimeout(() => {
        this.focusInputSerial.setFocus();
      }, 1000);
    }
    doClear(){
      this.oLine_no = "";
      this.oItem_no = "";
      this.oDes = "";
      this.oQty_original = "";
      this.oQty_balance = "";
      this.oQty = "";
      this.oSerial_no = "";
      this.oQty_use = "";
      setTimeout(() => {
        this.focusInputSerial.setFocus();
      }, 1000);
    }
     async Alert(title, subTitle){
    let alert = await this.alertCtrl.create({
      header: title,
      message: subTitle,
      buttons: [ {
          text: 'ตกลง',
          handler: data => {

          }
        }]
    });
    alert.present();
  }
  // doGetEngine(){
  //   this.service
  // }
  async doDeleteLine(){
    if(this.oHanel_no == "" || this.oHanel_no == undefined){
      this.Alert("Message","กรุณาระบุเลขเอกสาร");
    }else if(this.oLine_no == "" || this.oLine_no == undefined){
      this.Alert("Message","กรุณาระบุ Line");
    }else{
      let alert = await this.alertCtrl.create({
        header: "Warning",
        message: "คุณต้องการที่จะลบ line นี้ใช่หรือไม่",
        buttons: [ {
            text: 'ยกเลิก',
            handler: data => {
  
            }
          },
          {
            text: 'ตกลง',
            handler: data => {
  
              this.service.Delete_Hanel_Detail(this.oClient,this.oHanel_no,this.oLine_no,this.oUsername).then((res)=>{
                 
                // let alert =  this.alertCtrl.create({
                //   header: "Message",
                //   message: "Success",
                //   buttons: [ {
                //       text: 'ตกลง',
                //       handler: data => {
                        this.doGetHanelDetail(this.oClient, this.oHanel_no)
                        this.Get_Flag_Save(this.oClient, this.oHanel_no);
                        this.doClear();
                        setTimeout(() => {
                          this.focusInputSerial.setFocus();
                        }, 1000);
                //       }
                //     }]
                // });
                //alert.present();
             
              }).catch(()=>{
                this.Alert("Error","Cannot Delete Line");
              })

            }
          }]
      });
      alert.present();
    }
  }
  }