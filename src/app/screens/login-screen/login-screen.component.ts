import { Component } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }
  public login(){

  }
  public showPassword(){
    
  }

}

