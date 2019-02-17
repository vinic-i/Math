import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Questao, QuestoesDbProvider } from '../../providers/questoes-db/questoes-db';
import { Observable } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{

  questoes: Observable<Questao[]>;

  constructor(private auth: AuthProvider, public navCtrl: NavController, private db: QuestoesDbProvider) {

  }
  
  ngOnInit(){
    this.db.setupAdmin(this.auth.user.uid);
    this.questoes = this.db.adminHistorico();
  }

}
