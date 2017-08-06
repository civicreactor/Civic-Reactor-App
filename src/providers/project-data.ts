import { Injectable, NgZone } from '@angular/core';
import { UserData } from './user-data';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class ProjectData {
    projects: any;
    zone: NgZone;
    currentUser: string;
    favorites: Array<any>;

    constructor(public af:AngularFire, public userData:UserData) {
        this.zone = new NgZone({});
        af.auth.subscribe((user) => {
            this.zone.run(() => {
                if (user) {
                    this.currentUser = user.uid;
                }
            });     
        });
        // this.populateProjectsDB();
    }

    // getProjects() {
    //     return firebase.database().ref('/projects');
    // }

    addFavoriteProject(projectKey: string) {
        firebase.database().ref('/projects').child(projectKey + '/users/' + this.currentUser).set(true);
    }

    removeProjectFromFavorites(projectKey: string) {
        firebase.database().ref('/projects').child(projectKey + '/users/' + this.currentUser).set(false);
    }


    populateProjectsDB() {
        firebase.database().ref('/projects').push({title:"Spana IWAD", picture: "assets/img/projects/spana-IWAD.png"});
    }

    
    
}