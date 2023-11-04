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
  public mat: any = {};
  public nrc: Number = 0;
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

    if(this.activatedRoute.snapshot.params['nrc'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.nrc = this.activatedRoute.snapshot.params['nrc'];
      console.log("NRC: ", this.nrc);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerMatByNRC();
    }
    //Imprimir datos en consola
    console.log("Materia: ", this.mat);
  }

  public obtenerMatByNRC(){
    this.materiaService.getSubByNRC(this.nrc).subscribe(
      (response)=>{
        this.mat = response;
        console.log("Datos materia: ", this.mat);
      }, (error)=>{
        alert("No se pudieron obtener los datos de la materia para editar");
      }
    );
  }

  public quitarSegundos(hora: string){
    let horaFinal = hora.split(":");
    return horaFinal[0] + ":" + horaFinal[1];
  }

  public changeHora(event :any){
    console.log(event);
    console.log(event.value.toISOString());
    
    this.mat.horaInicio = event.value.toISOString().split(":")[0] + ":" + event.value.toISOString().split(":")[1];
    console.log("Hora: ", this.mat.horaInicio);
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
        this.regresar();
      }, (error)=>{
        alert("No se pudo registrar la materia");
        console.log(error);
      }
    );
  }

  public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.materiaService.validarMateria(this.mat, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.materiaService.editarMateria(this.mat).subscribe(
      (response)=>{
        alert("Materia editada correctamente");
        console.log("Materia editada: ", response);
        //Si se editó, entonces mandar al home
        this.regresar();
      }, (error)=>{
        alert("No se pudo editar la materia");
      }
    );
  }

}
