import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Questoes } from '../models/questoes';
import { Respostas } from '../models/respostas';

@Injectable({
  providedIn: 'root',
})
export class QuestoesService {
  http = inject(HttpClient);

  API = 'http://localhost:8080/questoes';

  constructor() {}

  findNextQuestionBySubmateria(idSubmateria: number, idQuestaoEmTela: number): Observable<Questoes> {
    return this.http.get<Questoes>(
      this.API + '/findNextQuestionBySubmateria/' + idSubmateria + '/'+idQuestaoEmTela
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


  
  getRespostas() {
    let respostas = localStorage.getItem('respostas');
    if (respostas)
      return JSON.parse(respostas) as Respostas;
    else return null;
  }

  setRespostas(respostas: Respostas){
    localStorage.setItem('respostas', JSON.stringify(respostas));
  }


}
