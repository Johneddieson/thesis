import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-createnurse',
  templateUrl: './createnurse.page.html',
  styleUrls: ['./createnurse.page.scss'],
})
export class CreatenursePage implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;  
  details: any = []
  meReference: AngularFirestoreDocument
  sub
  constructor(private auth: AuthService, private loadingCtrl: LoadingController,private alertCtrl: AlertController, private afauth: AngularFireAuth, private afstore: AngularFirestore) {
    this.details = JSON.parse(sessionStorage.getItem('user'))
    
    this.afstore.collection('users', ref => ref.where("email", "==", this.details.email)).valueChanges()
    .subscribe(data => {
    })
   }

  ngOnInit() {
    
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Numbers is not allowed' }),
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      middlename: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Numbers is not allowed' }),
        Validators.minLength(5),
        Validators.maxLength(10)
      ]),
      surname: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Numbers is not allowed' }),
        Validators.minLength(5),
        Validators.maxLength(10)
      ]),
      cellphonenumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0&9]{2}[0-9]{9}")
    ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ])
    })
  }
  logout() {
    this.auth.SignOut()
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
      submit () { 
          this.loadingCtrl.create({
          message: "Creating New Nurse",
          }).then(loading => {
            loading.present()
            this.afauth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
            .then(res => {
              res.user.updateProfile({
                displayName: 'nurse'
              })
              .then(() => {
                this.afstore.doc(`users/${res.user.uid}`).set({
                  firstname: this.registerForm.value.firstname,
                  middlename: this.registerForm.value.middlename,
                  surname: this.registerForm.value.surname,
                  cellphonenumber: this.registerForm.value.cellphonenumber,
                  email: this.registerForm.value.email,
                  password: this.registerForm.value.password,
                  role: 'nurse',
                  onduty: false,
                  latitude: 0,
                  longitude: 0
                })    
              })                       
                setTimeout(() => {
                  loading.dismiss()
                    this.registerForm.reset()
                    this.alertCtrl.create({
                      header: "Officially Created",
                      message: `You created a nurse successfully`,
                      buttons: [
                        {
                          text: 'OK',
                          role: 'cancel'
                        }
                      ]
                    }).then(e => {
                      e.present()
                       
                    })
                }, 3000)
         
            }).catch(err => {
              this.alertCtrl.create({
                header: "Error",
                message: err,
                buttons: [
                  {
                    text: 'OK',
                    role: 'cancel'  
                  }
                ]
              }).then(el => {
                el.present()
                loading.dismiss()
              })
            })
          })
        
    } 
}
