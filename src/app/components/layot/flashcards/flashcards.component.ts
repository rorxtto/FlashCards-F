import { Component, OnInit, inject, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Questoes } from '../../../models/questoes';
import { QuestoesService } from '../../../services/questoes.service';
import { Submateria } from '../../../models/submateria';
import { Materia } from '../../../models/materia';
import { Respostas } from '../../../models/respostas';
import { Alternativas } from '../../../models/alternativas';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [],
  templateUrl: './flashcards.component.html',
  styleUrl: './flashcards.component.scss',
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateY(179deg)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ],
})
export class FlashcardsComponent implements OnInit, AfterViewInit{

  @ViewChild('cardContainerFront', { static: false }) cardContainerFront!: ElementRef;
  @ViewChild('cardContainerBack', { static: false }) cardContainerBack!: ElementRef;

  router = inject(ActivatedRoute);
  materiaInstance = new Materia();
  submateriaInstance = new Submateria(this.materiaInstance);
  questoes = new Questoes(this.submateriaInstance);
  questoesService = inject(QuestoesService);
  idSubmateria: number = 0;

  constructor() {
    this.idSubmateria = this.router.snapshot.params['id'];
    this.carregarQuestao(this.idSubmateria, 0);
  }

  carregarQuestao(id: number, idQuestaoEmTela: number) {
    this.questoesService
      .findNextQuestionBySubmateria(id, idQuestaoEmTela)
      .subscribe({
        next: (questao) => {

          this.questoes = questao;
          this.embaralharAlternativas(); // Embaralha as alternativas ao carregar a questão
        },
        error: (erro) => {
          alert('Ocorreu um erro!');
        },
      });
  }

  getLetter(index: number): string {
    return String.fromCharCode(97 + index);
  }

  ngOnInit() {}

  flip: string = 'inactive';

  toggleFlip() {
    this.flip = this.flip == 'inactive' ? 'active' : 'inactive';
  }

