import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import {Platform} from '@ionic/angular'
import {Geolocation} from '@ionic-native/geolocation/ngx'
import { Observable, Subscription } from 'rxjs';

import { filter } from 'rxjs/operators';
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
export class HomePage implements OnInit, OnChanges, AfterViewInit {
watch: Subscription;
latitude: number;
longitude: number;

  markers = []
map: any
obj: any
@ViewChild('map', {static: false}) mapElement: ElementRef;
  constructor(private geo: Geolocation, private platform: Platform) {
    
  }
ngOnInit(): void {

 
    
  this.watch = this.geo.watchPosition({enableHighAccuracy:false, timeout: 200000})
.pipe(
  filter((p: any) => p.coords !== undefined)
).subscribe(data => {
   let mapOptions = {
     center: 
     {lat: 14.12131231, lng: 121.231232131},
      zoom: 8,
    
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

})
 

  
}

params(lat, lng) {
  let mapOptions = {
    center: 
    {lat: 14.12131231, lng: 121.231232131},
     zoom: 8,
    
     disableDefaultUI: true,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   }
   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

}
ngAfterViewInit() {
  
}
ngOnChanges() {
  
}


}
