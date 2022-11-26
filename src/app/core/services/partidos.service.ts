import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partido } from '../models/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  private partidoURL: string = "http://127.0.0.1:7777/partidos";


  constructor(private httpClient: HttpClient) { }

  getAllPartidos(): Observable<Partido[]> {
    const tokenInSession = localStorage.getItem('token');
    let currentToken: string = tokenInSession != null ? tokenInSession : "";

    return this.httpClient.get<Partido[]>(this.partidoURL,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentToken)
      .set('Content-Type','application/json; charset=utf-8')});
  }
}
