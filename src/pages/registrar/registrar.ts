import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { LoginPage } from '../login/login';
import { FormGroup, FormControl } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { CriarPerfilPage } from '../criar-perfil/criar-perfil';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {


  constructor(private afAuth: AngularFireAuth,
  private authProvider: AuthProvider,
    public navCtrl: NavController, public navParams: NavParams,) {
  }
  form = new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  })

  async Register(){
    try{
      await this.authProvider.Register(this.form.value.email, this.form.value.password);
      this.navCtrl.setRoot(CriarPerfilPage);
    }catch(err) {
      console.log(err);
    }
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
