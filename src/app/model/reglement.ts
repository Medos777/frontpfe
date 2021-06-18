import { Lreglement } from "./lreglement";

export class Reglement {
    id: number;
    idclient:String;
    libelle: string;

    date_Paiement:any;
    lreglements :Array<Lreglement> =[];

}

