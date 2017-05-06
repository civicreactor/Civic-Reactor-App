import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-reactors',
  templateUrl: 'reactors.html'
})
export class ReactorsPage {
  reactors: any;
  defaultPic: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData) {
    this.reactors = userData.getUsers();
    this.defaultPic = "http://wearesmile.com/assets/themes/s5/img/logo.png";
  }

  ionViewDidLoad() {
  }

}
