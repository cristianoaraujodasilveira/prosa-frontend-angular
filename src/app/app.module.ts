import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { PropostaComponent } from './proposta/proposta.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PropostaDetalheComponent } from "./proposta/proposta-detalhe/proposta-detalhe.component";
import { PropostaNovaComponent } from "./proposta/proposta-nova/proposta-nova.component";

import { AppComponent } from './app.component';
import { PropostaService } from './proposta/shared/proposta.service';
import { CidadeService } from './proposta/shared/cidade.service';


const ROUTES = RouterModule.forRoot([
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: 'propostas/new',
    component: PropostaNovaComponent
  },
  {
    path: 'propostas/:id',
    component: PropostaDetalheComponent
  },
  {
    path: 'propostas', 
    component: PropostaComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }    
])

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    PropostaComponent,
    PropostaDetalheComponent,
    PropostaNovaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    ROUTES
  ],
  providers: [
    PropostaService,
    CidadeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
