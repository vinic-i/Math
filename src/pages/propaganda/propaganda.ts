import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';




/**
 * Generated class for the PropagandaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-propaganda',
  templateUrl: 'propaganda.html',
})
export class PropagandaPage {

  constructor(private admobFree: AdMobFree, private platform: Platform) {
    this.mostrarPropaganda();
  }

  ionViewDidLoad() {
    //this.mostrarPropaganda();
  }

  mostrarPropaganda() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: 'ca-app-pub-6179267970764546/1728319721',
      isTesting: true,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
  }

  showRewardVideoAds(){
          let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
              isTesting: true, // Remove in production
              autoShow: true//,
              //id: "ca-app-pub-6179267970764546/9122544262"
          };
          this.admobFree.rewardVideo.config(RewardVideoConfig);
          this.admobFree.rewardVideo.prepare().then(() => {
            alert("RewardVideoConfig");
          }).catch(e => alert(e));
      }

}
