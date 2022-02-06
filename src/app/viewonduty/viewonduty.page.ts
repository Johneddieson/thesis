import { PathLocationStrategy } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

declare var google;
@Component({
  selector: 'app-viewonduty',
  templateUrl: './viewonduty.page.html',
  styleUrls: ['./viewonduty.page.scss'],
})
export class ViewondutyPage implements OnInit, AfterViewInit{
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = []
  details: any = []
  meRefence: AngularFirestoreDocument
  sub;
  trackedRoute = [];
  currentMapTrack = null;
  userCollection: AngularFirestoreCollection
  collectionpangsalo
  constructor(private afstore: AngularFirestore) { 
  this.userCollection = this.afstore.collection('users', ref => ref.where("onduty", "==", true))
this.collectionpangsalo = this.userCollection.snapshotChanges()
.pipe(map(actions => actions.map(a => {
  return {
    id: a.payload.doc.id,
    ...a.payload.doc.data() as any
  }
}))).subscribe(data => {
  console.log(data)
})  
}
ngAfterViewInit() {
  
}
  ngOnInit() {
    this.details = JSON.parse(sessionStorage.getItem('user'))
        
    this.meRefence = this.afstore.collection('users').doc(`${this.details.uid}`)
    let mapOptions = {
       center: 
       {lat: 17.6022296, lng: 121.6894202},
       zoom: 10,
      
      // disableDefaultUI: true,
       mapTypeId: google.maps.MapTypeId.ROADMAP,
       mapTypeControl: false,
       streetViewControl: false,
       fullscreenControl: true
   
      }
     this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
   
    this.userCollection.valueChanges().subscribe((data => {
      data.forEach(fe => {
        console.log(fe.latitude)
        
  this.trackedRoute.push({lat: fe.latitude, lng: fe.longitude})
 
//this.redrawPath(this.trackedRoute)
      })
    }))
// this.sub = this.meRefence.valueChanges()
// .subscribe(data => {

//   this.trackedRoute.push({lat: data.latitude, lng: data.longitude})
 
// this.redrawPath(this.trackedRoute)
 
// })

this.redrawPath(this.trackedRoute)
 var trialLat = new google.maps.LatLng(17.6022296, 121.6894202)
 this.map.setCenter(trialLat);    
  }
 async redrawPath(path) {
  
    for (const wew in path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    } 
   if (path.length > 1) {
      this.currentMapTrack = await new google.maps.Marker({
      // animation: google.maps.Animation.DROP,
        position: {lat: path[wew].lat, lng: path[wew].lng},
      
      })
      // this.currentMapTrack = new google.maps.Polyline({
      //   path: path,
      //   geodesic: true,
      //   strokeColor: '#ff00ff',
      //   strokeOpacity: 1.0,
      //   strokeWeight: 3
      // });
      this.currentMapTrack.setMap(this.map);
    }
  }
}
}
