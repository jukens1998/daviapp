import { Component, OnInit } from '@angular/core';
import { TodoService } from "../../services/todo.service";
import {ActivatedRoute  } from "@angular/router";
import { NavController, LoadingController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
declare var google;


@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  mapRef=null;
  todo ={
    task:'',
    priority:0,
    evento:'',
    host:'',
    lat:0,
    lon:0
  };
  todoId=null;
  constructor(private geolocation:Geolocation, private loadingCtrl:LoadingController,private route: ActivatedRoute, private nav:NavController, private TodoService:TodoService, private loadingController:LoadingController) {

   }

  ngOnInit() {
    this.todoId= this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
    }
    this.loadMap();
  }
 async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.TodoService.getTodo(this.todoId).subscribe(res =>{
      loading.dismiss();
      this.todo = res;
    })
  }

  async saveTodo(){
    const loading = await this.loadingController.create({
      message: 'Saving...'
    });
    await loading.present();
    if (this.todoId) {
      //update
      this.TodoService.updateTodo(this.todo, this.todoId).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }else{
      //Add new
      this.TodoService.addTodo(this.todo).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }

   
  }

  onRemove(idTodo:string){
    this.TodoService.removeTodo(idTodo);
  }

  eventos = [
    {
      imagen:'1.png'
    },
    {
      imagen:'2.png'
    },
    {
      imagen:'3.png'
    },
    {
      imagen:'4.png'
    }
  ];

  hostimage(hostimage){
    
    this.todo.host=hostimage;
  }




  // google maps

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map1');    
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

  public addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Hello World!',
      draggable: true
    });
    google.maps.event.addListener(marker, 'dragend', function (evt) {
      document.getElementById('lati').innerHTML=evt.latLng.lat().toFixed(6);
      document.getElementById('long').innerHTML=evt.latLng.lng().toFixed(6);
     

  });
  }
  

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

 
}
