import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ConfigPage } from '../config/config';
import { RankingPage } from '../ranking/ranking';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { Platform } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ContactPage;
  tab2Root = AboutPage;
  tab3Root = RankingPage;
  tab4Root = ConfigPage;


  constructor(private admobFree: AdMobFree, private platform: Platform) {
    this.platform.ready().then(() => {
      this.mostrarPropaganda();
    })
    .catch(err => {
      console.log(err);
    });
  }

  mostrarPropaganda() {
    // const bannerConfig: AdMobFreeBannerConfig = {
    //   // add your config here
    //   // for the sake of this example we will just use the test config
    //   id: 'ca-app-pub-6179267970764546/1728319721',
    //   isTesting: true,
    //   autoShow: true
    // };
    // this.admobFree.banner.config(bannerConfig);

    // this.admobFree.banner.prepare()
    //   .then(() => {
    //     // banner Ad is ready
    //     // if we set autoShow to false, then we will need to call the show method here
    //   })
    //   .catch(e => console.log(e));
  }

}
