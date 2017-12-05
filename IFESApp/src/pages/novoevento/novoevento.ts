import { Agenda, Disciplina, Evento } from './../../providers/servicelogin/servicelogin';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-novoevento',
  templateUrl: 'novoevento.html',
})
export class NovoeventoPage {

  model: Agenda;
  discip: Disciplina[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public evento: Evento) {
    let obj = '[{"iddisciplina":"4","id_usuario":"1","disciplina":"Portugues"},{"iddisciplina":"5","id_usuario":"1","disciplina":"Matemática"}]';
    this.discip = JSON.parse(obj);
    this.model = new Agenda();
    this.model.Disciplina = this.discip;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoeventoPage');
  }

  public save(agenda: Agenda) {
    console.log(agenda);
    console.log(this.evento.Salvarevento(agenda));



  }
}

