import { Component } from '@angular/core';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userFB;
  constructor(private firebaseAuth: FirebaseAuthService, private router: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen, ) {


    this.userFB = this.firebaseAuth.fbUser;
    if (this.userFB) {
      this.router.navigateByUrl('home')
    } else {
      this.router.navigateByUrl('login')
    }
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.firebaseAuth.logout();
  }
}
