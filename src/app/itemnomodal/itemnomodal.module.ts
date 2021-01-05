import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemnomodalPageRoutingModule } from './itemnomodal-routing.module';

import { ItemnomodalPage } from './itemnomodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemnomodalPageRoutingModule
  ],
  declarations: [ItemnomodalPage]
})
export class ItemnomodalPageModule {}
