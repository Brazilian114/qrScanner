import { Component, OnInit ,ViewChild} from '@angular/core';
import { NavController, LoadingController,ToastController, ModalController, Platform, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServiceService } from 'src/services/service.service';
import { DocrefPage } from '../docref/docref.page';
import { ReceiptmodalPage } from '../receiptmodal/receiptmodal.page';


@Component({
  selector: 'app-factory',
  templateUrl: './factory.page.html',
  styleUrls: ['./factory.page.scss'],
})
export class FactoryPage implements OnInit {
  @ViewChild('focusInputQty') focusInputQty;
  @ViewChild('focusInputSerial') focusInputSerial;
  oStatus:any = "DATA ENTRY";
  oDate:any = new Date().toISOString();
  isenabled:boolean = false;
  enabled:boolean = false;
  Check : string = 'Header';
  oOrder:any;
  oReference_no:any;
  oClient:any;
  listZone:any;
  oZone:any;
  listWarehouse:any;
  oWarehouse:any;
  oUsername:any;
  oDocRef:any;
  oCustomer_Header:any;
  data_task_detail:any;
  oSerial_no:any;
  oTask_no:any;
  oItem:any;
  oDes:any;
  oWarehouse2:any;
  oZone2:any;
  oLocation_from:any;
  oLocation_to:any;
  oQty_balance:any;
  oQty:any;
  oTranfer_no:any;
  oGrade:any;
  oWork:any;
  isdisabledwh:boolean = true;
  isdisabledzone:boolean = true;
  oLine:any;
  listGrade:any;
  constructor(public navCtrl: NavController, private service: ServiceService, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private storage: Storage, public platform: Platform, private alertCtrl: AlertController) { 
      this.storage.get('_user').then((res)=>{
        this.oUsername = res;
        console.log(this.oUsername);
        this.getWarehouse(this.oUsername)
        this.getZone("");
      })
      this.storage.get('_client').then((res)=>{
        this.oClient = res;
        console.log(this.oClient);
        //this.doGetDepartment(this.oClient)
      })
    }

  ngOnInit() {
  }
  getZone(oWarehouse){
    this.service.Get_Zone_Detail(oWarehouse).then((res)=>{
      this.listZone = res;
      console.log(this.listZone)
    })
  }
  getWarehouse(oUser){
    this.service.Get_Warehouse_Detail(oUser).then((res)=>{
      this.listWarehouse =  res;
      console.log(this.listWarehouse);
      
    })
  }
  // doDocrefPage(){

  //   let profileModal = this.modalCtrl.create("DocrefPage",{'oClient':this.oClient,"flag":"2"});
  //     profileModal.present();
  //     profileModal.onDidDismiss(data =>{
  //       console.log(data);
  //       if(data == undefined){

