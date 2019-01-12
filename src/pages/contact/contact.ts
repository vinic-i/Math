import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
import { EloProvider } from '../../providers/elo/elo';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit, OnDestroy {

  perfilRef: AngularFirestoreDocument;
  eloCollectionRef: AngularFirestoreCollection;

  p;

  elo;

  eloSub;

  perfilSub;

  constructor(public navCtrl: NavController,
    private auth: AuthProvider,
    private elos: EloProvider,
    private db: AngularFirestore) {
      const user = this.auth.user;

      this.perfilRef = this.db.doc(`perfis/${user.email}`);
      this.eloCollectionRef = this.db.collection<any>(`regras/elos/elos`);
  }


  ngOnInit() {
    try{
      this.loadPerfil();
    }catch(err) {
      console.log(err);
    }
  }

  ngOnDestroy(){
    if(this.eloSub) this.eloSub.unsubscribe();
    if(this.perfilSub) this.perfilSub.unsubscribe();
  }

  estrelas(){
    return this.elo ? Math.floor(this.elo.estrelas) : 0;
  }

  loadPerfil() {    

    this.eloSub = this.elos.eloCollectionRef.valueChanges()
    .subscribe(list => {

      if(this.perfilSub) this.perfilSub.unsubscribe();

      this.perfilSub = this.perfilRef.valueChanges()
      .subscribe(perfil => {

        this.p = perfil;        
        this.elo = this.elos.calcularElo(this.p, list);
      });
      
    });    
  }

}
