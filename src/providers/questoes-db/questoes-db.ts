import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
 } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
  userId: string;
};

@Injectable()
export class QuestoesDbProvider {
  private admin: Observable<Questao[]>;
  private Collection: AngularFirestoreCollection<Questao>;
  

  constructor(private db: AngularFirestore) {
    this.Collection = db.collection<Questao>("questoes");
  }

  setupAdmin(userId){
    //this.admin = this.Collection.ref.orderBy("userId").isEqual(userId)
    this.admin = this.db.collection<Questao>("questoes", ref => ref.where("userId","==", userId))
    .snapshotChanges().pipe(
      map(action =>{
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        })
      })
    );
  }

  add(questao: Questao){
    return this.Collection.add(questao);
  }



  adminHistorico(){
    return this.admin;
  }

}
