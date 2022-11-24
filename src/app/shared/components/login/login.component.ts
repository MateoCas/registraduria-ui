import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { mergeMap, Observable, Subscription } from 'rxjs';
import { UserInfo } from '../../models/user-info';
import { UserLogin } from '../../models/user-login';
import { AuthService } from '../../services/auth.service';
import { ErrorModalContentComponent } from '../error-modal-content/error-modal-content.component';

@Component({
  selector: 're-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  email!: string;
  password!: string;
  userInfo!: UserInfo;
  userLogin!: UserLogin;
  private _authSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token) {
      this.router.navigate(['/candidatos']);
      this.authService.updateIsAuthenticatedInSubject(true);
    }
  }

  login(): void {
    if(!this.email || !this.password) {
      return;
    }

    this.userInfo = {
      correo: this.email,
      contrasena: this.password
    }

    this._authSubscription = this.authService.getAccessToken(this.userInfo).subscribe({
      next: userInfoResponse => this.mapUserInfoFound(userInfoResponse),
      error: err => this.openErrorMessage(`Hubo un error con la autenticación, razón: ${err}`)
    });
  }

  private mapUserInfoFound(userInfoResponse: UserLogin) {
    this.userLogin = {
      user_id: userInfoResponse.user_id,
      token: userInfoResponse.token
    }

    localStorage.setItem('token', userInfoResponse.token);
    this.authService.updateIsAuthenticatedInSubject(true);

    console.log(this.userLogin);
    this.router.navigate(['/candidatos']);
  }

  private openErrorMessage(errMessage: String) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ErrorModalContentComponent);
    modalRef.componentInstance.messageToShow = errMessage;
    this.password = '';
  }

  ngOnDestroy(): void {
    if(this._authSubscription) {
      this._authSubscription.unsubscribe();
    }
  }
}
