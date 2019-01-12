import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoginPage } from "../login/login";
import { TabsPage } from "../tabs/tabs";
import { AuthProvider } from "../../providers/auth/auth";
import { RegistrarPage } from "../registrar/registrar";
import { AngularFirestore } from "@angular/fire/firestore";

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
    private db: AngularFirestore
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad WelcomePage");
  }

  async Google() {
    try {
      await this.authProvider.Google();
      const user = this.authProvider.user;
      const doc = this.db.doc(`perfis/${user.email}`);
      
      console.log(doc);
      this.navCtrl.push(TabsPage);
    } catch (err) {
      console.log(err);
    }
  }

  Email() {
    this.navCtrl.push(RegistrarPage);
  }
}
