import { Lfacture } from "./lfacture";

export class Facture {
    id :number;
    annee : number;
    date_fct:Date;
    numero : number;
    idclient : number;
    libclient : String;
    totht : number;
    tottva : number;
    totttc : number;
    total : number;
    lfactures :Array<Lfacture> =[];

}