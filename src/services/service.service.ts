import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from "xml2js"
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
  constructor(public http:HttpClient) { }

  get_client(User) {
    let parameters = 'User=' + User;
    return this.http.get("http://58.137.91.7/RF-Service_Yasub/RFService.asmx/Get_Client?User=ANON")
       .toPromise()
       .then(response => {
          console.log(response);
          
           let a;
          xml2js.parseString(response, { explicitArray: true }, function (err, result) {
             a = result;
             console.log(result);
             
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
 public getStudent(id){
  return new Promise(resolve => {
    this.http.get('http://58.137.91.7/RF-Service_Yasub/RFService.asmx/Get_Client?User=ANON')
      .subscribe(data => {
         this.unitsInfo = data.toString()
         resolve(this.unitsInfo);
      });
})
 }
get_client2(){
  
return new Promise(resolve => {
  this.http.get('http://58.137.91.7/RF-Service_Yasub/RFService.asmx/Get_Client?User=ANON')
    .subscribe((data: any) => {
      resolve(data.Data);
      console.log(data);
      
    }, error => {
      resolve(error);
      console.log(error);
    });
});
}

}
