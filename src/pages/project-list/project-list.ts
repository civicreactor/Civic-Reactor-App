import { Component, NgZone, ViewChild } from '@angular/core';
import { AlertController, List, ModalController, NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ProjectData } from '../../providers/project-data';
import { ProjectFilterPage } from '../project-filter/project-filter';

@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html'
})
export class ProjectListPage {
  @ViewChild('projectList', { read: List }) projectList: List;

  projects; favs: any;
  segment: any;
  placeholder: any;
  queryText: any;
  excludedTracks: any = [];
  zone: NgZone;
  currentUser: string;

  constructor(public af: AngularFire, public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, 
              public projectData: ProjectData) {
    this.zone = new NgZone({});
    af.auth.subscribe((user) => {
        this.zone.run(() => {
            if (user) {
                this.currentUser = user.uid;
            }
        });     
    });
    this.segment = 'all';
    this.queryText = '';
    this.projects = projectData.getProjects();
  }

  getProjects(s) {
    if (s === 'favorites') {
      if (this.currentUser) {
        this.projects = this.projectData.getFavorites();
      } else {
        this.projects = '';
      }
    } else {
      this.projects = this.projectData.getProjects();
    }
  }

  addProjectToFavorites(p) {
    if (this.currentUser){
      this.projectData.addFavoriteProject(p.$key);
      let alert = this.alertCtrl.create({
        title: 'Favorite added',
        buttons: [{
          text: 'Ok'
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        message: 'User must be logged in for adding Favorites.',
        buttons: [{
          text: 'Ok'
        }]
      });
      alert.present();
    }
  }

  removeProjectFromFavorites(p) {
    if (this.currentUser){
      this.projectData.removeProjectFromFavorites(p.$key);
      let alert = this.alertCtrl.create({
        title: 'Favorite removed',
        buttons: [{
          text: 'Ok'
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        message: 'User must be logged in for removing Favorites.',
        buttons: [{
          text: 'Ok'
        }]
      });
      alert.present();
    }
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ProjectFilterPage, this.excludedTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludedTracks = data;
        this.updateProjects();
      }
    });
  }

  updateProjects() {
    this.projectList && this.projectList.closeSlidingItems();
  }
}
