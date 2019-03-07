import { Component, ElementRef, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";
import {
  QuestoesDbProvider,
  Questao
} from "../../providers/questoes-db/questoes-db";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Subscription } from "rxjs";

/**
 * Generated class for the CriarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-criar",
  templateUrl: "criar.html"
})
export class CriarPage {
  // Firestore
  perfilRef: AngularFirestoreDocument;
  pontos_professorRef: AngularFirestoreDocument;
  pontos_admin;
  perfil;
  pontosAtualizados = false;
  subPerfil: Subscription;
  subPontosProfessor: Subscription;

  
  // Inputs
  form: FormGroup;
  userId;
  titulo = '';
  nivel;
  enunciado = '';
  resposta;
  opcoes = ["", "", "", "", ""];
  autor;
  mostrarAutor = true;


  // Visual effects
  @ViewChild('tituloInput') tituloInput: ElementRef;
  @ViewChild('enunciadoInput') enunciadoInput: ElementRef;
  @ViewChild('math') math: ElementRef;
  @ViewChild('fab') fab: ElementRef;
  @ViewChild(Slides) slides: Slides;
  showAddButton = true;
  opcoesSimples = [
    "$ x^n $ ",
    "$ \\frac{x}{y} $",
    "$ \\sqrt {x} $"
  ]



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private auth: AuthProvider,
    private db: QuestoesDbProvider,
    public toastCtrl: ToastController,
    private af: AngularFirestore
  ) {
    const user = this.auth.user;
    this.userId = user.uid;

    this.perfilRef = this.af.doc(`perfis/${user.email}`);
    this.pontos_professorRef = this.af.doc('regras/pontos_professor');

    this.subPerfil = this.perfilRef.valueChanges().subscribe(perfil => {
      this.autor = perfil.nome;
      this.pontos_admin = perfil.pontos_admin;
      this.perfil = perfil;
    });

    this.form = this.formBuilder.group({
      titulo: [""],
      nivel: [""],
      enunciado: [""],
      resposta: [""],
      opcoes: [""],
      a: [""],
      b: [""],
      c: [""],
      d: [""],
      e: [""],
      mostrarAutor: [""]
    });

  }

  formSub: Subscription;
  ionViewDidLoad() {
    console.log("ionViewDidLoad CriarPage");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.fab.nativeElement]);

    this.formSub = this.form.valueChanges.subscribe(() => {
      this.math.nativeElement.innerHTML = this.enunciado;
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.math.nativeElement]);
    })
    
    this.slides.lockSwipes(true);
  }

  ionViewWillLeave() {
    this.formSub.unsubscribe();
    if(this.subPerfil){
      this.subPerfil.unsubscribe();
    }
    if(this.subPontosProfessor){
      this.subPontosProfessor.unsubscribe();
    }
  }

  addSimbulo(simbolo){
    this.enunciado = this.enunciado + simbolo;
    this.enunciadoVisClick();
  }

  visualizar() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 500);
    this.slides.lockSwipes(true);
  }

  editar() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 500);
    this.slides.lockSwipes(true);
  }

  tituloVisClick(){
    this.editar();
    setTimeout(() => {
      if(this.tituloInput)
        this.tituloInput['_elementRef'].nativeElement.children[0].focus();
    },150);
  }

  enunciadoVisClick(){
    this.editar();
    setTimeout(() => {
      if(this.enunciadoInput)
        this.enunciadoInput['_elementRef'].nativeElement.children[0].focus();
    },150);
  }

  slideModou() {
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex == 0){
      this.showAddButton = true;
    }else{
      this.showAddButton = false;
    }
    console.log('Current index is', currentIndex);
  }

  salvar() {
    let questao: Questao = {
      titulo: this.titulo,
      autor: this.autor,
      enunciado: this.enunciado,
      nivel: this.nivel,
      opcoes: this.opcoes,
      resposta: this.resposta,
      userId: this.userId,
      mostrarAutor: this.mostrarAutor,      
    };

    this.db.add(questao)
    .then(async resultado => {
      const toast = this.toastCtrl.create({
        message: "Questão criada com sucesso",
        duration: 3000
      });
      toast.present();

      this.subPontosProfessor = this.pontos_professorRef.valueChanges()
      .subscribe(async pontosPF =>  {
        console.log(pontosPF);
        if(!this.pontosAtualizados)
        {
          
          this.perfil.pontos_admin = Number(this.pontos_admin) + Number(pontosPF[questao.nivel]);

          await this.perfilRef.set(this.perfil);
          this.pontosAtualizados = true;
        }
        this.navCtrl.pop();        
      } ) 

    });
  }
}
