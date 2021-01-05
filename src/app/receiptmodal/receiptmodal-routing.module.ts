import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiptmodalPage } from './receiptmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptmodalPageRoutingModule {}
