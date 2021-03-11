import { Scategorie } from "./scategorie";

export class Article {
    id: number;
    code: string;
    code_b: string;
    libelle: string;
    pa : number;
    pv : number;
    tva: number;
    fodec : number;
    stock : number;
    stkinit : number;
    scategorie : Scategorie;  

}
