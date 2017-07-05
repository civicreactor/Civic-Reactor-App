import { Component, NgZone, ViewChild } from '@angular/core';
import { AlertController, List, ModalController, NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ProjectData } from '../../providers/project-data';
import { ProjectFilterPage } from '../project-filter/project-filter';
import * as firebase from 'firebase';

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
  projectRef: any;
  projectDir: any;
  loadedProjectDir: any;


  constructor(public af: AngularFire, 
              public alertCtrl: AlertController, 
              public modalCtrl: ModalController, 
              public navCtrl: NavController, 
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
    
    this.projectRef = firebase.database().ref('/projects');
    this.projectRef.on('value', projectDir => {
      let projects = [];
      projectDir.forEach(project => {
        projects.push(project.val());
      });
      this.projectDir = projects;
      this.loadedProjectDir = projects;
    });
  }

  initializeItems(): void {
    this.projectDir = this.loadedProjectDir;
  }

  getItems(searchbar) {
    
    this.initializeItems();

    var q = searchbar.srcElement.value;

    if (!q) {
      return;
    }

    // console.log('vals: '+this.projectDir);
    // console.log('vals: '+this.loadedProjectDir);

    this.projects = this.projectDir.filter((v) => {
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(this.projects)
    // console.log(q, this.projectDir.length);
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
