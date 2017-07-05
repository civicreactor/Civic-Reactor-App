import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  title: any = "Civic Reactor";

  constructor(public navCtrl: NavController) {
  }
  getWelcomeMessage = () => {
    return "Hello World"
  }

  getFireBaseArray = () => {
    return ["A", "B", "C"];
  }

}
