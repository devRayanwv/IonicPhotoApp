import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, ToastController} from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import {Storage} from "@ionic/storage";
import {Photos} from "../../providers/photos/photos";
import {Photo} from "../../models/photo";

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  allPhotos: Photo[];

  isenabled = false;
  isLoading = false;
  display = 10;
  photoList: Photo[] = [];

  constructor(public navCtrl: NavController,
              public items: Items,
              public modalCtrl: ModalController,
              private storage: Storage,
              private photos: Photos,
              ) {
    this.currentItems = this.items.query();

    if(!this.allPhotos){
      this.getTenPhotos();

    }

    storage.get('loggedIn').then((value) => {
      if(value == 'yes') {
        this.isenabled = false;
      } else {
        this.isenabled = true;
      }
    })
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(photo => {
      if (photo) {
        console.log(photo);
        this.photoList.push(photo);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openPhoto(photo: Photo) {
    this.navCtrl.push('ItemDetailPage', {
      photo: photo
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Loading more photos begin');

    setTimeout(() => {
      this.getTenPhotos();

      console.log('Loading photos ended');
      infiniteScroll.complete();
    }, 500);
  }

  getTenPhotos() {
    console.log(this.photoList);
    console.log(this.photoList.length);
    if (!this.photoList) {
      for(let i = 1; i <= 10; i++) {
        this.photos.getPhoto(i.toString()).subscribe((res:Photo) => {
          console.log(res);
          this.photoList.push(res);

        })
      }
    } else {
      for(let i = this.display+1; i <= this.display+11; i++) {
        this.photos.getPhoto(i.toString()).subscribe((res:Photo) => {
          this.photoList.push(res);
        })
      }
    }


  }
}
