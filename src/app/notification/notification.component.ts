import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  constructor(private alertCtrl: AlertController, private popOver: PopoverController) { }

  ngOnInit() {}

  trigger() {
this.alertCtrl.create({
 header: "Warning",
 message: "Are you sure want to delete this?",
  buttons: [
    {
      text: "Yes",
      handler: () => {
        alert("Deleted")
      }
    },
    {
      text: "Cancel",
      role: "cancel",
     
    },
    
  ]
}).then(el => {
  el.present()
})
  }
 async dismiss() {
  await setTimeout(() => {
     this.popOver.dismiss()
   }, 200)
}
}
