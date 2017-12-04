import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NovoeventoPage } from '../novoevento/novoevento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  irparanovoevento(){
    this.navCtrl.setRoot(NovoeventoPage);

  }
}
