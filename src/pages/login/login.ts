import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { RegistrarPage } from '../registrar/registrar';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public authProvider: AuthProvider,
    private afAuth: AngularFireAuth) {
  }

  form = new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  });

  async login(){
    try{
      await this.authProvider.loginEmail(this.form.value.email, this.form.value.password);
      this.navCtrl.push(TabsPage);
    } catch(erro){
      
    }
  }

  register(){
    this.navCtrl.push(RegistrarPage);
  }
 
}
