import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LoadingController } from "@ionic/angular";

declare var google;

var icon = {
  url: "https://freepngimg.com/download/map/66970-map-google-icons-house-maps-computer-marker.png", // url
  scaledSize: new google.maps.Size(50, 50), // scaled size
  origin: new google.maps.Point(0,0), // origin
  anchor: new google.maps.Point(0, 0) // anchor
};
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  mapRef=null;
  constructor(private geolocation:Geolocation, private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMaker(myLatLng.lat, myLatLng.lng);
    });
  }

  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Hello World!',
      icon: icon,
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  //---------------------
  evento1:{
    iamge:'1.png',
    lat:5.029017339689602,
    long:-73.99196186928243
  }
  images =['1.png','2.png','3.png','4.png'];

  
}
