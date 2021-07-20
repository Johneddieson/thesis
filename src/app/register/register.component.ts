import { Component, OnInit } from '@angular/core';
import { validateEventsArray } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup;
submitted: boolean = false;  
constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]] 
    })
  }


  async dismiss() {
    return await this.modalCtrl.dismiss();
  }
  get errorCtr() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      console.log(this.registerForm.value)
    }
  }
}
