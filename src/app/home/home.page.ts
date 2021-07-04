import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import {Platform} from '@ionic/angular'
import {Geolocation} from '@ionic-native/geolocation/ngx'
import { Observable } from 'rxjs';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnChanges, AfterViewInit {
watch: Observable<any>;
latitude: number;
longitude: number;
  markers = []
map: any
@ViewChild('map', {static: false}) mapElement: ElementRef;
  constructor(private geo: Geolocation, private platform: Platform) {
    
  }
ngOnInit(): void {

  this.platform.ready().then(() => {



    
  this.watch = this.geo.watchPosition({enableHighAccuracy:false, timeout: 200000})


  this.watch
  .subscribe(data => {
    this.markers.map(marker => marker.setMap(null))
    this.markers = [] 
    this.latitude = data.coords.latitude;
    this.longitude = data.coords.longitude;
        
  let latlng = new google.maps.LatLng(this.latitude, this.longitude)
      let mapOptions = {
       center: latlng,
        zoom: 20,
        
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      let marker = new google.maps.Marker({
        map: this.map,
      animation: google.maps.Animation.DROP,
      position: latlng
      })
      this.markers.push(marker)
  })

  })

  
}
ngAfterViewInit() {
  
}
ngOnChanges() {
  
}


}
