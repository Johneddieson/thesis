import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, validateEventsArray } from '@angular/fire/firestore';
import {FormControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup;
submitted: boolean = false;  
constructor(private loadingCtrl: LoadingController, private afstore: AngularFirestore, private afauth: AngularFireAuth, private alertCtrl: AlertController, private modalCtrl: ModalController) { 

}
  ngOnInit() {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Numbers is not allowed' }),
        //Validators.pattern(/^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/),
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
  //      Validators.pattern("^((\\+91-?)|0)?[0$9]{10}$")
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  submit () {
      if (this.registerForm.value.cellphonenumber.substring(0, 2) != "09" || this.registerForm.value.cellphonenumber.length != 11) {
          this.alertCtrl.create({
          header: "Phone Number Format Error",
          message: "Please Input a Philippine Phone Number Format",
          buttons: [
            {
              text: 'OK',
              role: 'cancel'  
            }
          ]
          }).then((e) => {
            e.present();
          })
      } 
      else {
        this.loadingCtrl.create({
        message: "Creating New User",
        }).then(el => {
          el.present()
          this.afauth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
          .then(res => {
            res.user.updateProfile({
              displayName: 'nurse'
            }).then(() => {
              this.afstore.doc(`users/${res.user.uid}`).set({
                firstname: this.registerForm.value.firstname,
                middlename: this.registerForm.value.middlename,
                surname: this.registerForm.value.surname,
                cellphonenumber: this.registerForm.value.cellphonenumber,
                email: this.registerForm.value.email,
                password: this.registerForm.value.password
              })           
              setTimeout(() => {
                  el.dismiss()
                  this.registerForm.reset()
                  this.alertCtrl.create({
                    header: "Officially Created",
                    message: "You Created A User Successfully",
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
            })
          }).catch(err => {
            console.log(err)
          })
        })
      }
  } 
async dismiss() {
return await this.modalCtrl.dismiss();
}
  
}
