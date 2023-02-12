import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSidebarModule } from '@nebular/theme';
import { NbActionsModule } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { NbIconModule } from '@nebular/theme';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbButtonModule } from '@nebular/theme';
import { CabezeraComponent } from './cabezera/cabezera.component';
import { ResumenRondasComponent } from './inicio/resumen-rondas/resumen-rondas.component';
import { TransmisionComponent } from './inicio/transmision/transmision.component';
import { ResultadosComponent } from './inicio/resultados/resultados.component';
import { DatosComponent } from './inicio/datos/datos.component';
import { RegistroUniComponent } from './registro-uni/registro-uni.component';
import { FormularioUniComponent } from './registro-uni/formulario-uni/formulario-uni.component';
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
    FormularioUniComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbIconModule,
    NbButtonModule,
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
