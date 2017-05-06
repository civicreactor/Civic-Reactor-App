import { Component, NgZone, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { ProjectListPage } from '../pages/project-list/project-list';
import { ReactorsPage } from '../pages/reactors/reactors';
import { SignupPage } from '../pages/signup/signup'
import { TabsPage } from '../pages/tabs/tabs';

import { AuthData } from '../providers/auth-data';

import {AngularFire} from 'angularfire2';
import firebase from 'firebase';

export interface PagesInterface {
  title: string,
  component: any,
  tabComponent?: any,
  icon: string,
  logsOut?: boolean,
  index?: number
}

@Component({
  templateUrl: 'app.html'
})
export class CivicReactorApp {
  @ViewChild(Nav) nav: Nav;

  appPages: PagesInterface[] = [
    { title: 'Reactors', component: TabsPage, tabComponent: ReactorsPage, icon: 'contacts' },
    { title: 'Projects', component: TabsPage, tabComponent: ProjectListPage, index: 1, icon: 'filing' },
    { title: 'Map', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map'},
    { title: 'About', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }
  ]
  loggedInPages: PagesInterface[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Log Out', component: TabsPage, icon: 'log-out', logsOut: true }
  ]
  loggedOutPages: PagesInterface[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ]

  rootPage:any = TabsPage;
  zone: NgZone;

  constructor(
    public af: AngularFire,
    public authData: AuthData,
    public menu: MenuController,
    public platform: Platform,
    splashScreen: SplashScreen
  ) {
    this.zone = new NgZone({});
    af.auth.subscribe( (user) => {
      this.zone.run( () => {
        if (user) {
          this.enableMenu(true);
        } else {
          this.enableMenu(false);
        }
      });     
    });

  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  openPage(page: PagesInterface) {
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root")
      })
    }

    if (page.logsOut === true) {
      setTimeout(() => {;
        this.authData.logoutUser();
      }, 1000);
    }
  }

  isActive (page: PagesInterface) {
    let childNav = this.nav.getActiveChildNav();
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }

  platformReady() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
    });
  }
}
