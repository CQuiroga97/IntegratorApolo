import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUniversidadesComponent } from './admin/registro-universidades/registro-universidades.component';
import { LoginGuard } from './guards/login.guard';
import { InicioComponent } from './inicio/inicio.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegistroUniComponent } from './registro-uni/registro-uni.component';
const routes: Routes = [
  {path:"registroUni", component:RegistroUniComponent},  
  {path:"", component:InicioComponent, canActivate:[LoginGuard]},
  {path:"admin/registroUniversidad", component:RegistroUniComponent, canActivate:[LoginGuard]},
  {path:"loginAdmin", component:LoginAdminComponent, title:"Login Administración"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
