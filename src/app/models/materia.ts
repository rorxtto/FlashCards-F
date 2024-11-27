import { Submateria } from "./submateria";

export class Materia {
  id!: number;
  nome!: string;
  descricao!: string;
  base64!: string;
  submateria!: Submateria[];  

  // constructor(id: number, nome: string, descricao: string, base64: string, submateria: Submateria[]) {
  //     this.id = id;
  //     this.nome = nome;
  //     this.descricao = descricao;
  //     this.base64 = base64;
  //     this.submateria = submateria;  // Submaterias devem ser passadas como um array
  // }

}
