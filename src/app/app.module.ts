import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CivicReactorApp } from './app.component';
import { API_FIREBASE_KEY } from './mock-api';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { Geolocation } from '@ionic-native/geolocation';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { ProjectFilterPage } from '../pages/project-filter/project-filter';
import { ProjectListPage } from '../pages/project-list/project-list';
import { ReactorsPage } from '../pages/reactors/reactors';
import { ReactorDetailPage } from '../pages/reactor-detail/reactor-detail';
import { ProjectDetailPage } from '../pages/project-detail/project-detail';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth-service';
import { ProjectData } from '../providers/project-data';
import { UserData } from '../providers/user-data';

import { SplashScreen } from '@ionic-native/splash-screen';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Oauth } from 'ng2-cordova-oauth/oauth';

export const firebaseConfig = {
      apiKey: API_FIREBASE_KEY.API_FIREBASE_KEY,
      authDomain: "civic-mobile-app-46e73.firebaseapp.com",
      databaseURL: "https://civic-mobile-app-46e73.firebaseio.com",
      storageBucket: "civic-mobile-app-46e73.appspot.com",
      messagingSenderId: "839668242779"
    };

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

export const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '46aba71e'
  }
};

@NgModule({
  declarations: [
    CivicReactorApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    ProjectDetailPage,
    ProjectFilterPage,
    ProjectListPage,
    ReactorDetailPage,
    ReactorsPage,
    SignupPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(CivicReactorApp),
    CloudModule.forRoot(cloudSettings),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CivicReactorApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    ProjectDetailPage,
    ProjectFilterPage,
    ProjectListPage,
    ReactorsPage,
    ReactorDetailPage,
    SignupPage,
    TabsPage
  ],
  providers: [
    AuthService,
    Geolocation,
    ProjectData,
    SplashScreen,
    UserData,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Oauth, useClass: OauthCordova }
  ]
})
export class AppModule {}
