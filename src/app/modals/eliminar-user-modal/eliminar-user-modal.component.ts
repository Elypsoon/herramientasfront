import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MateriasService } from 'src/app/services/materias.service';


@Component({
  selector: 'app-eliminar-user-modal',
  templateUrl: './eliminar-user-modal.component.html',
  styleUrls: ['./eliminar-user-modal.component.scss']
})
export class EliminarUserModalComponent implements OnInit {
  //public idUsuario: Number = 0;
  public bandera: boolean = false;

  constructor(
    public ususariosService: UsuariosService,
    public materiasService: MateriasService,
    private dialogRef: MatDialogRef<EliminarUserModalComponent>,
    private dialogRefMat: MatDialogRef<EliminarUserModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("Llave: ", this.data);
    console.log(window.location.pathname);
    if(window.location.pathname == "/home/materias"){
      this.bandera = true;
    }
  }

  public cerrar_modal(){
    this.dialogRefMat.close({isDelete:false});
  }

  public eliminarUser(){
    this.ususariosService.eliminarUsuario(this.data.id).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      }, (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }

  public eliminarMat(){
    this.materiasService.eliminarMateria(this.data.nrc).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRefMat.close({isDelete:true});
      }, (error)=>{
        this.dialogRefMat.close({isDelete:false});
      }
    );
  }

}