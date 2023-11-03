import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})
export class MateriasScreenComponent {

  //Aquí van las variables
  public editar:boolean = false;
  public idUser: Number = 0;
  public mat: any = {};
  public array_user: any[] = [];
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  //Para detectar errores
  public errors:any ={};

  constructor(
    private materiaService: MateriasService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.mat = this.materiaService.esquemaMateria();
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.materiaService.validarMateria(this.mat, this.editar);
    if(!$.isEmptyObject(this.errors)){
      //Pasa la validación y sale de la función
      return false;
    }

    this.materiaService.registrarMateria(this.mat).subscribe(
      (response)=>{
        alert("Materia registrada correctamente");
        console.log("Materia registrada: ", response);
        this.router.navigate(["/"]);
      }, (error)=>{
        alert("No se pudo registrar la materia");
        console.log(error);
      }
    );
  }

  public actualizar(){
    
  }

}
