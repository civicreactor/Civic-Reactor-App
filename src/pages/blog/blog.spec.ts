import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CivicReactorApp } from '../../app/app.component';
import { NavController, NavParams } from 'ionic-angular';
import { ReactorsPage } from './blog';
import {AngularFire} from 'angularfire2';
import { API_FIREBASE_KEY } from '../../app/mock-api';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { AuthService } from '../../providers/auth-service';
import { ProjectData } from '../../providers/project-data';
import { UserData } from '../../providers/user-data';
import { SplashScreen } from '@ionic-native/splash-screen';

let comp: ReactorsPage;
let fixture: ComponentFixture<ReactorsPage>;
let de: DebugElement;
let el: HTMLElement;

describe('ReactorsPage Component', () => {

    beforeEach(async(() => {

      const firebaseConfig = {
            apiKey: API_FIREBASE_KEY.API_FIREBASE_KEY,
            authDomain: "civic-mobile-app-46e73.firebaseapp.com",
            databaseURL: "https://civic-mobile-app-46e73.firebaseio.com",
            storageBucket: "civic-mobile-app-46e73.appspot.com",
            messagingSenderId: "839668242779"
        };

        const myFirebaseAuthConfig = {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }

        TestBed.configureTestingModule({

            declarations: [CivicReactorApp, ReactorsPage],

            providers: [
                NavController,
                UserData,
                AngularFire,
                {provide: NavParams, useClass: class { NavParams = jasmine.createSpy("NavParams"); }}
            ],

            imports: [
                IonicModule.forRoot(CivicReactorApp),
                AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(ReactorsPage);
        comp     = fixture.componentInstance;

    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });

    it('is created', () => {
      expect(fixture).toBeTruthy();
      expect(comp).toBeTruthy();
    });

    it('should had a main title of Civic Reactor', () => {
      expect(comp['title']).toEqual("Reactors Page");
    });



});



