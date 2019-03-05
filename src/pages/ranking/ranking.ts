import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { AuthProvider } from "../../providers/auth/auth";
import { Observable } from "rxjs";
import { EloProvider } from "../../providers/elo/elo";

/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-ranking",
  templateUrl: "ranking.html"
})
export class RankingPage {
  perfil;
  perfilRef;
  rankingRef: AngularFirestoreCollection;
  ranking: Observable<any>;

  page = 1;
  quantidade = 10;

  constructor(
    public navCtrl: NavController,
    private navParam: NavParams,
    private auth: AuthProvider,
    private elos: EloProvider,
    private db: AngularFirestore
  ) {
    const user = this.auth.user;

    this.perfilRef = this.db.doc(`perfis/${user.email}`);

    
  }

  ionViewWillLoad() {
    this.perfilRef.valueChanges().subscribe(data => {
      this.perfil = data;

      if (!this.perfil) {
        console.log("Ranking: Erro no perfil");
        return;
      }
      this.rankingRef = this.db.collection("perfis", ref =>
        ref
          .where("admin", "==", this.perfil.admin)
          .orderBy(this.perfil.admin ? "pontos_admin" : "pontos", "desc")
      );

      this.ranking = this.rankingRef.valueChanges();
    });
  }
}
