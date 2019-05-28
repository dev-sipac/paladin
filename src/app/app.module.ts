import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth.service';
import { PaisesService } from './paises/paises.service';
import { PaisesListaComponent } from './paises/paises-lista/paises-lista.component';
import { PaisesNuevoComponent } from './paises/paises-nuevo/paises-nuevo.component';

import { MyMaterialModule } from  './material.module';
import { TypeofpartnerNewComponent } from './typeofpartner/typeofpartner-new/typeofpartner-new.component';
import { TypeofpartnerListComponent } from './typeofpartner/typeofpartner-list/typeofpartner-list.component';
import {TypeofpartnerService} from "./typeofpartner/typeofpartner.service";




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponentComponent,
    LoginComponentComponent,
    PaisesListaComponent,
    PaisesNuevoComponent,
    TypeofpartnerNewComponent,
    TypeofpartnerListComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    MyMaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [AuthService, PaisesService, TypeofpartnerService],
  bootstrap: [AppComponent],
  entryComponents: [PaisesNuevoComponent, TypeofpartnerNewComponent]
})
export class AppModule { }
