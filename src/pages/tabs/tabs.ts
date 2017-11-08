import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { BlogPage } from '../blog/blog';
import { ProjectListPage } from '../project-list/project-list';
import { ReactorsPage } from '../reactors/reactors';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = ReactorsPage;
  tab2Root: any = ProjectListPage;
  tab3Root: any = MapPage;
  tab5Root: any = BlogPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
