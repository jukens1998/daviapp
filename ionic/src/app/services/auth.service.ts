import { Injectable } from '@angular/core';
import {AngularFireAuth  } from "@angular/fire/auth";
import { Router } from "@angular/router";
import {of as observableOf } from 'rxjs';
import { map,filter } from 'rxjs/operators';
import {auth} from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = observableOf('123');
  user = this.AFauth.authState.pipe(
    map(authState => {
      if(!authState){
        return null;
      }else
      return  authState.uid;
    }),
  )
  constructor(private AFauth: AngularFireAuth, private router:Router) { }

  Login(email:string, password:string){

    return new Promise((resolve, rejected)=>{
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user =>{
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  logout(){
    this.AFauth.auth.signOut().then(auth =>{
      this.router.navigate(["/login"]);
    })
  }
}
