import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Questao } from '../../providers/questoes-db/questoes-db';

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

  questao: Questao;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.questao= this.navParams.get('questao');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestaoPage');
  }

  buscar(){
  }

}
