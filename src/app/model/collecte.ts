import { Lcollecte } from './lcollecte';

export class Collecte{
    id :number;
    annee : number;
    numero : number;
   

    date_mvt : any;

    totht : number;
    tottva : number;
    totttc : number;
    codevoiture: number;

    codefacteur: number;
    codechauff: String;
 
    destinationLibelle: String;

    lcollectes :Array<Lcollecte> =[];
    
    
}
