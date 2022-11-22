import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private candidatoURL: string = '/candidatos';

  constructor(private httpClient: HttpClient) { }

  getAllCandidatos(): Observable<Candidato[]> {
    return this.httpClient.get<Candidato[]>('')
  }
}
