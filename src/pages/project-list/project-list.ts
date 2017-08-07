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

  projects:firebase.database.Reference;
  favs:any;
  segment: any;
  placeholder: any;
  searchbar: any;
  queryText: any;
  excludedTracks: any = [];
  zone: NgZone;
  currentUser: string;
  projectRef: firebase.database.Reference;
  projectDir: Array<any>;
  loadedProjectDir: Array<any>;
  loadedProjectFavsDir: Array<any>;


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
    
    this.projectRef = firebase.database().ref('/projects');
    this.projectRef.on('value', projectDir => {
      let projects = [];
      projectDir.forEach(project => {
        let pr = project.val();
        pr.id = project.key;
        projects.push(pr);
        return false;
      });
      this.projectDir = projects;
      this.loadedProjectDir = projects;
    });
  }

  initializeItems(): void {
    if (this.segment === "all")
      this.projectDir = this.loadedProjectDir;
    else
      this.projectDir = this.loadedProjectFavsDir;
  }

  getItems(searchbar) {
    
    this.initializeItems();
    this.searchbar = searchbar.srcElement;

    var q = searchbar.srcElement.value;

    if (!q || !this.projectDir) {
      return;
    }

    this.projectDir = this.projectDir.filter((v) => {
      if (v.title && q) {
        if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  getProjects(s) {
    if (this.searchbar)
      this.searchbar.value = "";
    if (s === 'favorites') {
      this.segment = "favorites";
      if (this.currentUser) {
        this.getFavorites();
      } else {
        this.projectDir = [];
      }
    } else {
      this.segment = "all";
      this.initializeItems()
      return this.projectDir;
    }
  }

  getFavorites() {
        let uid = this.currentUser;
        let favObjs =  this.af.database.list('/projects', {query: {orderByChild: `/users/${uid}`, equalTo: true}, preserveSnapshot: true});
        favObjs.subscribe(snapshots => {
            let favorites =[];
            snapshots.forEach(s => {
            let prFav = s.val();
            prFav.id = s.key;
            favorites.push(prFav);
          });
          this.projectDir = favorites;
          this.loadedProjectFavsDir = favorites;
        });
        return this.projectDir;
    };

  addProjectToFavorites(p) {
    if (this.currentUser){
      this.projectData.addFavoriteProject(p.id);
      this.initializeItems();
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
      this.projectData.removeProjectFromFavorites(p.id);
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
