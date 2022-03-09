import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  FormGroup, FormBuilder, Validators, FormControl ,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // FormBuilder,
    // FormGroup,
    // Validators,
    // FormControl,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
