import { Agenda, Disciplina } from './../../providers/servicelogin/servicelogin';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-novoevento',
  templateUrl: 'novoevento.html',
})
export class NovoeventoPage {

  model:Agenda;
  discip : Disciplina[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let obj = '[{"iddisciplina":"1","id_usuario":"1","disciplina":"Portugues"},{"iddisciplina":"2","id_usuario":"1","disciplina":"Matemática"}]';
    this.discip = JSON.parse(obj);
    this.model=new Agenda();
    this.model.Disciplina=this.discip;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoeventoPage');
  }

  public insert(){


  }
}