  //       }else{
  //         this.oDocRef = data.order_no;
  //         //this.oStatus = data.status;
  //         this.oOrder = "";
  //         this.oZone = data.oZone;
  //         this.oWarehouse = data.oWh
  //         this.doClearDetail();
  //         this.getWarehouse(this.oUsername)
  //         this.getZone("");
  //         this.isdisabledwh = false;
  //         this.isdisabledzone = false;
  //        //this.oOrder = data.order_no;
  //       //  this.oReferent_no = data.order_no;
  //       //  this.oStatus = data.status;
  //       //  this.oDepartment_name = data.description;
  //       //  this.listdepart = data.department;
  //       }
  //     });
  // }
  async doDocrefPage(){
    const modal = await this.modalCtrl.create({
      component: DocrefPage,
      componentProps: {'oClient':this.oClient,"flag":"2"}
    });

    await modal.present();
    const modalData = await modal.onWillDismiss();
    console.log(modalData);
    if(modalData == undefined){

    }else{
      this.oDocRef = modalData.data.order_no;
  //         //this.oStatus = data.status;
          this.oOrder = "";
          this.oZone = modalData.data.oZone;
          this.oWarehouse = modalData.data.oWh
          this.doClearDetail();
          this.getWarehouse(this.oUsername)
          this.getZone("");
          this.isdisabledwh = false;
          this.isdisabledzone = false;
    }

  }
  async doGetReceipt(){

    // let profileModal = this.modalCtrl.create("RecipesmodalPage",{'oClient':this.oClient,"oFlag":"2"});
    //   profileModal.present();
    //   profileModal.onDidDismiss(data =>{
    //     console.log(data);
    const modal = await this.modalCtrl.create({
      component: ReceiptmodalPage,
      componentProps : {'oClient':this.oClient,"oFlag":"2"}
    });

    await modal.present();
    const modalData = await modal.onWillDismiss();
   console.log(modalData);
        if(modalData == undefined){

        }else{
          this.oDocRef = modalData.data.ref_no;
          this.oOrder = modalData.data.order_no;
          this.oStatus = modalData.data.status;
          this.doGetTaskOrder(this.oClient,this.oOrder);
          this.doGetZone(this.oClient,this.oOrder);
          this.doGetWarehouse(this.oClient, this.oOrder);
          this.doClearDetail();
          this.getZone("");
        //  this.listdepart = data.department_code
        //  this.oHanel_no = data.order_no;
        //  this.oStatus = data.status;
        //  this.oDepartment = data.department_code;
        //  this.oDepartment_name = data.description;
        //  this.oReferent_no = data.reference_no
        //  this.doGetHanelDetail(this.oClient, this.oHanel_no)
        }
      // });
  }
  doClearHeader(){
    this.oOrder = "";
    this.oDocRef = "";
    this.oWarehouse = "";
    this.oZone = "";
    this.oCustomer_Header = "";
    this.oStatus = "DATA ENTRY";
    this.getWarehouse(this.oUsername)
    this.getZone("");
    this.oWork = "";
    this.isdisabledwh = true;
    this.isdisabledzone = true;
  }
  doClearDetail(){
    this.oTask_no = "";
    this.oSerial_no = "";
    this.oItem = "";
    //this.oZone = "";
    this.oWarehouse2 = "";
    //this.oWarehouse = "";
    this.oZone2 = "";
    this.oLocation_from = "";
    this.oLocation_to = "";
    this.oQty = "";
    this.oQty_balance = "";
    this.oDes = "";
    this.oLine = "";
  }
  doGetZone(oClient, oOrder){
    this.service.Get_Zone_By_Order(oClient, oOrder).then((res)=>{
      console.log(res);
        this.listZone = res;
        this.oZone = res["0"].Zone["0"]
    })
  }

