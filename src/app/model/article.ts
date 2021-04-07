import { Scategorie } from "./scategorie";

export class Article {
    id: number;
    code: string;
    libelle: string;
    pa : number;
    pv : number;
    tva: number;
    stock : number;
    stkinit : number;
    scategorie : Scategorie;  

}
