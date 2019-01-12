import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase';
import { AuthProvider } from '../providers/auth/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(platform: Platform,
    private afAuth: AngularFireAuth, private auth: AuthProvider, statusBar: StatusBar, splashScreen: SplashScreen,
   ) {

    setTimeout(()  => {
      this.authVerify();
    }, 2000);
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  authVerify() {
    this.afAuth.user.subscribe(user => {
      console.log(user);
      if(!user){
        this.rootPage = WelcomePage;
      }else{
        this.auth.user = user;
        this.rootPage = TabsPage;
      }
    });
  }
}
