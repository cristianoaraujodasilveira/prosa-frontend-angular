import { Component, OnInit } from "@angular/core";
import { PropostaService } from './shared/proposta.service';
import { Proposta } from "./shared/proposta.model";

@Component({
    selector: 'proposta',
    templateUrl: './proposta.component.html',
    providers: [ PropostaService ]
})

export class PropostaComponent implements OnInit{
  public propostas: Array<Proposta>;
  public selectedProposta: Proposta;
  ;

  public constructor(private propostaService: PropostaService){}

  public ngOnInit(){
    this.propostaService.getPropostas()
      .subscribe(
        propostas => this.propostas = propostas,
        error => alert( "Ocorreu um erro no servidor" )
      )
    
  }

  public onSelect( proposta: Proposta ): void{
      this.selectedProposta = proposta;
  }


  public deleteProposta(proposta: Proposta){
    this.propostaService.delete(proposta.id)
      .subscribe(
        () => alert("Proposta excluída com sucesso!"),
        () => alert("Ocorreu um erro no servidor")
      )
  }
}