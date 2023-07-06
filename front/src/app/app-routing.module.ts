import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUniversidadesComponent } from './admin/registro-universidades/registro-universidades.component';
import { MenuAdminComponent } from './admin/menu-admin/menu-admin.component';
import { LoginGuard } from './guards/login.guard';
import { InicioComponent } from './inicio/inicio.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ListasUniversidadesComponent } from './registro-uni/listas-universidades/listas-universidades.component';
import { RegistroUniComponent } from './registro-uni/registro-uni.component';
const routes: Routes = [
  {path:"registroUni", component:RegistroUniComponent},  
  {path:"", component:InicioComponent},
  {path:"admin/registroUniversidad", component:RegistroUniComponent, canActivate:[LoginGuard], title:"Registrar universidad", children:[
    {path:"universidadesRegistradas", component:ListasUniversidadesComponent}
  ]},
  {path:"admin/menu", component:MenuAdminComponent, canActivate:[LoginGuard], title:"Menú de administrador", children:[

  ]},
  {path:"loginAdmin", component:LoginAdminComponent, title:"Login Administración"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
