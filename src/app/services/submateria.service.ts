import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Submateria } from '../models/submateria';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class SubmateriaService {

  http = inject (HttpClient);

  API = environment.SERVIDOR + "/submateria"

  constructor() { }

  findAll(): Observable<Submateria[]> {
    return this.http.get<Submateria[]>(this.API+"/findAll")
  }

  findAllPaginated(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<any>(this.API + '/paginated', { params });
  }
  
  findAllPaginatedByMateriaId(page: number, size: number, materiaId: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<any>(`${this.API}/paginated/materia/${materiaId}`, { params });
  }
  
  findAllPaginatedAndFiltered(page: number, size: number, filtroNome?: string, materiaId?: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
      
    if (filtroNome) {
      params = params.set('filtroNome', filtroNome);
    }
    
    if (materiaId) {
      params = params.set('materiaId', materiaId.toString());
    }
    
    return this.http.get<any>(this.API + '/filtered', { params });
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