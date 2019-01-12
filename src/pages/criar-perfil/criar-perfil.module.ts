import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarPerfilPage } from './criar-perfil';

@NgModule({
  declarations: [
    CriarPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarPerfilPage),
  ],
})
export class CriarPerfilPageModule {}
