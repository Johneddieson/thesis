import { PathLocationStrategy } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
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
  meReferenceCollection: AngularFirestoreCollection
  sub;
  trackedRoute = [];
  currentMapTrack = null;
  onduty: any[] = []

  constructor(private afstore: AngularFirestore,
    ) { 
    
  this.details = JSON.parse(sessionStorage.getItem('user'))
 
this.meRefence = this.afstore.collection('users').doc(`${this.details.uid}`)
this.meReferenceCollection = this.afstore.collection('users', ref => ref.where('onduty', '==', true))
this.sub = this.meReferenceCollection.snapshotChanges()
.pipe(map(actions => actions.map(a => {
  return {
    id: a.payload.doc.id,
    ...a.payload.doc.data() as any
  }
}))).subscribe(data => {
  console.log(data)
this.onduty = data
})

}
ngAfterViewInit() {
  var bounds = new google.maps.LatLngBounds();
  

  this.sub = this.meRefence.valueChanges().subscribe((data) => {

    let mapOptions = {
      center: 
      {lat: 17.6022296, lng: 121.7270206},
      zoom: 10,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);    
   
var locations = [
  ['Bondi Beach', data.latitude, data.longitude, 4],
  ['Coogee Beach', 17.6337081, 121.7453187, 5],
  // ['Cronulla Beach', -34.028249, 151.157507, 3],
  // ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  // ['Maroubra Beach', -33.950198, 151.259302, 1]
];

var marker, i;

for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: this.map
    });
  
    bounds.extend(marker.position)

}
 })
  
 
}
  ngOnInit() {
//   //   let mapOptions = {
//   //     zoom: 13,
//   //     mapTypeId: google.maps.MapTypeId.ROADMAP,
//   //     mapTypeControl: false,
//   //     streetViewControl: false,
//   //     fullscreenControl: true,
//   //     center: {lat: 17.6022296, lng: 121.6894202}
//   //   }
//   //   this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
//   //   this.sub = this.meRefence.valueChanges().subscribe(data => {
//   //   this.trackedRoute.push({lat: data.latitude, lng: data.longitude})
  
//   //   this.redrawPath(this.trackedRoute)  
//   // })
//   //   this.redrawPath(this.trackedRoute)

   
//   let mapOptions = {
//     center: 
//     {lat: 17.6022296, lng: 121.6894202},
//     zoom: 10,
  
//     disableDefaultUI: true,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   }
//   this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
 
//  this.sub = this.meRefence.valueChanges().subscribe((data) => {
//   var mark = [
//     // { lat: 22.33159, lng: 105.63233 },
//     // { lat: 7.92658, lng: -12.05228 },
//     // { lat: 48.75606, lng: -118.859 },
//     // { lat: 5.19334, lng: -67.03352 },
//     // { lat: 12.09407, lng: 26.31618 },
//     {lat: 17.6022296, lng: 121.6894202},
//     { lat: data.latitude, lng: data.longitude }
//   ];
//   mark.forEach(location => {
   
//     var marker = new google.maps.Marker({
//       position: new google.maps.LatLng(location.lat, location.lng),
//     //  map: this.map
//     });
//     marker.setMap(this.map)
//   });
//  })
  
 


  }
  updatemylocation() {
    this.meRefence.update({
      latitude: 17.6120856,
      longitude: 121.724421
    })
  }
  redrawPath(path) {
    for (const wew in path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }     
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Marker({
        position: {lat: path[wew].lat, lng: path[wew].lng},
      })
      this.currentMapTrack.setMap(this.map);
    }
  }
}
  

  
}
