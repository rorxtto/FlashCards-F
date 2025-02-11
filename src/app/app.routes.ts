import { Routes } from '@angular/router';
import { LoginComponent } from './components/layot/login/login.component';
import { PrincipalComponent } from './components/layot/principal/principal.component';
import { MateriasdetailsComponent } from './components/materias/materiasdetails/materiasdetails.component';
import { MateriaslistComponent } from './components/materias/materiaslist/materiaslist.component';
import { MateriasComponent } from './components/materias/materias/materias.component';
import { SubmateriaslistComponent } from './components/submaterias/submateriaslist/submateriaslist.component';
import { SubmateriasdetailsComponent } from './components/submaterias/submateriasdetails/submateriasdetails.component';
import { LandingpageComponent } from './components/layot/landingpage/landingpage.component';
import { ConfiguracoesComponent } from './components/layot/configuracoes/configuracoes.component';
import { FlashcardsComponent } from './components/layot/flashcards/flashcards.component';
import { QuestoesdetailsComponent } from './components/questoes/questoesdetails/questoesdetails.component';
import { QuestoeslistComponent } from './components/questoes/questoeslist/questoeslist.component';
import { RegisterComponent } from './components/layot/register/register.component';
import { loginGuard } from './auth/login.guard';
import { ResetPasswordComponent } from './components/layot/reset-password/reset-password.component';

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "landingpage", component: LandingpageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },


  { path: "admin", component: PrincipalComponent,canActivate: [loginGuard], children: [
      { path: "materias/new", component: MateriasdetailsComponent },
      { path: "materias/edit/:id", component: MateriasdetailsComponent },
      { path: "materias", component: MateriaslistComponent },
      { path: "materiasRenderizadas", component: MateriasComponent },
      { path: "submaterias/new", component: SubmateriasdetailsComponent },
      { path: "submaterias/edit/:id", component: SubmateriasdetailsComponent },
      { path: "submaterias", component: SubmateriaslistComponent },
      { path: "configuracoes", component: ConfiguracoesComponent },
      { path: "flashcards/:id", component: FlashcardsComponent },
      { path: "questoes/new", component: QuestoesdetailsComponent },
      { path: "questoes/edit/:id", component: QuestoesdetailsComponent },
      { path: "questoes", component: QuestoeslistComponent },
    ]
  },
];
