
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaisesListaComponent } from './paises/paises-lista/paises-lista.component';

import { LoginComponentComponent } from './login-component/login-component.component';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { AuthGuard } from './auth-guard.service';
import {TypeofpartnerListComponent} from './typeofpartner/typeofpartner-list/typeofpartner-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegistrationComponentComponent },
  { path: 'paises-lista', canActivate: [AuthGuard], component: PaisesListaComponent },
  { path: 'partner-list', canActivate: [AuthGuard], component: TypeofpartnerListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
