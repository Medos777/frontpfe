import { Ldepot } from '../model/ldepot';

export class Depot {
    id :number;
    annee : number;
    numero : number;
    idclient : number;
    libclient : String;
    date_mvt : any;
    totht : number;
    tottva : number;
    totttc : number;
    total : number;
    beneficier: String;
    telbeneficier: number;
    adressebeneficier: String;

    destinationId:number;
    destinationLibelle:String;

    ldepots :Array<Ldepot> =[];
    
    
}
