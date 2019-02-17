import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading, LoadingOptions } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private auth: AuthProvider
  ) {
    this.user = this.auth.user;
    
    this.form = this.formBuilder.group({
      nome: [''],
      sobrenome: [''],
      escola: [''],
    });
  }

  user;

  form: FormGroup;
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CriarPerfilPage');
  }

  async criar() {
    this.presentLoading();
    const perfis = this.db.collection("perfis");
    //perfis.add({...this.form.value, pontos: 0, elo: 'A'});
    try{
      const result = await perfis.doc(this.user.email)
      .set({
        ...this.form.value,
        admin: false,
        pontos_admin: 0,
        pontos: 0,
        elo: 'A'
      });
      console.log(result);
      this.stopLoading();
      this.navCtrl.setRoot(TabsPage);
    } catch(err){
      this.stopLoading();
      console.log(err);
    }
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
