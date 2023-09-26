import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent {

  public editar: boolean = false;
  public type: String = "password";
  public user: any = {};

  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: String = "password";
  public inputType_2: String = "password";

  public errors: any = {};

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {    
  }
  public showpassword(){
    if(this.inputType_1 == "password"){
      this.inputType_2 = "text";
    }else{
      
    }
  }

  public showPwdConfirmar(){

  }

  public registrar(){

  }

  public regresar(){
    this.location.back();
  } 
}
