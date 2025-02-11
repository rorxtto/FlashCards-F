import { Questoes } from "./questoes";

export class Alternativas {
    id!: number;
    texto!: string;
    questoes!: Questoes;
    ordem: number;

    //transiente não persiste
    correta: boolean;

    constructor(ordem: number){
        this.correta = false;
        this.ordem = ordem;
    }

}
