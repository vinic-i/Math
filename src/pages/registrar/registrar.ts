import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, LoadingOptions, Loading, ToastController } from 'ionic-angular';
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
  public toastController: ToastController,
  public loadingController: LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  form = new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  })

  working = false;

  async Register(){

    this.presentLoading();

    this.working = true;

    try{
      if(this.form.value.password.length < 6){
        throw new Error("pass6");
      }
      await this.authProvider.Register(this.form.value.email, this.form.value.password);

      this.stopLoading();

      this.navCtrl.setRoot(TabsPage);
    }catch(err) {
      console.log(err);
      this.stopLoading();
      if(err.message == "The email address is badly formatted."){
        this.messagemErro("Email inválido!");
        return;
      }

      if(err.message == "The email address is already in use by another account.") {
        this.messagemErro("Email em uso.");
        return;
      }

      if(err.message == "pass6") {
        this.messagemErro("Mínimo de 6 caracteres na senha.");
      }

      this.messagemErro(err);
    }
    this.working = false;

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


  login() {
    this.navCtrl.push(LoginPage);
  }
}
