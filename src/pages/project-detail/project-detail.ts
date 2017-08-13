import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjectData } from '../../providers/project-data'; 
import * as firebase from 'firebase';

@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html'
})
export class ProjectDetailPage {
  project: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public projectData: ProjectData) {
    this.project = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProjectDetailPage');
  }

}
