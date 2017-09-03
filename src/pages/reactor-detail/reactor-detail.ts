import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import {User} from '../../model/User';

@Component({
  selector: 'page-reactor-detail',
  templateUrl: 'reactor-detail.html'
})
export class ReactorDetailPage {
  user: any;
  edit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData, 
              public viewCtrl: ViewController) {
    this.user = this.navParams.data;
    this.edit = false;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ReactorDetailPage');
  }

  editProfile() {
    this.edit = true;
    console.log('r uid ',this.user.uid)
  }

  save() {
    this.userData.save(this.user);
    this.edit = false;
  }

  cancel() {
    this.edit = false;
  }

}
