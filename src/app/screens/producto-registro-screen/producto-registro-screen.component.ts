import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-producto-registro-screen',
  templateUrl: './producto-registro-screen.component.html',
  styleUrls: ['./producto-registro-screen.component.scss']
})
export class ProductoRegistroScreenComponent implements OnInit {

   //Aquí van las variables
   public editar:boolean = false;
   public product: any = {};

   //Para detectar errores
   public errors:any ={};
 
 
   constructor(
     private location: Location,
     private usuariosService: UsuariosService,
     private router: Router
   ) { }
 
   ngOnInit(): void {
     this.product = this.usuariosService.esquemaProducto();
     console.log("Producto: ", this.product);
     
   }
 
   public regresar(){
     this.location.back();
   }

   public goHome(){
    this.router.navigate(["home"]);
  }
 
   public registrar(){
     //Validar
     this.errors = [];
 
     this.errors = this.usuariosService.validarProducto(this.product);
     if(!$.isEmptyObject(this.errors)){
       //Pasa la validación y sale de la función
       return false;
     }else{
      alert("Registro exitoso")
     }
   }
 
}
