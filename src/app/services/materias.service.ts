import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaMateria(){
    return {
      'nrc': '',
      'nombreMateria': '',
      'seccion': '',
      'dias': '',
      'horaInicio': '',
      'horaFin': '',
      'salon': '',
      'programa': ''
    }
  }

  public validarMateria(data: any, editar: boolean){
    console.log("Validando materia... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["nrc"])){
      error["nrc"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["nrc"])){
      error["nrc"] = this.errorService.numeric;
    }

    if(!this.validatorService.required(data["nombreMateria"])){
      error["nombreMateria"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["seccion"])){
      error["seccion"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["seccion"])){
      error["seccion"] = this.errorService.numeric;
    }

    if(!editar){
      
    }

    if(!this.validatorService.required(data["dias"])){
      error["dias"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["horaInicio"])){
      error["horaInicio"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["horaFin"])){
      error["horaFin"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["salon"])){
      error["salon"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["programa"])){
      error["programa"] = this.errorService.required;
    }

    return error;
    
  }

  public registrarMateria (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/materias/`,data, httpOptions);
  }

  public obtenerListaMaterias (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, {headers:headers});
  }
  
}
