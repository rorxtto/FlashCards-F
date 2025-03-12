import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Submateria } from '../models/submateria';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SubmateriaService {

  http = inject (HttpClient);

  API = "http://localhost:8080/submateria"

  constructor() { }

findAll(): Observable<Submateria[]> {
    return this.http.get<Submateria[]>(this.API+"/findAll")
  }

delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/" + id, {responseType: 'text' as 'json'})
  }
  
save(submateria: Submateria): Observable<string> {
    return this.http.post<string>(this.API+"/save" , submateria, {responseType: 'text' as 'json'})
  }
  

update(submateria: Submateria, id: number): Observable<string> {
    return this.http.put<string>(this.API+"/update/" + id, submateria, {responseType: 'text' as 'json'})
  }

findById(id: number): Observable<Submateria> {
    return this.http.get<Submateria>(this.API+"/findById/" + id)
  }

  findSubmateriasComQuantidadeQuestoes(): Observable<Submateria[]> {
    return this.http.get<Submateria[]>(this.API+"/com-quantidade-questoes");
  }
}

