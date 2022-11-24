import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    var currentUser = localStorage.getItem('token');
    let isTokenDefined: boolean = false;
    if(currentUser) {
      isTokenDefined = true;
      this.authService.updateIsAuthenticatedInSubject(true);
    } else {
      this.router.navigate(['/login']);
    }

    return new Observable<boolean>(obs => {
      obs.next(isTokenDefined)
    });
  }

}
