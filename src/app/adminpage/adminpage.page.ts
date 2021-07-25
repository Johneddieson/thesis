import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { userInfo } from 'os';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.page.html',
  styleUrls: ['./adminpage.page.scss'],
})
export class AdminpagePage implements OnInit {

  constructor(private afauth: AngularFireAuth) {
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        
      }
    })
   }

  ngOnInit() {
  }

}
