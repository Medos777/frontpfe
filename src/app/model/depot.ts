import { Ldepot } from '../model/ldepot';

export class Depot {
    id :number;
    annee : number;
    numero : number;
    idclient : number;
    libclient : String;
    typecorr : String;

    date_mvt : any;
    totht : number;
    assure : boolean;
    indemnisation : number;

    tottva : number;
    totttc : number;
    total : number;
    beneficier: String;
    telbeneficier: number;
    adressebeneficier: String;
    emailbeneficier: String;
    destinationId:number;
    destinationLibelle:String;

    ldepots :Array<Ldepot> =[];
    
    
}
