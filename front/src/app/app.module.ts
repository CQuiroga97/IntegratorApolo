import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
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
import {NbCardModule} from '@nebular/theme';
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
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CabezeraComponent,
    ResumenRondasComponent,
    TransmisionComponent,
    ResultadosComponent,
    DatosComponent,
    RegistroUniComponent,
    FormularioUniComponent,
    ListasUniversidadesComponent,
    LoginAdminComponent
  ],
  imports: [
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
    NbFormFieldModule,
    NbInputModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
