import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroUniComponent } from './registro-uni/registro-uni.component';
const routes: Routes = [
  {path:"", component:RegistroUniComponent},  
  {path:"", component:InicioComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
