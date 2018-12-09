import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarPage } from './criar';

@NgModule({
  declarations: [
    CriarPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarPage),
  ],
})
export class CriarPageModule {}
