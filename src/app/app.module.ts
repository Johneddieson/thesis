import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Geolocation} from '@ionic-native/geolocation/ngx'
import { FormsModule } from '@angular/forms';
import {AuthGuard} from '../app/auth.guard'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp({
    apiKey: "AIzaSyCqYG-vutDdWHOj96vbRy3PpbvTMLnlkNQ",
    authDomain: "thesis-8232e.firebaseapp.com",
    projectId: "thesis-8232e",
    storageBucket: "thesis-8232e.appspot.com",
    messagingSenderId: "361196855751",
    appId: "1:361196855751:web:257d480352c0838af739e2",
    measurementId: "G-W85KYJ2MCQ"
  }), 
  FormsModule],
  providers: [AuthGuard, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
