import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProjectData } from '../../providers/project-data';

@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html'
})
export class ProjectListPage {
  projects: any;

  constructor(public navCtrl: NavController, public projectData: ProjectData) {
    this.projects = projectData.getProjects();
    this.populateProjectNode();
  }

  populateProjectNode() {
    this.projectData.getProjects().push(
      {
        "name": "Civic Reactor Web App",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "twitter": "Civicreactor",
        "about": "Civic Reactor = Crowdsourced Personal Development.",
        "location": "London",
        "email": "Civicreactor@gmail.com",
        "phone": "+1-541-754-3010",
        "desc": "",
        "champ":"Spanarchian",
        "tech": ["Ionic 2", "Python API",  "Docker", "AWS"]
      }, {
        "name": "Meals On Wheels",
        "profilePic": "assets/img/speakers/duck.jpg",
        "twitter": "ionicframework",
        "about": "An app to help plan, route and deliver a community meal service!",
        "location": "Everywhere",
        "email": "donald@example.com",
        "phone": "+1-541-754-3010",
        "desc": "",
        "champ":"Donald Duck",
        "tech": ["Angular 2", "Python API",  "Docker", "Heroku"]
      }
    );
    
  }

  updateProjects() {

  }

  filterProjects() {

  }

  addFavorites(p) {

  }

  removeFavorites(p) {

  }

}
