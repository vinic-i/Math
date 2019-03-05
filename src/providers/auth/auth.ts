
import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { environment } from '../../environment/environment.prod';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(
    private afAuth: AngularFireAuth, 
    private fb: Facebook,
    private gplus: GooglePlus,
    private platform: Platform) {
    console.log('Hello AuthProvider Provider');
  }

  user;
  facebookLR: FacebookLoginResponse;


  private async facebookCredential() {
    this.facebookLR = await this.fb.login(['public_profile', 'user_friends', 'email']);    
    
    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART); // Analitics
    const facebookCredential = auth.FacebookAuthProvider.credential(this.facebookLR.authResponse.accessToken);
    return facebookCredential;
  }
  
  async loginFacebook() {
    const facebookCredential = await this.facebookCredential();
    const data = await this.afAuth.auth.signInWithCredential(facebookCredential)
    this.user = data;
  }

  async Google() {
    if(this.platform.is("cordova")){
      await this.nativeGoogleLogin();
    }else{
      await this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin() {
    const gPlusUser: any = await this.gplus.login({
      'webClientId': environment.webClientId,
      'offline': true,
      'scopes': 'profile email'
    });

    return await this.afAuth.auth.signInWithCredential(
      auth.GoogleAuthProvider.credential(gPlusUser.idToken)
    )
  }

  async webGoogleLogin(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
  }

  async Register(email, password) {
    const data = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    console.log(data);
    this.user = data.user;
  }

  async loginEmail(email, password) {
    const data = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.user = data.user;
  }

  async sign_out() {
    this.user = null;
    await this.afAuth.auth.signOut();
    if(this.facebookLR){
      await this.fb.logout();
      this.facebookLR = null;
    }
    if(this.platform.is("cordova")){
      this.gplus.logout();
    }
  }
}
