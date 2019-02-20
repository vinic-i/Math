import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { AuthProvider } from '../../providers/auth/auth';
import { DonatePage } from '../donate/donate';
import { CriarPerfilPage } from '../criar-perfil/criar-perfil';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    public navParams: NavParams, 
    private authProvide: AuthProvider
    ) {
  }

  donate(){
    this.navCtrl.push(DonatePage);
  }
  async sair(){
    try{
      await this.authProvide.sign_out();
      this.appCtrl.getRootNav().setRoot(WelcomePage);
    }catch(erro){}
  }

  editarPerfil(){
    if(!this.authProvide.perfil){
      return;
    }
    this.navCtrl.push(CriarPerfilPage, {perfil: this.authProvide.perfil, perfilRef: this.authProvide.perfilRef});
  }

}
