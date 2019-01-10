import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  perfil: Observable<any>;

  constructor(public navCtrl: NavController,
    private auth: AuthProvider,
    private db: AngularFirestore) {
      const user = this.auth.user;

      this.perfil = this.db.doc(`perfis/${user.email}`).valueChanges();
  }

}
