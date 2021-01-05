import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsabillityPageRoutingModule } from './usabillity-routing.module';

import { UsabillityPage } from './usabillity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsabillityPageRoutingModule
  ],
  declarations: [UsabillityPage]
})
export class UsabillityPageModule {}
