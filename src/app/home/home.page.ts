import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';


import { Plugins, PushNotification, PushNotificationToken } from '@capacitor/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessengerService } from '../services/messenger.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  todos=[];
  token: string;

  constructor(
    private todoService: TodoService,
    private db: AngularFirestore,
    private messageService: MessengerService,
    private toasController: ToastController
    ){}
  
  ngOnInit(){

    this.requestPermissions();

    this.todoService.getTodos().subscribe((todos) =>{
      this.todos = todos;
    });

    Plugins.PushNotifications.addListener('registration', (token: PushNotificationToken)=>{
      console.log("Token "+JSON.stringify(token));
      this.token = token.value;
      this.saveTokenInFirebase();
    });


    // Listener recepcion solo recibe peticion
    Plugins.PushNotifications.addListener('pushNotificationReceived', async (notificacion: PushNotification)=>{
      // Injectar servicio de toast y meter dentro la info que viene en la notificacion que me regresa el listener
      console.log("NOTIFICACION LLEGA: "+ JSON.stringify(notificacion));
      
      const toast = await this.toasController.create({
        message: `Notificacion recibida: ${notificacion.title}`,
        duration: 2000
      });

      toast.present();
    });

  }

  // Guardar token sobreescribiendolo si ya 
  saveTokenInFirebase(){
    // Donde guardar en el mismo documento/ identificador
    // this.db.collection('tokens').add({token: this.token})
    this.messageService.saveToken(this.token);

    /* this.db.collection('tokens').doc(this.token).set({token: this.token})
    .then(console.log).catch(console.log); */

  }

  // Metodo que se llama cuando se quiere registrar los permisos para que se capture el evento de registro
  requestPermissions(){
    // Promesa vacia
    Plugins.PushNotifications.register().then(()=>{
      console.log('Solicitando permisos');
    });
  }

    // Usando el servicio injectado envia notificacion al api para que esa envie el mensaje al celuco
  sendNotification(token){
    this.messageService.sendNotification(token).then(console.log).catch(console.log);
  }

  onRemove(idTask:string){
    this.todoService.removeTodo(idTask);
  }
 
}


