import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import {NavController, Platform} from '@ionic/angular'
import {Geolocation} from '@ionic-native/geolocation/ngx'
import { Observable, Subscription } from 'rxjs';

import { filter } from 'rxjs/operators';
import { browser } from 'protractor';
declare var google;
   //   this.markers.map(marker => marker.setMap(null))
  //   this.markers = [] 
  //   this.latitude = data.coords.latitude;
  //   this.longitude = data.coords.longitude;
        
  // let latlng = new google.maps.LatLng(this.latitude, this.longitude)
  //     let mapOptions = {
  //      center: latlng,
  //       zoom: 20,
        
  //       disableDefaultUI: true,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
  //     let marker = new google.maps.Marker({
  //     animation: google.maps.Animation.DROP,
  //     position: latlng
  //     })
  //     this.markers.push(marker)
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
 
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
 
  positionSubscription: Subscription;
 
  constructor(public navCtrl: NavController, private plt: Platform, private geolocation: Geolocation) { }
 
  ngOnInit() {
    this.ionViewDidLoad()
    
  
  }
  ionViewDidLoad() {
    this.plt.ready().then(() => {
     // this.loadHistoricRoutes();
 
      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.isTracking = true;
      this.trackedRoute = [];
      this.positionSubscription = this.geolocation.watchPosition({enableHighAccuracy: true, maximumAge: 3000, timeout: 5000})
        .pipe(
          filter((p: any) => p.coords !== undefined) //Filter Out Errors
        )
        .subscribe(data => {
          setTimeout(() => {
               let latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
            this.redrawPath(this.trackedRoute);
          }, 0);
        });
        var trialLat = new google.maps.LatLng(17.6022296, 121.6894202)
        this.map.setCenter(trialLat);    
           this.map.setZoom(6);     
    });
  }
 
  // loadHistoricRoutes() {
  //   this.storage.get('routes').then(data => {
  //     if (data) {
  //       this.previousTracks = data;
  //     }
  //   });
  // }
  
// startTracking() {
//     this.isTracking = true;
//     this.trackedRoute = [];
 
//     this.positionSubscription = this.geolocation.watchPosition()
//       .pipe(
//         filter((p: any) => p.coords !== undefined) //Filter Out Errors
//       )
//       .subscribe(data => {
//         setTimeout(() => {
//           this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
//           this.redrawPath(this.trackedRoute);
//         }, 0);
//       });
 
//   }
 
  redrawPath(path) {
    for (const wew in path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }     
   // if (path.length > 1) {
      this.currentMapTrack = new google.maps.Marker({
      //  animation: google.maps.Animation.DROP,
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
    //}
  }
}

  // stopTracking() {
  //   let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
  //   this.previousTracks.push(newRoute);
   
  //   this.isTracking = false;
  //   this.positionSubscription.unsubscribe();
  //   this.currentMapTrack.setMap(null);
  // }
   
  // showHistoryRoute(route) {
  //   this.redrawPath(route);
  // }
}
