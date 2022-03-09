import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddElementPageRoutingModule } from './modal-add-element-routing.module';

import { ModalAddElementPage } from './modal-add-element.page';

import {IonicCurrencyMaskModule} from "@thiagoprz/ionic-currency-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    // CurrencyPipe,
    IonicCurrencyMaskModule,
    ModalAddElementPageRoutingModule,
  ],
  declarations: [ModalAddElementPage],
  providers: [CurrencyPipe],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalAddElementPageModule { }
