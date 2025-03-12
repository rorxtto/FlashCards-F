export class Respostas{

    submateriaId!: number;
    contador!:number;

    dataHoraUltimaMuitoFacil!: Date;
    dataHoraUltimaFacil!: Date;
    dataHoraUltimaMedia!: Date;
    dataHoraUltimaDificil!: Date;
    dataHoraUltimaMuitoDificil!: Date;

    questoesMuitoFaceis: number[] = [];
    questoesFaceis: number[] = [];
    questoesMedias: number[] = [];
    questoesDificeis: number[] = [];
    questoesMuitoDificeis: number[] = [];
}