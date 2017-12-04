import { Agenda } from './../../providers/servicelogin/servicelogin';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-novoevento',
  templateUrl: 'novoevento.html',
})
export class NovoeventoPage {

  model:Agenda;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.model=new Agenda();
    this.model.titulo;
    this.model.Disciplina;
    this.model.dataevento;
    this.model.descricao;
    this.model.local
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoeventoPage');
  }

  public insert(){


  }
}

