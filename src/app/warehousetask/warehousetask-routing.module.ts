import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarehousetaskPage } from './warehousetask.page';

const routes: Routes = [
  {
    path: '',
    component: WarehousetaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehousetaskPageRoutingModule {}
