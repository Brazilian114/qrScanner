import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from "xml2js"
import { Storage } from '@ionic/storage';
// import { Observable } from 'rxjs/Observable';
// import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public hostWebService: string;
  public WebServiceUploadPic: string;
  url: string;
  unitsInfo
  constructor(public storage:Storage,public http:HttpClient) {
    this.storage.get('_url').then((res) => {
      this.url = res;
      this.hostWebService = "https://" + this.url + "/RF-Service_Yasub/RFService.asmx";
      // this.hostWebService = "http://58.137.91.7/RF-Service_Yasub/RFService.asmx";
   })
   }

  get_client(User) {
    let parameters = 'User=' + User;
    return this.http.get(this.hostWebService + "/Get_Client?" + parameters,{ responseType: 'text' })
       .toPromise()
       .then(response => {
          //console.log(response);
          
           let a;
          xml2js.parseString(response, { explicitArray: true }, function (err, result) {
             a = result;
             //console.log(result);
             
          });
          try {
             // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
             return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
             // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
          }
          catch (e) {
             return [];
          }
       }
       );
 }
 get_login(Username, Password) {
  let parameters = 'oUsername=' + Username + '&oPassword=' + Password;
  return this.http.get(this.hostWebService + "/Check_Login?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        let a;
        xml2js.parseString(response, function (err, result) {
           a = result;
        });
        try {
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
        }
        catch (e) {
           return [];
        }
     }
     );
}
get_WarehouseByUser(user) {
  let parameters = 'user=' + user;
  return this.http.get(this.hostWebService + "/Get_WarehouseByUser?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Get_User(oClient) {
  let parameters = 'oClient=' + oClient;
  return this.http.get(this.hostWebService + "/Get_User?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Get_Hanel_master() {
      
  return this.http.get(this.hostWebService + "/Get_Hanel_Master",{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Get_Tranfer_Order() {
  
  return this.http.get(this.hostWebService + "/Get_Tranfer_Order",{ responseType: 'text' })
     .toPromise()
     .then(response => {
       // console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
 Get_Tranfer_Order_Ref(oWarehouse, oZone) {
  let parameter = 'oWarehouse=' + oWarehouse + '&oZone=' + oZone;
  return this.http.get(this.hostWebService + "/Get_Tranfer_Order_Ref?" + parameter,{ responseType: 'text' })
     .toPromise()
     .then(response => {
       // console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Close_Hanel_Master(oClient, oHanel_no, oUsername) {
  let parameters = 'oClient=' + oClient + '&oHanel_no=' + oHanel_no + '&oUser=' + oUsername;
  return this.http.get(this.hostWebService + "/Close_Hanel_Master?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Confirm_Tranfer_order(oOrder_no) {
  let parameters = 'oOrder_no=' + oOrder_no;
  return this.http.get(this.hostWebService + "/Confirm_Tranfer_order?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Get_Serail_number_detail(oOrder_no, oSerial) {
  let parameters = 'oOrder_no=' + oOrder_no + '&oSerial=' + oSerial;
  return this.http.get(this.hostWebService + "/Get_Serail_number_detail?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
      //  console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
  Get_Zone_Detail(oWarehouse) {
  let parameters = 'oWarehouse=' + oWarehouse;
  return this.http.get(this.hostWebService + "/Get_Zone?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
       // console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Get_Hanel_Ref(oClient) {
  let parameters = 'oClient=' + oClient;
  return this.http.get(this.hostWebService + "/Get_Hanel_Ref?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Get_Hanel_Master() {
  return this.http.get(this.hostWebService + "/Get_Hanel_Master",{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Get_Hanel_Order_Ref(oWarehouse, oZone) {
  let parameters = 'oWarehouse=' + oWarehouse + '&oZone=' + oZone;
  return this.http.get(this.hostWebService + "/Get_Hanel_Order_Ref?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Get_Hanel_Order() {
  
  return this.http.get(this.hostWebService + "/Get_Hanel_Order",{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Get_Department(oClient) {
  let parameters ='oClient=' + oClient;
  return this.http.get(this.hostWebService + "/Get_Department?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Get_Warehouse_Detail(oUser) {
  let parameters = 'oUser=' + oUser;
  return this.http.get(this.hostWebService + "/Get_Warehouse_Detail?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Confirm_Hanel_master(oClient, oDepartment, oOrder_no, oReference, oOrderDate, oMaker, oSave_Type, oRemark) {
  let parameters = 'oClient=' + oClient + '&oDepartment=' + oDepartment+ '&oOrder_no=' + oOrder_no
  + '&oReference=' + oReference+ '&oOrderDate=' + oOrderDate+ '&oMaker=' + oMaker+ '&oSave_Type=' + oSave_Type+ '&oRemark=' + oRemark;
  return this.http.get(this.hostWebService + "/Confirm_Hanel_master?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Auto_Hanel_Detail(oClient, oHanel_no, oTranfer_no, oUser, oQty) {
  let parameters = 'oClient=' + oClient + '&oHanel_no=' + oHanel_no+ '&oTranfer_no=' + oTranfer_no+ '&oQty=' + oQty
  + '&oUser=' + oUser;
  return this.http.get(this.hostWebService + "/Auto_Hanel_Detail?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Get_Hanel_detail(oClient, oOrder_no) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oWarehouse=' + "";
  return this.http.get(this.hostWebService + "/Get_Hanel_detail?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Check_Hanel_Status(oOrder_no) {
  let parameters = 'oOrder_no=' + oOrder_no;
  return this.http.get(this.hostWebService + "/Check_Hanel_Status?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Insert_Hanel_Detail(oClient, oOrder_no, oReferent_no, oItem_no, oSize_x, oEngine, oQty_use, qty_balance, oMaker, oQty,  oSerial_no, oLine_no, oRef_date){
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oReferent_no=' + oReferent_no
  + '&oItem_no=' + oItem_no+ '&oSize_x=' + oSize_x+ '&oEngine=' + oEngine+ '&oQty_use=' + oQty_use+ '&oQty_balance=' + qty_balance
  + '&oMaker=' + oMaker+ '&oQty=' + oQty+ '&oSerial_no=' + oSerial_no+ '&oLine_no=' + oLine_no+ '&oRef_date=' + oRef_date;
  return this.http.get(this.hostWebService + "/Insert_Hanel_Detail?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Insert_Keein_Gr_Loc_From(oClient, oOrder_no, oReference, oStatus, oMaker, oOrderDate, oZone_from, oWarehouse) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oReference=' + oReference
  + '&oStatus=' + oStatus+ '&oMaker=' + oMaker+ '&oOrderDate=' + oOrderDate+ '&oZone_from=' + oZone_from
  + '&oWarehouse=' + oWarehouse;
  return this.http.get(this.hostWebService + "/Insert_Keein_Gr_Loc_From?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Transfer_Order_Stock_Available_Check(oClient, oOrder_no, oUser) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oUser=' + oUser;
  return this.http.get(this.hostWebService + "/Transfer_Order_Stock_Available_Check?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Release_Transfer_Order(oClient, oOrder_no, oUser) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oUser=' + oUser;
  return this.http.get(this.hostWebService + "/Release_Transfer_Order?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Manual_Pick_Transfer_Order(oClient, oOrder_no, oPriority, oUser) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oPriority=' + oPriority+ '&oUser=' + oUser;
  return this.http.get(this.hostWebService + "/Manual_Pick_Transfer_Order?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Assign_Whse_Task_Manual(oClient, oOrder_no, oMovement, oUser) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oMovement=' + oMovement+ '&oUser=' + oUser;
  return this.http.get(this.hostWebService + "/Assign_Whse_Task_Manual?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Outstanding_Tasks_Get_Chabaa(oClient, oOrder_no, oOrder_type, oWarehouse, oUser) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oOrder_type=' 
  + oOrder_type+ '&oWarehouse=' + oWarehouse+ '&oMaker=' + oUser;
  return this.http.get(this.hostWebService + "/Outstanding_Tasks_Get_Chabaa?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Get_Zone_By_Order(oClient, oOrder_no) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no
  return this.http.get(this.hostWebService + "/Get_Zone_By_Order?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Get_Warehouse_By_Order(oClient, oOrder_no) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no
  return this.http.get(this.hostWebService + "/Get_Warehouse_By_Order?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Get_Engine() {
  return this.http.get(this.hostWebService + "/Get_Engine",{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Delete_Hanel_Detail(oClient, oOrder_no, oLine_no, oMaker) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oLine_no=' + oLine_no+ '&oMaker=' + oMaker
  return this.http.get(this.hostWebService + "/Delete_Hanel_Detail?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Get_Flag_Save(oClient, oOrder_no) {
  let parameters = 'oClient=' + oClient + '&oOrder=' + oOrder_no
  return this.http.get(this.hostWebService + "/Get_Flag_Save?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Seial_Save_Job(oClient, oOrder_no, oSerial, oRef_no) {
  let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oSerial=' + oSerial + '&oRef=' + oRef_no
  return this.http.get(this.hostWebService + "/Seial_Save_Job?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
} 

Outstanding_Serial_hh(oClient, oSerial, oItem_no) {
  let parameters = 'oClient=' + oClient + '&oSerial=' + oSerial+ '&oItem_no=' + oItem_no
  return this.http.get(this.hostWebService + "/Outstanding_Serial_hh?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {

        //console.log(response);
        
        let a;
        xml2js.parseString(response, { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Check_Pallet_Location(oPallet, oWarehouse, oLocation, oType) {
  let parameters = 'oPallet=' + oPallet + '&oWarehouse=' + oWarehouse+ '&oLocation=' + oLocation+ '&oType=' + oType
  return this.http.get(this.hostWebService + "/Check_Pallet_In_Location?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {

        //console.log(response);
        
        let a;
        xml2js.parseString(response , { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Close_Putaway_Task_New(oWork, oTask, oActivity, oReason_code, oRemark, oLocation_des, oMaker, oSerial_no) {
  let parameters = 'oWork=' + oWork + '&oTask=' + oTask+ '&oActivity=' + oActivity+ '&oReason_code=' + oReason_code
  + '&oRemark=' + oRemark+ '&oLocation_des=' + oLocation_des+ '&oMaker=' + oMaker+ '&oSerial_number=' + oSerial_no
  return this.http.get(this.hostWebService + "/Close_Putaway_Task_New?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {

        //console.log(response);
        
        let a;
        xml2js.parseString(response , { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}

Close_Pick_Task(oWork, oTask, oActivity, oQty_pick, oReason_code, oRemark, oMaker, oLocation) {
  let parameters = 'oWork=' + oWork + '&oTask=' + oTask+ '&oActivity=' + oActivity+ '&oQty_pick=' + oQty_pick
  + '&oReason_code=' + oReason_code+ '&oRemark=' + oRemark+ '&oMaker=' + oMaker+ '&oLocation=' + oLocation
  return this.http.get(this.hostWebService + "/Close_Pick_Task?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {

        //console.log(response);
        
        let a;
        xml2js.parseString(response , { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Get_Type_Order(oOrder_no) {
  let parameters = 'oOrder_no=' + oOrder_no;
  return this.http.get(this.hostWebService + "/Get_Type_Order?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {
        //console.log(response);
        
        let a;
        xml2js.parseString(response , { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
} 
Check_Serial_Number(oWork, oSerial, oPallet, oItem) {
  let parameters = 'oWork=' + oWork + '&oSerial=' + oSerial+ '&oPallet=' + oPallet+ '&oItem=' + oItem
  return this.http.get(this.hostWebService + "/Check_Serial_Number?" + parameters,{ responseType: 'text' })
     .toPromise()
     .then(response => {

        //console.log(response);
        
        let a;
        xml2js.parseString(response , { explicitArray: true }, function (err, result) {
           a = result;
        });
        try {
           // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
           return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
           // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
        }
        catch (e) {
           return [];
        }
     }
     );
}
Delete_Transfer_Order_Detail(oClient, oOrder_no, oLine_no, oMaker) {
   let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no+ '&oLine_no=' + oLine_no+ '&oMaker=' + oMaker
   return this.http.get(this.hostWebService + "/Delete_Transfer_Order_Detail?" + parameters,{ responseType: 'text' })
      .toPromise()
      .then(response => {
 
         //console.log(response);
         
         let a;
         xml2js.parseString(response , { explicitArray: true }, function (err, result) {
            a = result;
         });
         try {
            // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
         }
         catch (e) {
            return [];
         }
      }
      );
 }
 Show_TZ_HM(oClient, oOrder_no) {
   let parameters = 'oClient=' + oClient + '&oOrder_no=' + oOrder_no
   return this.http.get(this.hostWebService + "/Show_TZ_HM?" + parameters,{ responseType: 'text' })
      .toPromise()
      .then(response => {
 
         //console.log(response);
         
         let a;
         xml2js.parseString(response , { explicitArray: true }, function (err, result) {
            a = result;
         });
         try {
            // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
            return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
            // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
         }
         catch (e) {
            return [];
         }
      }
      );
 }
 get_Grade() {
   // let parameters='oClient='+oClient+'&oItemNo='+oItemNo;
   return this.http.get(this.hostWebService +"/Get_Grade?",{ responseType: 'text' })
     .toPromise()
     .then(response =>
        {
           let a;
           xml2js.parseString(response,{explicitArray:true},function (err,result) {
           a = result;
        });
           try {
               // return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table["0"];
               return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table
               // return a.DataTable["diffgr:diffgram"].NewDataSet.Table;
           }
           catch (e) {
             return [];
           }
        }
     );
 }
}
