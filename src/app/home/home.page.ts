import { Component } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ModalAddElementPage } from '../modals/modal-add-element/modal-add-element.page';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items = [];

  constructor(public modalController: ModalController, public loadingController: LoadingController, public fireBaseService: FirebaseService) {

  }

  ngOnInit() {
    this.getItemsData();

  }

  async presentModal(itemData?) {
    const modal = await this.modalController.create({
      component: ModalAddElementPage,
      componentProps: itemData,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss().then((data) => {
      this.getItemsData()
    });
    return await modal.present();
  }


  getItemsData() {
    this.presentLoading()
    this.fireBaseService.getItemsData()
      .then(
        res => {
          this.items = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
          this.dismissLoading();
          console.log(this.items);
        },
        err => {
          this.dismissLoading();
          console.log(err)
        }
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
  }

}
