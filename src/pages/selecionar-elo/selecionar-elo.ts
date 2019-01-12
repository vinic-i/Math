import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { EloProvider } from '../../providers/elo/elo';
import { map } from 'rxjs/operators';
import { ProcurandoPage } from '../procurando/procurando';

/**
 * Generated class for the SelecionarEloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selecionar-elo',
  templateUrl: 'selecionar-elo.html',
})
export class SelecionarEloPage {

  elos: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eloProvider: EloProvider) {
      this.elos = this.eloProvider.eloCollectionRef
      .snapshotChanges().pipe(
        map(action =>{
          return action.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data};
          })
        })
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPage');
  }

  procurarQuestao(elo) {
    this.navCtrl.push(ProcurandoPage, {
      elo: elo
    })
  }

}
