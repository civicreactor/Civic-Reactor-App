import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReactorDetailPage } from '../reactor-detail/reactor-detail';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-reactors',
  templateUrl: 'reactors.html'
})
export class ReactorsPage {
  reactors: any;
  defaultPic: any;

  title: any = "Reactors Page";

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData) {
    this.reactors = userData.getUsers();
    this.defaultPic = "http://wearesmile.com/assets/themes/s5/img/logo.png";
  }

  ionViewDidLoad() {
  }

   getWelcomeMessage = () => {
    return "Hello World";
  }

  goToReactorDetail(reactor: any) {
    this.navCtrl.push(ReactorDetailPage, reactor);
  }
}
