import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

/*
  Generated class for the QuestoesDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


export interface Questao{
  titulo: string;
  nivel: string;
  enunciado: string;
  resposta: string;
  opcoes: string[];
  autor: string;
};

@Injectable()
export class QuestoesDbProvider {

  private Collection: AngularFirestoreCollection<Questao>;
  

  constructor(private db: AngularFirestore) {
    this.Collection = db.collection<Questao>("questoes");
  }

  add(questao: Questao){
    return this.Collection.add(questao);
  }

}
