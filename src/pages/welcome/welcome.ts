import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoginPage } from "../login/login";
import { TabsPage } from "../tabs/tabs";
import { AuthProvider } from "../../providers/auth/auth";
import { RegistrarPage } from "../registrar/registrar";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    private db: AngularFirestore,
    private toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad WelcomePage");
  }

  async Google() {
    try {
      await this.authProvider.Google();
    } catch (err) {
      console.log(err);
    }
  }

  Email() {
    this.navCtrl.push(RegistrarPage);
  }

  async Facebook(){
    try {
      await this.authProvider.loginFacebook();
    }catch(e) {
      console.log(e);
      if(e == "cordova_not_available"){
        this.info("Indisponível em navegadores");
      }
    }
  }

  info(text){
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }
}
