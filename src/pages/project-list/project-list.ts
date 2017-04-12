import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public projectData: ProjectData) {
    this.segment = 'all';
    this.queryText = '';
    this.projects = projectData.getProjects();
    this.favs = projectData.getFavorites();
  }


  updateProjects(s) {
    if (s === 'favorites') {
      console.log("favs"+this.favs[0])
      return this.favs;
    } else {
      console.log("projs")
      return this.projects;
    }

  }

  addProjectToFavorites(p) {
    this.projectData.addFavoriteProject(p.$key);
  }

  filterProjects() {

  }


}
