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
import { EloProvider } from '../providers/elo/elo';
import { SelecionarEloPage } from '../pages/selecionar-elo/selecionar-elo';
import { ResultadoPage } from '../pages/resultado/resultado';
import { RankingPage } from '../pages/ranking/ranking';
import { VisualizarQuestaoPage } from '../pages/visualizar-questao/visualizar-questao';
import { NiveisPage } from '../pages/niveis/niveis';
import { PropagandaPage } from '../pages/propaganda/propaganda';
import { AdMobFree } from '@ionic-native/admob-free';


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
    SelecionarEloPage,
    ResultadoPage,
    RankingPage,
    VisualizarQuestaoPage,
    NiveisPage,
    PropagandaPage
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
    SelecionarEloPage,
    ResultadoPage,
    RankingPage,
    VisualizarQuestaoPage,
    NiveisPage,
    PropagandaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuestoesDbProvider,
    AuthProvider,
    EloProvider,
    AdMobFree
  ]
})
export class AppModule {}
