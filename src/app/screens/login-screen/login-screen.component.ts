import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent {
  //Aquí se definen las variables
  //Para acceder a variables en HTML: {{variable}}
  //Para acceder a funcioenes en HTML: (click) = "nombre_fun(-argumentos-)" 
  public type: String = "password";
  public username: String = "";
  public password: String = "";

  public errors:any = {};

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public login(){
    if(this.username == ""){
      this.errors.username = "Campo requerido";
    }
    if(this.password == ""){
      this.errors.password = "Campo requerido";
    }
  }

  public showPassword(){
    if(this.type == "password"){
      this.type = "text";
    }else{
      this.type = "password";
    }
  }

  public goRegistro(){
    this.router.navigate(["registro"]);
  }


}

