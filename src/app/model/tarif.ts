import { Destination } from "./destination";

export class Tarif {
    id: number;
    code: string;
    libelle: string;
    deb:number;
    fin:number;
    montant:number;
    destination : Destination;
}

