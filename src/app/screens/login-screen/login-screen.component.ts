import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $:any;

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

  public users_registrados: any = [];

  constructor(
    private router: Router,
    public facadeService: FacadeService
  ) { }

  ngOnInit(): void {
    this.llenadousuarios();
  }

  public llenadousuarios(){
    this.users_registrados = [
      {
      'matricula': '202223500',
      'first_name': 'Ángel',
      'last_name': 'Gutiérrez',
      'email': 'qwertyuiop@gmail.com',
      'password': '1234567890',
      'confirmar_password': '1234567890',
      'fecha_nacimiento': '2004-01-05',
      'curp': 'ASDFGHJKLÑQWERTYUI',
      'rfc': 'ASDFGHJKLÑQWERTYUI',
      'edad': '19',
      'telefono': '2222',
      'ocupacion': 'Estudiante',
      }
    ];
    console.log("Ususario es: ", this.users_registrados)
  }

  public login(){
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    this.users_registrados.forEach(user => {
      if(user.email == this.username){
        if(user.password == this.password){
          alert("Usuario correcto");
          this.router.navigate(["home"]);
        }else{
          alert("Contraseña incorrecta");
        }
      }else{
        alert("Usuario incorrecto");
      }
    });
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

  public goNewLogin(){
    this.router.navigate(["nuevoLogin"]);
  }
}