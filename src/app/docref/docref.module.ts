import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocrefPageRoutingModule } from './docref-routing.module';

import { DocrefPage } from './docref.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocrefPageRoutingModule
  ],
  declarations: [DocrefPage]
})
export class DocrefPageModule {}
