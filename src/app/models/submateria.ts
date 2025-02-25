import { Materia } from "./materia";


export class Submateria {
    id!: number;
    nome!: string;
    materia!: Materia;
    quantidadeQuestoes!: number; 

    constructor(materia: Materia) {
        this.materia = materia;
      }
}


