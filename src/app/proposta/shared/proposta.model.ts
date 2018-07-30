export class Proposta{

    constructor( 
        public id: number, 
        public nome: string, 
        public descricao: string, 
        public valor: number, 
        public cidade_id: number, 
        public inicio: string, 
        public fim: string 
    ){}
}