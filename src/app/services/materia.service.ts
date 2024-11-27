import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Materia } from '../models/materia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  http = inject (HttpClient);

  API = "http://localhost:8080/materia"

  constructor() { }

findAll(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.API+"/findAll")
  }

delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/" + id, {responseType: 'text' as 'json'})
  }
  
save(materia: Materia): Observable<string> {
    return this.http.post<string>(this.API+"/save" , materia, {responseType: 'text' as 'json'})
  }
  

update(materia: Materia, id: number): Observable<string> {
    return this.http.put<string>(this.API+"/update/" + id, materia, {responseType: 'text' as 'json'})
  }

findById(id: number): Observable<Materia> {
    return this.http.get<Materia>(this.API+"/findById/" + id)
  }

  
}


