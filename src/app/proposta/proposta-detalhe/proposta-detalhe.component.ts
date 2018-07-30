import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Proposta } from '../shared/proposta.model';
import { PropostaService } from "../shared/proposta.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'proposta-detalhe',
    templateUrl: './proposta-detalhe.component.html'
})

export class PropostaDetalheComponent implements OnInit, AfterViewInit{  
  public form: FormGroup;
  public proposta: Proposta;  

  public constructor(
    private propostaService: PropostaService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ){
    this.form = this.formBuilder.group({
      nome: [null,Validators.required], 
      descricao: [null,Validators.required], 
      valor: [null,Validators.required], 
      cidade_id: [null,Validators.required], 
      inicio: [null,Validators.required], 
      fim: [null,Validators.required]   
    })
  }

  public ngOnInit(){
    this.proposta = new Proposta(null,null,null,null,null,null,null);
    this.route.params
      .switchMap((params: Params) => this.propostaService.getProposta(+params['id']))
      .subscribe(
        proposta => this.setProposta(proposta),
        error => alert( "Ocorreu um erro no servidor, tente mais tarde" )
      )
  }

  public setProposta( proposta: Proposta ): void {
    this.proposta = proposta;
    let formModel = {
      nome: proposta.nome || null, 
      descricao: proposta.descricao || null, 
      valor: proposta.valor || null, 
      cidade_id: proposta.cidade_id || null, 
      inicio: proposta.inicio || null, 
      fim: proposta.fim || null 
    }    
    this.form.setValue(formModel);
  }

  public ngAfterViewInit(){

  }

  public goBack(){
    this.location.back();
  }

  public updateProposta(){

    this.proposta.nome = this.form.get("nome").value;
    this.proposta.descricao = this.form.get("descricao").value;
    this.proposta.cidade_id = this.form.get("cidade_id").value;    
    this.proposta.valor = this.form.get("valor").value;
    this.proposta.inicio = this.form.get("inicio").value;
    this.proposta.fim = this.form.get("fim").value;    
    this.propostaService.update(this.proposta)
      .subscribe(
        () => alert("Proposta salva com sucesso!"),
        () => alert("Ocorreu um erro no servidor")
      )
  }

  // private responseToProposta( response: Response ): Proposta {
  //   return new Proposta(
  //     response.json().data.id,
  //     response.json().data.attributes.nome,
  //     response.json().data.attributes.descricao,
  //     response.json().data.attributes.valor,
  //     response.json().data.attributes.cidade_id,
  //     response.json().data.attributes.inicio,
  //     response.json().data.attributes.fim
  //   )
  // }

}