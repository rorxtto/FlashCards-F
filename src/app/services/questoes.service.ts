import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Questoes } from '../models/questoes';
import { Respostas } from '../models/respostas';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestoesService {
  http = inject(HttpClient);

  API = environment.SERVIDOR + '/questoes';

  constructor() {}

  findNextQuestionBySubmateria(
    idSubmateria: number,
    idQuestaoEmTela: number
  ): Observable<Questoes> {
    return this.http.get<Questoes>(
      this.API +
        '/findNextQuestionBySubmateria/' +
        idSubmateria +
        '/' +
        idQuestaoEmTela
    );
  }

  findAll(): Observable<Questoes[]> {
    return this.http.get<Questoes[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, {
      responseType: 'text' as 'json',
    });
  }

  save(questoes: Questoes): Observable<string> {
    return this.http.post<string>(this.API + '/save', questoes, {
      responseType: 'text' as 'json',
    });
  }

  update(questoes: Questoes, id: number): Observable<string> {
    return this.http.put<string>(this.API + '/update/' + id, questoes, {
      responseType: 'text' as 'json',
    });
  }

  findById(id: number): Observable<Questoes> {
    return this.http.get<Questoes>(this.API + '/findById/' + id);
  }

  retornarContador(submateriaId: number){
    let aux = localStorage.getItem('respostas');
    let respostas: Respostas[] = [];

    if (aux) respostas = JSON.parse(aux) as Respostas[];

    let achou: boolean = false;
    for (let i = 0; i < respostas.length; i++) {
      if (respostas[i].submateriaId == submateriaId) {
        return respostas[i].contador;
      }
    }
    return 0;
  }

  getRespostas(submateriaId: number) {
    let aux = localStorage.getItem('respostas');
    let respostas: Respostas[] = [];

    if (aux) respostas = JSON.parse(aux) as Respostas[];

    let achou: boolean = false;
    for (let i = 0; i < respostas.length; i++) {
      if (respostas[i].submateriaId == submateriaId) {
        return respostas[i];
      }
    }

    return null;
  }

  setRespostas(respostasNovas: Respostas) {
    let zerar = false;
    //FAZER UM IF AQUI VERIFICANDO SE A DATAHORA ATUAL E 24H MAIOR DO QUE AS RESPOTSAS QUE CHEGARAM
    //SE SIM,

    if (zerar) {
      let respostas: Respostas[] = [];
      respostas.push(respostasNovas);
      localStorage.setItem('respostas', JSON.stringify(respostas));
    } else {
      let aux = localStorage.getItem('respostas');
      let respostas: Respostas[] = [];

      if (aux) respostas = JSON.parse(aux) as Respostas[];

      let achou: boolean = false;
      for (let i = 0; i < respostas.length; i++) {
        if (respostas[i].submateriaId == respostasNovas.submateriaId) {
          achou = true;
          respostas[i] = respostasNovas;
        }
      }

      if (!achou) respostas.push(respostasNovas);

      localStorage.setItem('respostas', JSON.stringify(respostas));
    }
  }
  
}


