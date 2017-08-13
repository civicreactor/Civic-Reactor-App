import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

/*
  Generated class for the ReactorDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reactor-detail',
  templateUrl: 'reactor-detail.html'
})
export class ReactorDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReactorDetailPage');
  }

}
