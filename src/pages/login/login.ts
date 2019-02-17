import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingOptions, ToastController, LoadingController } from 'ionic-angular';
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
    public toastController: ToastController,
    public loadingController: LoadingController,
    public authProvider: AuthProvider,
    private afAuth: AngularFireAuth) {
  }

  form = new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  });

  async login(){
    this.presentLoading();

    try{
      await this.authProvider.loginEmail(this.form.value.email, this.form.value.password);
      this.stopLoading();
      this.navCtrl.push(TabsPage);
    } catch(erro){      
      this.stopLoading();
    }
  }

  register(){
    this.navCtrl.push(RegistrarPage);
  }


  loading : Loading;
  async presentLoading() {

    const loadOption: LoadingOptions = {
      content: 'Aguarde',
      duration: 9000
    };

    this.loading = await this.loadingController.create(loadOption);
    await this.loading.present();

    this.loading.onDidDismiss((role, data) => {
      console.log('Loading dismissed!');
    });
  }

  stopLoading() {
    if(this.loading) this.loading.dismiss();
  }



  async messagemErro(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }
 
}
