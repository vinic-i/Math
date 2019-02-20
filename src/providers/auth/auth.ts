
import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  user;
  perfil;
  perfilRef;

  async Google(){
    const data = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    this.user = data.user;
  }

  async loginEmail(email, password){
    const data = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.user = data.user;
  }

  async Register(email, password){
    const data = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    console.log(data);
    this.user = data.user;
  }

  async sign_out(){
    this.user = null;
    this.perfil = null;
    this.perfilRef = null;
    await this.afAuth.auth.signOut();
  }

}
