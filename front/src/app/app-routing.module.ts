import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUniversidadesComponent } from './admin/registro-universidades/registro-universidades.component';
import { MenuAdminComponent } from './admin/menu-admin/menu-admin.component';
import { LoginGuard } from './guards/login.guard';
import { ParticipanteGuardGuard } from './guards/participante-guard.guard';
import { InicioComponent } from './inicio/inicio.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ListasUniversidadesComponent } from './registro-uni/listas-universidades/listas-universidades.component';
import { RegistroUniComponent } from './registro-uni/registro-uni.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { LoginParticipanteComponent } from './login-participante/login-participante.component';
import { ClasificacionesComponent } from './participante/clasificaciones/clasificaciones.component';
import { PanelControlComponent } from './admin/panel-control/panel-control.component';
const routes: Routes = [
  {path:"registroUni", component:RegistroUniComponent},  
  {path:"changePassword", component:CambiarPasswordComponent},  
  {path:"", component:InicioComponent, title:"Inicio"},
  {path:"login", component:LoginParticipanteComponent},
  {path:"admin/registroUniversidad", component:RegistroUniComponent, canActivate:[LoginGuard], title:"Registrar universidad", children:[
    {path:"universidadesRegistradas", component:ListasUniversidadesComponent}
  ]},
  {path:"admin/menu", component:MenuAdminComponent, canActivate:[LoginGuard], title:"Menú de administrador", children:[

  ]},
  {path:"admin/panelControl", component:PanelControlComponent, canActivate:[LoginGuard], title:"Panel de control", children:[

  ]},
  {path:"loginAdmin", component:LoginAdminComponent, title:"Login Administración"},
  {path:"participante/clasificatorias", component:ClasificacionesComponent, title:"Ronda de clasificaciones", canActivate:[ParticipanteGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
