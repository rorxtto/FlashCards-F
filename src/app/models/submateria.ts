import { Materia } from "./materia";


export class Submateria {
    id!: number;
    nome!: string;
    materia!: Materia;

    constructor(materia: Materia) {
        this.materia = materia;
      }
}


