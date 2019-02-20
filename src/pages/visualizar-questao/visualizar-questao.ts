import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VisualizarQuestaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizar-questao',
  templateUrl: 'visualizar-questao.html',
})
export class VisualizarQuestaoPage {
  questao;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.questao = navParams.get("questao");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarQuestaoPage');
  }

}
