
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaisesListaComponent } from './paises/paises-lista/paises-lista.component';

import { LoginComponentComponent } from './login-component/login-component.component';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { AuthGuard } from './auth-guard.service';
import {TypeofpartnerListComponent} from './typeofpartner/typeofpartner-list/typeofpartner-list.component';
import {TypeofcustomerListComponent} from "./typeofcustomer/typeofcustomer-list/typeofcustomer-list.component";
import {CyclecutListComponent} from "./cyclecut/cyclecut-list/cyclecut-list.component";
import {PlanListComponent} from "./typeofplan/plan-list/plan-list.component";

const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegistrationComponentComponent },
  { path: 'paises-lista', canActivate: [AuthGuard], component: PaisesListaComponent },
  { path: 'partner-list', canActivate: [AuthGuard], component: TypeofpartnerListComponent },
  { path: 'customer-list', canActivate: [AuthGuard], component: TypeofcustomerListComponent },
  { path: 'cyclecut-list', canActivate: [AuthGuard], component: CyclecutListComponent },
  { path: 'plan-list', canActivate: [AuthGuard], component: PlanListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
