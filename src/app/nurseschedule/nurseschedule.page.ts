import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { $ } from 'protractor';
@Component({
  selector: 'app-nurseschedule',
  templateUrl: './nurseschedule.page.html',
  styleUrls: ['./nurseschedule.page.scss'],
})
export class NurseschedulePage implements OnInit, OnDestroy {
details: any = []
meReference: AngularFirestoreCollection 
sub
schedLoop: any[]  = []
scheduleConvertTodate;
dateToday;
timer
datexamp
constructor(private afstore: AngularFirestore) { 
    this.details = JSON.parse(sessionStorage.getItem('user'))

    this.meReference = this.afstore.collection("users").doc(`${this.details.uid}`).collection('myschedule')
    this.sub = this.meReference.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return {
          id: a.payload.doc.id,
          ...a.payload.doc.data() as any
        }
      }))
    ).subscribe(data => {
      this.schedLoop = data
       
    })
  }
convert(date) {
  return moment(date).format('D MMM YYYY hh:mm A')
}

addMinutes(date) {
  this.datexamp = date
  var addminute = moment(date).add(30,'minutes').toDate()
var dateDeadline = moment(date).toDate()
var petsangayon = moment(this.dateToday).toDate()
if (petsangayon >= dateDeadline && petsangayon <= addminute)
return true


}
take() {
  alert("Hello Nge!")
}
  ngOnInit() {
var wew = new Date()
var form = moment(wew).format("YYYY-MM-DD")
var hjaha = moment(form).toDate()


    this.timer =  setInterval(() => {
      this.dateToday = new Date()
      
    }, 100)

  }
 
  convertPresent(date) {
    var petsa = moment(date).toDate()
    
    return petsa === this.dateToday;
  }
ngOnDestroy() {
  clearInterval(this.timer)
}
}
