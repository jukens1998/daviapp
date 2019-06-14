import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(private http: HttpClient) {

  }

  sendNotification(token){
   //  Observable no subscribe entonces a promise
   return this.http.post(environment.cloudFunctionsEndpoint, { token: token } ).toPromise();
  }
}
