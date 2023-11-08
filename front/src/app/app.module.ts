import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbThemeModule, NbLayoutModule, NbTabsetModule, NbToastrModule, NbToastrService, NbGlobalPhysicalPosition, NbStepperModule, NbTooltipModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSidebarModule } from '@nebular/theme';
import { NbActionsModule } from '@nebular/theme';
import { NbAccordionModule } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { NbIconModule } from '@nebular/theme';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbButtonModule } from '@nebular/theme';
import {NbSelectModule} from '@nebular/theme';
import { CabezeraComponent } from './cabezera/cabezera.component';
import { ResumenRondasComponent } from './inicio/resumen-rondas/resumen-rondas.component';
import { TransmisionComponent } from './inicio/transmision/transmision.component';
import { ResultadosComponent } from './inicio/resultados/resultados.component';
import { DatosComponent } from './inicio/datos/datos.component';
import { RegistroUniComponent } from './registro-uni/registro-uni.component';
import { FormularioUniComponent } from './registro-uni/formulario-uni/formulario-uni.component';
import { ListasUniversidadesComponent } from './registro-uni/listas-universidades/listas-universidades.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { NbCardModule } from '@nebular/theme';
import { NbFormFieldModule } from '@nebular/theme';
import { NbInputModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RegistroUniversidadesComponent } from './admin/registro-universidades/registro-universidades.component';
import { MenuAdminComponent } from './admin/menu-admin/menu-admin.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogBorrarUniversidadComponent } from './dialogs/dialog-borrar-universidad/dialog-borrar-universidad.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { DialogModificarUniversidadComponent } from './dialogs/dialog-modificar-universidad/dialog-modificar-universidad.component';
import { DialogBorrarParticipanteComponent } from './dialogs/dialog-borrar-participante/dialog-borrar-participante.component';
import { DialogParticipanteComponent } from './dialogs/dialog-participante/dialog-participante.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { LoginParticipanteComponent } from './login-participante/login-participante.component';
import { ClasificacionesComponent } from './participante/clasificaciones/clasificaciones.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PanelControlComponent } from './admin/panel-control/panel-control.component';
import { ClasificatoriasComponent } from './admin/panelControl/clasificatorias/clasificatorias.component';
import { IntegralesComponent } from './participante/clasificaciones/integrales/integrales.component';
import { ResultadosCompetenciaComponent } from './resultados-competencia/resultados-competencia.component';
import { TablaResultadosComponent } from './tabla-resultados/tabla-resultados.component';
import { IngresarIntegralesComponent } from './ingresar-integrales/ingresar-integrales.component';
import { LlavesComponent } from './inicio/llaves/llaves.component';
import { IntegralesRonda2Component } from './integrales-ronda2/integrales-ronda2.component';
import { PanelEliminatoriasComponent } from './admin/panel-eliminatorias/panel-eliminatorias.component';
import { StreamSegundaRondaComponent } from './stream-segunda-ronda/stream-segunda-ronda.component';
import { SegundaRondaComponent } from './segunda-ronda/segunda-ronda.component';
import { FooterComponent } from './footer/footer.component';
// const config: SocketIoConfig = { url: 'https://integratorapi.azurewebsites.net', options: {} };
 const config: SocketIoConfig = { url: 'https://integratorapi.azurewebsites.net', options: {} }; 
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CabezeraComponent,
    ResumenRondasComponent,
    TransmisionComponent,
    ResultadosComponent,
    DatosComponent,
    FormularioUniComponent,
    ListasUniversidadesComponent,
    LoginAdminComponent,
    RegistroUniComponent,
    MenuAdminComponent,
    DialogBorrarUniversidadComponent,
    DialogModificarUniversidadComponent,
    DialogBorrarParticipanteComponent,
    DialogParticipanteComponent,
    CambiarPasswordComponent,
    LoginParticipanteComponent,
    ClasificacionesComponent,
    PanelControlComponent,
    ClasificatoriasComponent,
    IntegralesComponent,
    ResultadosCompetenciaComponent,
    TablaResultadosComponent,
    IngresarIntegralesComponent,
    LlavesComponent,
    IntegralesRonda2Component,
    PanelEliminatoriasComponent,
    StreamSegundaRondaComponent,
    SegundaRondaComponent,
    FooterComponent,


  ],
  imports: [
    NbSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbIconModule,
    NbButtonModule,
    NbSelectModule,
    NbEvaIconsModule,
    NbAccordionModule,
    NbEvaIconsModule,
    NbCardModule,
    NbStepperModule,
    NbFormFieldModule,
    NbInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbTabsetModule,
    MatTabsModule,
    NgbModule,
    MatDialogModule,
    NbTooltipModule,
    SocketIoModule.forRoot(config),
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
