import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Item } from '../../models/Item';
import { CurrencyPipe } from '@angular/common';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-element',
  templateUrl: './modal-add-element.page.html',
  styleUrls: ['./modal-add-element.page.scss'],
})
export class ModalAddElementPage implements OnInit {
  itemForm: FormGroup;
  formTitle: String = 'Add item to stock:'

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    public loadingController: LoadingController,
    private currencyPipe: CurrencyPipe,
    public navParams: NavParams,
    public modalController: ModalController,
    private fb: FormBuilder) { }

  ngOnInit() {
    // const itemParams = this.navParams.get('id') ? this.navParams.data : null
    // console.log(itemParams)
    this.itemForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(300)
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required,
        this.ValidateMinMax
      ])),
      stock: new FormControl('', Validators.compose([
        // Validators.,
        this.ValidateStock,
        Validators.required
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(300)
      ])),
    });

    this.itemForm.valueChanges.subscribe(form => {
      if (form.price != null) {
        this.itemForm.patchValue({
          price: this.currencyPipe.transform(form.price.replace(/\D/g, '').replace(/^0+/, ''), "USD", "symbol", "1.0-0")
        }, { emitEvent: false })
      }
    })
  }


  addItem(item: Item) {
    item.price = item.price.replace(/\$/g, '')
    this.presentLoading();
    this.firebaseAuthService.setItemData(item)
      .then(
        res => { this.dismissLoading(); console.log(res) },
        err => { console.log(err) }
      )
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
  }

  dismissLoading() {
    this.loadingController.dismiss();
    this.modalController.dismiss()
  }


  /**
   * currency validator
   */

  ValidateMinMax(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value ? control.value.replace(/\D/g, '').replace(/^0+/, '') : control.value;
    if (value <= 0 || value >= 245000 || value == null) {
      return { 'currencyMinMax': true };
    }
    return null;
  }
  ValidateStock(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value
    // ? control.value.replace(/\D/g,'').replace(/^0+/,''): control.value;
    if (value > 30 || value == null) {
      return { 'stockMax': true };
    }
    return null;
  }

}
