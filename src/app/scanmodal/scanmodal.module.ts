import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanmodalPageRoutingModule } from './scanmodal-routing.module';

import { ScanmodalPage } from './scanmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanmodalPageRoutingModule
  ],
  declarations: [ScanmodalPage]
})
export class ScanmodalPageModule {}
