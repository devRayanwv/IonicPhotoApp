import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {WelcomePage} from "../welcome/welcome";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  loggedin = false;
  isenabled = false;
  showSpinner = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private storage: Storage)
  {

    storage.get('loggedIn').then((val) => {
      if(val == 'yes') {
        this.isenabled = false;
        this.loggedin = true;
      } else {
        this.isenabled = true;
        this.loggedin = false;
      }
    });
  }

  logout() {
    this.isenabled = true;
    this.loggedin = false;

    this.storage.remove('loggedIn');

    this.navCtrl.push(WelcomePage);
    let toast = this.toastCtrl.create({
      message: "Logged out successfully",
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}
