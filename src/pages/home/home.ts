import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProcurandoPage } from '../procurando/procurando';
import { CriarPage } from '../criar/criar';
import { Observable } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CriarPerfilPage } from '../criar-perfil/criar-perfil';
import { SelecionarEloPage } from '../selecionar-elo/selecionar-elo';
import { NiveisPage } from '../niveis/niveis';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  perfil: Observable<any>;

  constructor(public navCtrl: NavController,
    private auth: AuthProvider,
    private db: AngularFirestore) {
      const user = this.auth.user;

      this.perfil = this.db.doc(`perfis/${user.email}`).valueChanges();
      this.perfil.subscribe(data => {
        if(!data) {
          this.navCtrl.setRoot(CriarPerfilPage);
        }
      });
  }


  jogar (){
    this.navCtrl.push(SelecionarEloPage);
  }
  

  criar (){
    this.navCtrl.push(CriarPage);
  }

}
