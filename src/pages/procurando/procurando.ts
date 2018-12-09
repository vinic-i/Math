import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestaoPage } from '../questao/questao';

/**
 * Generated class for the ProcurandoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-procurando',
  templateUrl: 'procurando.html',
})
export class ProcurandoPage {

nome_da_questao;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcurandoPage');
  }
  aceitar (){
    this.navCtrl.push(QuestaoPage);
  }
}
