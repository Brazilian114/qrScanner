import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocrefPage } from './docref.page';

const routes: Routes = [
  {
    path: '',
    component: DocrefPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocrefPageRoutingModule {}
