import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemnomodalPage } from './itemnomodal.page';

const routes: Routes = [
  {
    path: '',
    component: ItemnomodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemnomodalPageRoutingModule {}
