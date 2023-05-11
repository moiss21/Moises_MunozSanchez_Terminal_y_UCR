import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstadoComponent } from './componentes/estado/estado.component';
import {RouterModule} from "@angular/router";
import { ConfigComponent } from './componentes/config/config.component';
import { LoginComponent } from './componentes/login/login.component';
import {TerminalRestService} from "./servicios/terminal-rest.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    EstadoComponent,
    ConfigComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'estado',
          component: EstadoComponent
        },
        {
          path: 'config',
          component: ConfigComponent
        },
        {path: '', redirectTo: '/login', pathMatch: 'full'},
        {path: '**', redirectTo: '/login', pathMatch: 'full'}
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
