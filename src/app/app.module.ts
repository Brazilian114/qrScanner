import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceService } from 'src/services/service.service';
import { HttpClientModule } from  '@angular/common/http';
import { SettingPage } from './setting/setting.page';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    SettingPage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
