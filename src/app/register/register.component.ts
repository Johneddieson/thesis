import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, validateEventsArray } from '@angular/fire/firestore';
import {FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup;
submitted: boolean = false;  
constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth, private alertCtrl: AlertController, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      middlename: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]),
      surname: new FormControl('', [
        Validators.required,
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
          message: "Please Input a Philippine Phone Number Validation",
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

        this.afauth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
        .then(res => {
          res.user.updateProfile({
            displayName: 'admin'
          }).then(() => {
            this.afstore.doc(`users/${res.user.uid}`).set({
              firstname: this.registerForm.value.firstname,
              middlename: this.registerForm.value.middlename,
              surname: this.registerForm.value.surname,
              cellphonenumber: this.registerForm.value.cellphonenumber,
              email: this.registerForm.value.email,
              password: this.registerForm.value.password

            })
            
          })
        })
      }
  }

  


  async dismiss() {
    return await this.modalCtrl.dismiss();
  }
  
}
