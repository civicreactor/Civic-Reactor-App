import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import {User} from '../../model/user';
import { Http } from '@angular/http';
import {GithubService} from "../../services/GithubService";


@Component({
  selector: 'page-reactor-detail',
  templateUrl: 'reactor-detail.html',
  providers: [GithubService]
})
export class ReactorDetailPage   {
  user: any;
  edit: boolean = false;
  loggedInUser: any;
  contributors;
  shownGroup = null;
  result = {
    data: [],
  };
  resultado;


  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData,
              public viewCtrl: ViewController, private http: Http,
              public githubService:GithubService) {
    this.user = this.navParams.data;
    this.edit = false;
    this.loggedInUser = (this.userData.user) ? this.userData.user.uid : "";

    this.resultado = githubService.getData();

  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad ReactorDetailPage');
  }

  editProfile() {
    this.edit = true;
  }

  save() {
    this.userData.save(this.user);
    this.edit = false;
  }

  cancel() {
    this.edit = false;
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };



}
