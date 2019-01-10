import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the CriarPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-criar-perfil',
  templateUrl: 'criar-perfil.html',
})
export class CriarPerfilPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private auth: AuthProvider
  ) {
    this.user = this.auth.user;
  }

  user;

  form = new FormGroup({
    nome: new FormControl(),
    sobrenome: new FormControl()
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad CriarPerfilPage');
  }

  async criar() {
    const perfis = this.db.collection("perfis");
    //perfis.add({...this.form.value, pontos: 0, elo: 'A'});
    try{
      const result = await perfis.doc(this.user.email).set({...this.form.value, pontos: 0, elo: 'A'});
      console.log(result);
      this.navCtrl.setRoot(TabsPage);
    } catch(err){
      console.log(err);
    }
  }

}
