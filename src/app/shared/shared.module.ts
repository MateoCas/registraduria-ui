import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { ErrorModalContentComponent } from './components/error-modal-content/error-modal-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    ErrorModalContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'login', component: LoginComponent}
    ]),
    NgbModule,
    FormsModule
  ],
  exports: [
    NgbModule,
    CommonModule,
    ErrorModalContentComponent,
    FormsModule
  ]
})
export class SharedModule { }