  embaralharAlternativas() {
    for (let i = this.questoes.alternativas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questoes.alternativas[i], this.questoes.alternativas[j]] = [
        this.questoes.alternativas[j],
        this.questoes.alternativas[i],
      ];
    }
  }

  findById(id: number) {
    this.questoesService.findById(id).subscribe({
      next: (questao) => {
        this.questoes = questao;
      },
      error: (erro) => {
        alert('Ocorreu um erro!');
      },
    });
  }

  //1: MUITO FÁCIL, 2: FÁCIL, 3: MÉDIO, 4: DIFÍCIL E 5: MUITO DIFÍCIL
  avaliarERenderizarNovaQuestao(nivel: number) {
    let respostas = new Respostas();
    let aux = this.questoesService.getRespostas();
    let agora = this.getBrasiliaTime();


    if (aux) {
      respostas = aux;
    }

    if (nivel == 1) {
      respostas?.questoesMuitoFaceis.push(this.questoes.id);
      respostas.dataHoraUltimaMuitoFacil = agora;
    } else if (nivel == 2) {
      respostas?.questoesFaceis.push(this.questoes.id);
      respostas.dataHoraUltimaFacil = agora;
    } else if (nivel == 3) {
      respostas?.questoesMedias.push(this.questoes.id);
      respostas.dataHoraUltimaMedia = agora;
    } else if (nivel == 4) {
      respostas?.questoesDificeis.push(this.questoes.id);
      respostas.dataHoraUltimaDificil = agora;
    } else if (nivel == 5) {
      respostas?.questoesMuitoDificeis.push(this.questoes.id);
      respostas.dataHoraUltimaMuitoDificil = agora;
    }

    //ETAPA 2 - RENDERIZAR PRÓXIMA QUESTÃO


    let muitoFacilMinutos = 2;  // 1 minuto
    let facilMinutos = 1;       // 1 minuto
    let mediaMinutos = 0.5;     // 30 segundos
    let dificilMinutos = 0.33;  // 20 segundos
    let muitoDificilMinutos = 0.16; // 10 segundos

    if ( 
      this.subtrairDatas(agora, respostas.dataHoraUltimaMuitoFacil, 'ms') >
        muitoFacilMinutos * 1000 * 60 &&
      respostas.questoesMuitoFaceis.length > 0
    ) {
      let id = respostas.questoesMuitoFaceis[0];
      this.findById(id);
      respostas.questoesMuitoFaceis.splice(0, 1);
    } else if (
      this.subtrairDatas(agora, respostas.dataHoraUltimaFacil, 'ms') >
        facilMinutos * 1000 * 60 &&
      respostas.questoesFaceis.length > 0
    ) {
      let id = respostas.questoesFaceis[0];
      this.findById(id);
      respostas.questoesFaceis.splice(0, 1);
    } else if (
      this.subtrairDatas(agora, respostas.dataHoraUltimaMedia, 'ms') >
        mediaMinutos * 1000 * 60 &&
      respostas.questoesMedias.length > 0
    ) {
      let id = respostas.questoesMedias[0];
      this.findById(id);
      respostas.questoesMedias.splice(0, 1);
    } else if (
      this.subtrairDatas(agora, respostas.dataHoraUltimaDificil, 'ms') >
        dificilMinutos * 1000 * 60 &&
      respostas.questoesDificeis.length > 0
    ) {
      let id = respostas.questoesDificeis[0];
      this.findById(id);
      respostas.questoesDificeis.splice(0, 1);
    } else if (
      this.subtrairDatas(agora, respostas.dataHoraUltimaMuitoDificil, 'ms') >
        muitoDificilMinutos * 1000 * 60 &&
      respostas.questoesMuitoDificeis.length > 0
    ) {
      let id = respostas.questoesMuitoDificeis[0];
      this.findById(id);
      respostas.questoesMuitoDificeis.splice(0, 1);
    } else {
      //aleatorio da submateria
      this.carregarQuestao(this.idSubmateria, this.questoes.id);
    }

    this.questoesService.setRespostas(respostas);
  }

 getBrasiliaTime(): Date {
  const now = new Date();
  
  // Obtém o horário UTC atual
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;

  // Ajusta o horário para o fuso horário de Brasília (GMT-3)
  const brasiliaOffset = -3 * 3600000; // Offset em milissegundos
  const brasiliaTime = new Date(utcTime + brasiliaOffset);

  // Retorna o horário de Brasília em UTC
  return new Date(
    Date.UTC(
      brasiliaTime.getFullYear(),
      brasiliaTime.getMonth(),
      brasiliaTime.getDate(),
      brasiliaTime.getHours(),
      brasiliaTime.getMinutes(),
      brasiliaTime.getSeconds(),
      brasiliaTime.getMilliseconds()
    )
  );
}


  subtrairDatas(
    date1: Date,
    date2: Date,
    unidade: 'ms' | 's' | 'min' | 'h' | 'd'
  ): number {
    date1 = new Date(date1);
    date2 = new Date(date2);

    // Converte as datas para o tempo UTC
    const utcDate1 = Date.UTC(
      date1.getUTCFullYear(),
      date1.getUTCMonth(),
      date1.getUTCDate(),
      date1.getUTCHours(),
      date1.getUTCMinutes(),
      date1.getUTCSeconds(),
      date1.getUTCMilliseconds()
    );

    const utcDate2 = Date.UTC(
      date2.getUTCFullYear(),
      date2.getUTCMonth(),
      date2.getUTCDate(),
      date2.getUTCHours(),
      date2.getUTCMinutes(),
      date2.getUTCSeconds(),
      date2.getUTCMilliseconds()
    );

    // Calcula a diferença em milissegundos
    const diffMs = Math.abs(utcDate1 - utcDate2);

    // Converte a diferença para a unidade desejada
    switch (unidade) {
      case 'ms': // Milissegundos
        return diffMs;
      case 's': // Segundos
        return diffMs / 1000;
      case 'min': // Minutos
        return diffMs / (1000 * 60);
      case 'h': // Horas
        return diffMs / (1000 * 60 * 60);
      case 'd': // Dias
        return diffMs / (1000 * 60 * 60 * 24);
      default:
        throw new Error('Unidade inválida. Use "ms", "s", "min", "h" ou "d".');
    }
  }



  isFlipped = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  ngAfterViewInit() {
    // Verifica e ajusta o 'justify-content' para ambos os elementos
    this.updateJustifyContent(this.cardContainerFront);
    this.updateJustifyContent(this.cardContainerBack);

    // Observa as mudanças no tamanho do conteúdo
    const observer = new ResizeObserver(() => {
      this.updateJustifyContent(this.cardContainerFront);
      this.updateJustifyContent(this.cardContainerBack);
    });

    // Observa ambos os elementos
    observer.observe(this.cardContainerFront.nativeElement);
    observer.observe(this.cardContainerBack.nativeElement);
  }

  // Função genérica para ajustar 'justify-content'
  updateJustifyContent(card: ElementRef) {
    const element = card.nativeElement;
    if (element.scrollHeight > element.clientHeight) {
      element.style.justifyContent = 'flex-start';
    } else {
      element.style.justifyContent = 'center';
    }
  }


  
}
