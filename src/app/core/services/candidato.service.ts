import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private candidatoURL: string = 'http://127.0.0.1:7777/candidatos';

  constructor(private httpClient: HttpClient) { }

  getAllCandidatos(): Observable<Candidato[]> {
    const tokenInSession = localStorage.getItem('token');
    let currentToken: string = tokenInSession != null ? tokenInSession : "";

    return this.httpClient.get<Candidato[]>(this.candidatoURL,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentToken)
      .set('Content-Type','application/json; charset=utf-8')})
  }
}
