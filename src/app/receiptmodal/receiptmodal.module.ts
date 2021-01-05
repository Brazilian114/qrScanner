import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiptmodalPageRoutingModule } from './receiptmodal-routing.module';

import { ReceiptmodalPage } from './receiptmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiptmodalPageRoutingModule
  ],
  declarations: [ReceiptmodalPage]
})
export class ReceiptmodalPageModule {}