   doGetWarehouse(oClient, oOrder){
    this.service.Get_Warehouse_By_Order(oClient, oOrder).then((res)=>{
      console.log(res);
        //this.listWarehouse = res;
        this.oWarehouse = res["0"].Warehouse["0"]
    })
  }
  // doGetTaskOrder(oClient, oOrder_no,oWarehouse){
  //   this.service.Outstanding_Tasks_Get_Chabaa(oClient,oOrder_no,"TZ",oWarehouse,this.oUsername).then((res)=>{
  //   this.data_task_detail = res;
  //     console.log(this.data_task_detail);
  //     this.oWork = this.data_task_detail["0"].works_order["0"];
  //   })
  // }
  doGetTaskOrder(oClient, oOrder_no){
    this.service.Show_TZ_HM(oClient,oOrder_no).then((res)=>{
    this.data_task_detail = res;
      console.log(this.data_task_detail);
      this.oWork = this.data_task_detail["0"].works_order["0"];
    })
  }
  doReturn(task_no, serial_no, item_no, description, grade, warehouse, location_form, location_to, ppq_qty, print_unit, area_from,line_no){
    console.log(task_no, serial_no, item_no, description, grade, warehouse, location_form, location_to, ppq_qty, print_unit,line_no);
    this.oTask_no = task_no;
    this.oLine = line_no;
    this.oSerial_no = serial_no;
    this.oItem = item_no;
    this.oDes = description;
    this.oWarehouse2 = warehouse;
    this.oLocation_from = location_form;
    this.oLocation_to = location_to;
    this.oQty_balance = print_unit;
    this.oQty = ppq_qty;
    this.oZone2 = area_from;
    this.oGrade = grade;
    // setTimeout(() => {
    //   this.focusInputQty.setFocus();
    // }, 1000);
  }
  doConfirmHeader(oClient, oOrder, oDate, oDocref, oStatus, oWarehouse, oZone){
    console.log(oClient, oOrder, oDate, oDocref, oStatus, oWarehouse, oZone);
    
    if(oDocref == undefined || oDocref == ""){
      this.Alert("Error","กรุณาระบุเลข Doc Ref")
    }else if(oWarehouse == undefined || oWarehouse == ""){
      this.Alert("Error","กรุณาระบุ Warehouse")
    }else if(oZone == undefined || oZone == ""){
      this.Alert("Error","กรุณาระบุ Zone")
    }else{
      if(this.oOrder == undefined){
        this.oOrder = "";
      }
      // this.service.Insert_Keein_Gr_Loc_From(this.oClient,this.oOrder,this.oDocRef,"DATA ENTRY",this.oUsername,this.oDate,this.oZone,this.oWarehouse).then((res)=>{
      //   console.log(res);
        // if(res["0"].sql_status == 0){
        //   this.oOrder = res["0"].order_no["0"]
          this.service.Transfer_Order_Stock_Available_Check(this.oClient,this.oOrder,this.oUsername).then((res)=>{
            console.log(res);
            if(res.length > 0){
              console.log(res);
            }else{
              this.service.Release_Transfer_Order(this.oClient,this.oOrder,this.oUsername).then((res)=>{
                console.log(res);
                if(res["0"].sqlstatus != 0 && res["0"].sqlstatus == "-31"){
                  this.Alert("Error",res["0"].sqlmsg)
                }else{
                  this.service.Manual_Pick_Transfer_Order(this.oClient,this.oOrder,"",this.oUsername).then((res)=>{
                    console.log(res);
                    if(res.length <= 0){
                      this.Alert("Error",res["0"].sqlmsg)
                    }else{
                      this.oStatus = res["0"].status["0"];
                      this.service.Assign_Whse_Task_Manual(this.oClient, this.oOrder,"TZ",this.oUsername).then((res)=>{
                        console.log(res);
                        if(res.length == 0){
                          this.Alert("Error",res["0"].sqlmsg)
                        }else{
                          this.Alert("Success","success")
                          this.doGetTaskOrder(oClient, this.oOrder)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        // }else{
        //   console.log("Error");
        //   this.Alert("Error",res["0"].sql_message)
        //  // console.log(res);
        // }
      // })
    }
  }
  
  doSaveHeader(oClient, oOrder, oDate, oDocref, oStatus, oWarehouse, oZone){
    console.log(oClient, oOrder, oDate, oDocref, oStatus, oWarehouse, oZone);
    
    if(oDocref == undefined || oDocref == ""){
      this.Alert("Error","กรุณาระบุเลข Doc Ref")
    }else if(oWarehouse == undefined || oWarehouse == ""){
      this.Alert("Error","กรุณาระบุ Warehouse")
    }else if(oZone == undefined || oZone == ""){
      this.Alert("Error","กรุณาระบุ Zone")
    }else{
      if(this.oOrder == undefined){
        this.oOrder = "";
      }
      this.service.Insert_Keein_Gr_Loc_From(this.oClient,this.oOrder,this.oDocRef,"DATA ENTRY",this.oUsername,this.oDate,this.oZone,this.oWarehouse).then((res)=>{
        console.log(res);
        if(res["0"].sql_status == 0){
          this.oOrder = res["0"].order_no["0"];
          this.Alert("Success","success")
          this.doGetTaskOrder(oClient, this.oOrder)
        }else{
          console.log("Error");
          this.Alert("Error",res["0"].sql_message)
         // console.log(res);
        }
      })
    }
  }
  async doDeleteLine(){
    if(this.oOrder == "" || this.oOrder == undefined){
      this.Alert("Message","กรุณาระบุเลขเอกสาร");
    }else if(this.oLine == "" || this.oLine == undefined){
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
  
              this.service.Delete_Transfer_Order_Detail(this.oClient,this.oOrder,this.oLine,this.oUsername).then((res)=>{
                console.log(res);
                if(res[0].sqlstatus != 0){
                  this.Alert("Error",res["0"].sqlmsg);
                }else{
                  // let alert =  this.alertCtrl.create({
                  //   header: "Message",
                  //   message: "Success",
                  //   buttons: [ {
                  //       text: 'ตกลง',
                  //       handler: data => {
                          // this.doGetHanelDetail(this.oClient, this.oHanel_no)
                          this.doGetTaskOrder(this.oClient, this.oOrder)
                          // this.doClear();
                          setTimeout(() => {
                            this.focusInputSerial.setFocus();
                          }, 1000);
                  //       }
                  //     }]
                  // });
                  //alert.present();
                }
  
             
              }).catch(()=>{
                this.Alert("Error","Cannot Delete Line");
              })

            }
          }]
      });
      alert.present();
    }
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
}
