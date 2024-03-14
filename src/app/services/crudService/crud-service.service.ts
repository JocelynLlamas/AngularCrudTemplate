import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  private apiUrl = 'https://localhost:7125/api/SuperHero'

  constructor(private http: HttpClient) {}

  getData():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  
  editData(superHeroData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, superHeroData);
  }

  removeData(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}?id=${id}`);
  }

  addData(superHeroData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, superHeroData);
  }
}
