import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { EloProvider } from '../../providers/elo/elo';
import { HomePage } from '../home/home';
import { SelecionarEloPage } from '../selecionar-elo/selecionar-elo';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ResultadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})
export class ResultadoPage {

  resultado;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.resultado = this.navParams.get("resultado");
  }

  ionViewDidLoad() {
  }

  jogarNovamente() {
    this.navCtrl.setRoot(SelecionarEloPage);
  }

  voltarParaInicio() {
    this.navCtrl.setRoot(TabsPage);
  }

}
