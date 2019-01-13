import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { QuestaoPage } from '../questao/questao';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Questao } from '../../providers/questoes-db/questoes-db';
import { TabsPage } from '../tabs/tabs';
import { count } from 'rxjs/operators';

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
      this.elo = this.navParams.get('elo');

      this.perfil = this.db.doc(`perfis/${user.email}`).valueChanges();

      this.questoes = this.db.collection<Questao>("questoes", ref => ref.where("nivel","==", this.elo.id) )
      .valueChanges();
  }

 
  perfil: Observable<any>;
  questoes: Observable<Questao[]>;
  questao;
  index = 0;
  elo;

  found = false;

  public minutos:number = 0;
  public segundos:any = 15; 
 cancelar = false;
inicia(){
    setInterval( ()=>{
      if(this.cancelar){
        return;
      }
      this.segundos -=1;
      if(this.segundos <=9){
        this.segundos = "0" + this.segundos;
      }
      if(this.segundos < 0){{
        this.segundos = 59;
        this.minutos -=1;
      }}
      if(this.segundos == 0 && this.minutos == 0){
        this.navCtrl.setRoot(TabsPage);
      }
    }
      , 1000);
}
stop(){
  this.cancelar = true;
}

ionViewWillLeave(){
  this.stop();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcurandoPage');
    this.buscarQuestoes();
    this.inicia();
  }

  aceitar (){
    this.appCtrl.getRootNav().setRoot(QuestaoPage, {
      questao: this.questao
    });
  }

  recusar() {    
    this.navCtrl.setRoot(TabsPage);
  }
  buscarQuestoes(){
    console.log('Questões')

    this.questoes.subscribe(list => {

      console.log(list);

      if(list.length > 0){
        console.log("has questions");
        
        this.index = Math.floor(Math.random()*list.length);

        console.log(this.index);
        this.questao = list[this.index];
        this.found = true;
      }

    });


    
  }
}
