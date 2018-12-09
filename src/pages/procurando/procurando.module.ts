import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProcurandoPage } from './procurando';

@NgModule({
  declarations: [
    ProcurandoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProcurandoPage),
  ],
})
export class ProcurandoPageModule {}
