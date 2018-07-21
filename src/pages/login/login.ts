import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'Sincere@april.biz',
    password: '92998-3874'
  };

  loggedin = false;
  isenabled = false;
  showSpinner = false;
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private storage: Storage) {

  }

  // Attempt to login in through our User service
  doLogin() {
    this.isenabled = true;
    this.showSpinner = true;
    this.user.login(this.account).subscribe((resp) => {
      resp.forEach((user) => {
        if (this.account.email == user.email && this.account.password == user.address.zipcode) {
          console.log("LoggedIn");
          this.storage.set('loggedIn', "yes");
          this.loggedin = true;
        }
      })

      if(this.loggedin) {
        this.navCtrl.push(MainPage);
        let toast = this.toastCtrl.create({
          message: "Logged in successfully",
          duration: 3000,
          position: 'top'
        });
        toast.present();

        this.loggedin = false;
      } else {
        console.log("Sorry try again");
        let toast = this.toastCtrl.create({
          message: "Wrong email or password. Please try again.",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      this.isenabled = false;
      this.showSpinner = false;
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
