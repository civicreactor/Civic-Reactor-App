import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { ProjectData } from '../../providers/project-data';

@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html'
})
export class ProjectListPage {
  projects; favs: any;
  segment: any;
  placeholder: any;
  queryText: any;
  constructor(public alertCrl: AlertController, public navCtrl: NavController, public projectData: ProjectData) {
    this.segment = 'all';
    this.queryText = '';
    this.projects = projectData.getProjects();
  }

  getProjects(s) {
    if (s === 'favorites') {
      this.projects = this.projectData.getFavorites();
    } else {
      this.projects = this.projectData.getProjects();
    }
  }

  addProjectToFavorites(p) {
    this.projectData.addFavoriteProject(p.$key);
    let alert = this.alertCrl.create({
      title: 'Favorite added',
      buttons: [{
        text: 'Ok'
      }]
    });
    alert.present();
  }

  removeProjectFromFavorites(p) {
    this.projectData.removeProjectFromFavorites(p.$key);
    let alert = this.alertCrl.create({
      title: 'Favorite removed',
      buttons: [{
        text: 'Ok'
      }]
    });
    alert.present();
  }

  filterProjects() {

  }

}
