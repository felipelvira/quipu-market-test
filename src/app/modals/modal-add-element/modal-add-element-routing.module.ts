import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddElementPage } from './modal-add-element.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddElementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddElementPageRoutingModule {}
