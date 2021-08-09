import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import * as moment from 'moment'
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-createschedule',
  templateUrl: './createschedule.page.html',
  styleUrls: ['./createschedule.page.scss'],
})
export class CreateschedulePage implements OnInit {
  scheduleForm: FormGroup;
  minimumDate;
  nurse: any[] = []
  saved: any[] = []
  details: any = []
  valueDate = new Date()
  petsa;
  nurseCollection: AngularFirestoreCollection
  constructor(private afstore: AngularFirestore, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.details = JSON.parse(sessionStorage.getItem('user'))
    this.nurseCollection = this.afstore.collection('users', ref => ref.where("email", "!=", this.details.email))
    this.nurseCollection.snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      return {
        id: a.payload.doc.id,
        ...a.payload.doc.data() as any
      }
    }))).subscribe(data => {
this.nurse = data
    })
   }
  
  ngOnInit() {
    var date = new Date()
    this.minimumDate = moment(date).format("YYYY-MM-DDThh:mm")
    this.scheduleForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Numbers is not allowed' }),
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      middlename: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Numbers is not allowed' }),
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      surname: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Numbers is not allowed' }),
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      cellphonenumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0&9]{2}[0-9]{9}")
    ]),
      
      nurse: new FormControl('', [
        Validators.required,
      ]),
      Address: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      date: new FormControl('', [
        Validators.required
      ])
    })
  }
 
  customPatternValid(config: any): ValidatorFn {
    return (control: FormControl) => {
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null
      }
    }
      }
  triggered() {
    var convert = moment(this.scheduleForm.value.date).format("DD-MMM-YYYY, hh:mm A")
    var ngayon = moment(new Date()).format("DD-MMM-YYYY, hh:mm A")   
 if (convert < ngayon)  {
    this.alertCtrl.create({
      header: "Schedule date and time invalid",
      // <img src = "../../assets/horny-removebg-preview.png" width="15px" height="15px">
      message: "The schedule date and time should not be less than the current date",
      buttons: [
        {
          text: 'OK',
          role: 'cancel'  
        }
      ]
      }).then((e) => {
        e.present();
      })
  } else {
   var arr = this.scheduleForm.value.nurse.split("&") 
    this.loadingCtrl.create({
      message: "Creating Schedule..."
    }).then(el => {
      el.present()
    
      setTimeout(() => {
        el.dismiss()
        this.afstore.collection('users').doc(`${arr[1]}`).collection("myschedule").add({
          schedulestart: convert,
          nursename: arr[0],
          patientFullname: `${this.scheduleForm.value.firstname} ${this.scheduleForm.value.middlename} ${this.scheduleForm.value.surname}`,
          patientPhoneNumber: `${this.scheduleForm.value.cellphonenumber}`,
          patientAddress: `${this.scheduleForm.value.Address}`,
          onduty: false,
          finishDuty: 'not yet',
          dateandtimearrived: "not yet done" 
    
        })
        this.scheduleForm.reset();
      }, 3000)
    
    })
  }
  }

}
