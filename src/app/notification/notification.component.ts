import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  constructor(private popOver: PopoverController) { }

  ngOnInit() {}

  
 async dismiss() {
  await setTimeout(() => {
     this.popOver.dismiss()
   }, 200)
}
}
