import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

/*
  Generated class for the EloProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EloProvider {

  eloCollectionRef: AngularFirestoreCollection;
  constructor(
    private db: AngularFirestore
  ) {
      this.eloCollectionRef = this.db.collection<any>(`regras/elos/elos`);
  }

  calcularElo(perfil, elos){
    let elo = 0;
    let pontos = perfil.pontos;

    for (let i = 1; i < elos.length && pontos > 0; i++) {
      const total = elos[i-1].total;

      if(pontos > total){
        elo = i;
        pontos = pontos - total;
      }else{
      }
    }

    let estrelas = 0;
    let estrelas_totais = elos[elo].estrelas;
    let nomeElo = elos[elo].nome;

    if(pontos > 0){
      estrelas = pontos / elos[elo].estrela;
    }
    
    return {
      nome: nomeElo,
      estrelas_totais: estrelas_totais,
      estrelas: estrelas
    }
  }

}
