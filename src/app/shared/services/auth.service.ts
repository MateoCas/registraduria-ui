import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { UserLogin } from '../models/user-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authServiceURL: string = 'http://127.0.0.1:7777/login';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(Object());

  constructor(private httpClient: HttpClient) { }

  getAccessToken(userInfo: UserInfo): Observable<UserLogin> {
    return this.httpClient.post<UserLogin>(this.authServiceURL, userInfo,
      {headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')})
      .pipe(catchError((err) => this.handleError(err)));
  }

  updateIsAuthenticatedInSubject(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  getIsAuthenticatedSubjectAsObservable(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string = '';

    if(err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    } else {
      errorMessage = `${err.error.msg}`;
    }

    console.error(errorMessage);

    return throwError(() => errorMessage);
  }
}
