import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CivicReactorApp } from './app.component';
import { API_FIREBASE_KEY } from './mock-api';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { ProjectListPage } from '../pages/project-list/project-list';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthData } from '../providers/auth-data';
import { UserData } from '../providers/user-data';

import { SplashScreen } from '@ionic-native/splash-screen';

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

@NgModule({
  declarations: [
    CivicReactorApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    ProjectListPage,
    SignupPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(CivicReactorApp),
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
    ProjectListPage,
    SignupPage,
    TabsPage
  ],
  providers: [
    AuthData,
    SplashScreen,
    UserData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
