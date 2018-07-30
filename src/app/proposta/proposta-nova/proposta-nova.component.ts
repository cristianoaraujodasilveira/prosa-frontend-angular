import { Component, OnInit, AfterViewInit } from "@angular/core";
import { PropostaService } from "../shared/proposta.service";
import { CidadeService } from "../shared/cidade.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import 'rxjs/add/operator/switchMap';
import { Proposta } from '../shared/proposta.model';
import { Cidade } from "../shared/cidade.model";

@Component({
    selector: 'proposta-nova',
    templateUrl: './proposta-nova.component.html',
    providers: [ PropostaService, CidadeService ]
})

export class PropostaNovaComponent implements OnInit, AfterViewInit{  
  public form: FormGroup;
  public proposta: Proposta;  
  public cidades: Array<Cidade>;

  public constructor(
    private propostaService: PropostaService,
    private cidadeService: CidadeService,
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
    // this.cidadeService.getCidades()
    //   .subscribe(        
    //     cidades => this.cidades = cidades,
    //     error => alert( "Ocorreu um erro no servidor" )
    //   )
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

  public createProposta(){
    this.proposta.nome = this.form.get("nome").value;
    this.proposta.descricao = this.form.get("descricao").value;
    this.proposta.cidade_id = this.form.get("cidade_id").value;    
    this.proposta.valor = this.form.get("valor").value;
    this.proposta.inicio = this.form.get("inicio").value;
    this.proposta.fim = this.form.get("fim").value;    
    this.propostaService.create(this.proposta)
      .subscribe(
        () => alert("Proposta criada com sucesso!"),
        () => alert("Ocorreu um erro no servidor")
      )
  }
}