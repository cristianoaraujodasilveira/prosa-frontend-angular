import { Headers, Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { Proposta } from './proposta.model';

@Injectable()
export class PropostaService{
    public propostaUrl = "http://localhost:3000/proposta";
    public headers = new Headers({ 'Content-Type': 'application/json' })
    
    public constructor(private http: Http ) { }

    public getPropostas(): Observable<Proposta[]> {
        return this.http.get(this.propostaUrl)  
            .catch( this.handlerErrors )
            .map((response: Response) => response.json().data as Proposta[] );
    }

    public getProposta( id: number ): Observable<Proposta>{
        let url = `${this.propostaUrl}/${id}`;
        return this.http.get(url)
          .map((response: Response) => {
            return new Proposta(
                response.json().data.id,
                response.json().data.attributes.nome,
                response.json().data.attributes.descricao,
                response.json().data.attributes.valor,
                response.json().data.relationships.cidade.data.id,
                response.json().data.attributes.inicio,
                response.json().data.attributes.fim
            )  
        })
    }

    private handlerErrors(error: Response){
        console.log("salvando o erro num arquivo de log - detalhes do erro =>", error);
        return Observable.throw(error);
    }

    public create( proposta: Proposta ):Observable<Proposta> {
        let url = this.propostaUrl;
        let body = JSON.stringify(proposta);
        return this.http.post( url, body, {headers: this.headers })
            .catch(this.handlerErrors)
            .map( response => response.json().data as Proposta )
    }

    public update( proposta: Proposta ): Observable<Proposta> {
        let url = `${this.propostaUrl}/${proposta.id}`;
        let body = JSON.stringify(proposta);
        return this.http.put( url, body, { headers: this.headers })
            .catch(this.handlerErrors)
            .map( () => proposta );
    } 

    public delete( id: number ): Observable<null>{
        let url = `${this.propostaUrl}/${id}`;
        return this.http.delete(url,{headers: this.headers})
            .catch(this.handlerErrors)
            .map( () => null )
    }
}
