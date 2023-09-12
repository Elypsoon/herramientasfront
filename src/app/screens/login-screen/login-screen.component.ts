import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

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
  

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  public login(){
    if(this.username == ""){
      
    }else{

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

