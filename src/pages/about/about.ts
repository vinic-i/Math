import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Questao, QuestoesDbProvider } from '../../providers/questoes-db/questoes-db';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{

  questoes: Observable<Questao[]>;

  constructor(public navCtrl: NavController, private db: QuestoesDbProvider) {

  }
  ngOnInit(){
    this.db.setupAdmin("vinicius");
    this.questoes = this.db.adminHistorico();
  }

}
