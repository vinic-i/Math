import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';

/**
 * Generated class for the NiveisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-niveis',
  templateUrl: 'niveis.html',
})
export class NiveisPage {

  textos;

  constructor(
    public navCtrl: NavController,
    private db: AngularFirestore,
    public navParams: NavParams
    ) {

      this.db.collection("regras/TextoNiveis/textos", ref =>  ref.orderBy( "ordem", "asc"))
      .valueChanges()
      .subscribe(textos => {
        this.textos = textos;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NiveisPage');
  }

}
