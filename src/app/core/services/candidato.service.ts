import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private candidatoURL: string = 'http://127.0.0.1:7777/candidatos';
  private candidatoAddedSubject = new BehaviorSubject<Candidato>(Object());

  constructor(private httpClient: HttpClient) { }

  getAllCandidatos(): Observable<Candidato[]> {
    const tokenInSession = localStorage.getItem('token');
    let currentToken: string = tokenInSession != null ? tokenInSession : "";

    return this.httpClient.get<Candidato[]>(this.candidatoURL,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentToken)
      .set('Content-Type','application/json; charset=utf-8')});
  }

  saveCandidato(candidatoToSave: Candidato): Observable<Candidato> {
    const tokenInSession = localStorage.getItem('token');
    let currentToken: string = tokenInSession != null ? tokenInSession : "";

    return this.httpClient.post<Candidato>(this.candidatoURL, candidatoToSave,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentToken)
      .set('Content-Type','application/json; charset=utf-8')});
  }

  notifyNewCandidatoAdded(candidatoAdded: Candidato): void {
    this.candidatoAddedSubject.next(candidatoAdded);
  }

  getSubscriptionOfCandidatosAddedAsObservable(): Observable<Candidato> {
    return this.candidatoAddedSubject.asObservable();
  }

  isACandidato(possibleCandidato: Candidato): boolean {
    return 'id' in possibleCandidato && 'cedula' in possibleCandidato && 'resolucion'
    in possibleCandidato && 'nombre' in possibleCandidato;
  }
}
