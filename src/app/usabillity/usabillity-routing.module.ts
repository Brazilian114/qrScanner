import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsabillityPage } from './usabillity.page';

const routes: Routes = [
  {
    path: '',
    component: UsabillityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsabillityPageRoutingModule {}
