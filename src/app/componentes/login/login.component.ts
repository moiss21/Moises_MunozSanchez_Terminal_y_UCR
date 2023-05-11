import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TerminalRestService} from "../../servicios/terminal-rest.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //--Login BOOLEAN VARIABLES--//
  checkingSpinner : any = false;

  //--Login HEADER Status Text--//
  loginStatusText: any = "TAPSD DIspositive";

  //--BBDD VARIABLES FOR LOGIN--//
  bbddCredentials: any = undefined;
  bbddStatus: boolean = false;

  //--BOOLEANS PARA COMPROBAR CREDENCIALES--//
  isUsernameValid : any = true;
  isPasswordValid : any = true;

  constructor(private router: Router, private route: ActivatedRoute, private terminalrest: TerminalRestService) { }

  ngOnInit()
  {
    this.passwordVisibilityFunction();
    this.getBBDDcredentials();
    this.checkCredentials()
    console.log(localStorage.getItem("usernameLS"))
  }

  async getBBDDcredentials() {
    while (true) { // bucle infinito
      try {
        this.loginStatusText = "TAPSD Dispositive"
        this.bbddStatus = false;
        this.checkingSpinner = false;
        this.bbddCredentials = await this.terminalrest.getTerminal().toPromise();
        break; // si se ejecuta sin errores, salimos del bucle
      } catch (error) {
        this.loginStatusText = "Error BBDD connection"
        this.bbddStatus = true;
        this.checkingSpinner = true;
        console.error('Error al obtener las credenciales de la BBDD:', error);
        await new Promise(resolve => setTimeout(resolve, 5000)); // esperamos 5 segundos antes de volver a intentarlo
      }
    }
  }

  checkCredentials()
  {

    let login = document.querySelector("#login") as HTMLElement | any;
    login.addEventListener('submit', (event : any) =>
    {

      //--SPINNER COMIENZA EN PETICION A BBDD LOCAL--//
      this.checkingSpinner = true;

      event.preventDefault()

      let inputUsername = (<HTMLInputElement>document.getElementById("username")) as HTMLElement | any;
      let inputPassword = (<HTMLInputElement>document.getElementById("password")) as HTMLElement | any;

      if (!login.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      login.classList.add('was-validated')

      //--SE ESTABLECEN BOOLEANOS EN RELACIÓN A LA COMPARACIÓN DE LAS CREDENCIALES ENVIADAS--/
      //Si las credenciales coinciden, se continúa adelante, si no, se pone el booleano correspondiente a false.
      if(inputUsername.value != this.bbddCredentials[0].username  && inputUsername.value != "")
      {
        inputUsername.value = "";
        this.isUsernameValid = false;
      }
      else
      {
        this.isUsernameValid = true;
      }

      if(inputPassword.value != this.bbddCredentials[0].password && inputPassword.value != "")
      {
        inputPassword.value = "";
        this.isPasswordValid = false;
      }
      else
      {
        this.isPasswordValid = true;
      }

      //--REDIRIGIMOS A LA ZONA DE CONFIGURACIÓN Y ESTADO EN CASO DE SER CORRECTAS LAS CREDENCIALES--//
      if(inputPassword.value == this.bbddCredentials[0].password && inputUsername.value == this.bbddCredentials[0].username)
      {
        localStorage.setItem('usernameLS', inputUsername.value)
        localStorage.setItem('passwordLS', inputPassword.value)
        console.log(inputPassword)
        this.checkingSpinner = false;
        window.location.reload();
      }
      else
      {
        this.checkingSpinner = false;
      }

    }, false)
  }

  passwordVisibilityFunction() {

    let x = document.getElementById("password") as HTMLElement | any;
    let show_eye = document.getElementById("show_eye") as HTMLElement | any;
    let hide_eye = document.getElementById("hide_eye") as HTMLElement | any;
    hide_eye.classList.remove("d-none");
    if (x.type === "password")
    {
      x.type = "text";
      show_eye.style.display = "none";
      hide_eye.style.display = "block";
    }
    else
    {
      x.type = "password";
      show_eye.style.display = "block";
      hide_eye.style.display = "none";
    }
  }
}
