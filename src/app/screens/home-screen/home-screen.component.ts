import { Component, OnInit, ViewChild } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';

import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent {
  public token: string = "";
  public lista_usuarios: any[] = [];
  public lista_mat: any[] = [];
  public materias: boolean = false;

  
  displayedColumns: string[] = ['matricula', 'nombre', 'email', 'fecha_nacimiento', 'edad', 'curp', 'rfc', 'telefono', 'ocupacion', 'editar', 'eliminar'];
  displayedColumnsMat: string[] = ['nrc', 'nombreMateria', 'seccion', 'dias', 'horaInicio', 'horaFinal', 'salon', 'programa', 'editar', 'eliminar'];

  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_usuarios as DatosUsuario[]);
  dataSourceMat = new MatTableDataSource<DatosMateria>(this.lista_mat as DatosMateria[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private router: Router,
    private facadeService: FacadeService,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private materiasService: MateriasService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    if(this.token == ""){
      this.router.navigate([""]);
    }
    //Mandar a ejecutar la función
    if(this.activatedRoute.snapshot.params['materias'] == undefined){
      this.obtenerUsuarios();
    }

    if(this.activatedRoute.snapshot.params['materias'] != undefined){
      this.materias = true;

      this.obtenerMaterias();
    }

    //Para paginador
    this.initPaginator();
  }

  public regresar(){
    this.location.back();
  }

  //Para paginacion
  //Paginador para Agentes
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  public goEditar(idUser: number){
    this.router.navigate(["registro/"+idUser]);
  }

  public goListaMat(){
    this.router.navigate(["home/materias"]);
  }

  public goMaterias(){
    this.router.navigate(["registro-mat/"]);
  }

  //Función para eliminar
  public delete(idUser: number){
    console.log("User:", idUser);
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idUser}, //Se pasan valores a través del componente
      height: '268px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Usuario eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Usuario no eliminado ");
        console.log("No se eliminó el usuario");
        //alert("No se eliminó el usuario");
      }
    });
  }

  public obtenerUsuarios(){
    this.usuariosService.obtenerListaUsers().subscribe(
      (response)=>{
        this.lista_usuarios = response;
        console.log("Lista users: ", this.lista_usuarios);
        if(this.lista_usuarios.length > 0){
          //Agregar datos del nombre e email
          this.lista_usuarios.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_usuarios as DatosUsuario[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    );
  }

  public obtenerMaterias(){
    this.materiasService.obtenerListaMaterias().subscribe(
      (response)=>{
        this.lista_mat = response;
        console.log("Lista materias: ", this.lista_mat);
        if(this.lista_mat.length > 0){
          this.dataSourceMat = new MatTableDataSource<DatosMateria>(this.lista_mat as DatosMateria[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    );
  }

  public logout(){
    this.facadeService.logout().subscribe(
      (response)=>{
        this.facadeService.destroyUser();
        //Navega al login
        this.router.navigate(["/"]);
      }, (error)=>{
        console.error(error);
      }
    );
  }

}

//Esto va fuera de la llave que cierra la clase
export interface DatosUsuario {
  id: number,
  matricula: number;
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string,
  curp: string,
  rfc: string,
  edad: number,
  telefono: string,
  ocupacion: string

}

export interface DatosMateria {
  nrc: number,
  nombreMateria: string;
  seccion: number;
  dias: string;
  horaInicio: string;
  horaFinal: string,
  salon: string,
  programa: string,
}