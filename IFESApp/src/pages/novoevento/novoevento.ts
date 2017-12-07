import { Agenda, Disciplina, Evento, ServiceLogin } from './../../providers/servicelogin/servicelogin';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-novoevento',
  templateUrl: 'novoevento.html',
})

export class NovoeventoPage {
  model: Agenda;

  constructor(public navCtrl: NavController, public navParams: NavParams, public evento: Evento, public servicelogin: ServiceLogin) {
    //let obj = '[{"iddisciplina":"4","id_usuario":"1","disciplina":"Portugues"},{"iddisciplina":"5","id_usuario":"1","disciplina":"Matemática"}]';
    this.model = new Agenda();
    let discip : Disciplina[] = navParams.get("disciplina"); 
    let agenda : Agenda = navParams.get("agenda"); 
   
    if (agenda!=null)
      this.model = agenda;

    this.model.Disciplina = discip;  
   }

  public save(agenda: Agenda) {
    this.evento.Salvarevento(agenda);
    this.navCtrl.setRoot(HomePage);
  }
}

