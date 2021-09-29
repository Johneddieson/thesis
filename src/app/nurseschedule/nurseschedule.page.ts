import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { $ } from 'protractor';
import { Router } from '@angular/router';
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
constructor(private afstore: AngularFirestore, private router: Router) { 
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

addMinutes(date, onduty: boolean, finish) {
  if (!onduty && finish === "not yet") {
  this.datexamp = date
  var addminute = moment(date).add(30,'minutes').toDate()
var dateDeadline = moment(date).toDate()
var petsangayon = moment(this.dateToday).toDate()
if (petsangayon >= dateDeadline && petsangayon <= addminute) 
  {
    return true
  } else {
   return false
  }
  } else {
      return false
  }
}
take(id: string) {
      var dateconvert = new Date()
    var datearrived = moment(dateconvert).format('D MMM YYYY hh:mm A')
    // this.afstore.collection('users').doc(`${this.details.uid}`).collection('myschedule').doc(`${id}`).update({
    //   finishDuty: "pending",
    //   dateandtimearrived: datearrived,
    //   onduty: true
    // })
this.router.navigateByUrl(`/nurse/home/${id}`)
}
  ngOnInit() {
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
