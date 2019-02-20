import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { EloProvider } from '../../providers/elo/elo';
import { RankingPage } from '../ranking/ranking';
import { CriarPerfilPage } from '../criar-perfil/criar-perfil';
import { SelecionarEloPage } from '../selecionar-elo/selecionar-elo';
import { CriarPage } from '../criar/criar';
import { NiveisPage } from '../niveis/niveis';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit, OnDestroy {

  perfilRef$: AngularFirestoreDocument;
  eloCollectionRef: AngularFirestoreCollection;

  user;
  perfil;
  p;

  elo;

  eloSub;

  perfilSub;

  estrelas = [];

  constructor(public navCtrl: NavController,
    private auth: AuthProvider,
    private elos: EloProvider,
    public appCtrl: App,
    private db: AngularFirestore) {
      this.user = this.auth.user;

      this.perfilRef$ = this.db.doc(`perfis/${this.user.email}`);
      this.perfilRef$.valueChanges()
      .subscribe(data => {
        if(!data){
          this.criarPerfil();
        }else{
          this.loadPerfil(data);
        }
      });
      this.eloCollectionRef = this.db.collection<any>(`regras/elos/elos`);
  }

  criarPerfil () {
    this.appCtrl.getRootNav().setRoot(CriarPerfilPage);
  }


  ngOnInit() {
    
  }

  ngOnDestroy(){
    if(this.eloSub) this.eloSub.unsubscribe();
    if(this.perfilSub) this.perfilSub.unsubscribe();
  }

  calcularEstrelas(){
    return this.elo ? Math.floor(this.elo.estrelas) : 0;
  }

  loadPerfil(perfil) {
    
    
    this.eloSub = this.elos.eloCollectionRef.valueChanges()
    .subscribe(list => {
      this.p = perfil;        
      this.elo = this.elos.calcularElo(this.p, list);

      this.estrelas.length = 0;

      const total = this.elo.estrelas_totais;
      const val = this.calcularEstrelas();

      for (let index = 0; index < val; index++) {
        this.estrelas.push(" active");       
      }

      for (let index = 0; index < total - val; index++) {
        this.estrelas.push(" ");       
      }
    });

    this.updateAuthPerfilStatus(perfil);
  }

  updateAuthPerfilStatus(perfil){
    this.auth.perfil = perfil;
    this.auth.perfilRef = `perfis/${this.user.email}`;
  }

  valueSize(){
    return this.p.pontos < 1000 ? 'big' : 'small';
  }

  jogar (){
    this.navCtrl.push(SelecionarEloPage);
  }

  criar (){
    this.navCtrl.push(CriarPage);
  }

  goToRanking(){
    this.navCtrl.push( RankingPage, {perfil: this.p} );
  }
  
  niveis(){
    this.navCtrl.push(NiveisPage);
  }

}
