import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NovoeventoPage } from '../novoevento/novoevento';
import { Agenda, Evento, ServiceLogin } from '../../providers/servicelogin/servicelogin';
import { List } from 'linqts';
//import { SlicePipe } from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  date: Date;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentMes: any;
  currentYear: any;
  currentDate: any;

  dados: any;
  evento: Evento;
  servicelogin:ServiceLogin;

  constructor(public navCtrl: NavController, evento: Evento, servicelog:ServiceLogin) {
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.date = new Date();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.evento = evento;
    //let JsonObj = '[{"idagenda":"1","data":"2017-11-29","titulo":"Prova1","descricao":"Prova de matemática1"},{"idagenda":"2","data":"2017-11-30","titulo":"Prova2","descricao":"Prova de matemática2"},{"idagenda":"3","data":"2017-11-30","titulo":"Prova3","descricao":"Prova de matemática3"}]';
    //this.dados = JSON.parse(JsonObj);
    this.servicelogin = servicelog;
    this.getDaysOfMonth();
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentYear = this.date.getFullYear();
    this.currentDate = new Date().getDate();
    this.currentMes = this.date.getMonth();

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

    this.evento.GetAgenda(1).then(resut => {

      this.dados = new List<Agenda>(resut).Where(data => data.dataevento.substring(0, 7) == this.date.toISOString().substring(0, 7)).ToArray();
      
      console.log(this.dados);

      for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
        this.daysInLastMonth.push(i);
      }

      var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
      for (var y = 0; y < thisNumOfDays; y++) {
        this.daysInThisMonth.push(y + 1);
      }

      var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
      //var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
      for (var w = 0; w < (6 - lastDayThisMonth); w++) {
        this.daysInNextMonth.push(w + 1);
      }
      var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
      if (totalDays < 36) {
        for (var x = (7 - lastDayThisMonth); x < ((7 - lastDayThisMonth) + 7); x++) {
          this.daysInNextMonth.push(x);
        }
      }

      this.currentMonth = this.monthNames[this.date.getMonth()];
    });
  }

  irparanovoevento() {
    this.servicelogin.getAlldisciplinas().then(discip => {
      this.navCtrl.setRoot(NovoeventoPage,{disciplina:discip});
    });
  }

  //Now, add the function for previous month button action.

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  //Also for the next month button action.  
  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }

  OpenEvento(id) {
    var agend = new List<Agenda>(this.dados).Where(data => data.idagenda == id).First();    

    this.servicelogin.getAlldisciplinas().then(discip => {
      this.navCtrl.setRoot(NovoeventoPage,{disciplina:discip,agenda:agend});
    });
  }

  TemEventoId(dia: number) {
    var item: Agenda[];
    this.date = new Date(this.currentYear, this.currentMes, dia, 0, 0, 0, 0);
    let calendar = this.date.toISOString().substring(0, 10);
    
    var tmp = new List<Agenda>(this.dados).Where(data => data.dataevento.substring(0, 10) == calendar).ToArray();
    
    item = tmp;
    return item;
  }
}


