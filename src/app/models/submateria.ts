import { Materia } from "./materia";


export class Submateria {
    id!: number;
    nome!: string;
    materia!: Materia;
    quantidadeRespondida!: number; //TEMPORARIO... NAO EH PRA COLOCAR NA ENTITY
    quantidadeQuestoes: number = 0; 

    constructor(materia: Materia) {
        this.materia = materia;
      }
}




