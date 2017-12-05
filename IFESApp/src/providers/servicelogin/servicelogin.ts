import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ServiceLogin {
  private API_URL = 'http://ifes.azurewebsites.net';
  model: Usuario;

  constructor(private db: Storage, public http: Http, public loadingCtrl: LoadingController) {
    this.model = new Usuario();
  }

  login(email: string, senha: string, servidor: boolean) {
    return new Promise((resolve, reject) => {
      var Usuarios = { email: email, senha: senha };
      console.log("Inicio Post");

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      if (servidor)
        this.API_URL = this.API_URL + '/api/usuariosapi';
      else
        this.API_URL = this.API_URL + '/api/alunoesapi';

      console.log("Url Post", this.API_URL);

      this.http.post(this.API_URL, Usuarios, options).subscribe((result: any) => {
        resolve(result.json());
        console.log("Fim Post", this.API_URL);
        if (servidor)
          var resp = new Usuario();

        resp = result.json();

        if (!servidor)
          resp.idusuario = result.json().idaluno;

        console.log("Fim Post", resp);

        if (resp != null) {
          this.model.email = resp.email;
          this.model.idusuario = resp.idusuario;
          this.model.nome = resp.nome;
          this.model.senha = "";
          this.model.servidor = servidor;
        }

        console.log(this.model);

        if (this.model.email == Usuarios.email) {
          this.insert(this.model)
        }
      },
        (error) => {
          reject(error.json());
        });
    });
  }

  public insert(usu: Usuario) {
    console.log("Inserindo no banco...", usu);
    this.db.set('usuario', JSON.stringify(usu));
    console.log("Inseriu...");
  }

  public async Usuarioget(): Promise<Usuario> {
    console.log("Pesquisando no banco...");
    let usuario = new Usuario();
    usuario.idusuario = 0;

    console.log("Pesquisa Usuario");

    let loading = this.loadingCtrl.create({
      content: 'Aquarde....',
      dismissOnPageChange: true

    });

    loading.present();

    let user = await this.db.get('usuario');

    if (user) {
      loading.dismiss();
      return JSON.parse(user);
    }
    else {
      loading.dismiss();
      return usuario;
    }

  }
}

@Injectable()
export class Evento {
  private API_URL = 'http://ifes.azurewebsites.net';

  constructor(public http: Http, public loadingCtrl: LoadingController) {
  }

  Salvarevento(agenda: Agenda) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });


      this.API_URL = this.API_URL + '/api/AgendaApi';
      this.http.post(this.API_URL, agenda, options).subscribe((result: any) => {
        resolve(result.json());

      },
        (error) => {
          reject(error.json());
        });
    });

  }


  GetAgendaSite(id): Promise<string> {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      let URL = this.API_URL + '/api/AgendaApi';
      console.log('inicia o get');
      this.http.get(URL, options).subscribe((agenda: any) => {
        resolve(agenda.json());

      },
        (error) => {
          reject(new Agenda());
        });
    });
  }

  public async GetAgenda(id): Promise<any> {
    let loading = this.loadingCtrl.create({
      content: 'Aquarde....',
      dismissOnPageChange: true
    });

    loading.present();

    let inf = await this.GetAgendaSite(id);

    if (inf) {
      loading.dismiss();
      return inf;
    }
    else {
      loading.dismiss();
      return inf;
    }
  }

}

export class Usuario {
  idusuario: number;
  nome: string;
  email: string;
  senha: string;
  servidor: boolean;
}

export class Agenda {
  idagenda: number;
  iddisciplina: number;
  Disciplina: any;
  dataevento: string;
  titulo: string;
  descricao: string;
  local: string;
  idevento: string;
  hora: string;
}

export class Disciplina {
  iddisciplina: number;
  id_usuario: number;
  disciplina: string;
}