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

  enableButton = false;
  iosVideo = "";
  androidVideo = "ca-app-pub-6179267970764546/9122544262";

  constructor(private admob: AdMobFree, private platform: Platform) {
    
    document.addEventListener('admob.interstitial.events.CLOSE', (event) => {
      // do something

    });
  }

  ionViewDidLoad() {
  }

  mostrarVideoComRecompensa() {
    this.prepareVideo()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  }


  prepareVideo() {

    return new Promise(resolve => {
      var aID: string = "";

      if (this.platform.is("ios")) {
        aID = this.iosVideo;//your ad-id from admob for the appropriate ad-unit
      } else {
        aID = this.androidVideo;//your ad-id from admob for the appropriate ad-unit
      }

      const rewardVideoConfig: AdMobFreeRewardVideoConfig = {
        isTesting: true,
        autoShow: true,
        id: aID
      };
      console.log("AdMob enabled");
      this.admob.rewardVideo.config(rewardVideoConfig);
      this.admob.rewardVideo.prepare().then(() => {
        //if autoShow false then show here
        this.admob.rewardVideo.show();
        console.log("AdMob");

        document.addEventListener("admob.rewardvideo.events.REWARD", (event) => {
          console.log("User watched entire ad");
          //user watched the ad. REWARD THEM HERE
        });
        resolve();
      }).catch(e => console.log(e));
    });

  }

}
