import { Injectable, NgZone } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class ProjectData {
    projects: any;
    zone: NgZone;
    currentUser: string;
    favorites: any;

    constructor(public af:AngularFire) {
        this.zone = new NgZone({});
        af.auth.subscribe((user) => {
            this.zone.run(() => {
                if (user) {
                    this.currentUser = user.uid;
                }
            });     
        });
        this.projects = af.database.list('/projects');
        this.favorites = af.database.list('/userProfile/FyYlRh4hGvgvP9eukKG440N7FRF2/favorites');
    }

    getProjects() {
        return this.projects;
    }

    getFavorites() {
        return this.favorites;
    }
    
    addFavoriteProject(projectKey: string) {
        return firebase.database().ref('userProfile').child(this.currentUser + '/favorites/' + projectKey).set(true);
    }

    getFavoriteProjects() {
        return firebase.database().ref('userProfile').child(this.currentUser + '/favorites/').once('value');
    }
}