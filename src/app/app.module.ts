import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProcurandoPage } from '../pages/procurando/procurando';
import { QuestaoPage } from '../pages/questao/questao';
import { CriarPage } from '../pages/criar/criar';
import { ConfigPage } from '../pages/config/config';
import { firebase } from './firebase';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { QuestoesDbProvider } from '../providers/questoes-db/questoes-db';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { RegistrarPage } from '../pages/registrar/registrar';
import { AuthProvider } from '../providers/auth/auth';
import { CriarPerfilPage } from '../pages/criar-perfil/criar-perfil';
import { DonatePage } from '../pages/donate/donate';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProcurandoPage,
    QuestaoPage,
    CriarPage,
    ConfigPage,
    LoginPage,
    WelcomePage,
    RegistrarPage,
    CriarPerfilPage,
    DonatePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProcurandoPage,
    QuestaoPage,
    CriarPage,
    ConfigPage,
    LoginPage,
    WelcomePage,
    RegistrarPage,
    CriarPerfilPage,
    DonatePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuestoesDbProvider,
    AuthProvider
  ]
})
export class AppModule {}
