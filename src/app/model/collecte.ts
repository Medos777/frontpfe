import { Lcollecte } from './lcollecte';

export class Collecte{
    id :number;
    annee : number;
    numero : number;
    idclient : number;
    libclient : String;

    date_mvt : any;

    totht : number;
    tottva : number;
    totttc : number;

    codevoiture: number;
    codechauff: String;
 

    lcollectes :Array<Lcollecte> =[];
    
    
}
