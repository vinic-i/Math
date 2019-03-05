import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Questao } from '../../providers/questoes-db/questoes-db';
import { TabsPage } from '../tabs/tabs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { ResultadoPage } from '../resultado/resultado';

/**
 * Generated class for the QuestaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questao',
  templateUrl: 'questao.html',
})
export class QuestaoPage {

  perfilRef$: AngularFirestoreDocument;
  eloRef$: AngularFirestoreDocument;
  questao: Questao;
  resposta: string;

  @ViewChild('math') math: ElementRef;

  constructor(public navCtrl: NavController,
    private auth: AuthProvider,
    public navParams: NavParams,
    private db: AngularFirestore,
    ) {
      this.questao = this.navParams.get('questao');
      this.perfilRef$ = this.db.doc<any>(`perfis/${this.auth.user.email}`);
      this.eloRef$ = this.db.doc<any>(`regras/elos/elos/${this.questao.nivel}`);
  }
  


  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestaoPage');
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.math.nativeElement]);
  }

  async verify() {
    if(this.resposta == this.questao.resposta) {
      console.log("acertou");
      let eloRef = await this.eloRef$.get()
      .toPromise();   
      
      let elo = eloRef.data();     

      const perfilRef = await this.perfilRef$.get().toPromise();

      let perfil = perfilRef.data();
  
      perfil.pontos = Number(perfil.pontos) + Number(elo.estrela);

      await this.perfilRef$.set(perfil);

      this.navCtrl.setRoot(ResultadoPage, {resultado: 'Acertou!'});       
    }else{
      this.navCtrl.setRoot(ResultadoPage, {resultado: 'Errou!'});
    }
  }

}
