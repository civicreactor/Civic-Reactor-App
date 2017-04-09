import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { ProjectListPage } from '../project-list/project-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = ProjectListPage;
  tab2Root: any = MapPage;
  tab3Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
