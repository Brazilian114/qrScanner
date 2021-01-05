import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanmodalPage } from './scanmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ScanmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanmodalPageRoutingModule {}
