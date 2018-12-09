import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestoesDbProvider, Questao } from '../../providers/questoes-db/questoes-db';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the CriarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar',
  templateUrl: 'criar.html',
})
export class CriarPage {

form: FormGroup;

  titulo;
  nivel;
  enunciado;
  resposta;
  opcoes = ["","","","",""];
  autor;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private db: QuestoesDbProvider,
    public toastCtrl: ToastController
  ) {
    this.form = this.formBuilder.group({
      titulo: [''],
      nivel: [''],
      enunciado: [''],
      resposta: [''],
      opcoes: [''],
      autor: [''],
      a: [''],
      b: [''],
      c: [''],
      d: [''],
      e: [''],
    });
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CriarPage');
  }

  salvar(){
    let questao: Questao = {
      titulo: this.titulo,
      autor: this.autor,
      enunciado: this.enunciado,
      nivel: this.nivel,
      opcoes: this.opcoes,
      resposta: this.resposta
    };

    this.db.add(questao)
    .then(resultado=>{
      const toast = this.toastCtrl.create({
        message: 'Questão criada com sucesso',
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop();
    });
  }

}
