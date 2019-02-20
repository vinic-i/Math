import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropagandaPage } from './propaganda';

@NgModule({
  declarations: [
    PropagandaPage,
  ],
  imports: [
    IonicPageModule.forChild(PropagandaPage),
  ],
})
export class PropagandaPageModule {}
