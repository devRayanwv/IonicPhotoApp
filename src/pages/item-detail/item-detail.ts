import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

import {Photos} from "../../providers/photos/photos";
import {CommentModel} from "../../models/commentModel";
import {Storage} from "@ionic/storage";
import {AddCommentPage} from "../add-comment/add-comment";

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  photo: any;
  comments: CommentModel[];
  isLoading = true;
  isenabled = true;
  constructor(public navCtrl: NavController,
              navParams: NavParams,
              photos: Photos,
              public modalCtrl: ModalController,
              private storage: Storage) {
    this.photo = navParams.get('photo');

    photos.getComments(this.photo.id).subscribe((res) => {
      this.comments = res;
      console.log(this.comments);
      this.isLoading = false;
    });

    storage.get('loggedIn').then((value) => {
      if(value == 'yes') {
        this.isenabled = false;
      } else {
        this.isenabled = true;
      }
    })
  }

  addComment() {
    let addModal = this.modalCtrl.create('AddCommentPage');
    addModal.onDidDismiss(comment => {
      if (comment) {
        console.log(comment);
        this.comments.push(comment);
      }
    })
    addModal.present();
  }
}
