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

addMinutes(date, datelang) {
  this.datexamp = date
  var tanga = new Date()
  var addminute = moment(date).add(30,'minutes').toDate()
var dateDeadline = moment(date).toDate()
var petsangayon = moment(this.dateToday).toDate()
var petsangayon1 = moment(tanga).toDate()
var oneminute = moment(date).add(1,'minutes').toDate()
var twominute = moment(date).add(2,'minutes').toDate()
var threeminute = moment(date).add(3,'minutes').toDate()
var fourminute = moment(date).add(4,'minutes').toDate()
var fiveminute = moment(date).add(5,'minutes').toDate()

var oneminutestring = moment(oneminute).format("YYYY-MM-DD HH:MM")
var petsastring = moment(this.dateToday).format("YYYY-MM-DD")

if (addminute > petsangayon  && datelang === petsastring)
                  
//if (oneminute == petsangayon1)
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
