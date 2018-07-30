import { Headers, Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { Cidade } from './cidade.model';

@Injectable()
export class CidadeService{    
    public cidadeUrl = "http://localhost:3000/cidades";    
    public headers = new Headers({ 'Content-Type': 'application/json' })
    
    public constructor(private http: Http ) { }

    private handlerErrors(error: Response){
        console.log("salvando o erro num arquivo de log - detalhes do erro =>", error);
        return Observable.throw(error);
    }

    public getCidades(): Observable<Cidade[]> {        
        return this.http.get(this.cidadeUrl)  
            .catch( this.handlerErrors )
            .map((response: Response) => response.json().data as Cidade[])            
    }
}
