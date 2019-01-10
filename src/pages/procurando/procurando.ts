import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { QuestaoPage } from '../questao/questao';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Questao } from '../../providers/questoes-db/questoes-db';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-procurando',
  templateUrl: 'procurando.html',
})
export class ProcurandoPage {

  

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    public navParams: NavParams, 
    private auth: AuthProvider,
    private db: AngularFirestore) {
      const user = this.auth.user;
      this.perfil = this.db.doc(`perfis/${user.email}`).valueChanges();

      this.questoes = this.db.collection<Questao>("questoes", ref => ref.where("nivel","==", this.elo) )
      .valueChanges();
  }

  perfil: Observable<any>;
  questoes: Observable<Questao[]>;
  questao;
  index = 0;
  elo = 'B';

  found = false;


  buscarQuestoes(){
    console.log('Questões')

    this.questoes.subscribe(list => {

      console.log(list);

      if(list.length > 0){
        console.log("has questions");

        this.questao = list[this.index];
        this.found = true;
      }

    });


    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcurandoPage');
    this.buscarQuestoes();
  }

  aceitar (){
    this.appCtrl.getRootNav().setRoot(QuestaoPage, {
      questao: this.questao
    });
  }
}
