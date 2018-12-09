import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  titulo;
  enunciado;
  resposta;
  opcoes = [];
  autor;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.buscar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestaoPage');
  }

  buscar(){
    this.titulo = "questao 1";
    this.enunciado = "5x5";
    this.opcoes = [ "maria", "2", "5", "25", "sd"];
    this.resposta = "D";
    this.autor = "SANTOS, Vinicius"
  }

}
