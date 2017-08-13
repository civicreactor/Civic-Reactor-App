import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-reactor-detail',
  templateUrl: 'reactor-detail.html'
})
export class ReactorDetailPage {
  reactor: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData) {
    this.reactor = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ReactorDetailPage');
  }

}
