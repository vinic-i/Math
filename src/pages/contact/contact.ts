import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
import { EloProvider } from '../../providers/elo/elo';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

  perfilRef: AngularFirestoreDocument;
  eloCollectionRef: AngularFirestoreCollection;

  p;

  elo;

  constructor(public navCtrl: NavController,
    private auth: AuthProvider,
    private elos: EloProvider,
    private db: AngularFirestore) {
      const user = this.auth.user;

      this.perfilRef = this.db.doc(`perfis/${user.email}`);
      this.eloCollectionRef = this.db.collection<any>(`regras/elos/elos`);
  }


  async ngOnInit() {
    try{
      await this.loadPerfil();
    }catch(err) {

    }

  }

  async loadPerfil() {
    let aPerfil = await this.perfilRef.get().toPromise();
    this.p = aPerfil.data();

    this.elos.eloCollectionRef.valueChanges()
    .subscribe(list => {
      console.log(list);
      this.elo = this.elos.calcularElo(this.p, list);
    });    
  }

}
