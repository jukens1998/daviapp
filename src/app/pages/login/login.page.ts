import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string;
  constructor(private authService: AuthService, public router:Router) { }

  ngOnInit() {
  }

  onSubitLogin(){
    this.authService.Login(this.email,this.password).then(res=> {
      this.router.navigate(['/eventos']);
    }).catch(err => alert("los datos son incorrectos o no existe verifica los datos"))
  }

}
