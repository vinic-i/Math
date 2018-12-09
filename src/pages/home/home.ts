import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProcurandoPage } from '../procurando/procurando';
import { CriarPage } from '../criar/criar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  admin = true;
  constructor(public navCtrl: NavController) {

  }

  jogar (){
    this.navCtrl.push(ProcurandoPage);
  }

  criar (){
    this.navCtrl.push(CriarPage);
  }

}
