import { Submateria } from "./submateria";
import { Alternativas } from "./alternativas";

export class Questoes {
    id!: number;
    enunciado!: string;
    justificativa!: string;
    submateria!: Submateria;
    alternativas!: Alternativas[];
    alternativaCorreta!: Alternativas;
  /*  muitoFacil!: number; 
    facil!: number;
    medio!: number;
    dificil!: number;
    muitoDificil!: number; */

    constructor(submateria: Submateria) {
        this.submateria = submateria;
     /*   this.facil = 0; 
        this.muitoFacil = 0;
        this.muitoDificil = 0;
        this.dificil = 0;
        this.medio = 0;*/
    }
}








