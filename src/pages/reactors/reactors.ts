import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

/*
  Generated class for the Reactors page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reactors',
  templateUrl: 'reactors.html'
})
export class ReactorsPage {
  reactors: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData) {
    this.reactors = userData.getUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReactorsPage');
  }

}
