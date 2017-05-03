import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: "page-project-filter",
    templateUrl: "project-filter.html"
})

export class ProjectFilterPage {
    techs: Array<{name: string, isChecked: boolean}> = [];

    constructor(public navParams: NavParams, public viewCtrl: ViewController){
        this.techs = [{name: 'javascript', isChecked: true}, {name: 'firebase', isChecked: true}];
    }


}

