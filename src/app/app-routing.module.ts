import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { AcercaComponent } from './acerca/acerca.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Encuesta', component: EncuestaComponent },
  { path: 'Resultados', component: ResultadosComponent },
  {path: 'Acerca de', component: AcercaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
