import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy,NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatePipe } from '@angular/common'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceService } from 'src/services/service.service';
import { HttpClientModule } from  '@angular/common/http';
import { SettingPage } from './setting/setting.page';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { ReceiptmodalPage } from './receiptmodal/receiptmodal.page';
import { DocrefPage } from './docref/docref.page';
import { ScanmodalPage } from './scanmodal/scanmodal.page';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    SettingPage,
    Network,
    ReceiptmodalPage,
    NavParams,
    DocrefPage,
    DatePipe,
    ScanmodalPage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
