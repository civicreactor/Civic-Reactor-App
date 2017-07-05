import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { CivicReactorApp } from './app.component';
import { ReactorsPage } from '../pages/reactors/reactors';
import {AngularFire} from 'angularfire2';
import { API_FIREBASE_KEY } from './mock-api';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { AuthService } from '../providers/auth-service';
import { ProjectData } from '../providers/project-data';
import { UserData } from '../providers/user-data';
import { SplashScreen } from '@ionic-native/splash-screen';

let comp: CivicReactorApp;
let fixture: ComponentFixture<CivicReactorApp>;

describe('CivicReactorApp Root Component', () => {

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

            declarations: [CivicReactorApp],
           
            providers: [
                AngularFire, AuthService, ProjectData, UserData, SplashScreen
            ],

            imports: [
               IonicModule.forRoot(CivicReactorApp),
               AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(CivicReactorApp);
        comp     = fixture.componentInstance;

    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

});