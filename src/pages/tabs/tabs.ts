import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ConfigPage } from '../config/config';
import { RankingPage } from '../ranking/ranking';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ContactPage;
  tab2Root = AboutPage;
  tab3Root = RankingPage;
  tab4Root = ConfigPage;


  constructor() {

  }
}
