import { PathLocationStrategy } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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
  mark = [
    { lat: 22.33159, lng: 105.63233 },
    { lat: 7.92658, lng: -12.05228 },
    { lat: 48.75606, lng: -118.859 },
    { lat: 5.19334, lng: -67.03352 },
    { lat: 12.09407, lng: 26.31618 },
    { lat: 47.92393, lng: 78.58339 }
  ];
  constructor(private afstore: AngularFirestore) { 
   
  }
ngAfterViewInit() {
  // var mark = [
  //   { lat: 22.33159, lng: 105.63233 },
  //   { lat: 7.92658, lng: -12.05228 },
  //   { lat: 48.75606, lng: -118.859 },
  //   { lat: 5.19334, lng: -67.03352 },
  //   { lat: 12.09407, lng: 26.31618 },
  //   { lat: 47.92393, lng: 78.58339 }
  // ];
  // let mapOptions = {
  //   center: 
  //   {lat: 17.6022296, lng: 121.6894202},
  //   zoom: 10,
  
  //   disableDefaultUI: true,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP
  // }
  // this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  // mark.forEach(location => {
  //   var marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(location.lat, location.lng),
  //     map: this.map
  //   });
  // });
}
  ngOnInit() {
    // let mapOptions = {
    //    center: 
    //    {lat: 17.6022296, lng: 121.6894202},
    //    zoom: 10,
     
    //    disableDefaultUI: true,
    //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //  }
    //  this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
//     this.details = JSON.parse(sessionStorage.getItem('user'))
    
//     this.meRefence = this.afstore.collection('users').doc(`${this.details.uid}`)
   
    
// this.sub = this.meRefence.valueChanges()
// .subscribe(data => {

//   this.trackedRoute.push({lat: data.latitude, lng: data.longitude})
 
// this.redrawPath(this.trackedRoute)
 
// })

// this.redrawPath(this.trackedRoute)
//  var trialLat = new google.maps.LatLng(17.6022296, 121.6894202)
//  this.map.setCenter(trialLat);    
        
var mark = [
  { lat: 22.33159, lng: 105.63233 },
  { lat: 7.92658, lng: -12.05228 },
  { lat: 48.75606, lng: -118.859 },
  { lat: 5.19334, lng: -67.03352 },
  { lat: 12.09407, lng: 26.31618 },
  { lat: 47.92393, lng: 78.58339 }
];
let mapOptions = {
  center: 
  {lat: 17.6022296, lng: 121.6894202},
  zoom: 10,

  disableDefaultUI: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}
this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

this.xamplepath(mark)
// mark.forEach(location => {
//   var marker = new google.maps.Marker({
//     position: new google.maps.LatLng(location.lat, location.lng),
//     map: this.map
//   });
// });
  
  }

  xamplepath(path) {
    // var marker = new google.maps.Marker({
    //   position: new google.maps.LatLng(location.lat, location.lng),
    //   map: this.map
    // });
    path.forEach(location => {
       var marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.lat, location.lng),
      map: this.map
    });
      
    });
  }
  redrawPath(path) {
  
    for (const wew in path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    } 
   if (path.length > 1) {
      this.currentMapTrack = new google.maps.Marker({
       animation: google.maps.Animation.DROP,
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
